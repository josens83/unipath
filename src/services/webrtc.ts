import SimplePeer from 'simple-peer';
import { supabase } from '../lib/supabase';

/**
 * WebRTC Service
 * Simple-peer를 사용한 화상 통신 서비스
 * Supabase Realtime을 시그널링 서버로 활용
 */

export interface WebRTCCallConfig {
  sessionId: string;
  userId: string;
  isInitiator: boolean; // 방 생성자 여부
}

export class WebRTCService {
  private peer: SimplePeer.Instance | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private config: WebRTCCallConfig | null = null;
  private signalChannel: any = null;

  /**
   * WebRTC 연결 초기화
   */
  async initializeCall(
    config: WebRTCCallConfig,
    onRemoteStream: (stream: MediaStream) => void,
    onConnectionChange: (status: 'connecting' | 'connected' | 'disconnected') => void
  ): Promise<MediaStream> {
    this.config = config;

    // 1. 로컬 미디어 스트림 가져오기 (카메라 + 마이크)
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    } catch (error) {
      console.error('미디어 장치 접근 실패:', error);
      throw new Error('카메라 또는 마이크 접근 권한이 필요합니다.');
    }

    // 2. Peer Connection 생성
    onConnectionChange('connecting');

    this.peer = new SimplePeer({
      initiator: config.isInitiator,
      stream: this.localStream,
      trickle: true, // ICE candidates를 즉시 전송
      config: {
        iceServers: [
          // Google의 무료 STUN 서버
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          // 프로덕션에서는 TURN 서버 추가 권장 (NAT 우회)
        ],
      },
    });

    // 3. 시그널링 채널 설정 (Supabase Realtime 사용)
    await this.setupSignaling(config.sessionId);

    // 4. Peer 이벤트 리스너
    this.peer.on('signal', async (data: any) => {
      // Signaling 데이터를 Supabase를 통해 상대방에게 전송
      await this.sendSignal(data);
    });

    this.peer.on('stream', (stream: MediaStream) => {
      // 상대방의 스트림 수신
      this.remoteStream = stream;
      onRemoteStream(stream);
      onConnectionChange('connected');
    });

    this.peer.on('error', (err: Error) => {
      console.error('Peer connection 오류:', err);
      onConnectionChange('disconnected');
    });

    this.peer.on('close', () => {
      onConnectionChange('disconnected');
    });

    return this.localStream;
  }

  /**
   * Supabase Realtime을 사용한 시그널링 설정
   */
  private async setupSignaling(sessionId: string): Promise<void> {
    // WebRTC 시그널링을 위한 테이블 (간단한 구현)
    // 프로덕션에서는 별도 signaling 테이블 권장

    // Realtime 채널 구독
    this.signalChannel = supabase
      .channel(`webrtc_${sessionId}`)
      .on(
        'broadcast',
        { event: 'signal' },
        async (payload: any) => {
          // 다른 사용자로부터 받은 시그널링 데이터
          if (payload.payload.userId !== this.config?.userId) {
            if (this.peer && !this.peer.destroyed) {
              this.peer.signal(payload.payload.data);
            }
          }
        }
      )
      .subscribe();
  }

  /**
   * 시그널링 데이터 전송
   */
  private async sendSignal(data: any): Promise<void> {
    if (!this.signalChannel || !this.config) return;

    await this.signalChannel.send({
      type: 'broadcast',
      event: 'signal',
      payload: {
        userId: this.config.userId,
        data,
      },
    });
  }

  /**
   * 비디오 on/off
   */
  toggleVideo(enabled: boolean): void {
    if (!this.localStream) return;

    this.localStream.getVideoTracks().forEach((track) => {
      track.enabled = enabled;
    });
  }

  /**
   * 오디오 on/off
   */
  toggleAudio(enabled: boolean): void {
    if (!this.localStream) return;

    this.localStream.getAudioTracks().forEach((track) => {
      track.enabled = enabled;
    });
  }

  /**
   * 화면 공유 시작
   */
  async startScreenShare(): Promise<MediaStream> {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true as any,
        audio: false,
      });

      // 현재 비디오 트랙을 화면 공유 트랙으로 교체
      if (this.peer && this.localStream) {
        const videoTrack = screenStream.getVideoTracks()[0];
        // SimplePeer의 내부 RTCPeerConnection에 접근
        const peerConnection = (this.peer as any)._pc as RTCPeerConnection;

        if (peerConnection) {
          const sender = peerConnection
            .getSenders()
            .find((s: RTCRtpSender) => s.track?.kind === 'video');

          if (sender) {
            await sender.replaceTrack(videoTrack);
          }
        }

        // 화면 공유 중단 시 카메라로 복귀
        videoTrack.onended = () => {
          this.stopScreenShare();
        };
      }

      return screenStream;
    } catch (error) {
      console.error('화면 공유 실패:', error);
      throw new Error('화면 공유를 시작할 수 없습니다.');
    }
  }

  /**
   * 화면 공유 중단 (카메라로 복귀)
   */
  async stopScreenShare(): Promise<void> {
    if (!this.peer || !this.localStream) return;

    const videoTrack = this.localStream.getVideoTracks()[0];
    const peerConnection = (this.peer as any)._pc as RTCPeerConnection;

    if (peerConnection && videoTrack) {
      const sender = peerConnection
        .getSenders()
        .find((s: RTCRtpSender) => s.track?.kind === 'video');

      if (sender) {
        await sender.replaceTrack(videoTrack);
      }
    }
  }

  /**
   * 연결 종료 및 리소스 정리
   */
  async disconnect(): Promise<void> {
    // Peer connection 종료
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }

    // 로컬 스트림 정리
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }

    // 원격 스트림 정리
    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach((track) => track.stop());
      this.remoteStream = null;
    }

    // 시그널링 채널 구독 해제
    if (this.signalChannel) {
      await this.signalChannel.unsubscribe();
      this.signalChannel = null;
    }

    this.config = null;
  }

  /**
   * 연결 상태 확인
   */
  isConnected(): boolean {
    return this.peer !== null && !this.peer.destroyed;
  }

  /**
   * 로컬 스트림 가져오기
   */
  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  /**
   * 원격 스트림 가져오기
   */
  getRemoteStream(): MediaStream | null {
    return this.remoteStream;
  }
}

// 싱글톤 인스턴스
let webrtcInstance: WebRTCService | null = null;

export const getWebRTCService = (): WebRTCService => {
  if (!webrtcInstance) {
    webrtcInstance = new WebRTCService();
  }
  return webrtcInstance;
};

export const resetWebRTCService = (): void => {
  if (webrtcInstance) {
    webrtcInstance.disconnect();
    webrtcInstance = null;
  }
};
