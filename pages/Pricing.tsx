import React from 'react';
import { Check, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Pricing: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    if(!user) {
        navigate('/login');
        return;
    }
    // Navigate to payment page instead of direct upgrade
    navigate('/payment');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Nâng cấp trải nghiệm Promptfree</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Mở khóa toàn bộ thư viện prompt chất lượng cao và các tính năng độc quyền.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="bg-card border border-white/10 rounded-2xl p-8 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">Cơ bản</h3>
            <div className="text-4xl font-bold text-white mb-6">0₫<span className="text-lg text-gray-500 font-normal">/tháng</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
                {['Truy cập prompt cơ bản', 'Tạo 5 ảnh mỗi ngày', 'Lưu prompt yêu thích', 'Sử dụng công cụ cơ bản'].map((feat, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                        <Check size={18} className="text-green-500 mr-2" /> {feat}
                    </li>
                ))}
            </ul>
            <button className="w-full py-3 rounded-xl border border-white/20 text-white font-medium cursor-default">
                Đang sử dụng
            </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-1 relative flex flex-col transform hover:-translate-y-2 transition-transform">
            <div className="absolute top-0 right-0 bg-gold text-darker text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
            <div className="bg-darker rounded-xl p-8 h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                    <Crown className="text-gold" />
                    <h3 className="text-xl font-bold text-white">Pro Member</h3>
                </div>
                <div className="text-4xl font-bold text-white mb-6">99k<span className="text-lg text-gray-500 font-normal">/tháng</span></div>
                <ul className="space-y-4 mb-8 flex-grow">
                    {[
                        'Truy cập TOÀN BỘ thư viện Prompt', 
                        'Mở khóa các Prompt Pro (8K, chi tiết cao)', 
                        'Tạo ảnh không giới hạn', 
                        'Huy hiệu thành viên Pro',
                        'Hỗ trợ ưu tiên'
                    ].map((feat, i) => (
                        <li key={i} className="flex items-center text-gray-300">
                            <Check size={18} className="text-gold mr-2" /> {feat}
                        </li>
                    ))}
                </ul>
                <button 
                    onClick={handleUpgrade}
                    disabled={user?.plan === 'pro'}
                    className={`w-full py-3 rounded-xl font-bold transition-opacity ${
                        user?.plan === 'pro' 
                        ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-gold to-yellow-600 text-darker hover:opacity-90'
                    }`}
                >
                    {user?.plan === 'pro' ? 'Đã kích hoạt' : 'Nâng cấp ngay'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;