import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  BookOpen,
  Users,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = isAuthenticated
    ? [
        { to: '/dashboard', label: '대시보드', icon: Home },
        { to: '/tutoring', label: '수업', icon: BookOpen },
        { to: '/consulting', label: 'AI 컨설팅', icon: Users },
        { to: '/community', label: '커뮤니티', icon: MessageSquare },
      ]
    : [
        { to: '/pricing', label: '요금제', icon: BookOpen },
      ];

  return (
    <nav className="bg-bg-surface/80 backdrop-blur-xl border-b border-border shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* ✨ Enhanced Logo with Microinteractions */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300 group-hover:scale-110" />
              <span className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
                UniPath
              </span>
            </Link>
          </div>

          {/* ✨ Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-text-secondary hover:text-primary hover:bg-primary-subtle transition-all duration-200 group hover:shadow-sm"
              >
                <link.icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            {/* ✨ Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border">
                <Link to="/mypage">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User size={18} />
                    <span>{user?.name}</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:border-red-300 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-950/50"
                >
                  <LogOut size={16} />
                  <span>로그아웃</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">로그인</Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="primary" size="sm" className="shadow-md hover:shadow-lg hover:shadow-primary-500/25">회원가입</Button>
                </Link>
              </div>
            )}
          </div>

          {/* ✨ Enhanced Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-text-secondary hover:bg-bg-subtle hover:text-primary transition-all duration-200 active:scale-95"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ✨ Enhanced Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40 animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ✨ Enhanced Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-bg-surface/95 backdrop-blur-xl relative z-50 shadow-xl animate-fade-in">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-text-secondary hover:text-primary hover:bg-primary-subtle transition-all duration-200 group"
              >
                <link.icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />
                <Link
                  to="/mypage"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-text-secondary hover:text-primary hover:bg-primary-subtle transition-all duration-200 group"
                >
                  <User size={20} className="group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-text-secondary hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-950/50 transition-all duration-200 group"
                >
                  <LogOut size={20} className="group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">로그아웃</span>
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-3">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3" />
                <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" fullWidth>로그인</Button>
                </Link>
                <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth className="shadow-md hover:shadow-lg hover:shadow-primary-500/25">회원가입</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
