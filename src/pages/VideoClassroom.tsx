import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageTransition } from '../components/common/PageTransition';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Phone,
  MessageSquare,
  Users,
  FileText,
  Settings,
  Maximize,
} from 'lucide-react';
import { getWebRTCService } from '../services/webrtc';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const VideoClassroom = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  // WebRTC 상태
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'connecting' | 'connected' | 'disconnected'
  >('idle');

  // UI 상태
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, sender: '튜터', text: '안녕하세요! 수업 시작하겠습니다.', time: '18:00' },
    { id: 2, sender: '나', text: '네, 준비되었습니다!', time: '18:01' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // WebRTC 초기화
  useEffect(() => {
    if (!sessionId || !user) {
      toast.error('세션 정보가 없습니다.');
      navigate('/dashboard');
      return;
    }

    const initializeWebRTC = async () => {
      try {
        const webrtc = getWebRTCService();

        // WebRTC 연결 시작
        const localStream = await webrtc.initializeCall(
          {
            sessionId,
            userId: user.id,
            isInitiator: user.role === 'tutor', // 튜터가 방 생성자
          },
          (remoteStream) => {
            // 상대방의 스트림을 받았을 때
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          },
          (status) => {
            // 연결 상태 변경
            setConnectionStatus(status);
            if (status === 'connected') {
              toast.success('화상 통화가 연결되었습니다!');
            } else if (status === 'disconnected') {
              toast.error('연결이 끊어졌습니다.');
            }
          }
        );

        // 로컬 스트림 표시
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        setConnectionStatus('connecting');
      } catch (error: any) {
        console.error('WebRTC 초기화 실패:', error);
        toast.error(error.message || 'WebRTC 초기화에 실패했습니다.');
      }
    };

    initializeWebRTC();

    // Cleanup: 컴포넌트 언마운트 시 연결 종료
    return () => {
      const webrtc = getWebRTCService();
      webrtc.disconnect();
    };
  }, [sessionId, user, navigate]);

  // 마이크 토글
  const handleToggleMic = () => {
    const webrtc = getWebRTCService();
    const newState = !isMicOn;
    webrtc.toggleAudio(newState);
    setIsMicOn(newState);
    toast.success(newState ? '마이크 켜짐' : '마이크 꺼짐');
  };

  // 카메라 토글
  const handleToggleCamera = () => {
    const webrtc = getWebRTCService();
    const newState = !isCameraOn;
    webrtc.toggleVideo(newState);
    setIsCameraOn(newState);
    toast.success(newState ? '카메라 켜짐' : '카메라 꺼짐');
  };

  // 화면 공유
  const handleScreenShare = async () => {
    const webrtc = getWebRTCService();
    try {
      if (!isScreenSharing) {
        await webrtc.startScreenShare();
        setIsScreenSharing(true);
        toast.success('화면 공유 시작');
      } else {
        await webrtc.stopScreenShare();
        setIsScreenSharing(false);
        toast.success('화면 공유 종료');
      }
    } catch (error: any) {
      toast.error(error.message || '화면 공유 실패');
    }
  };

  // 수업 종료
  const handleEndClass = async () => {
    if (confirm('수업을 종료하시겠습니까?')) {
      const webrtc = getWebRTCService();
      await webrtc.disconnect();
      toast.success('수업이 종료되었습니다.');
      navigate('/dashboard');
    }
  };

  // 채팅 메시지 전송
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: '나',
          text: newMessage,
          time: new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-900 dark:bg-gray-900">
        {/* Top Bar */}
        <div className="bg-gray-800 dark:bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg" />
          <div>
            <h1 className="font-bold">실시간 화상 수업</h1>
            <p className="text-sm text-gray-400">Session: {sessionId}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {connectionStatus === 'connected' && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500 rounded-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">연결됨</span>
            </div>
          )}
          {connectionStatus === 'connecting' && (
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500 rounded-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">연결 중...</span>
            </div>
          )}
          {connectionStatus === 'disconnected' && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-500 rounded-lg">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-sm font-medium">연결 끊김</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Area */}
        <div className={`flex-1 p-4 ${showChat ? '' : 'w-full'}`}>
          <div className="grid grid-cols-1 gap-4 h-full">
            {/* Remote Video (Tutor/Student) */}
            <Card className="bg-gray-800 border-gray-700 relative overflow-hidden flex-1">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {connectionStatus !== 'connected' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-900 to-secondary-900">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users size={48} />
                    </div>
                    <p className="text-xl font-bold">
                      {connectionStatus === 'connecting'
                        ? '연결 중...'
                        : '상대방을 기다리고 있습니다'}
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 rounded-lg text-white text-sm">
                상대방
              </div>
              <button className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white">
                <Maximize size={20} />
              </button>
            </Card>

            {/* Local Video (Self) */}
            <Card className="bg-gray-800 border-gray-700 relative overflow-hidden h-48">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {!isCameraOn && (
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  <VideoOff className="text-white" size={32} />
                </div>
              )}
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 rounded text-white text-xs">
                나
              </div>
            </Card>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2">
                <MessageSquare size={20} />
                채팅
              </h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${
                    msg.sender === '나' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className="text-xs text-gray-400 mb-1">
                    {msg.sender} · {msg.time}
                  </div>
                  <div
                    className={`inline-block px-3 py-2 rounded-lg ${
                      msg.sender === '나'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="메시지 입력..."
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button variant="primary" onClick={handleSendMessage}>
                  전송
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleToggleMic}
              className={`p-4 rounded-full transition-colors ${
                isMicOn
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
              title={isMicOn ? '마이크 끄기' : '마이크 켜기'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
            </motion.button>

            <motion.button
              onClick={handleToggleCamera}
              className={`p-4 rounded-full transition-colors ${
                isCameraOn
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
              title={isCameraOn ? '카메라 끄기' : '카메라 켜기'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
            </motion.button>

            <motion.button
              onClick={handleScreenShare}
              className={`p-4 rounded-full transition-colors ${
                isScreenSharing
                  ? 'bg-primary-500 hover:bg-primary-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              } text-white`}
              title="화면 공유"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Monitor size={24} />
            </motion.button>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setShowChat(!showChat)}
              className={`p-4 rounded-full ${
                showChat
                  ? 'bg-primary-500 hover:bg-primary-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              } text-white relative`}
              title="채팅"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare size={24} />
              {!showChat && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </motion.button>

            <motion.button
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
              title="수업 자료"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={24} />
            </motion.button>

            <motion.button
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
              title="설정"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={24} />
            </motion.button>
          </div>

          {/* Right Controls */}
          <div>
            <Button
              variant="primary"
              onClick={handleEndClass}
              className="bg-red-500 hover:bg-red-600 px-6 py-4 flex items-center gap-2"
            >
              <Phone size={20} />
              수업 종료
            </Button>
          </div>
        </div>
      </div>
      </div>
    </PageTransition>
  );
};
