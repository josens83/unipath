import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  BookOpen,
  Plus,
} from 'lucide-react';

interface ScheduleEvent {
  id: string;
  title: string;
  subject: string;
  tutorName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'scheduled' | 'completed' | 'cancelled';
}

export const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');

  const mockEvents: ScheduleEvent[] = [
    {
      id: '1',
      title: '수학 수업',
      subject: '미적분',
      tutorName: '김수학',
      date: '2024-12-15',
      startTime: '18:00',
      endTime: '19:00',
      type: 'scheduled',
    },
    {
      id: '2',
      title: '영어 수업',
      subject: '영문법',
      tutorName: '이영어',
      date: '2024-12-16',
      startTime: '17:00',
      endTime: '18:00',
      type: 'scheduled',
    },
    {
      id: '3',
      title: '국어 수업',
      subject: '고전문학',
      tutorName: '박국어',
      date: '2024-12-14',
      startTime: '16:00',
      endTime: '17:00',
      type: 'completed',
    },
  ];

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const timeSlots = Array.from({ length: 14 }, (_, i) => i + 9); // 9:00 ~ 22:00

  const getWeekDates = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getEventForDateTime = (date: Date, hour: number) => {
    return mockEvents.find((event) => {
      const eventDate = new Date(event.date);
      const eventHour = parseInt(event.startTime.split(':')[0]);
      return (
        eventDate.toDateString() === date.toDateString() &&
        eventHour === hour
      );
    });
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'scheduled':
        return 'bg-primary-100 border-primary-500 text-primary-700';
      case 'completed':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'cancelled':
        return 'bg-red-100 border-red-500 text-red-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">수업 일정</h1>
            <p className="text-gray-600">예정된 수업을 확인하고 관리하세요</p>
          </div>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={20} />
            새 수업 예약
          </Button>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateWeek('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                <CalendarIcon className="text-primary-500" size={20} />
                <span className="text-lg font-bold">
                  {currentDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
              <button
                onClick={() => navigateWeek('next')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight size={20} />
              </button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                오늘
              </Button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'week'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                주간
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'month'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                월간
              </button>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card padding="none" className="overflow-hidden">
              {/* Week Header */}
              <div className="grid grid-cols-8 border-b">
                <div className="p-4 border-r bg-gray-50">
                  <Clock size={20} className="text-gray-400" />
                </div>
                {weekDates.map((date, index) => {
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={index}
                      className={`p-4 text-center border-r ${
                        isToday ? 'bg-primary-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="text-xs text-gray-600">{daysOfWeek[date.getDay()]}</div>
                      <div
                        className={`text-lg font-bold mt-1 ${
                          isToday ? 'text-primary-500' : ''
                        }`}
                      >
                        {date.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="overflow-y-auto max-h-[600px]">
                {timeSlots.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 border-b min-h-[80px]">
                    <div className="p-2 border-r bg-gray-50 text-center">
                      <span className="text-sm font-medium text-gray-600">
                        {hour}:00
                      </span>
                    </div>
                    {weekDates.map((date, dayIndex) => {
                      const event = getEventForDateTime(date, hour);
                      return (
                        <div
                          key={dayIndex}
                          className="border-r p-1 hover:bg-gray-50 cursor-pointer"
                        >
                          {event && (
                            <div
                              className={`h-full p-2 rounded-lg border-l-4 ${getEventColor(
                                event.type
                              )}`}
                            >
                              <div className="font-bold text-sm mb-1">{event.title}</div>
                              <div className="text-xs">{event.subject}</div>
                              <div className="text-xs mt-1 flex items-center gap-1">
                                <User size={12} />
                                {event.tutorName}
                              </div>
                              <div className="text-xs mt-1">
                                {event.startTime} - {event.endTime}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Classes */}
            <Card>
              <h3 className="font-bold mb-4">다가오는 수업</h3>
              <div className="space-y-3">
                {mockEvents
                  .filter((e) => e.type === 'scheduled')
                  .slice(0, 3)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="text-primary-500" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {new Date(event.date).toLocaleDateString('ko-KR', {
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            {event.startTime}
                          </p>
                          <p className="text-xs text-gray-500">{event.tutorName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Stats */}
            <Card>
              <h3 className="font-bold mb-4">이번 주 통계</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">예정된 수업</span>
                  <span className="font-bold text-primary-500">
                    {mockEvents.filter((e) => e.type === 'scheduled').length}회
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">완료한 수업</span>
                  <span className="font-bold text-secondary-500">
                    {mockEvents.filter((e) => e.type === 'completed').length}회
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">총 학습 시간</span>
                  <span className="font-bold">
                    {mockEvents.filter((e) => e.type === 'completed').length * 60}분
                  </span>
                </div>
              </div>
            </Card>

            {/* Legend */}
            <Card>
              <h3 className="font-bold mb-4">범례</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary-500 rounded" />
                  <span className="text-sm">예정된 수업</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-sm">완료된 수업</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span className="text-sm">취소된 수업</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
