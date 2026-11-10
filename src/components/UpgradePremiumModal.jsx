import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Zap,
  ArrowRight,
  BookOpen,
  Award
} from 'lucide-react';

export default function UpgradePremiumModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onUpgradeSuccess 
}) {
  const [selectedPlan, setSelectedPlan] = useState('yearly'); // 'monthly', 'yearly', 'lifetime'
  const [paymentMethod, setPaymentMethod] = useState('qris'); // 'qris', 'bca', 'mandiri', 'voucher'
  const [voucherCode, setVoucherCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const plans = [
    {
      id: 'monthly',
      title: 'Bulanan',
      price: 'Rp 29.000',
      period: '/ bulan',
      tag: null,
      desc: 'Langganan fleksibel dibayar per bulan.'
    },
    {
      id: 'yearly',
      title: 'Tahunan (Paling Populer)',
      price: 'Rp 149.000',
      period: '/ tahun',
      tag: 'Hemat 57%',
      desc: 'Hanya Rp 12.400/bulan, akses penuh setahun penuh.'
    },
    {
      id: 'lifetime',
      title: 'Seumur Hidup (Lifetime)',
      price: 'Rp 299.000',
      period: 'sekali bayar',
      tag: 'Akses Selamanya',
      desc: 'Satu kali bayar, nikmati semua fitur selamanya tanpa iuran.'
    }
  ];

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onUpgradeSuccess();
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-[#0c1813] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-black relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition text-black/80 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/30 backdrop-blur-xs flex items-center justify-center text-black shadow-md">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/20 text-black text-[10px] font-black uppercase tracking-wider mb-1">
                <span>Shahih Bukhari Plus Premium</span>
              </div>
              <h3 className="text-xl font-black">
                Tingkatkan ke Akses Penuh
              </h3>
            </div>
          </div>
          <p className="text-xs text-black/80 mt-2 leading-relaxed font-medium">
            Dapatkan manfaat ilmu tanpa batas: seluruh 7.563 hadits, 36 jilid Syarah Fathul Baari Maktabah Syamilah, dan aplikasi offline tanpa kuota.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {success ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                Alhamdulillah! Pembayaran Berhasil
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Akun Anda telah diaktifkan ke status <strong>PREMIUM MEMBER</strong>. Selamat menelaah warisan hadits Nabi Muhammad ﷺ.
              </p>
            </div>
          ) : (
            <>
              {/* Feature Comparison Highlights */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 space-y-2 text-xs">
                <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Keuntungan Anggota Premium:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Akses 7.563 Hadits 100%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Syarah 36 Jilid Lengkap</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Catatan Pribadi & Bookmark</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Download App PC & Android</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Bebas Iklan Selamanya</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                    <span>Dukungan Tim Ahli Fiqih</span>
                  </div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                  Pilih Paket Langganan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {plans.map((p) => {
                    const isSelected = selectedPlan === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPlan(p.id)}
                        className={`p-3 rounded-2xl border-2 transition cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-500 shadow-md scale-[1.02]'
                            : 'bg-white dark:bg-gray-800/60 border-gray-200 dark:border-gray-800 hover:border-amber-300'
                        }`}
                      >
                        {p.tag && (
                          <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[9px] font-black uppercase tracking-wider shadow-xs">
                            {p.tag}
                          </span>
                        )}
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-1">
                            {p.title}
                          </h4>
                          <div className="text-base font-black text-amber-700 dark:text-amber-400">
                            {p.price}
                          </div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400">
                            {p.period}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                  Metode Pembayaran:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'qris'
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-xs'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <span>QRIS Instan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bca')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'bca'
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-xs'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>Transfer Bank</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mandiri')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'mandiri'
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-xs'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>E-Wallet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('voucher')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'voucher'
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-xs'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Award className="w-4 h-4 text-purple-600" />
                    <span>Voucher</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-black text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Memproses Pembayaran...</span>
                ) : (
                  <>
                    <Crown className="w-4 h-4" />
                    <span>Aktifkan Status Premium Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
