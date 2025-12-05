import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!email || !password) {
        setError("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    // Mock login success
    login(email, password);
    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
      loginWithGoogle();
      navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-card border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
           <h2 className="text-3xl font-bold text-white">Đăng nhập</h2>
           <p className="text-gray-400 mt-2">Chào mừng trở lại với Promptfree</p>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-lg flex items-center space-x-2 mb-6">
                <AlertCircle size={16} />
                <span>{error}</span>
            </div>
        )}

        <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-3 mb-6"
        >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>Đăng nhập với Google</span>
        </button>

        <div className="flex items-center justify-between mb-6">
            <span className="w-full border-b border-white/10"></span>
            <span className="px-3 text-xs text-gray-500 uppercase">Hoặc</span>
            <span className="w-full border-b border-white/10"></span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-dark/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="name@example.com"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mật khẩu</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-dark/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="••••••••"
                        required
                    />
                </div>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">
                Đăng nhập
            </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
            Chưa có tài khoản? <Link to="/register" className="text-primary hover:text-white">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;