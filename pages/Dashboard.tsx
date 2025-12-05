import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Heart, Upload, Settings, Plus, User as UserIcon, Crown } from 'lucide-react';
import PromptCard from '../components/PromptCard';
import { PromptCategory } from '../types';

const Dashboard: React.FC = () => {
  const { user, allPrompts, addPrompt } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'favorites' | 'my-prompts' | 'upload' | 'settings'>('favorites');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<PromptCategory>(PromptCategory.ART);
  const [newTags, setNewTags] = useState('');

  if (!user) {
    return <Navigate to="/login" />;
  }

  const favoritePrompts = allPrompts.filter(p => user.favorites.includes(p.id));
  const myPrompts = user.myPrompts;

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if(newTitle && newContent) {
        addPrompt({
            title: newTitle,
            description: newDesc,
            content: newContent,
            category: newCategory,
            tags: newTags.split(',').map(t => t.trim()),
            imageUrl: undefined,
            createdAt: new Date().toISOString()
        });
        setActiveTab('my-prompts');
        // Reset form
        setNewTitle('');
        setNewDesc('');
        setNewContent('');
        setNewTags('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
       <div className="flex flex-col md:flex-row gap-8">
           {/* Sidebar */}
           <div className="w-full md:w-64 flex-shrink-0 space-y-4">
                <div className="bg-card rounded-xl p-6 border border-white/5 text-center">
                    <img src={user.avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-primary" />
                    <h3 className="font-bold text-lg text-white">{user.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{user.email}</p>
                    <div className="inline-block">
                        {user.plan === 'pro' ? (
                            <span className="flex items-center space-x-1 bg-gold text-darker px-3 py-1 rounded-full text-xs font-bold">
                                <Crown size={12} /> <span>PRO MEMBER</span>
                            </span>
                        ) : (
                            <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                                Free Plan
                            </span>
                        )}
                    </div>
                </div>

                <nav className="bg-card rounded-xl overflow-hidden border border-white/5">
                    <button 
                        onClick={() => setActiveTab('favorites')}
                        className={`w-full text-left px-6 py-4 flex items-center space-x-3 transition-colors ${activeTab === 'favorites' ? 'bg-primary/20 text-white border-l-4 border-primary' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        <Heart size={18} />
                        <span>Yêu thích</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('my-prompts')}
                        className={`w-full text-left px-6 py-4 flex items-center space-x-3 transition-colors ${activeTab === 'my-prompts' ? 'bg-primary/20 text-white border-l-4 border-primary' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        <LayoutDashboard size={18} />
                        <span>Prompt của tôi</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('upload')}
                        className={`w-full text-left px-6 py-4 flex items-center space-x-3 transition-colors ${activeTab === 'upload' ? 'bg-primary/20 text-white border-l-4 border-primary' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        <Upload size={18} />
                        <span>Đăng tải Prompt</span>
                    </button>
                     <button 
                        onClick={() => setActiveTab('settings')}
                        className={`w-full text-left px-6 py-4 flex items-center space-x-3 transition-colors ${activeTab === 'settings' ? 'bg-primary/20 text-white border-l-4 border-primary' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        <Settings size={18} />
                        <span>Cài đặt & Gói</span>
                    </button>
                </nav>
           </div>

           {/* Main Content */}
           <div className="flex-grow">
               {activeTab === 'favorites' && (
                   <div>
                       <h2 className="text-2xl font-bold text-white mb-6">Prompt Yêu Thích</h2>
                       {favoritePrompts.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {favoritePrompts.map(p => <PromptCard key={p.id} prompt={p} />)}
                           </div>
                       ) : (
                           <p className="text-gray-400">Bạn chưa lưu prompt nào.</p>
                       )}
                   </div>
               )}

                {activeTab === 'my-prompts' && (
                   <div>
                       <div className="flex justify-between items-center mb-6">
                           <h2 className="text-2xl font-bold text-white">Prompt Của Tôi</h2>
                           <button onClick={() => setActiveTab('upload')} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
                               <Plus size={16} /> <span>Tạo mới</span>
                           </button>
                       </div>
                       {myPrompts.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {myPrompts.map(p => <PromptCard key={p.id} prompt={p} />)}
                           </div>
                       ) : (
                           <p className="text-gray-400">Bạn chưa đăng tải prompt nào.</p>
                       )}
                   </div>
               )}

               {activeTab === 'upload' && (
                   <div className="max-w-2xl">
                       <h2 className="text-2xl font-bold text-white mb-6">Đăng tải Prompt mới</h2>
                       <form onSubmit={handleUpload} className="bg-card border border-white/5 p-6 rounded-xl space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Tiêu đề</label>
                                <input 
                                    type="text" 
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                    placeholder="Ví dụ: Chân dung phong cách Anime"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Danh mục</label>
                                <select 
                                    value={newCategory}
                                    onChange={e => setNewCategory(e.target.value as PromptCategory)}
                                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                >
                                    {Object.values(PromptCategory).map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Mô tả ngắn</label>
                                <input 
                                    type="text" 
                                    value={newDesc}
                                    onChange={e => setNewDesc(e.target.value)}
                                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                    placeholder="Mô tả ngắn gọn về prompt của bạn"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Nội dung Prompt</label>
                                <textarea 
                                    value={newContent}
                                    onChange={e => setNewContent(e.target.value)}
                                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none h-32"
                                    placeholder="Nhập nội dung prompt chi tiết tại đây..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Tags (cách nhau bởi dấu phẩy)</label>
                                <input 
                                    type="text" 
                                    value={newTags}
                                    onChange={e => setNewTags(e.target.value)}
                                    className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                    placeholder="midjourney, anime, portrait"
                                />
                            </div>
                            <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors">
                                Đăng Prompt
                            </button>
                       </form>
                   </div>
               )}

               {activeTab === 'settings' && (
                   <div>
                       <h2 className="text-2xl font-bold text-white mb-6">Cài đặt tài khoản</h2>
                       <div className="bg-card border border-white/5 p-6 rounded-xl">
                           <div className="flex items-center justify-between mb-6">
                               <div>
                                   <h4 className="text-lg font-medium text-white">Gói thành viên</h4>
                                   <p className="text-gray-400 text-sm">Hiện tại bạn đang sử dụng gói: <span className="text-white font-bold uppercase">{user.plan}</span></p>
                               </div>
                               {user.plan === 'free' && (
                                   <button 
                                     onClick={() => navigate('/payment')}
                                     className="bg-gold hover:bg-yellow-500 text-darker font-bold px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-lg shadow-gold/20"
                                   >
                                       <Crown size={16} /> <span>Nâng cấp PRO</span>
                                   </button>
                               )}
                           </div>
                           <div className="pt-6 border-t border-white/10">
                               <p className="text-gray-500 text-sm">Tính năng thay đổi mật khẩu và email đang được phát triển.</p>
                           </div>
                       </div>
                   </div>
               )}
           </div>
       </div>
    </div>
  );
};

export default Dashboard;