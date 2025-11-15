import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Star, Clock, Award, Calendar } from 'lucide-react';
import { mockTutors } from '../services/mockData';

export const TutoringSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const subjects = ['all', '수학', '영어', '국어', '과학', '사회'];

  const filteredTutors = mockTutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || tutor.specialties.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">튜터 찾기</h1>
          <p className="text-gray-600">나에게 딱 맞는 튜터를 찾아보세요</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="튜터 이름 또는 과목으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />

            <div className="flex gap-2 flex-wrap">
              {subjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedSubject === subject
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subject === 'all' ? '전체' : subject}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-4 text-sm text-gray-600">
          {filteredTutors.length}명의 튜터를 찾았습니다
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map(tutor => (
            <Card key={tutor.id} hover>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{tutor.name}</h3>
                  <p className="text-sm text-gray-600">{tutor.education}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={16} />
                    <span className="font-medium">{tutor.rating}</span>
                    <span className="text-xs text-gray-500">
                      ({tutor.totalClasses}회 수업)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {tutor.specialties.map(specialty => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {tutor.bio}
              </p>

              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="text-gray-500" size={16} />
                  <span className="text-sm">시간당</span>
                </div>
                <span className="font-bold text-primary-500">
                  ₩{tutor.hourlyRate.toLocaleString()}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                  <Calendar size={14} />
                  수업 가능 시간
                </div>
                <div className="space-y-1">
                  {tutor.availability.slice(0, 2).map((slot, index) => (
                    <div key={index} className="text-xs text-gray-600">
                      • {slot.day} {slot.startTime}-{slot.endTime}
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="primary" fullWidth>
                수업 예약하기
              </Button>
            </Card>
          ))}
        </div>

        {filteredTutors.length === 0 && (
          <Card className="text-center py-12">
            <Award className="text-gray-300 mx-auto mb-4" size={48} />
            <p className="text-gray-600">검색 결과가 없습니다</p>
          </Card>
        )}
      </div>
    </div>
  );
};
