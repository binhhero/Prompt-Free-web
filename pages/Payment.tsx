import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Smartphone, CreditCard, Loader2, QrCode, ArrowLeft, Copy } from 'lucide-react';

const Payment: React.FC = () => {
  const { user, upgradeToPro } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState<'banking' | 'momo' | 'zalo'>('banking');
  const [status, setStatus] = useState<'pending' | 'checking' | 'success'>('pending');
  const [countdown, setCountdown] = useState(10); // Simulation timer

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login');
    if (user?.plan === 'pro') navigate('/dashboard');
  }, [user, navigate]);

  // Simulate payment checking mechanism
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (status === 'pending') {
      // Start checking after 3 seconds
      timer = setTimeout(() => setStatus('checking'), 3000);
    } else if (status === 'checking') {
      // Simulate success after 4 seconds of "checking"
      timer = setTimeout(() => {
        setStatus('success');
        upgradeToPro();
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [status, upgradeToPro]);

  // Countdown effect for the QR validity (visual only)
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-card border border-white/10 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full animate-fade-in-up">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
            <Check size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Thanh toán thành công!</h2>
          <p className="text-gray-400 mb-6">Tài khoản của bạn đã được nâng cấp lên Pro Member.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Về Dashboard
          </button>
        </div>
      </div>
    );
  }

  const bankInfo = {
    bankName: 'MB BANK',
    accountName: 'PROMPTFREE COMPANY',
    accountNumber: '0339999999',
    amount: '99,000',
    content: `UPGRADE ${user?.email}`
  };

  // Generate a real QR code URL for visualization
  // Using quickchart.io or similar for reliable static QR generation
  const qrData = `00020101021138570010A00000072701270006970422011303399999990208QRIBFTTA53037045405990005802VN62210817UPGRADE PROMPTFREE6304D82C`; 
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(bankInfo.content + " " + bankInfo.amount)}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Quay lại
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Order Info & Methods */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Thông tin đơn hàng</h2>
            <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
              <div>
                <h3 className="text-lg font-medium text-white">Gói Pro Member (1 tháng)</h3>
                <p className="text-gray-400 text-sm">Truy cập không giới hạn, Tối ưu Prompt AI</p>
              </div>
              <span className="text-xl font-bold text-gold">99.000đ</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-white">
              <span>Tổng thanh toán</span>
              <span>99.000đ</span>
            </div>
          </div>

          <div className="bg-card border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Chọn phương thức thanh toán</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => setMethod('banking')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${
                  method === 'banking' 
                    ? 'bg-primary/10 border-primary text-white shadow-lg shadow-primary/10' 
                    : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <CreditCard size={28} />
                <span className="font-medium">Chuyển khoản</span>
              </button>
              <button 
                onClick={() => setMethod('momo')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${
                  method === 'momo' 
                    ? 'bg-pink-500/10 border-pink-500 text-white shadow-lg shadow-pink-500/10' 
                    : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Smartphone size={28} className="text-pink-500" />
                <span className="font-medium">Momo</span>
              </button>
              <button 
                onClick={() => setMethod('zalo')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${
                  method === 'zalo' 
                    ? 'bg-blue-500/10 border-blue-500 text-white shadow-lg shadow-blue-500/10' 
                    : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Smartphone size={28} className="text-blue-500" />
                <span className="font-medium">ZaloPay</span>
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex items-start gap-3">
              <ShieldCheck className="text-blue-400 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-gray-300">
                Thanh toán an toàn và bảo mật. Tài khoản sẽ được nâng cấp tự động ngay sau khi hệ thống nhận được tiền (thường trong vòng 30 giây).
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: QR Payment */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl overflow-hidden shadow-2xl">
             {/* Header */}
             <div className="bg-primary p-4 text-center">
                <h3 className="text-white font-bold text-lg">Quét mã để thanh toán</h3>
                <p className="text-blue-100 text-sm">Hỗ trợ VietQR / App Ngân hàng</p>
             </div>
             
             {/* QR Section */}
             <div className="p-6 flex flex-col items-center bg-white text-gray-900">
                <div className="relative group">
                    <div className="w-64 h-64 bg-gray-100 rounded-xl mb-4 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <img src={qrUrl} alt="Payment QR" className="w-full h-full object-contain p-2" />
                    </div>
                    {/* Status Overlay */}
                    {status === 'checking' && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl">
                            <Loader2 className="animate-spin text-primary mb-2" size={40} />
                            <span className="font-bold text-gray-800">Đang kiểm tra...</span>
                        </div>
                    )}
                </div>

                <div className="w-full space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Ngân hàng</span>
                        <span className="font-bold text-gray-800">{bankInfo.bankName}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Số tài khoản</span>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-800">{bankInfo.accountNumber}</span>
                            <button onClick={() => handleCopy(bankInfo.accountNumber)} className="text-primary hover:text-blue-700">
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>
                     <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Số tiền</span>
                        <span className="font-bold text-primary text-lg">{bankInfo.amount}đ</span>
                    </div>
                     <div className="flex flex-col gap-1 text-sm bg-gray-50 p-2 rounded border border-gray-200">
                        <span className="text-gray-500 text-xs uppercase">Nội dung chuyển khoản (Bắt buộc)</span>
                        <div className="flex justify-between items-center">
                            <span className="font-mono font-bold text-red-600 truncate max-w-[180px]">{bankInfo.content}</span>
                             <button onClick={() => handleCopy(bankInfo.content)} className="text-primary hover:text-blue-700">
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center w-full">
                   {status === 'pending' ? (
                       <div className="flex items-center justify-center gap-2 text-primary animate-pulse">
                           <Loader2 size={18} className="animate-spin" />
                           <span className="font-medium text-sm">Đang chờ thanh toán...</span>
                       </div>
                   ) : status === 'checking' ? (
                        <div className="text-orange-500 font-bold text-sm">Đang xử lý giao dịch...</div>
                   ) : (
                       <div className="text-green-600 font-bold text-sm">Thành công!</div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;