import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { ExternalLink, Zap, Search, Sparkles, Filter } from 'lucide-react';

const Tools: React.FC = () => {
  const { tools } = useAuth(); // Get tools from context
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Fix: Ensure tools is an array before mapping with fallback
  const safeTools = Array.isArray(tools) ? tools : [];

  // Extract unique categories
  const categories = useMemo(() => {
    if (safeTools.length === 0) return ['All'];
    const cats = new Set(safeTools.map(t => t.category));
    return ['All', ...Array.from(cats)];
  }, [safeTools]);

  // Filter tools
  const filteredTools = useMemo(() => {
    return safeTools.filter(tool => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [safeTools, activeCategory, searchTerm]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="text-center mb-16 relative">
         {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
            <Sparkles className="text-gold animate-pulse" size={40} />
            <span className="bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent">
              Kho Công Cụ AI
            </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Khám phá bộ sưu tập {safeTools.length}+ công cụ trí tuệ nhân tạo hàng đầu. 
          <br/>Tăng tốc quy trình làm việc của bạn ngay hôm nay.
        </p>
      </div>

      {/* Redesigned Search and Filter Section */}
      <div className="max-w-5xl mx-auto mb-16 space-y-10">
         {/* Search Bar */}
         <div className="relative max-w-2xl mx-auto w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative flex items-center bg-card/80 backdrop-blur-xl rounded-xl px-6 py-5 border border-white/10 shadow-2xl">
                 <Search className="text-gray-400 mr-4" size={22} />
                 <input 
                    type="text" 
                    placeholder="Tìm kiếm công cụ (ví dụ: ChatGPT, Midjourney, Video)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                 />
            </div>
         </div>

         {/* Modern Multiline Filter */}
         <div className="flex flex-col items-center">
             <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-medium uppercase tracking-widest">
                <Filter size={14} /> <span>Lọc theo danh mục</span>
             </div>
             
             <div className="flex flex-wrap justify-center gap-3 px-4 max-w-4xl">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                            relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                            border
                            ${activeCategory === cat 
                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105' 
                                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white'
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
             </div>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-card/50 backdrop-blur-sm rounded-2xl border border-white/5 p-5 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
             {/* Glow effect on hover */}
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
             
            <div className="flex items-start justify-between mb-4 relative z-10">
               <div className="relative flex-shrink-0">
                 <img src={tool.imageUrl} alt={tool.name} className="w-14 h-14 rounded-2xl object-cover bg-dark border border-white/10 shadow-lg group-hover:scale-105 transition-transform" />
                 <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-1 border border-white/10">
                     <div className={`w-3 h-3 rounded-full shadow-[0_0_8px] ${
                         tool.priceModel === 'Free' ? 'bg-emerald-500 shadow-emerald-500' : 
                         tool.priceModel === 'Freemium' ? 'bg-amber-500 shadow-amber-500' : 'bg-rose-500 shadow-rose-500'
                     }`}></div>
                 </div>
               </div>
               <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border backdrop-blur-md ${
                   tool.priceModel === 'Free' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                   tool.priceModel === 'Freemium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
               }`}>
                   {tool.priceModel}
               </span>
            </div>
            
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors truncate">{tool.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10 leading-relaxed group-hover:text-gray-300">{tool.description}</p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto relative z-10">
                <span className="text-xs text-gray-500 flex items-center bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                    <Zap size={12} className="mr-1.5 text-gold" /> {tool.category}
                </span>
                <a 
                    href={tool.url} 
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-colors bg-white/5 hover:bg-primary px-3 py-1.5 rounded-lg border border-white/5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
                >
                    <span>Truy cập</span>
                    <ExternalLink size={14} />
                </a>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTools.length === 0 && (
          <div className="text-center py-20 bg-card/20 rounded-3xl border border-dashed border-white/10 max-w-2xl mx-auto mt-8 backdrop-blur-sm">
              <Search className="mx-auto h-16 w-16 text-gray-600 mb-6 opacity-50" />
              <h3 className="text-2xl font-bold text-white mb-3">Không tìm thấy công cụ</h3>
              <p className="text-gray-400">Rất tiếc, chúng tôi không tìm thấy công cụ phù hợp với từ khóa của bạn.</p>
          </div>
      )}
    </div>
  );
};

export default Tools;