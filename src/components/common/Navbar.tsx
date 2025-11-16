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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg" />
              <span className="text-xl font-bold text-gray-900">UniPath</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <link.icon size={18} />
                <span>{link.label}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
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
                  className="flex items-center space-x-1"
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
                  <Button variant="primary" size="sm">회원가입</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white relative z-50 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <link.icon size={18} />
                <span>{link.label}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/mypage"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <User size={18} />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={18} />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <div className="space-y-2 px-3 pt-2">
                <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" fullWidth>로그인</Button>
                </Link>
                <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth>회원가입</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
