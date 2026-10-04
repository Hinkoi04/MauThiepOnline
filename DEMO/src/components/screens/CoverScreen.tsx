import React, { useState } from 'react';
import { BotanicalSprig } from '../BotanicalSprig.tsx';
import { ArchPortrait } from '../ArchPortrait.tsx';
import { WeddingInfo } from '../../types.ts';
import { weddingAudio } from '../../utils/audioPlayer.ts';
import { Music, Volume2, VolumeX, ChevronDown, Sparkles, Heart, Edit3 } from 'lucide-react';

interface CoverScreenProps {
  weddingInfo: WeddingInfo;
  onExploreClick: () => void;
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
  return (
    <div className="relative w-full min-h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#f3f7fa] via-[#edf3f8] to-[#e4eef6] text-[#1b2b40] select-none">
      {/* Top Corner Botanical Sprigs (Matching exactly the artwork in the screenshot) */}
      <BotanicalSprig
        position="left"
        className="absolute top-2 left-2 z-10 scale-90 sm:scale-100"
      />
      <BotanicalSprig
        position="right"
        className="absolute top-2 right-2 z-10 scale-90 sm:scale-100"
      />

      {/* Top Header Section */}
      <div className="pt-6 sm:pt-8 px-6 text-center z-10">
        {/* SAVE THE DATE with accent lines */}
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <span className="w-8 sm:w-10 h-[1px] bg-[#899cb0]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#2c3e55] uppercase font-sans">
            SAVE THE DATE
          </span>
          <span className="w-8 sm:w-10 h-[1px] bg-[#899cb0]" />
        </div>

        {/* LỄ THÀNH HÔN */}
        <h1 className="text-xs sm:text-[13px] font-serif font-medium tracking-[0.35em] text-[#1e2f47] uppercase">
          LỄ THÀNH HÔN
        </h1>
      </div>

      {/* Center Main Stage: Arch Window & Couple Names */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-2 sm:py-3 z-10">
        {/* Arch Photo Portrait */}
        <div className="mb-2 sm:mb-3">
          <ArchPortrait
            badgeDate={weddingInfo.badgeDate}
            customImageUrl={customArchUrl}
            onImageChange={onArchUrlChange}
          />
        </div>

        {/* Couple's Names in Exquisite Cursive Calligraphy */}
        <div className="text-center w-full max-w-xs space-y-0.5">
          {/* Groom's Name */}
          <div className="font-calligraphy text-4xl sm:text-[46px] leading-[1.1] text-[#1a2d48] drop-shadow-xs font-normal">
            {weddingInfo.groomName}
          </div>

          {/* & Divider with delicate lines */}
          <div className="flex items-center justify-center gap-3 py-0.5">
            <span className="w-6 h-[0.75px] bg-[#9bb0c4]" />
            <span className="font-serif italic text-base sm:text-lg text-[#3b5372] font-normal">&</span>
            <span className="w-6 h-[0.75px] bg-[#9bb0c4]" />
          </div>

          {/* Bride's Name */}
          <div className="font-calligraphy text-4xl sm:text-[46px] leading-[1.1] text-[#1a2d48] drop-shadow-xs font-normal">
            {weddingInfo.brideName}
          </div>
        </div>

        {/* Wedding Date Information */}
        <div className="mt-3 sm:mt-4 text-center">
          {/* Solar Calendar Date: 28 · 03 · 2026 */}
          <div className="font-serif text-lg sm:text-xl font-medium tracking-[0.2em] text-[#182a42]">
            {weddingInfo.solarDateText}
          </div>

          {/* Lunar Calendar Date */}
          <div className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] text-[#556980] uppercase mt-0.5">
            {weddingInfo.lunarDateText}
          </div>
        </div>

        {/* Gentle Bouncing Down Arrow Indicator */}
        <button
          onClick={onExploreClick}
          aria-label="Cuộn xuống xem thiệp mời"
          className="mt-3 sm:mt-4 p-1 text-[#788ea5] hover:text-[#182a42] animate-bounce transition-colors focus:outline-hidden"
        >
          <ChevronDown className="w-5 h-5 mx-auto stroke-[1.75]" />
        </button>
      </div>

      {/* Bottom Sheet Card: "TRÂN TRỌNG KÍNH MỜI" and floating music player */}
      <div className="relative z-20">
        <div
          onClick={onExploreClick}
          className="w-full bg-white/95 backdrop-blur-md rounded-t-[30px] sm:rounded-t-[34px] card-soft-shadow px-6 pt-4 sm:pt-5 pb-6 text-center cursor-pointer transition-transform hover:-translate-y-0.5"
        >
          {/* Subtle pull tab affordance */}
          <div className="w-8 h-1 bg-[#cbd5e1] rounded-full mx-auto mb-2.5 opacity-60" />

          {/* TRÂN TRỌNG KÍNH MỜI Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1 rounded-full border border-[#94a3b8] text-[11px] font-medium tracking-[0.18em] text-[#1e2f47] uppercase bg-white/50 shadow-2xs">
            <span>TRÂN TRỌNG KÍNH MỜI</span>
          </div>

          {/* Invitee Name in Elegant Script */}
          <div className="relative mt-2 flex items-center justify-center gap-2 group">
            <h2 className="font-calligraphy text-2xl sm:text-[28px] text-[#1a2d48] tracking-wide">
              {weddingInfo.guestName}
            </h2>
            {onOpenGuestCustomizer && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGuestCustomizer();
                }}
                className="opacity-40 group-hover:opacity-100 hover:opacity-100 p-1 text-slate-500 hover:text-blue-700 transition-opacity"
                title="Đổi tên khách mời"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="mt-1 text-[11px] text-slate-400 font-sans">
            Chạm để mở toàn bộ thiệp cưới & thông tin buổi lễ
          </div>
        </div>

        {/* Floating Circular Music Player Button (Matching screenshot position) */}
        <div className="absolute right-4 sm:right-6 -top-4 sm:-top-5 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMusic();
            }}
            aria-label={isPlayingMusic ? 'Tạm dừng nhạc' : 'Phát nhạc đám cưới'}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md border transition-all duration-300 ${
              isPlayingMusic
                ? 'bg-[#1b2b40] text-white border-[#304562] shadow-[0_4px_16px_rgba(27,43,64,0.4)] animate-spin-slow'
                : 'bg-white text-[#1b2b40] border-[#cbd5e1] hover:bg-slate-50 shadow-sm'
            }`}
          >
            {isPlayingMusic ? (
              <span className="font-serif text-lg leading-none select-none">♫</span>
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
