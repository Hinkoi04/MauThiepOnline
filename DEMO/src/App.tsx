import React, { useState, useEffect, useRef } from 'react';
import { initialWeddingInfo } from './data/weddingData.ts';
import { WeddingInfo } from './types.ts';
import { weddingAudio } from './utils/audioPlayer.ts';
import { CoverScreen } from './components/screens/CoverScreen.tsx';
import { InvitationDetailsScreen } from './components/screens/InvitationDetailsScreen.tsx';
import { ScheduleScreen } from './components/screens/ScheduleScreen.tsx';
import { LoveStoryScreen } from './components/screens/LoveStoryScreen.tsx';
import { GalleryScreen } from './components/screens/GalleryScreen.tsx';
import { RSVPScreen } from './components/screens/RSVPScreen.tsx';
import { GuestbookScreen } from './components/screens/GuestbookScreen.tsx';
import { GiftBoxScreen } from './components/screens/GiftBoxScreen.tsx';
import { NavigationTabBar, ScreenId } from './components/NavigationTabBar.tsx';
import { FallingPetals } from './components/FallingPetals.tsx';
import { GuestNameModal } from './components/GuestNameModal.tsx';
import {
  Smartphone,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  Share2,
  Heart,
  ChevronLeft,
  Settings,
  Edit2,
  Check,
} from 'lucide-react';

