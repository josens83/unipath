import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageTransition } from '../components/common/PageTransition';
import { staggerContainerVariants, staggerItemVariants } from '../utils/animations';
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  Search,
  PlusCircle,
  Users,
  Edit,
  Trash2,
  X,
} from 'lucide-react';
import { postAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { ListSkeleton } from '../components/common/Skeleton';
import type { Post } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, type PostFormData } from '../utils/validation';

export const Community = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'groups'>('posts');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'notice', name: '공지사항' },
    { id: 'free', name: '자유게시판' },
    { id: 'success', name: '합격수기' },
    { id: 'qna', name: 'Q&A' },
  ];

  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  const loadPosts = async () => {
    try {
      const category = selectedCategory === 'all' ? undefined : selectedCategory;
      const loadedPosts = await postAPI.getPosts(category);
      setPosts(loadedPosts);
    } catch (error) {
      toast.error('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    reset({
      title: '',
      content: '',
      category: 'free',
      tags: [],
    });
    setShowPostModal(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setValue('title', post.title);
    setValue('content', post.content);
    setValue('category', post.category);
    setValue('tags', post.tags);
    setShowPostModal(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await postAPI.deletePost(postId);
      toast.success('게시글이 삭제되었습니다.');
      loadPosts();
    } catch (error) {
      toast.error('게시글 삭제에 실패했습니다.');
    }
  };

  const onSubmit = async (data: PostFormData) => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    try {
      if (editingPost) {
        await postAPI.updatePost(editingPost.id, {
          title: data.title,
          content: data.content,
          category: data.category,
          tags: data.tags,
        });
        toast.success('게시글이 수정되었습니다.');
      } else {
        await postAPI.createPost({
          authorId: user.id,
          authorName: user.name,
          title: data.title,
          content: data.content,
          category: data.category,
          tags: data.tags || [],
        });
        toast.success('게시글이 작성되었습니다.');
      }

      setShowPostModal(false);
      reset();
      loadPosts();
    } catch (error) {
      toast.error(editingPost ? '게시글 수정에 실패했습니다.' : '게시글 작성에 실패했습니다.');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      notice: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800',
      free: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
      success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800',
      qna: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
    };
    return colors[category] || 'bg-bg-subtle text-text-primary border border-border';
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-base py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">커뮤니티</h1>
            <p className="text-text-secondary">수험생들과 정보를 공유하고 함께 성장하세요</p>
          </div>
          <Button
            variant="primary"
            onClick={handleCreatePost}
            className="flex items-center gap-2"
          >
            <PlusCircle size={20} />
            글쓰기
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'posts'
                ? 'bg-primary text-white'
                : 'bg-bg-surface text-text-primary border border-border hover:bg-bg-subtle'
            }`}
          >
            <MessageSquare className="inline mr-2" size={20} />
            게시판
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'groups'
                ? 'bg-primary text-white'
                : 'bg-bg-surface text-text-primary border border-border hover:bg-bg-subtle'
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
                <h3 className="font-bold text-text-primary mb-4">카테고리</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary-subtle text-primary font-medium'
                          : 'text-text-primary hover:bg-bg-subtle'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search */}
              <Card className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-text-quaternary" size={20} />
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </Card>

              {/* Posts List */}
              {loading ? (
                <ListSkeleton items={5} />
              ) : filteredPosts.length === 0 ? (
                <Card className="text-center py-12">
                  <MessageSquare className="mx-auto mb-4 text-text-quaternary" size={48} />
                  <p className="text-text-secondary">게시글이 없습니다.</p>
                  <Button
                    variant="primary"
                    onClick={handleCreatePost}
                    className="mt-4"
                  >
                    첫 게시글 작성하기
                  </Button>
                </Card>
              ) : (
                <motion.div
                  className="space-y-4"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredPosts.map(post => (
                    <motion.div key={post.id} variants={staggerItemVariants}>
                      <Card className="hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryBadgeColor(post.category)}`}>
                            {categories.find(c => c.id === post.category)?.name}
                          </span>
                          {post.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-bg-subtle text-text-secondary rounded text-xs border border-border-subtle">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        {user?.id === post.authorId && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="text-text-tertiary hover:text-primary transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-text-tertiary hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-text-primary mb-2">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between text-sm text-text-tertiary">
                        <div className="flex items-center gap-4">
                          <span>{post.authorName}</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye size={16} />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp size={16} />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare size={16} />
                            <span>{post.comments.length}</span>
                          </div>
                        </div>
                      </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <Card className="text-center py-12">
            <Users className="mx-auto mb-4 text-text-quaternary" size={48} />
            <p className="text-text-secondary">스터디 그룹 기능은 준비 중입니다.</p>
          </Card>
        )}

        {/* Post Modal */}
        {showPostModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  {editingPost ? '게시글 수정' : '새 게시글 작성'}
                </h2>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="text-text-tertiary hover:text-text-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    카테고리
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="free">자유게시판</option>
                    <option value="success">합격수기</option>
                    <option value="qna">Q&A</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    제목
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="제목을 입력하세요"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    내용
                  </label>
                  <textarea
                    {...register('content')}
                    rows={10}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="내용을 입력하세요"
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
                  )}
                </div>

                <div className="flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPostModal(false)}
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '처리 중...' : editingPost ? '수정' : '작성'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
        </div>
      </div>
    </PageTransition>
  );
};
