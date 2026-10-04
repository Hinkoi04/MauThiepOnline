import React, { useState } from 'react';
import { X, Check, Copy, Sparkles } from 'lucide-react';

interface GuestNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGuestName: string;
  onSaveGuestName: (newName: string) => void;
}

export const GuestNameModal: React.FC<GuestNameModalProps> = ({
  isOpen,
  onClose,
  currentGuestName,
  onSaveGuestName,
}) => {
  const [name, setName] = useState(currentGuestName);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const quickPresets = [
    'Anh/ Chị & Người thương',
    'Bạn thân & Người yêu',
    'Gia đình Bác Hùng',
    'Gia đình Chú Tuấn',
    'Người bạn tri kỷ',
    'Đồng nghiệp thân thiết',
  ];

  const shareableUrl = `${window.location.origin}${window.location.pathname}?guest=${encodeURIComponent(
    name
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    if (name.trim()) {
      onSaveGuestName(name.trim());
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-purple-100 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-serif text-base font-semibold text-[#3b1554]">
              Cá Nhân Hóa Tên Khách Mời
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Nhập tên khách mời để xuất hiện trang trọng trên bìa thiệp và thư ngỏ:
        </p>

        {/* Input */}
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên khách mời..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c2ed] text-sm font-medium text-slate-800 focus:outline-hidden focus:border-[#8b5eb5]"
          />
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-[11px] font-semibold text-[#7c4a9e] block mb-1.5 uppercase tracking-wider">
            Gợi ý nhanh:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => setName(preset)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                  name === preset
                    ? 'bg-[#4a1d6d] text-white border-[#4a1d6d]'
                    : 'bg-[#faf6fe] text-[#6b3594] border-[#e2d3f2] hover:bg-purple-100'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Shareable Link Box */}
        <div className="p-3 bg-[#f8f2fc] rounded-xl border border-[#e8daf5] space-y-2">
          <span className="text-[11px] font-medium text-[#6b3594] block">
            Liên kết mời riêng để gửi Zalo / Messenger:
          </span>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="w-full px-2 py-1 text-xs bg-white rounded-md border border-[#d8c2ed] text-slate-600 truncate"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1 bg-[#4a1d6d] hover:bg-[#5c2487] text-white rounded-md text-xs font-semibold shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép' : 'Chép'}</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-purple-100">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#4a1d6d] hover:bg-[#5c2487] text-white transition-colors shadow-2xs cursor-pointer"
          >
            Áp Dụng Ngay
          </button>
        </div>
      </div>
    </div>
  );
};
