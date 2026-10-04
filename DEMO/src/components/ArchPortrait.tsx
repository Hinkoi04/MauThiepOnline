import React, { useState } from 'react';
import { Camera, Heart, Sparkles } from 'lucide-react';

interface ArchPortraitProps {
  badgeDate: string;
  customImageUrl?: string;
  onImageChange?: (newUrl: string) => void;
}

export const ArchPortrait: React.FC<ArchPortraitProps> = ({
  badgeDate,
  customImageUrl,
  onImageChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [imgError, setImgError] = useState(false);

  // High quality curated wedding portraits
  const presetPhotos = [
    {
      id: 'default',
      name: 'Ánh Dương & Bó Hoa Cưới',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=85',
    },
    {
      id: 'romantic',
      name: 'Nắm Tay Hoàng Hôn',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=85',
    },
    {
      id: 'elegant',
      name: 'Cô Dâu Kiêu Sa & Khăn Voan',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=85',
    },
  ];

  const currentPhoto = customImageUrl || presetPhotos[0].url;

  return (
    <div className="relative mx-auto flex flex-col items-center select-none">
      {/* Outer Arch Container */}
      <div className="relative w-[218px] sm:w-[230px] h-[280px] sm:h-[295px] p-[5px] bg-white/80 rounded-t-[115px] sm:rounded-t-[120px] rounded-b-[4px] arch-shadow border border-[#d2deeb] transition-all">
        {/* Inner Arch Photo Frame */}
        <div className="relative w-full h-full overflow-hidden rounded-t-[110px] sm:rounded-t-[115px] rounded-b-[2px] bg-gradient-to-b from-[#e2eaf3] to-[#cbd7e6]">
          {!imgError ? (
            <img
              src={currentPhoto}
              alt="Ảnh cưới Quốc Tuấn & Bích Hạnh"
              className="w-full h-full object-cover object-[center_28%] transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Elegant SVG Graphic Fallback representing groom and bride with bouquet */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#dae5f0] via-[#c6d7e8] to-[#b4c8dc] relative">
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
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
                  </linearGradient>
                  <radialGradient id="sunFlare" cx="70%" cy="25%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#fed7aa" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#fed7aa" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Soft backdrop silhouette */}
                <rect width="200" height="260" fill="url(#warmSunGlow)" />
                <circle cx="150" cy="65" r="70" fill="url(#sunFlare)" />

                {/* Groom silhouette in dark suit */}
                <path
                  d="M 30 260 L 50 140 C 55 110, 80 100, 95 120 L 105 260 Z"
                  fill="#1e293b"
                  opacity="0.85"
                />

                {/* Bride silhouette in flowing ivory gown */}
                <path
                  d="M 85 260 L 98 128 C 110 105, 140 115, 150 145 L 180 260 Z"
                  fill="#ffffff"
                  opacity="0.95"
                />

                {/* Bridal veil aura */}
                <path
                  d="M 125 90 C 145 90, 175 140, 185 240 C 160 210, 140 160, 128 110 Z"
                  fill="white"
                  opacity="0.5"
                />

                {/* Lush Bridal Bouquet */}
                <g transform="translate(90, 150)">
                  <circle cx="12" cy="12" r="14" fill="#fdf2f8" />
                  <circle cx="6" cy="6" r="8" fill="#ffffff" />
                  <circle cx="18" cy="8" r="7" fill="#ffe4e6" />
                  <circle cx="14" cy="18" r="9" fill="#fef3c7" />
                  {/* Leaves */}
                  <path d="M 0 16 C -6 12, -4 2, 4 8 Z" fill="#84cc16" opacity="0.8" />
                  <path d="M 22 18 C 30 14, 28 4, 20 10 Z" fill="#65a30d" opacity="0.8" />
                  <path d="M 12 28 C 10 34, 18 36, 16 28 Z" fill="#4d7c0f" opacity="0.8" />
                </g>
              </svg>
            </div>
          )}

          {/* Soft natural golden sunlight overlay effect */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1b2b40]/30 via-transparent to-amber-100/25 mix-blend-overlay"
            aria-hidden="true"
          />

          {/* Subtle bottom vignette to blend nicely */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0e1726]/40 via-[#0e1726]/10 to-transparent"
            aria-hidden="true"
          />

          {/* Quick change photo hover trigger */}
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/70 hover:bg-white text-slate-700 shadow-sm backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 hover:opacity-100"
            title="Đổi ảnh đại diện"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Date Badge intersecting bottom of arch (Exact style from screenshot: dark navy pill with 28.03) */}
      <div className="relative -mt-3.5 z-10 flex items-center justify-center">
        <div className="bg-[#1b2b40] text-white text-[12px] font-semibold tracking-wider px-3.5 py-0.5 rounded-full shadow-[0_4px_12px_rgba(27,43,64,0.35)] border border-[#334b6b] flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-amber-200/80" />
          <span>{badgeDate}</span>
        </div>
      </div>

      {/* Optional Photo Selector Modal / Dropdown */}
      {showPicker && (
        <div className="absolute top-10 z-30 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2 font-medium text-slate-800">
            <span>Chọn ảnh đại diện cổng vòm</span>
            <button
              onClick={() => setShowPicker(false)}
              className="text-slate-400 hover:text-slate-600 text-sm"
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
                className={`w-full flex items-center gap-2 p-1.5 rounded-lg text-left transition-colors ${
                  currentPhoto === preset.url ? 'bg-blue-50 text-blue-900 font-medium' : 'hover:bg-slate-50'
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
