import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PromptCard from '../components/PromptCard';
import { useAuth } from '../context/AuthContext';
import { PromptCategory } from '../types';
import { Search, Filter } from 'lucide-react';

const Prompts: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const { allPrompts } = useAuth(); // Use prompts from context

  const [filterCategory, setFilterCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);

  const categories = ['All', ...Object.values(PromptCategory)];

  const filteredPrompts = useMemo(() => {
    return allPrompts.filter(prompt => {
      const matchesCategory = filterCategory === 'All' || prompt.category === filterCategory;
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            prompt.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchTerm, allPrompts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Thư viện Prompt</h1>
          <p className="text-gray-400">Khám phá hàng nghìn câu lệnh được tối ưu hóa cho mọi công việc.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full bg-card border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/5">
         <div className="flex items-center text-gray-400 mr-2">
            <Filter size={18} className="mr-2" />
            <span className="text-sm">Lọc theo:</span>
         </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filterCategory === cat
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-card border border-white/5 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card/30 rounded-2xl border border-dashed border-white/10">
            <Search className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Không tìm thấy kết quả</h3>
            <p className="text-gray-400">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục.</p>
        </div>
      )}
    </div>
  );
};

export default Prompts;