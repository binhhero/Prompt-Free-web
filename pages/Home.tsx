import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Zap, Image as ImageIcon, MessageSquare, Code, Sparkles, Crown, Play, Clock, Users, ShieldCheck, Download, Star, Bot, Cpu, Copy } from 'lucide-react';
import PromptCard from '../components/PromptCard';
import { useAuth } from '../context/AuthContext';
import { PromptCategory } from '../types';
import { PRACTICAL_VIDEOS } from '../constants';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { allPrompts } = useAuth(); 
    
    // Ensure we have prompts to display
    const displayPrompts = allPrompts || [];
    const gridPrompts = displayPrompts.slice(0, 8); // Display 8 items (2 rows of 4)

    const categories = [
        { name: PromptCategory.ART, icon: <ImageIcon size={20} />, color: 'from-pink-500 to-rose-500', desc: "Midjourney, Stable Diffusion" },
        { name: PromptCategory.WRITING, icon: <MessageSquare size={20} />, color: 'from-blue-500 to-cyan-500', desc: "ChatGPT, Copywriting" },
        { name: PromptCategory.CODING, icon: <Code size={20} />, color: 'from-emerald-500 to-green-500', desc: "Python, React, Debug" },
        { name: PromptCategory.MARKETING, icon: <Zap size={20} />, color: 'from-orange-500 to-amber-500', desc: "SEO, Ads, Email" },
    ];

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('search');
        if(query) {
            navigate(`/prompts?search=${query}`);
        }
    };

    return (
        <div className="space-y-24 pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 lg:pt-40 lg:pb-32">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                     <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                     <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" style={{ animationDuration: '4s' }}></div>
                     <div className="absolute top-[40%] left-[-10%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-block mb-8 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default animate-fade-in-up">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold text-sm flex items-center gap-2">
                           <Sparkles size={16} className="text-secondary fill-secondary animate-pulse" /> 
                           Nền tảng Prompt AI số 1 Việt Nam
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1] drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Khám phá sức mạnh của <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-blue-400 via-primary to-purple-500 bg-clip-text text-transparent pb-2">
                            Generative AI
                        </span>
                    </h1>
                    
                    <p className="text-lg sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Truy cập kho tàng <strong>10,000+</strong> prompt chất lượng cao. 
                        Tối ưu hóa công việc của bạn với ChatGPT, Midjourney và Gemini.
                    </p>

                    {/* Search Box */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group z-20">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
                            <div className="relative flex items-center bg-darker/80 backdrop-blur-xl rounded-xl p-2 border border-white/10 shadow-2xl">
                                <Search className="text-gray-400 ml-4 mr-3" size={24} />
                                <input 
                                    name="search"
                                    type="text" 
                                    placeholder="Tìm kiếm ý tưởng (ví dụ: 'logo vector', 'code python', 'blog seo')..." 
                                    className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none px-2 py-3 text-lg"
                                />
                                <button type="submit" className="hidden sm:block bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-lg shadow-primary/30">
                                    Tìm kiếm
                                </button>
                                <button type="submit" className="sm:hidden bg-primary p-3 rounded-lg ml-2">
                                    <ArrowRight className="text-white" />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-12 sm:gap-24 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {[
                            { label: 'Prompts', value: '10K+' },
                            { label: 'Thành viên', value: '50K+' },
                            { label: 'Lượt tạo', value: '1M+' },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Categories Grid (Glass Cards) */}
             <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                         <div 
                            key={cat.name}
                            onClick={() => navigate(`/prompts?category=${cat.name}`)}
                            className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/5 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl group"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                <div className="text-white">{cat.icon}</div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                            <p className="text-sm text-gray-400">{cat.desc}</p>
                            <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                Khám phá ngay <ArrowRight size={14} className="ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
             </section>

            {/* Featured Prompts Section */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <div className="flex items-center space-x-2 text-gold mb-3">
                             <Crown size={20} className="fill-gold" />
                             <span className="font-bold text-sm tracking-wider uppercase">Trending Now</span>
                        </div>
                        <h2 className="text-4xl font-bold text-white">Prompt Nổi Bật</h2>
                        <p className="text-gray-400 mt-3 text-lg max-w-2xl">
                            Tuyển tập những câu lệnh được cộng đồng và chuyên gia bình chọn cao nhất.
                        </p>
                    </div>
                    <Link to="/prompts" className="group flex items-center space-x-2 text-white bg-white/5 hover:bg-primary hover:border-primary border border-white/10 px-6 py-3 rounded-full transition-all">
                        <span className="font-medium">Xem tất cả thư viện</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {gridPrompts.map((prompt) => (
                        <div key={prompt.id} className="h-full transform hover:scale-[1.02] transition-transform duration-300">
                            <PromptCard prompt={prompt} />
                        </div>
                    ))}
                </div>
            </section>

             {/* How It Works (New Modern Section) */}
            <section className="py-20 bg-black/20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Đơn giản hóa quy trình sáng tạo</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Chỉ với 3 bước đơn giản để tạo ra nội dung chất lượng cao.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                         {/* Connecting Line */}
                         <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 z-0"></div>

                        {[
                            { icon: <Search size={32} />, title: "Tìm kiếm", desc: "Tìm ý tưởng từ thư viện hàng nghìn prompt có sẵn." },
                            { icon: <Copy size={32} />, title: "Sao chép & Tùy chỉnh", desc: "Copy prompt và chỉnh sửa tham số theo ý muốn." },
                            { icon: <Sparkles size={32} />, title: "Tạo nội dung", desc: "Dán vào AI (Midjourney, ChatGPT) và nhận kết quả." }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 bg-card border border-white/10 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
                                <div className="w-20 h-20 mx-auto bg-darker rounded-full flex items-center justify-center border-4 border-card mb-6 shadow-xl">
                                    <div className="text-primary">{step.icon}</div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400">{step.desc}</p>
                                <div className="absolute top-4 right-4 text-6xl font-black text-white/5 pointer-events-none">{i+1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Membership Benefits Section */}
             <section className="relative py-24 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
                 
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm mb-3 block">Premium Access</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Mở khóa quyền năng <span className="text-gold">PRO</span></h2>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                            Nâng cấp lên tài khoản Pro để truy cập các tính năng độc quyền và hỗ trợ cộng đồng.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Benefit 1 */}
                        <div className="bg-gradient-to-br from-card to-darker p-8 rounded-3xl border border-white/10 hover:border-gold/30 transition-all hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] group">
                            <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Crown size={28} className="text-gold" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Kho Prompt Độc Quyền</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Truy cập không giới hạn vào hơn 5,000+ prompt Premium chất lượng 8K, được kiểm duyệt kỹ lưỡng cho Midjourney và Dall-E 3.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-gradient-to-br from-card to-darker p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] group">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <ShieldCheck size={28} className="text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Bảo Vệ & Riêng Tư</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Lưu trữ và quản lý bộ sưu tập prompt riêng tư không giới hạn. Đánh dấu bản quyền cho các sáng tạo của bạn.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-gradient-to-br from-card to-darker p-8 rounded-3xl border border-white/10 hover:border-secondary/30 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] group">
                            <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Bot size={28} className="text-secondary" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">AI Tools Nâng Cao</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Sử dụng công cụ "Enhance Prompt" không giới hạn để biến ý tưởng sơ sài thành prompt chuyên nghiệp trong 1 cú click.
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-16 text-center">
                        <Link to="/pricing" className="inline-flex items-center space-x-3 bg-gradient-to-r from-gold to-yellow-600 text-darker font-bold py-4 px-10 rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-1 transition-all text-lg">
                            <Star size={20} className="fill-current" />
                            <span>Trở thành Hội viên Pro ngay</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Practical Knowledge (Videos) Section */}
             <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Kiến Thức Thực Chiến</h2>
                        <p className="text-gray-400">Video hướng dẫn chuyên sâu từ các chuyên gia AI.</p>
                    </div>
                    <Link to="/blog" className="text-primary hover:text-white px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">Xem tất cả</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRACTICAL_VIDEOS.map((video) => (
                        <div key={video.id} className="group cursor-pointer">
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-white/5 group-hover:border-primary/50 transition-colors shadow-lg">
                                <img 
                                    src={video.thumbnailUrl} 
                                    alt={video.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                                    <div className="w-14 h-14 rounded-full bg-white/20 border border-white/50 flex items-center justify-center shadow-lg backdrop-blur-md transform scale-50 group-hover:scale-100 transition-transform">
                                        <Play size={24} className="text-white fill-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                                    {video.duration}
                                </div>
                            </div>
                            <h3 className="text-white font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 text-lg">
                                {video.title}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="flex items-center bg-white/5 px-2 py-1 rounded-md"><Users size={12} className="mr-1"/> {video.author}</span>
                                <span>{video.views}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-primary px-6 py-16 md:px-16 flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-primary/20">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
                    <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 max-w-2xl text-center md:text-left mb-8 md:mb-0">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Bạn đã sẵn sàng <br/>làm chủ AI?</h2>
                        <p className="text-white/80 text-lg md:text-xl font-medium">
                            Tham gia cùng 50,000+ người sáng tạo nội dung đang sử dụng Promptfree để tiết kiệm thời gian và nâng cao chất lượng công việc.
                        </p>
                    </div>
                    
                    <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                         <Link 
                            to="/register" 
                            className="px-10 py-4 bg-white text-primary font-bold rounded-2xl shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1 hover:shadow-white/20 text-center"
                        >
                            Đăng ký miễn phí
                        </Link>
                         <Link 
                            to="/tools" 
                            className="px-10 py-4 bg-primary-dark/30 border border-white/20 backdrop-blur-sm text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-center"
                        >
                            Khám phá Tools
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;