export default function App() {
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo>(initialWeddingInfo);
  const [activeScreen, setActiveScreen] = useState<ScreenId>('cover');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [customArchUrl, setCustomArchUrl] = useState<string | undefined>(undefined);
  const [showShareToast, setShowShareToast] = useState(false);

  const screenContainerRef = useRef<HTMLDivElement>(null);

  // Sync music state with audio player
  useEffect(() => {
    weddingAudio.setCallback((playing) => {
      setIsPlayingMusic(playing);
    });
    return () => {
      weddingAudio.pause();
    };
  }, []);

  // Parse custom guest from URL search params (e.g. ?guest=Anh+Hoang)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest');
    if (guestParam) {
      setWeddingInfo((prev) => ({
        ...prev,
        guestName: decodeURIComponent(guestParam),
      }));
    }
  }, []);

  // Scroll to top when changing screen
  const handleSelectScreen = (screen: ScreenId) => {
    setActiveScreen(screen);
    if (screenContainerRef.current) {
      screenContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleMusic = () => {
    weddingAudio.toggle();
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `Thiệp Cưới ${weddingInfo.groomName} & ${weddingInfo.brideName}`,
        text: `Trân trọng kính mời ${weddingInfo.guestName} tới dự lễ thành hôn của Quốc Tuấn & Bích Hạnh!`,
        url,
      }).catch(() => {
        navigator.clipboard.writeText(url);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2500);
      });
    } else {
      navigator.clipboard.writeText(url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#080d19] text-slate-100 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {/* Soft radial glow behind phone */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[850px] bg-gradient-to-tr from-blue-950/30 via-slate-900/40 to-blue-900/20 blur-[130px] rounded-full" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-900/15 blur-[100px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-900/15 blur-[100px] rounded-full" />
      </div>

      {/* Top Application Header / Controls Toolbar */}
      <header className="w-full max-w-4xl px-4 py-2.5 flex items-center justify-between z-30 select-none">
        {/* Brand / Couple Wordmark */}
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span className="font-serif text-sm sm:text-base font-semibold tracking-wide text-slate-200">
            {weddingInfo.groomName} & {weddingInfo.brideName}
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-sans">
            · 28.03.2026
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Petals toggle */}
          <button
            onClick={() => setPetalsEnabled(!petalsEnabled)}
            className={`p-2 rounded-xl text-xs flex items-center gap-1.5 border transition-all ${
              petalsEnabled
                ? 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
            title={petalsEnabled ? 'Tắt hiệu ứng cánh hoa' : 'Bật hiệu ứng cánh hoa'}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Cánh hoa</span>
          </button>

          {/* Music toggle */}
          <button
            onClick={toggleMusic}
            className={`p-2 rounded-xl text-xs flex items-center gap-1.5 border transition-all ${
              isPlayingMusic
                ? 'bg-amber-950/40 border-amber-800/60 text-amber-300 shadow-xs'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
            title={isPlayingMusic ? 'Tắt nhạc nền' : 'Bật nhạc nền đám cưới'}
          >
            {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">Nhạc cưới</span>
          </button>

          {/* Guest name personalizer */}
          <button
            onClick={() => setIsGuestModalOpen(true)}
            className="p-2 rounded-xl text-xs flex items-center gap-1.5 bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Đổi tên khách mời"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Khách mời</span>
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl text-xs flex items-center gap-1.5 bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Chia sẻ thiệp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chia sẻ</span>
          </button>

          {/* Toggle Phone Simulator vs Full View */}
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className={`p-2 rounded-xl text-xs flex items-center gap-1.5 border transition-all ${
              isPhoneFrame
                ? 'bg-blue-950/50 border-blue-700/60 text-blue-300'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:text-white'
            }`}
            title={isPhoneFrame ? 'Chế độ xem toàn màn hình' : 'Chế độ khung điện thoại'}
          >
            {isPhoneFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPhoneFrame ? 'Toàn màn hình' : 'Khung iPhone'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 flex items-center justify-center p-0 sm:p-4 z-20 overflow-hidden">
        {/* Device Container: Phone mockup or responsive sheet */}
        <div
          className={`relative transition-all duration-300 ${
            isPhoneFrame
              ? 'w-full max-w-[390px] sm:max-w-[400px] h-[100dvh] sm:h-[840px] sm:max-h-[92vh] sm:rounded-[48px] phone-shadow bg-[#131b2c] p-0 sm:p-[10px] ring-1 ring-white/10'
              : 'w-full max-w-lg h-[100dvh] sm:h-[90vh] sm:rounded-3xl shadow-2xl bg-white sm:border sm:border-slate-800 p-0'
          }`}
        >
          {/* Phone Frame Outer Hardware Details (when in Phone Simulator mode) */}
          {isPhoneFrame && (
            <>
              {/* Top Dynamic Island / Speaker Pill */}
              <div className="absolute top-[18px] left-1/2 -translate-x-1/2 z-40 w-[116px] h-[30px] bg-black rounded-full shadow-inner flex items-center justify-between px-3 pointer-events-none hidden sm:flex">
                <div className="w-3 h-3 rounded-full bg-[#18181b] ring-1 ring-zinc-700/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#18181b] ring-1 ring-zinc-700/40" />
              </div>

              {/* Side mute button notch reflection */}
              <div className="absolute -left-[14px] top-24 w-[3px] h-9 bg-slate-700 rounded-l-sm hidden sm:block opacity-60" />
              {/* Volume buttons */}
              <div className="absolute -left-[14px] top-38 w-[3px] h-14 bg-slate-700 rounded-l-sm hidden sm:block opacity-60" />
              <div className="absolute -left-[14px] top-56 w-[3px] h-14 bg-slate-700 rounded-l-sm hidden sm:block opacity-60" />
              {/* Power button */}
              <div className="absolute -right-[14px] top-44 w-[3px] h-18 bg-slate-700 rounded-r-sm hidden sm:block opacity-60" />
            </>
          )}

          {/* Inner Screen Surface */}
          <div
            className={`relative w-full h-full overflow-hidden flex flex-col bg-[#f3f7fa] ${
              isPhoneFrame ? 'sm:rounded-[40px]' : 'sm:rounded-3xl'
            }`}
          >
            {/* Falling Petals Particle Layer */}
            <FallingPetals enabled={petalsEnabled} />

            {/* In-Screen Navigation Header (if not on Cover screen) */}
            {activeScreen !== 'cover' && (
              <div className="sticky top-0 inset-x-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#d8e3ed] px-4 py-2.5 flex items-center justify-between">
                <button
                  onClick={() => handleSelectScreen('cover')}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Trang bìa</span>
                </button>

                <span className="font-serif text-xs font-semibold text-[#18293f] tracking-wide uppercase">
                  {activeScreen === 'invitation' && 'Lời Ngỏ & Thư Mời'}
                  {activeScreen === 'schedule' && 'Chương Trình Hôn Lễ'}
                  {activeScreen === 'story' && 'Chuyện Tình Yêu'}
                  {activeScreen === 'gallery' && 'Album Kỷ Niệm'}
                  {activeScreen === 'rsvp' && 'Xác Nhận Tham Dự'}
                  {activeScreen === 'guestbook' && 'Sổ Lưu Bút'}
                  {activeScreen === 'gift' && 'Hộp Mừng Cưới'}
                </span>

                <button
                  onClick={toggleMusic}
                  className={`p-1.5 rounded-full border transition-colors ${
                    isPlayingMusic
                      ? 'bg-[#1b2b40] text-amber-200 border-[#1b2b40]'
                      : 'bg-white text-slate-500 border-slate-200'
                  }`}
                  title="Nhạc nền"
                >
                  <span className="text-xs font-serif">♫</span>
                </button>
              </div>
            )}

            {/* Scrollable Screen Viewport */}
            <div
              ref={screenContainerRef}
              className="flex-1 w-full overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col"
            >
              {activeScreen === 'cover' && (
                <CoverScreen
                  weddingInfo={weddingInfo}
                  onExploreClick={() => handleSelectScreen('invitation')}
                  onOpenGuestCustomizer={() => setIsGuestModalOpen(true)}
                  customArchUrl={customArchUrl}
                  onArchUrlChange={setCustomArchUrl}
                  isPlayingMusic={isPlayingMusic}
                  onToggleMusic={toggleMusic}
                />
              )}

              {activeScreen === 'invitation' && (
                <InvitationDetailsScreen
                  weddingInfo={weddingInfo}
                  onGoToSchedule={() => handleSelectScreen('schedule')}
                  onGoToRSVP={() => handleSelectScreen('rsvp')}
                />
              )}

              {activeScreen === 'schedule' && <ScheduleScreen />}

              {activeScreen === 'story' && (
                <LoveStoryScreen targetDate={weddingInfo.weddingDate} />
              )}

              {activeScreen === 'gallery' && <GalleryScreen />}

              {activeScreen === 'rsvp' && (
                <RSVPScreen weddingInfo={weddingInfo} />
              )}

              {activeScreen === 'guestbook' && <GuestbookScreen />}

              {activeScreen === 'gift' && <GiftBoxScreen />}

              {/* Extra romantic footer links at bottom of all screens (except cover) */}
              {activeScreen !== 'cover' && (
                <div className="mt-auto py-8 text-center bg-[#ebf1f7] border-t border-[#d8e3ed] text-xs text-slate-500 space-y-1">
                  <div className="font-calligraphy text-2xl text-[#1a2d48]">
                    {weddingInfo.groomName} & {weddingInfo.brideName}
                  </div>
                  <p className="text-[11px] text-slate-500">28 · 03 · 2026 — Trân trọng cảm ơn quý khách</p>
                </div>
              )}
            </div>

            {/* Bottom Tab Bar Navigation */}
            <NavigationTabBar
              activeScreen={activeScreen}
              onSelectScreen={handleSelectScreen}
            />
          </div>
        </div>
      </main>

      {/* Guest Name Customizer Modal */}
      <GuestNameModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        currentGuestName={weddingInfo.guestName}
        onSaveGuestName={(newName) => {
          setWeddingInfo((prev) => ({ ...prev, guestName: newName }));
        }}
      />

      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="fixed bottom-6 z-50 bg-[#1b2b40] text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Đã sao chép liên kết thiệp cưới vào bộ nhớ tạm!</span>
        </div>
      )}
    </div>
  );
}
