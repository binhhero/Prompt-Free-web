import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, Box, BookOpen, Layers, Sparkles, User, LogOut, LayoutDashboard, ArrowUp, Facebook, Twitter, Instagram, Github, Youtube } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Trang chủ', path: '/', icon: <Box size={18} /> },
    { name: 'Thư viện', path: '/prompts', icon: <Layers size={18} /> },
    { name: 'Công cụ', path: '/tools', icon: <Zap size={18} /> },
    { name: 'Sáng tạo', path: '/generator', icon: <Sparkles size={18} className="text-secondary" /> },
    { name: 'Blog', path: '/blog', icon: <BookOpen size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Handle Scroll to Top Visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-darker text-white font-sans selection:bg-primary/30 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-500">
                <span className="font-bold text-white text-xl">P</span>
              </div>
              <span className="font-bold text-xl tracking-tight">
                Prompt<span className="text-primary group-hover:text-secondary transition-colors">free</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Auth Buttons / Profile */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all hover:border-primary/30"
                  >
                    <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full" />
                    <span className="text-sm font-medium px-2 max-w-[100px] truncate">{user.name}</span>
                    {user.plan === 'pro' && (
                        <span className="bg-gradient-to-r from-gold to-yellow-600 text-darker text-[10px] font-bold px-1.5 py-0.5 rounded mr-1">PRO</span>
                    )}
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-2xl border border-white/10 py-1 z-50 animate-fade-in overflow-hidden">
                       <div className="px-4 py-3 border-b border-white/5">
                          <p className="text-sm text-white font-medium truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                       </div>
                       <Link 
                         to="/dashboard" 
                         className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-primary/10 hover:text-primary flex items-center transition-colors"
                         onClick={() => setIsProfileOpen(false)}
                        >
                         <LayoutDashboard size={16} className="mr-2" />
                         Dashboard
                       </Link>
                       <button 
                         onClick={handleLogout}
                         className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center transition-colors"
                        >
                         <LogOut size={16} className="mr-2" />
                         Đăng xuất
                       </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="text-sm font-medium bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5">
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-b border-white/10 animate-fade-in-down shadow-2xl">
            <div className="px-3 pt-3 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 block px-4 py-3 rounded-lg text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-primary/20 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="border-t border-white/10 my-2 pt-3">
                {user ? (
                   <>
                      <div className="px-4 py-2 flex items-center space-x-3 mb-2">
                          <img src={user.avatarUrl} className="w-8 h-8 rounded-full" />
                          <div>
                              <p className="text-sm text-white font-medium">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                      </div>
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-3 block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">
                          <LayoutDashboard size={18} />
                          <span>Dashboard</span>
                      </Link>
                      <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-400 hover:bg-red-500/10">
                          <LogOut size={18} />
                          <span>Đăng xuất</span>
                      </button>
                   </>
                ) : (
                   <div className="flex flex-col space-y-3 px-3">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center w-full py-3 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5">Đăng nhập</Link>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-center w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-blue-600">Đăng ký</Link>
                   </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-darker border-t border-white/10 pt-16 pb-10 relative overflow-hidden">
        {/* Footer Ambient Glow */}
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="font-bold text-white text-sm">P</span>
                  </div>
                <h3 className="text-2xl font-bold tracking-tight">Prompt<span className="text-primary">free</span></h3>
              </div>
              <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
                Nền tảng chia sẻ Prompt, công cụ AI và tạo nội dung tự động mạnh mẽ. 
                Giúp bạn làm chủ công nghệ tương lai một cách dễ dàng.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                      <Facebook size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white transition-all duration-300 hover:scale-110">
                      <Twitter size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110">
                      <Instagram size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
                      <Github size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110">
                      <Youtube size={20} />
                  </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Khám phá</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/prompts" className="hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Prompts mới nhất</Link></li>
                <li><Link to="/tools" className="hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Công cụ AI</Link></li>
                <li><Link to="/generator" className="hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>AI Generator</Link></li>
                <li><Link to="/blog" className="hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Blog & Tin tức</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="text-white font-bold mb-6 text-lg">Hỗ trợ</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Liên hệ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Câu hỏi thường gặp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Promptfree. All rights reserved. Designed for AI Enthusiasts.
          </div>
        </div>
      </footer>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-primary hover:bg-blue-600 text-white p-3 rounded-full shadow-lg shadow-primary/30 transition-all duration-500 transform z-50 group ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
      </button>
    </div>
  );
};

export default Layout;