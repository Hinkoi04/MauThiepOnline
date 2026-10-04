import React from 'react';
import type { WeddingInfo } from '../../types';
import { Volume2, VolumeX, ChevronDown, Edit3 } from 'lucide-react';
import { ArchPortrait } from '../ArchPortrait';
import { useInView } from '../../hooks/useInView';

interface CoverScreenProps {
  weddingInfo: WeddingInfo;
  onExploreClick?: () => void;
  onOpenGuestCustomizer?: () => void;
  customArchUrl?: string;
  onArchUrlChange?: (url: string) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({
  weddingInfo,
  onExploreClick,
  onOpenGuestCustomizer,
  customArchUrl,
  onArchUrlChange,
  isPlayingMusic,
  onToggleMusic,
}) => {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.1 });
  const { ref: portraitRef, isInView: portraitInView } = useInView({ threshold: 0.1 });
  const { ref: namesRef, isInView: namesInView } = useInView({ threshold: 0.1 });
  const { ref: guestRef, isInView: guestInView } = useInView({ threshold: 0.1 });

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#faf8fc] text-[#300f47] select-none">
      
      {/* ── MẢNG MÀU TÍM PASTEL PHÍA TRÊN (CHIẾM ~78-80% CHIỀU CAO THIỆP) ── */}
      <div className="relative w-full bg-gradient-to-b from-[#9e87b3] via-[#967ea9] to-[#8d75a0] text-white pt-6 sm:pt-8 px-5 sm:px-7 pb-12 sm:pb-16 z-0 shadow-sm">
        
        {/* Top Header: SAVE THE DATE (Trái) & Nút nhạc đĩa than (Phải) */}
        <div 
          ref={headerRef}
          className={`flex items-start justify-between w-full max-w-md mx-auto mb-3 reveal-init reveal-up ${
            headerInView ? 'reveal-active' : ''
          }`}
        >
          <div className="space-y-0.5">
            <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-[0.22em] text-white uppercase drop-shadow-xs">
              SAVE THE DATE
            </h1>
            <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-purple-100/90 uppercase">
              LỄ THÀNH HÔN
            </p>
          </div>

          {/* Nút nhạc tròn phong cách đĩa than */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMusic();
            }}
            aria-label={isPlayingMusic ? 'Tạm dừng nhạc' : 'Phát nhạc đám cưới'}
            className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-md ${
              isPlayingMusic
                ? 'bg-black/30 text-amber-200 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-spin-slow'
                : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
            }`}
            title="Bật / Tắt nhạc"
          >
            {isPlayingMusic ? (
              <Volume2 className="w-5 h-5 text-amber-300" />
            ) : (
              <VolumeX className="w-5 h-5 text-white/80" />
            )}
          </button>
        </div>

        {/* Khung chứa ảnh vòm lệch trái + Hoa văn nét trắng bên phải */}
        <div 
          ref={portraitRef}
          className={`relative w-full max-w-md mx-auto flex items-end justify-start pl-1 sm:pl-3 reveal-init reveal-scale ${
            portraitInView ? 'reveal-active' : ''
          }`}
        >
          
          {/* Cổng vòm ảnh dáng cao, lệch trái */}
          <div className="relative z-10">
            <ArchPortrait
              customImageUrl={customArchUrl}
              onImageChange={onArchUrlChange}
            />

            {/* Chữ 'OUR WEDDING' uốn cong chính xác ôm sát viền ngoài góc trên bên phải của vòm */}
            <div className="absolute -top-3.5 -right-3.5 w-64 h-64 pointer-events-none z-20">
              <svg viewBox="0 0 260 260" className="w-full h-full overflow-visible">
                <defs>
                  <path
                    id="ourWeddingArcAccurate"
                    d="M 125, -6 A 132,132 0 0,1 257, 125"
                    fill="none"
                  />
                </defs>
                <text className="font-serif text-[13px] sm:text-[14px] tracking-[0.34em] fill-white uppercase drop-shadow-sm font-light">
                  <textPath href="#ourWeddingArcAccurate" startOffset="18%">
                    OUR WEDDING
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Họa tiết hoa lá nét vẽ trắng nghệ thuật ở khoảng trống bên phải như ảnh mẫu */}
          <div className="absolute right-0 sm:right-1 bottom-0 w-44 sm:w-52 h-72 sm:h-84 pointer-events-none opacity-85 z-0">
            <svg
              viewBox="0 0 160 240"
              fill="none"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full"
            >
              {/* Thân cành hoa chính */}
              <path d="M 20 230 Q 70 160 85 95 Q 95 45 118 10" />
              <path d="M 70 160 Q 112 138 145 115" />
              <path d="M 85 95 Q 125 78 152 56" />
              
              {/* Bông hoa tròn nét đứt trên cùng */}
              <g transform="translate(126, 48)">
                <circle cx="0" cy="0" r="17" fill="none" strokeDasharray="3 2" />
                <path d="M 0 -17 C -8 -27, 8 -27, 0 -17" />
                <path d="M 17 0 C 27 -8, 27 8, 17 0" />
                <path d="M 0 17 C -8 27, 8 27, 0 17" />
                <path d="M -17 0 C -27 -8, -27 8, -17 0" />
                <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.4)" />
              </g>

              {/* Bông hoa nhỏ ở giữa */}
              <g transform="translate(138, 120)">
                <circle cx="0" cy="0" r="13" fill="none" />
                <path d="M 0 -13 C -6 -21, 6 -21, 0 -13" />
                <path d="M 13 0 C 21 -6, 21 6, 13 0" />
                <path d="M 0 13 C -6 21, 6 21, 0 13" />
                <path d="M -13 0 C -21 -6, -21 6, -13 0" />
              </g>

              {/* Lá cây nét mảnh */}
              <path d="M 40 205 Q 15 185 32 170 Q 50 188 40 205" />
              <path d="M 60 145 Q 30 125 48 112 Q 68 128 60 145" />
              <path d="M 78 80 Q 48 60 65 48 Q 85 64 78 80" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── MẢNG MÀU TRẮNG PHÍA DƯỚI (PHẦN CHÂN ẢNH TRÀN XUỐNG ĐƯỜNG PHÂN CÁCH) ── */}
      <div className="relative z-10 -mt-10 sm:-mt-12 flex flex-col items-center justify-between px-4 w-full flex-1 pt-2 pb-5 bg-[#faf8fc]">
        
        {/* Couple's Names & Date Info trên nền trắng */}
        <div 
          ref={namesRef}
          className={`text-center w-full max-w-xs mx-auto space-y-1 mt-2 reveal-init reveal-up ${
            namesInView ? 'reveal-active' : ''
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="font-calligraphy text-3xl sm:text-4xl text-[#3b1554] font-normal">
              {weddingInfo.groomName}
            </span>
            <span className="font-serif italic text-lg text-[#8b5eb5]">&</span>
            <span className="font-calligraphy text-3xl sm:text-4xl text-[#3b1554] font-normal">
              {weddingInfo.brideName}
            </span>
          </div>

          <div className="font-serif text-sm sm:text-base font-medium tracking-[0.25em] text-[#541f7a]">
            {weddingInfo.solarDateText}
          </div>
        </div>

        {/* Gentle Scroll Down Indicator */}
        {onExploreClick && (
          <button
            onClick={onExploreClick}
            aria-label="Cuộn xuống xem thiệp mời"
            className="my-1.5 p-1 text-[#8b5eb5] hover:text-[#3b1554] animate-bounce transition-colors focus:outline-hidden cursor-pointer"
          >
            <ChevronDown className="w-5 h-5 mx-auto stroke-[1.75]" />
          </button>
        )}

        {/* TRÂN TRỌNG KÍNH MỜI CARD DƯỚI ĐÁY */}
        <div 
          ref={guestRef}
          className={`w-full max-w-sm mx-auto bg-white text-[#3b1554] rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-purple-100/70 px-5 py-3.5 text-center reveal-init reveal-up ${
            guestInView ? 'reveal-active' : ''
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full border border-[#9c6ebd] text-[10px] font-medium tracking-[0.2em] text-[#3b1554] uppercase bg-[#f8f2fc]">
            <span>TRÂN TRỌNG KÍNH MỜI</span>
          </div>

          <div className="relative mt-1 flex items-center justify-center gap-2 group">
            <h2 className="font-calligraphy text-2xl sm:text-[26px] text-[#300f47] tracking-wide">
              {weddingInfo.guestName}
            </h2>
            {onOpenGuestCustomizer && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGuestCustomizer();
                }}
                className="opacity-40 group-hover:opacity-100 hover:opacity-100 p-1 text-purple-700 hover:text-purple-950 transition-opacity cursor-pointer"
                title="Đổi tên khách mời"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
