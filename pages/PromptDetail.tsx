import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Copy, Check, PlayCircle, Share2, Heart, ArrowLeft, Tag, Lock, Crown } from 'lucide-react';

const PromptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { allPrompts, user, toggleFavorite } = useAuth();
  const prompt = allPrompts.find(p => p.id === id);
  const [copied, setCopied] = useState(false);

  if (!prompt) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy Prompt</h2>
        <button onClick={() => navigate('/prompts')} className="text-primary hover:underline">
          Quay lại thư viện
        </button>
      </div>
    );
  }

  const isLocked = prompt.isPro && (!user || user.plan === 'free');
  const isFavorite = user?.favorites.includes(prompt.id);

  const handleCopy = () => {
    if (isLocked) return;
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTryIt = () => {
    if (isLocked) {
        navigate('/pricing');
        return;
    }
    navigate('/generator', { state: { initialPrompt: prompt.content, type: prompt.imageUrl ? 'image' : 'text' } });
  };

  const handleFavorite = () => {
      if(!user) {
          navigate('/login');
          return;
      }
      toggleFavorite(prompt.id);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Quay lại
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image or Preview */}
        <div>
           {prompt.imageUrl ? (
             <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
                <img 
                    src={prompt.imageUrl} 
                    alt={prompt.title} 
                    className={`w-full h-auto object-cover ${isLocked ? 'blur-md' : ''}`}
                />
                {isLocked ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                         <Lock size={48} className="text-gold mb-4" />
                         <p className="text-white font-bold text-lg mb-4">Nội dung dành cho Pro</p>
                         <button 
                           onClick={() => navigate('/pricing')}
                           className="bg-gold text-darker font-bold py-2 px-6 rounded-full hover:bg-yellow-500 transition-colors"
                         >
                             Nâng cấp ngay
                         </button>
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                            onClick={handleTryIt}
                            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all flex items-center space-x-2"
                        >
                            <PlayCircle size={24} />
                            <span>Thử Prompt Này</span>
                        </button>
                    </div>
                )}
             </div>
           ) : (
             <div className="h-64 lg:h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-white/10 flex items-center justify-center p-8 relative">
                <div className="text-center">
                    <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Tag size={40} className="text-white/50" />
                    </div>
                    <span className="text-gray-400 text-lg font-medium">Text Prompt</span>
                </div>
                 {isLocked && (
                    <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                         <Lock size={40} className="text-gold mb-2" />
                         <span className="text-white font-medium">Chỉ dành cho Pro</span>
                    </div>
                 )}
             </div>
           )}
        </div>

        {/* Right Column: Details */}
        <div className="space-y-6">
            <div>
                <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                        {prompt.category}
                    </span>
                    {prompt.isPro && (
                        <span className="px-3 py-1 rounded-full bg-gold/20 text-yellow-400 text-xs font-bold uppercase tracking-wider border border-gold/20 flex items-center">
                           <Crown size={12} className="mr-1" /> Pro
                        </span>
                    )}
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-400 text-sm">Đăng bởi <span className="text-white font-medium">{prompt.author}</span></span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{prompt.title}</h1>
                <p className="text-gray-300 text-lg leading-relaxed">{prompt.description}</p>
            </div>

            {/* Prompt Content Box */}
            <div className="bg-card rounded-xl border border-white/10 overflow-hidden relative">
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <span className="text-sm font-medium text-gray-300">Nội dung Prompt</span>
                    {!isLocked && (
                        <button 
                            onClick={handleCopy}
                            className="flex items-center space-x-1 text-xs text-primary hover:text-white transition-colors"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                        </button>
                    )}
                </div>
                <div className="p-4 bg-black/20">
                    <code className={`text-gray-300 font-mono text-sm leading-6 block whitespace-pre-wrap ${isLocked ? 'blur-sm select-none' : ''}`}>
                        {isLocked ? "This prompt is hidden. You need a Pro subscription to view this high-quality prompt content." : prompt.content}
                    </code>
                    {isLocked && (
                        <div className="absolute inset-0 top-10 flex items-center justify-center">
                            <button 
                                onClick={() => navigate('/pricing')}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
                            >
                                <Lock size={16} className="text-gold" />
                                <span>Mở khóa nội dung</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {prompt.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-gray-400 transition-colors cursor-default">
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                <button 
                    onClick={handleTryIt}
                    disabled={isLocked}
                    className={`flex-1 font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 ${
                        isLocked 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-primary/25'
                    }`}
                >
                    {isLocked ? <Lock size={20} /> : <PlayCircle size={20} />}
                    <span>{isLocked ? 'Yêu cầu gói Pro' : 'Sử Dụng Prompt Này'}</span>
                </button>
                <button 
                    onClick={handleFavorite}
                    className={`px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors flex items-center space-x-2 ${isFavorite ? 'text-secondary' : ''}`}
                >
                    <Heart size={20} className={isFavorite ? "text-secondary fill-secondary" : "text-gray-400"} />
                    <span>{prompt.likes}</span>
                </button>
                 <button className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors">
                    <Share2 size={20} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;