import React, { useState } from 'react';
import { X, Check, Copy, Share2, Sparkles } from 'lucide-react';

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
        className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-serif text-base font-semibold text-slate-900">
              Cá Nhân Hóa Tên Khách Mời
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
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
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-hidden focus:border-[#1b2b40]"
          />
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 block mb-1.5 uppercase tracking-wider">
            Gợi ý nhanh:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => setName(preset)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                  name === preset
                    ? 'bg-[#1b2b40] text-white border-[#1b2b40]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Shareable Link Box */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
          <span className="text-[11px] font-medium text-slate-500 block">
            Liên kết mời riêng để gửi Zalo / Messenger:
          </span>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="w-full px-2 py-1 text-xs bg-white rounded-md border border-slate-200 text-slate-600 truncate"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1 bg-[#1b2b40] hover:bg-[#283e5c] text-white rounded-md text-xs font-semibold shrink-0 flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép' : 'Chép'}</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#1b2b40] hover:bg-[#283e5c] text-white transition-colors shadow-2xs"
          >
            Áp Dụng Ngay
          </button>
        </div>
      </div>
    </div>
  );
};
