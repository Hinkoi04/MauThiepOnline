import React, { useState } from 'react';
import { bankAccounts } from '../../data/weddingData';
import { BotanicalSprig } from '../BotanicalSprig';
import { Copy, Check, X } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

export const GiftBoxScreen: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeQrModal, setActiveQrModal] = useState<{
    role: 'groom' | 'bride';
    name: string;
    bankName: string;
    accountNumber: string;
    qrUrl: string;
  } | null>(null);

  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.15 });
  const { ref: brideRowRef, isInView: brideRowInView } = useInView({ threshold: 0.15 });
  const { ref: groomRowRef, isInView: groomRowInView } = useInView({ threshold: 0.15 });

  const groomAccount = bankAccounts.find((a) => a.role === 'groom') || bankAccounts[0];
  const brideAccount = bankAccounts.find((a) => a.role === 'bride') || bankAccounts[1] || bankAccounts[0];

  const handleCopy = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getVietQrUrl = (bankCode: string, accountNumber: string, ownerName: string, role: string) => {
    return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=0&addInfo=Mung+cuoi+${encodeURIComponent(
      role === 'groom' ? 'Chu Re' : 'Co Dau'
    )}&accountName=${encodeURIComponent(ownerName)}`;
  };

  const groomQrUrl = getVietQrUrl(groomAccount.bankCode, groomAccount.accountNumber, groomAccount.ownerName, 'groom');
  const brideQrUrl = getVietQrUrl(brideAccount.bankCode, brideAccount.accountNumber, brideAccount.ownerName, 'bride');

  return (
    <div className="relative w-full min-h-full px-4 sm:px-6 py-10 bg-gradient-to-b from-[#faf7fb] via-[#f5eff7] to-[#faf7fb] text-[#300f47] overflow-hidden">
      <BotanicalSprig position="left" color="#c497b2" className="absolute top-2 left-2 scale-75 opacity-60 pointer-events-none" />
      <BotanicalSprig position="right" color="#c497b2" className="absolute top-2 right-2 scale-75 opacity-60 pointer-events-none" />

      <div className="max-w-md mx-auto space-y-7 pt-1">
        {/* Header matching screenshot: Soft pinkish/dusty rose uppercase title */}
        <div 
          ref={headerRef}
          className={`text-center space-y-1 reveal-init reveal-up ${headerInView ? 'reveal-active' : ''}`}
        >
          <h2 className="text-lg sm:text-xl font-sans font-medium tracking-[0.25em] text-[#cf8da0] uppercase">
            GỬI QUÀ MỪNG
          </h2>
          <p className="text-[11px] text-slate-400 font-sans tracking-wide">
            Gửi trao lời chúc phúc & món quà mừng đến đôi uyên ương
          </p>
        </div>

        {/* ── 2 HÀNG VIÊN THUỐC SO LE NHỎ GỌN (COMPACT STAGGERED PILL CARDS) ── */}
        <div className="space-y-6 pt-2 overflow-hidden">
          {/* ── ROW 1: CÔ DÂU (TRƯỢT TỪ PHẢI SANG) ── */}
          <div 
            ref={brideRowRef}
            className={`flex items-center justify-between gap-3 sm:gap-4 reveal-init reveal-right ${
              brideRowInView ? 'reveal-active' : ''
            }`}
          >
            {/* Vòng tròn đứt nét bên trái */}
            <div className="shrink-0 w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#d8a8b8"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Thẻ viên thuốc Cô dâu bên phải */}
            <div
              onClick={() => handleCopy(brideAccount.accountNumber, 'stk-bride')}
              className="flex-1 bg-[#ede8ec] hover:bg-[#e7e1e6] rounded-[28px] sm:rounded-[32px] p-3 sm:p-3.5 flex items-center justify-between gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#e4dce3] transition-all cursor-pointer group"
              title="Nhấn để sao chép số tài khoản"
            >
              {/* Thông tin Text bên trái */}
              <div className="flex-1 text-center sm:text-left min-w-0 pl-1.5 sm:pl-2">
                <span className="text-xs text-slate-500 font-sans block text-center mb-0.5">Cô dâu</span>
                <h3 className="font-sans text-[14px] sm:text-[15px] font-medium text-slate-800 truncate text-center leading-snug">
                  Tên Cô Dâu
                </h3>
                <div className="text-[11px] text-slate-600 font-sans truncate text-center flex items-center justify-center gap-1 mt-0.5">
                  <span>{brideAccount.bankName} :</span>
                  <span className="font-mono font-medium">{brideAccount.accountNumber}</span>
                  {copiedKey === 'stk-bride' ? (
                    <Check className="w-3 h-3 text-emerald-600 shrink-0 inline" />
                  ) : (
                    <Copy className="w-2.5 h-2.5 text-slate-400 opacity-60 group-hover:opacity-100 shrink-0 inline" />
                  )}
                </div>
              </div>

              {/* Ô vuông trắng chứa QR Code góc phải */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveQrModal({
                    role: 'bride',
                    name: 'Tên Cô Dâu',
                    bankName: brideAccount.bankName,
                    accountNumber: brideAccount.accountNumber,
                    qrUrl: brideQrUrl,
                  });
                }}
                className="shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white p-1 border border-white/90 shadow-2xs flex items-center justify-center overflow-hidden hover:scale-105 transition-transform"
                title="Nhấn để phóng to mã QR"
              >
                <img
                  src={brideQrUrl}
                  alt="QR Cô Dâu"
                  className="w-full h-full object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* ── ROW 2: CHÚ RỂ (TRƯỢT TỪ TRÁI SANG) ── */}
          <div 
            ref={groomRowRef}
            className={`flex items-center justify-between gap-3 sm:gap-4 reveal-init reveal-left ${
              groomRowInView ? 'reveal-active' : ''
            }`}
          >
            {/* Thẻ viên thuốc Chú rể bên trái */}
            <div
              onClick={() => handleCopy(groomAccount.accountNumber, 'stk-groom')}
              className="flex-1 bg-[#ede8ec] hover:bg-[#e7e1e6] rounded-[28px] sm:rounded-[32px] p-3 sm:p-3.5 flex items-center justify-between gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#e4dce3] transition-all cursor-pointer group"
              title="Nhấn để sao chép số tài khoản"
            >
              {/* Ô vuông trắng chứa QR Code góc trái */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveQrModal({
                    role: 'groom',
                    name: 'Tên Chú Rể',
                    bankName: groomAccount.bankName,
                    accountNumber: groomAccount.accountNumber,
                    qrUrl: groomQrUrl,
                  });
                }}
                className="shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white p-1 border border-white/90 shadow-2xs flex items-center justify-center overflow-hidden hover:scale-105 transition-transform"
                title="Nhấn để phóng to mã QR"
              >
                <img
                  src={groomQrUrl}
                  alt="QR Chú Rể"
                  className="w-full h-full object-contain rounded-xl"
                  loading="lazy"
                />
              </div>

              {/* Thông tin Text bên phải */}
              <div className="flex-1 text-center sm:text-left min-w-0 pr-1.5 sm:pr-2">
                <span className="text-xs text-slate-500 font-sans block text-center mb-0.5">Chú rể</span>
                <h3 className="font-sans text-[14px] sm:text-[15px] font-medium text-slate-800 truncate text-center leading-snug">
                  Tên Chú Rể
                </h3>
                <div className="text-[11px] text-slate-600 font-sans truncate text-center flex items-center justify-center gap-1 mt-0.5">
                  <span>{groomAccount.bankName} :</span>
                  <span className="font-mono font-medium">{groomAccount.accountNumber}</span>
                  {copiedKey === 'stk-groom' ? (
                    <Check className="w-3 h-3 text-emerald-600 shrink-0 inline" />
                  ) : (
                    <Copy className="w-2.5 h-2.5 text-slate-400 opacity-60 group-hover:opacity-100 shrink-0 inline" />
                  )}
                </div>
              </div>
            </div>

            {/* Vòng tròn đứt nét bên phải */}
            <div className="shrink-0 w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#d8a8b8"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Copy toast indicator */}
        {copiedKey && (
          <div className="text-center animate-in fade-in zoom-in duration-200">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium border border-emerald-200 shadow-2xs">
              <Check className="w-3.5 h-3.5" />
              <span>Đã sao chép số tài khoản thành công!</span>
            </span>
          </div>
        )}

        {/* Thank You Note */}
        <div className="text-center p-3 bg-white/70 rounded-2xl border border-purple-100/60 text-xs text-[#541f7a] leading-relaxed font-sans shadow-2xs">
          Gia đình xin chân thành cảm ơn tấm lòng và tình cảm quý báu của quý khách!
        </div>
      </div>

      {/* ── MODAL PHÓNG TO QR (QR CODE LIGHTBOX MODAL) ── */}
      {activeQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveQrModal(null)}
        >
          <div
            className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-2xl border border-purple-100 text-center space-y-3.5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveQrModal(null)}
              className="absolute top-3.5 right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-0.5 pt-1">
              <span className="text-[11px] font-semibold text-[#8b5eb5] uppercase tracking-wider block">
                Mã QR Mừng Cưới {activeQrModal.role === 'groom' ? 'Chú Rể' : 'Cô Dâu'}
              </span>
              <h3 className="font-sans text-base font-bold text-slate-900">
                {activeQrModal.name}
              </h3>
            </div>

            {/* QR Image */}
            <div className="p-3 bg-[#faf6fe] rounded-2xl border border-[#e2d3f2] inline-block shadow-inner mx-auto">
              <img
                src={activeQrModal.qrUrl}
                alt={`Mã QR ${activeQrModal.name}`}
                className="w-48 h-auto mx-auto rounded-xl object-contain"
              />
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-mono text-slate-700 font-semibold">
                {activeQrModal.bankName}: {activeQrModal.accountNumber}
              </div>
              <button
                onClick={(e) => handleCopy(activeQrModal.accountNumber, 'modal-stk', e)}
                className="w-full py-2.5 rounded-xl bg-[#4a1d6d] hover:bg-[#5c2487] text-white font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                {copiedKey === 'modal-stk' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Đã sao chép số tài khoản!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-pink-300" />
                    <span>Sao chép số tài khoản</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
