import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageTransition } from '../components/common/PageTransition';
import { staggerContainerVariants, staggerItemVariants } from '../utils/animations';
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
        return 'bg-primary-light dark:bg-primary-subtle border-primary text-primary';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 border-green-600 dark:border-green-400 text-green-700 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 border-red-600 dark:border-red-400 text-red-700 dark:text-red-400';
      default:
        return 'bg-bg-subtle border-border text-text-secondary';
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-base py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">수업 일정</h1>
              <p className="text-text-secondary">예정된 수업을 확인하고 관리하세요</p>
            </div>
            <Button variant="primary" className="flex items-center gap-2">
              <Plus size={20} />
              새 수업 예약
            </Button>
          </div>

        {/* Controls */}
        <Card className="mb-6" animate delay={0.1}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => navigateWeek('prev')}
                className="p-2 hover:bg-bg-subtle rounded-lg text-text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <div className="flex items-center gap-2">
                <CalendarIcon className="text-primary" size={20} />
                <span className="text-lg font-bold text-text-primary">
                  {currentDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
              <motion.button
                onClick={() => navigateWeek('next')}
                className="p-2 hover:bg-bg-subtle rounded-lg text-text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={20} />
              </motion.button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                오늘
              </Button>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'week'
                    ? 'bg-primary text-white'
                    : 'bg-bg-subtle text-text-secondary hover:bg-border-subtle'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                주간
              </motion.button>
              <motion.button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'month'
                    ? 'bg-primary text-white'
                    : 'bg-bg-subtle text-text-secondary hover:bg-border-subtle'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                월간
              </motion.button>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card padding="none" className="overflow-hidden" animate delay={0.2}>
              {/* Week Header */}
              <div className="grid grid-cols-8 border-b border-border">
                <div className="p-4 border-r border-border bg-bg-subtle">
                  <Clock size={20} className="text-text-quaternary" />
                </div>
                {weekDates.map((date, index) => {
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={index}
                      className={`p-4 text-center border-r border-border ${
                        isToday ? 'bg-primary-light dark:bg-primary-subtle' : 'bg-bg-subtle'
                      }`}
                    >
                      <div className="text-xs text-text-tertiary">{daysOfWeek[date.getDay()]}</div>
                      <div
                        className={`text-lg font-bold mt-1 ${
                          isToday ? 'text-primary' : 'text-text-primary'
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
                  <div key={hour} className="grid grid-cols-8 border-b border-border min-h-[80px]">
                    <div className="p-2 border-r border-border bg-bg-subtle text-center">
                      <span className="text-sm font-medium text-text-tertiary">
                        {hour}:00
                      </span>
                    </div>
                    {weekDates.map((date, dayIndex) => {
                      const event = getEventForDateTime(date, hour);
                      return (
                        <div
                          key={dayIndex}
                          className="border-r border-border p-1 hover:bg-bg-subtle cursor-pointer transition-colors"
                        >
                          {event && (
                            <motion.div
                              className={`h-full p-2 rounded-lg border-l-4 ${getEventColor(
                                event.type
                              )}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              whileHover={{ scale: 1.02 }}
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
                            </motion.div>
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
          <motion.div
            className="space-y-6"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Upcoming Classes */}
            <motion.div variants={staggerItemVariants}>
              <Card>
                <h3 className="font-bold text-text-primary mb-4">다가오는 수업</h3>
                <div className="space-y-3">
                  {mockEvents
                    .filter((e) => e.type === 'scheduled')
                    .slice(0, 3)
                    .map((event) => (
                      <motion.div
                        key={event.id}
                        className="p-3 bg-bg-subtle rounded-lg hover:bg-border-subtle cursor-pointer transition-colors border border-border"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary-light dark:bg-primary-subtle rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="text-primary" size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-text-primary">{event.title}</h4>
                            <p className="text-xs text-text-tertiary mt-1">
                              {new Date(event.date).toLocaleDateString('ko-KR', {
                                month: 'short',
                                day: 'numeric',
                              })}{' '}
                              {event.startTime}
                            </p>
                            <p className="text-xs text-text-quaternary">{event.tutorName}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div variants={staggerItemVariants}>
              <Card>
                <h3 className="font-bold text-text-primary mb-4">이번 주 통계</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">예정된 수업</span>
                    <span className="font-bold text-primary">
                      {mockEvents.filter((e) => e.type === 'scheduled').length}회
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">완료한 수업</span>
                    <span className="font-bold text-secondary">
                      {mockEvents.filter((e) => e.type === 'completed').length}회
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">총 학습 시간</span>
                    <span className="font-bold text-text-primary">
                      {mockEvents.filter((e) => e.type === 'completed').length * 60}분
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Legend */}
            <motion.div variants={staggerItemVariants}>
              <Card>
                <h3 className="font-bold text-text-primary mb-4">범례</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded" />
                    <span className="text-sm text-text-secondary">예정된 수업</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 dark:bg-green-400 rounded" />
                    <span className="text-sm text-text-secondary">완료된 수업</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 dark:bg-red-400 rounded" />
                    <span className="text-sm text-text-secondary">취소된 수업</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </div>
    </PageTransition>
  );
};
