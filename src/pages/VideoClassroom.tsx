import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
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

export const VideoClassroom = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, sender: '튜터', text: '안녕하세요! 수업 시작하겠습니다.', time: '18:00' },
    { id: 2, sender: '나', text: '네, 준비되었습니다!', time: '18:01' },
  ]);
  const [newMessage, setNewMessage] = useState('');

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
    <div className="min-h-screen bg-gray-900">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg" />
          <div>
            <h1 className="font-bold">수학 수업 - 미적분</h1>
            <p className="text-sm text-gray-400">튜터: 김수학</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-red-500 rounded-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">LIVE</span>
          </div>
          <span className="text-sm text-gray-400">18:23 / 60:00</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Area */}
        <div className={`flex-1 p-4 ${showChat ? '' : 'w-full'}`}>
          <div className="grid grid-cols-1 gap-4 h-full">
            {/* Main Video (Tutor) */}
            <Card className="bg-gray-800 border-gray-700 relative overflow-hidden flex-1">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-900 to-secondary-900">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users size={48} />
                  </div>
                  <p className="text-xl font-bold">김수학 튜터</p>
                  <p className="text-sm text-gray-300 mt-2">카메라 연결 중...</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 rounded-lg text-white text-sm">
                튜터
              </div>
              <button className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white">
                <Maximize size={20} />
              </button>
            </Card>

            {/* Self Video (Student) */}
            <Card className="bg-gray-800 border-gray-700 relative overflow-hidden h-48">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Users size={32} />
                  </div>
                  <p className="font-medium">나</p>
                </div>
              </div>
              {!isCameraOn && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <VideoOff className="text-white" size={32} />
                </div>
              )}
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 rounded text-white text-xs">
                내 화면
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
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-4 rounded-full transition-colors ${
                isMicOn
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
              title={isMicOn ? '마이크 끄기' : '마이크 켜기'}
            >
              {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>

            <button
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`p-4 rounded-full transition-colors ${
                isCameraOn
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
              title={isCameraOn ? '카메라 끄기' : '카메라 켜기'}
            >
              {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>

            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-4 rounded-full transition-colors ${
                isScreenSharing
                  ? 'bg-primary-500 hover:bg-primary-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              } text-white`}
              title="화면 공유"
            >
              <Monitor size={24} />
            </button>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-4 rounded-full ${
                showChat
                  ? 'bg-primary-500 hover:bg-primary-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              } text-white relative`}
              title="채팅"
            >
              <MessageSquare size={24} />
              {!showChat && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </button>

            <button
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
              title="수업 자료"
            >
              <FileText size={24} />
            </button>

            <button
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
              title="설정"
            >
              <Settings size={24} />
            </button>
          </div>

          {/* Right Controls */}
          <div>
            <Button
              variant="primary"
              className="bg-red-500 hover:bg-red-600 px-6 py-4 flex items-center gap-2"
            >
              <Phone size={20} />
              수업 종료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
