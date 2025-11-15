import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  Search,
  PlusCircle,
  Users,
} from 'lucide-react';
import { mockPosts, mockStudyGroups } from '../services/mockData';

export const Community = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'groups'>('posts');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'notice', name: '공지사항' },
    { id: 'free', name: '자유게시판' },
    { id: 'success', name: '합격수기' },
    { id: 'qna', name: 'Q&A' },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? mockPosts
    : mockPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">커뮤니티</h1>
          <p className="text-gray-600">수험생들과 정보를 공유하고 함께 성장하세요</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'posts'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="inline mr-2" size={20} />
            게시판
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'groups'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="inline mr-2" size={20} />
            스터디 그룹
          </button>
        </div>

        {activeTab === 'posts' ? (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <h3 className="font-bold mb-4">카테고리</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <Button variant="primary" fullWidth className="mt-6">
                  <PlusCircle size={18} className="mr-2" />
                  글쓰기
                </Button>
              </Card>

              <Card className="mt-6">
                <h3 className="font-bold mb-4">인기 태그</h3>
                <div className="flex flex-wrap gap-2">
                  {['입시일정', '합격수기', '서울대', '공부법', '모의고사'].map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            {/* Posts */}
            <div className="lg:col-span-3">
              <Card padding="sm" className="mb-6">
                <div className="flex items-center gap-2 px-4">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="게시글 검색..."
                    className="flex-1 py-3 outline-none"
                  />
                </div>
              </Card>

              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <Card key={post.id} hover className="cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            post.category === 'notice'
                              ? 'bg-red-100 text-red-700'
                              : post.category === 'success'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {post.category === 'notice' ? '공지' :
                             post.category === 'success' ? '합격수기' :
                             post.category === 'qna' ? 'Q&A' : '자유'}
                          </span>
                          {post.tags.map(tag => (
                            <span key={tag} className="text-xs text-gray-500">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-lg font-bold mb-2 hover:text-primary-500">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{post.authorName}</span>
                          <span>•</span>
                          <span>
                            {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={14} />
                            {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp size={14} />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare size={14} />
                            {post.comments.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStudyGroups.map(group => (
              <Card key={group.id} hover>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg">{group.name}</h3>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                    {group.subject}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{group.description}</p>

                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {group.currentMembers.length}/{group.maxMembers}명
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(group.createdAt).toLocaleDateString('ko-KR')}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-gray-600 mb-2">스터디 일정</div>
                  {group.schedule.map((slot, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      {slot.day} {slot.startTime}-{slot.endTime}
                    </div>
                  ))}
                </div>

                <Button
                  variant={group.currentMembers.length >= group.maxMembers ? 'outline' : 'primary'}
                  fullWidth
                  disabled={group.currentMembers.length >= group.maxMembers}
                >
                  {group.currentMembers.length >= group.maxMembers ? '정원 마감' : '참여하기'}
                </Button>
              </Card>
            ))}

            <Card className="border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
              <div className="text-center py-8">
                <PlusCircle className="text-gray-400 mx-auto mb-2" size={48} />
                <p className="text-gray-600 font-medium">새 스터디 그룹 만들기</p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
