
import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { Calendar, Clock, Eye, User, Tag, ChevronLeft, ChevronRight, Hash } from 'lucide-react';

const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Separate featured post (first one) and the rest
  const featuredPost = BLOG_POSTS[0];
  const remainingPosts = BLOG_POSTS.slice(1);
  
  // Calculate total pages for remaining posts
  const totalPages = Math.ceil(remainingPosts.length / itemsPerPage);
  
  const currentPosts = remainingPosts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
       <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">Kiến thức & Cộng đồng</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Cập nhật những xu hướng mới nhất về trí tuệ nhân tạo, hướng dẫn prompt engineering và tin tức công nghệ chuyên sâu.
        </p>
      </div>

      {/* Featured Post Section */}
      <div className="mb-20 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">Bài viết nổi bật</h2>
          <div className="bg-card border border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all group grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 aspect-video lg:aspect-auto overflow-hidden relative">
                  <img 
                      src={featuredPost.imageUrl} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                       {featuredPost.tags.map(tag => (
                           <span key={tag} className="bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10">{tag}</span>
                       ))}
                  </div>
              </div>
              <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                   <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-1.5">
                            <Calendar size={14} className="text-primary" />
                            <span>{featuredPost.date}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <Clock size={14} className="text-secondary" />
                            <span>{featuredPost.readTime}</span>
                        </div>
                   </div>
                   <h2 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors cursor-pointer">{featuredPost.title}</h2>
                   <p className="text-gray-400 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                   
                   <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                        <div className="flex items-center space-x-3">
                            <img src={featuredPost.authorAvatar} alt={featuredPost.author} className="w-10 h-10 rounded-full border border-white/10" />
                            <div>
                                <p className="text-white text-sm font-medium">{featuredPost.author}</p>
                                <p className="text-gray-500 text-xs">Tác giả</p>
                            </div>
                        </div>
                        <button className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-primary text-white text-sm font-medium transition-colors border border-white/5">
                            Đọc ngay
                        </button>
                   </div>
              </div>
          </div>
      </div>

      {/* Main Grid */}
      <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-secondary pl-4 flex items-center justify-between">
          <span>Mới nhất</span>
          <span className="text-sm font-normal text-gray-500 hidden sm:block">Trang {currentPage} / {totalPages}</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentPosts.map((post) => (
             <article key={post.id} className="bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all hover:translate-y-[-5px] hover:shadow-xl group flex flex-col h-full">
                <div className="aspect-[16/9] overflow-hidden relative">
                    <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 uppercase tracking-wider">
                            {post.tags[0]}
                        </span>
                    </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                        <span className="flex items-center"><Calendar size={12} className="mr-1"/> {post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        <span className="flex items-center"><Eye size={12} className="mr-1"/> {post.views.toLocaleString()}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm line-clamp-3 mb-5 flex-grow leading-relaxed">
                        {post.excerpt}
                    </p>
                    
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                        <div className="flex items-center space-x-2">
                             <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full" />
                             <span className="text-xs text-gray-300 font-medium">{post.author}</span>
                        </div>
                        <span className="text-xs text-gray-500 flex items-center bg-white/5 px-2 py-1 rounded">
                            <Clock size={12} className="mr-1" /> {post.readTime}
                        </span>
                    </div>
                </div>
             </article>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button 
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border border-white/10 transition-colors ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-white/10'}`}
            >
                <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold border transition-all ${
                        currentPage === i + 1 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-card border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                    {i + 1}
                </button>
            ))}

            <button 
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border border-white/10 transition-colors ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-white/10'}`}
            >
                <ChevronRight size={20} />
            </button>
          </div>
      )}
    </div>
  );
};

export default Blog;
