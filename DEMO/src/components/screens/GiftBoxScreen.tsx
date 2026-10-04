import React, { useState } from 'react';
import { bankAccounts } from '../../data/weddingData.ts';
import { BotanicalSprig } from '../BotanicalSprig.tsx';
import { Gift, Copy, Check, QrCode, Heart, Sparkles } from 'lucide-react';

export const GiftBoxScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeAccount = bankAccounts.find((a) => a.role === activeTab) || bankAccounts[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // VietQR link
  const vietQrUrl = `https://img.vietqr.io/image/${activeAccount.bankCode}-${activeAccount.accountNumber}-compact2.png?amount=0&addInfo=Mung+cuoi+${encodeURIComponent(
    activeAccount.role === 'groom' ? 'Quoc Tuan' : 'Bich Hanh'
  )}&accountName=${encodeURIComponent(activeAccount.ownerName)}`;

  return (
    <div className="relative w-full min-h-full px-4 sm:px-5 py-6 bg-gradient-to-b from-[#f3f7fa] via-[#edf3f8] to-[#f8fafc] text-[#1b2b40]">
      <BotanicalSprig position="left" className="absolute top-2 left-2 scale-75 opacity-60" />
      <BotanicalSprig position="right" className="absolute top-2 right-2 scale-75 opacity-60" />

      <div className="max-w-md mx-auto space-y-6 pt-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#607791] uppercase">
            HỘP MỪNG CƯỚI
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#18293f] tracking-wide">
            Gửi Quà Chúc Phúc
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Sự hiện diện của bạn là món quà ý nghĩa nhất. Nếu ở xa không thể đến dự, bạn có thể gửi lời chúc phúc qua đây.
          </p>
          <div className="w-12 h-0.5 bg-[#8da2b5] mx-auto mt-2" />
        </div>

        {/* Tab switch between Groom and Bride */}
        <div className="flex bg-[#e8eff5] p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('groom')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'groom'
                ? 'bg-white text-[#1b2b40] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Mừng Chú Rể (Quốc Tuấn)</span>
          </button>
          <button
            onClick={() => setActiveTab('bride')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'bride'
                ? 'bg-white text-[#1b2b40] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Mừng Cô Dâu (Bích Hạnh)</span>
          </button>
        </div>

        {/* QR & Bank Information Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#d8e3ed] shadow-xs text-center space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase block">
              {activeTab === 'groom' ? 'Tài khoản Chú Rể' : 'Tài khoản Cô Dâu'}
            </span>
            <h3 className="font-serif text-lg font-bold text-[#1b2b40]">
              {activeAccount.ownerName}
            </h3>
            <span className="text-xs text-[#355070] font-medium block">
              Ngân hàng {activeAccount.bankName} {activeAccount.branch && `(${activeAccount.branch})`}
            </span>
          </div>

          {/* QR Code Container */}
          <div className="p-3 bg-[#f8fafc] rounded-xl border border-slate-200 inline-block shadow-2xs max-w-[210px] mx-auto">
            <img
              src={vietQrUrl}
              alt={`Mã QR VietQR ${activeAccount.ownerName}`}
              className="w-44 h-auto mx-auto rounded-lg object-contain"
              loading="lazy"
            />
            <span className="text-[10px] text-slate-400 block mt-1.5">
              Quét mã bằng ứng dụng Ngân hàng / Momo / VNPay
            </span>
          </div>

          {/* Account Details Box */}
          <div className="p-3.5 bg-[#f0f5fa] rounded-xl border border-[#d8e3ed] text-left space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Số tài khoản:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#1b2b40]">
                  {activeAccount.accountNumber}
                </span>
                <button
                  onClick={() => handleCopy(activeAccount.accountNumber, 'stk')}
                  className="p-1 text-[#355070] hover:text-[#18293f]"
                  title="Sao chép số tài khoản"
                >
                  {copiedKey === 'stk' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200/60 pt-2">
              <span className="text-slate-500">Chủ tài khoản:</span>
              <span className="font-semibold text-slate-800">{activeAccount.ownerName}</span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200/60 pt-2">
              <span className="text-slate-500">Ngân hàng:</span>
              <span className="font-semibold text-slate-800">{activeAccount.bankName}</span>
            </div>
          </div>

          {/* Quick Copy Button */}
          <button
            onClick={() => handleCopy(activeAccount.accountNumber, 'stk')}
            className="w-full py-2.5 rounded-xl bg-[#1b2b40] hover:bg-[#283e5c] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            {copiedKey === 'stk' ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Đã sao chép số tài khoản thành công!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Sao chép số tài khoản</span>
              </>
            )}
          </button>
        </div>

        {/* Thank You Note */}
        <div className="text-center p-3.5 bg-white/70 rounded-xl border border-slate-200/60 text-xs text-slate-600 leading-relaxed font-sans">
          Gia đình xin gửi lời cảm ơn sâu sắc và chân thành nhất đến tấm lòng vàng và tình cảm quý báu của bạn!
        </div>
      </div>
    </div>
  );
};
