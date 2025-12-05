import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateText, generateImage, enhancePrompt } from '../services/geminiService';
import { Sparkles, Image as ImageIcon, FileText, Loader2, Copy, Check, AlertCircle, Wand2 } from 'lucide-react';

const Generator: React.FC = () => {
  const location = useLocation();
  const state = location.state as { initialPrompt?: string, type?: 'text' | 'image' | 'enhance' } | null;

  const [prompt, setPrompt] = useState(state?.initialPrompt || '');
  const [mode, setMode] = useState<'text' | 'image' | 'enhance'>(state?.type || 'text');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text?: string, imageUrl?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (state?.type) setMode(state.type);
    if (state?.initialPrompt) setPrompt(state.initialPrompt);
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (mode === 'text') {
        const res = await generateText(prompt);
        if (res.error) setError(res.error);
        else setResult({ text: res.text });
      } else if (mode === 'enhance') {
        const res = await enhancePrompt(prompt);
        if (res.error) setError(res.error);
        else setResult({ text: res.text });
      } else {
        const res = await generateImage(prompt);
        if (res.error) setError(res.error);
        else setResult({ imageUrl: res.imageUrl });
      }
    } catch (err) {
      setError("Đã xảy ra lỗi không xác định.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.text) {
      navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="text-center mb-10">
         <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
            <Sparkles className="text-white w-8 h-8" />
         </div>
        <h1 className="text-3xl font-bold text-white mb-2">AI Creative Studio</h1>
        <p className="text-gray-400">Sử dụng sức mạnh của Google Gemini để tạo nội dung, tối ưu prompt hoặc vẽ tranh.</p>
      </div>

      <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Mode Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => { setMode('text'); setResult(null); setError(null); }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'text' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-dark/50 text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              <FileText size={18} />
              <span>Tạo Văn Bản</span>
            </button>
            <button
              onClick={() => { setMode('enhance'); setResult(null); setError(null); }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'enhance' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-dark/50 text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              <Wand2 size={18} />
              <span>Tối ưu Prompt</span>
            </button>
            <button
              onClick={() => { setMode('image'); setResult(null); setError(null); }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'image' 
                  ? 'bg-secondary text-white shadow-lg' 
                  : 'bg-dark/50 text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              <ImageIcon size={18} />
              <span>Tạo Hình Ảnh</span>
            </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                        mode === 'text' ? "Nhập câu hỏi hoặc yêu cầu viết nội dung..." : 
                        mode === 'enhance' ? "Nhập ý tưởng ngắn gọn (ví dụ: 'một con rồng băng'). AI sẽ viết lại thành prompt chi tiết." :
                        "Mô tả hình ảnh bạn muốn tạo (nên dùng Tiếng Anh)..."
                    }
                    className="w-full h-32 bg-dark/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-colors"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500 pointer-events-none">
                    {prompt.length} ký tự
                </div>
            </div>
            
            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-bold text-white transition-all transform hover:-translate-y-1 ${
                        loading || !prompt.trim()
                        ? 'bg-gray-700 cursor-not-allowed opacity-50'
                        : mode === 'text' ? 'bg-primary hover:bg-indigo-500 shadow-lg' : 
                          mode === 'enhance' ? 'bg-purple-600 hover:bg-purple-500 shadow-lg' :
                          'bg-secondary hover:bg-pink-500 shadow-lg'
                    }`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Đang xử lý...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            <span>
                                {mode === 'text' ? 'Tạo nội dung' : 
                                 mode === 'enhance' ? 'Nâng cấp Prompt' :
                                 'Vẽ hình ảnh'}
                            </span>
                        </>
                    )}
                </button>
            </div>
        </form>

        {/* Error Message */}
        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl flex items-center space-x-3 mb-6 animate-fade-in">
                <AlertCircle size={20} />
                <span>{error}</span>
            </div>
        )}

        {/* Results Area */}
        {result && (
            <div className="border-t border-white/10 pt-8 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Kết quả:</h3>
                    {(mode === 'text' || mode === 'enhance') && result.text && (
                        <div className="flex space-x-2">
                             {mode === 'enhance' && (
                                <button
                                    onClick={() => {
                                        setMode('image');
                                        setPrompt(result.text || '');
                                        setResult(null);
                                    }}
                                    className="text-white bg-secondary/20 hover:bg-secondary/40 border border-secondary/50 flex items-center space-x-1 text-sm px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <ImageIcon size={16} />
                                    <span>Dùng để vẽ</span>
                                </button>
                             )}
                            <button 
                                onClick={handleCopy}
                                className="text-gray-400 hover:text-white flex items-center space-x-1 text-sm bg-white/5 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-dark/50 rounded-xl overflow-hidden border border-white/5">
                    {(mode === 'text' || mode === 'enhance') && result.text && (
                        <div className="p-6 whitespace-pre-wrap text-gray-200 leading-relaxed font-mono text-sm">
                            {result.text}
                        </div>
                    )}
                    
                    {mode === 'image' && result.imageUrl && (
                        <div className="p-2 flex justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                            <img 
                                src={result.imageUrl} 
                                alt="Generated" 
                                className="max-w-full rounded-lg shadow-2xl border border-white/10"
                            />
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Generator;