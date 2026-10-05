import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface ArchPortraitProps {
  customImageUrl?: string;
  onImageChange?: (newUrl: string) => void;
  className?: string;
}

export const ArchPortrait: React.FC<ArchPortraitProps> = ({
  customImageUrl,
  onImageChange,
  className = '',
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [imgError, setImgError] = useState(false);

  // High quality curated wedding portraits
  const presetPhotos = [
    {
      id: 'default',
      name: 'Ánh Dương & Bó Hoa Cưới',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
    },
    {
      id: 'romantic',
      name: 'Nắm Tay Hoàng Hôn',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85',
    },
    {
      id: 'elegant',
      name: 'Cô Dâu Kiêu Sa & Khăn Voan',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85',
    },
  ];

  const currentPhoto = customImageUrl || presetPhotos[0].url;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Khung ảnh vòm tràn viền không viền trắng (Clean borderless arch photo) */}
      <div className="relative w-[250px] sm:w-[280px] h-[390px] sm:h-[430px] overflow-hidden rounded-t-[125px] sm:rounded-t-[140px] rounded-b-none shadow-2xl bg-slate-200">
        {!imgError ? (
          <img
            src={currentPhoto}
            alt="Ảnh cưới Cô Dâu & Chú Rể"
            className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#eee4f8] via-[#e2d2f7] to-[#d4bff5] relative">
            <svg
              viewBox="0 0 200 260"
              className="w-full h-full object-cover"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="warmSunGlow" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#fff8ed" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#fde047" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0.1" />
                </linearGradient>
                <radialGradient id="sunFlare" cx="70%" cy="25%" r="60%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#fed7aa" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.0" />
                </radialGradient>
              </defs>
              <rect width="200" height="260" fill="url(#warmSunGlow)" />
              <circle cx="150" cy="65" r="70" fill="url(#sunFlare)" />
              <path
                d="M 30 260 L 50 140 C 55 110, 80 100, 95 120 L 105 260 Z"
                fill="#3b1554"
                opacity="0.85"
              />
              <path
                d="M 85 260 L 98 128 C 110 105, 140 115, 150 145 L 180 260 Z"
                fill="#ffffff"
                opacity="0.95"
              />
              <path
                d="M 125 90 C 145 90, 175 140, 185 240 C 160 210, 140 160, 128 110 Z"
                fill="white"
                opacity="0.5"
              />
            </svg>
          </div>
        )}

        {/* Quick change photo hover trigger */}
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white shadow-sm backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 hover:opacity-100 cursor-pointer z-10"
          title="Đổi ảnh đại diện"
        >
          <Camera className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Optional Photo Selector Modal / Dropdown */}
      {showPicker && (
        <div className="absolute top-10 z-30 w-64 bg-white rounded-xl shadow-xl border border-purple-200 p-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-purple-100 mb-2 font-medium text-purple-900">
            <span>Chọn ảnh đại diện cổng vòm</span>
            <button
              onClick={() => setShowPicker(false)}
              className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1.5">
            {presetPhotos.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  onImageChange?.(preset.url);
                  setShowPicker(false);
                }}
                className={`w-full flex items-center gap-2 p-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                  currentPhoto === preset.url ? 'bg-purple-50 text-purple-900 font-medium' : 'hover:bg-slate-50'
                }`}
              >
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="w-8 h-8 rounded-md object-cover"
                />
                <span className="truncate">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
