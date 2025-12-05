import React, { useState } from 'react';
import { PromptItem } from '../types';
import { Copy, Heart, Check, PlayCircle, Eye, Lock, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PromptCardProps {
  prompt: PromptItem;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { user, toggleFavorite } = useAuth();

  const isLocked = prompt.isPro && (!user || user.plan === 'free');
  const isFavorite = user?.favorites.includes(prompt.id);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) {
        navigate('/pricing');
        return;
    }
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTryIt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) {
        navigate('/pricing');
        return;
    }
    navigate('/generator', { state: { initialPrompt: prompt.content, type: prompt.imageUrl ? 'image' : 'text' } });
  };

  const goToDetail = () => {
    navigate(`/prompts/${prompt.id}`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!user) {
          navigate('/login');
          return;
      }
      toggleFavorite(prompt.id);
  }

  return (
    <div 
        onClick={goToDetail}
        className="bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 group flex flex-col h-full hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] cursor-pointer relative"
    >
      {/* Pro Badge */}
      {prompt.isPro && (
          <div className="absolute top-0 right-0 z-20 bg-gradient-to-bl from-gold to-yellow-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-lg flex items-center">
              <Crown size={12} className="mr-1" /> PRO
          </div>
      )}

      {/* Image Preview (if available) */}
      {prompt.imageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={prompt.imageUrl} 
            alt={prompt.title} 
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isLocked ? 'blur-[2px]' : ''}`}
            loading="lazy"
          />
          {isLocked ? (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/20">
                      <Lock size={24} className="text-gold" />
                  </div>
              </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 gap-2">
                 <button 
                    onClick={handleTryIt}
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-lg text-sm"
                 >
                    <PlayCircle size={16} />
                    <span>Thử ngay</span>
                 </button>
            </div>
          )}
          <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-xs text-white border border-white/10">
            {prompt.tags[0]}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative">
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{prompt.category}</span>
            {!prompt.imageUrl && (
                 <div className="bg-white/5 px-2 py-1 rounded text-xs text-gray-400 border border-white/5">
                    {prompt.tags[0]}
                 </div>
            )}
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors flex items-center">
            {prompt.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{prompt.description}</p>
        
        <div className="bg-black/30 p-3 rounded-lg border border-white/5 mb-4 relative group/code overflow-hidden">
          <p className={`text-xs text-gray-300 font-mono line-clamp-3 ${isLocked ? 'blur-sm select-none' : ''}`}>
             {isLocked ? "This content is locked. Upgrade to Pro to view detailed prompt content." : prompt.content}
          </p>
          {isLocked && (
             <div className="absolute inset-0 flex items-center justify-center">
                 <Lock size={16} className="text-gold" />
             </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
           <button 
             onClick={handleFavorite}
             className={`flex items-center space-x-2 text-xs transition-colors ${isFavorite ? 'text-secondary' : 'text-gray-500 hover:text-secondary'}`}
            >
              <Heart size={14} className={isFavorite ? 'fill-secondary' : ''} />
              <span>{prompt.likes}</span>
           </button>
           
           <div className="flex space-x-2">
             <button 
               onClick={handleCopy}
               className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
               title="Sao chép prompt"
             >
               {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
             </button>
             {!prompt.imageUrl && !isLocked && (
                <button
                    onClick={handleTryIt}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-primary/20 text-xs font-medium text-primary hover:text-white border border-primary/20 hover:border-primary/50 transition-all flex items-center space-x-1"
                >
                    <PlayCircle size={14} />
                    <span>Chạy thử</span>
                </button>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;