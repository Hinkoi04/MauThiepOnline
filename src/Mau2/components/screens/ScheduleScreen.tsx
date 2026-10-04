import React, { useState } from 'react';
import { weddingEvents, initialWeddingInfo } from '../../data/weddingData';
import { BotanicalSprig } from '../BotanicalSprig';
import { WeddingCalendarCard } from '../WeddingCalendarCard';
import { MapPin, Calendar, ExternalLink, Check, Copy, Navigation } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

export const ScheduleScreen: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const event = weddingEvents[0];
  const info = initialWeddingInfo;

  const { ref: calendarRef, isInView: calendarInView } = useInView({ threshold: 0.15 });
  const { ref: parentsRef, isInView: parentsInView } = useInView({ threshold: 0.15 });
  const { ref: eventRef, isInView: eventInView } = useInView({ threshold: 0.15 });
  const { ref: mapRef, isInView: mapInView } = useInView({ threshold: 0.15 });

  if (!event) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(`${event.locationName}: ${event.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(event.calendarTitle);
    const details = encodeURIComponent(`Địa điểm: ${event.locationName} - ${event.address}`);
    const location = encodeURIComponent(event.address);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="relative w-full min-h-full px-4 sm:px-6 py-8 bg-gradient-to-b from-[#faf7fb] via-[#f7eff7] to-[#faf7fb] text-[#300f47] overflow-hidden">
      <BotanicalSprig position="left" color="#c497b2" className="absolute top-2 left-2 scale-75 opacity-60 pointer-events-none" />
      <BotanicalSprig position="right" color="#c497b2" className="absolute top-2 right-2 scale-75 opacity-60 pointer-events-none" />

      <div className="max-w-md mx-auto space-y-7 pt-1">
        
        {/* ── THẺ LỊCH CƯỚI ĐẶC TRƯNG VỚI TRÁI TIM ĐỎ & ẢNH CẶP ĐÔI ── */}
        <div ref={calendarRef} className={`reveal-init reveal-up ${calendarInView ? 'reveal-active' : ''}`}>
          <WeddingCalendarCard weddingDateStr={info.solarDateText} dayToHighlight={29} />
        </div>

        {/* Card chứa toàn bộ thông tin theo mẫu hình */}
        <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border border-[#e8dcef] shadow-md space-y-6">
          
          {/* ── 1. PHẦN NHÀ TRAI - NHÀ GÁI (2 BÊN ĐỐI DIỆN TRƯỢT VÀO NHAU) ── */}
          <div ref={parentsRef} className="grid grid-cols-2 gap-4 text-center overflow-hidden py-1">
            {/* Nhà Trai: Trượt từ bên trái sang */}
            <div 
              className={`space-y-1 reveal-init reveal-left ${
                parentsInView ? 'reveal-active' : ''
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1554]">
                Nhà Trai
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-slate-700">
                Ông: {info.groomParents.father}
              </p>
              <p className="font-sans text-xs sm:text-[13px] text-slate-700">
                Bà: {info.groomParents.mother}
              </p>
              {info.groomParents.hometown && (
                <p className="font-sans text-xs sm:text-[13px] text-slate-600">
                  {info.groomParents.hometown}
                </p>
              )}
            </div>

            {/* Nhà Gái: Trượt từ bên phải sang */}
            <div 
              className={`space-y-1 reveal-init reveal-right ${
                parentsInView ? 'reveal-active' : ''
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#3b1554]">
                Nhà Gái
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-slate-700">
                Ông: {info.brideParents.father}
              </p>
              <p className="font-sans text-xs sm:text-[13px] text-slate-700">
                Bà: {info.brideParents.mother}
              </p>
              {info.brideParents.hometown && (
                <p className="font-sans text-xs sm:text-[13px] text-slate-600">
                  {info.brideParents.hometown}
                </p>
              )}
            </div>
          </div>

          {/* ── 2. TIÊU ĐỀ LỄ CƯỚI & GIỜ TỔ CHỨC ── */}
          <div 
            ref={eventRef} 
            className={`space-y-4 reveal-init reveal-scale ${eventInView ? 'reveal-active' : ''}`}
          >
            <div className="text-center space-y-1 pt-2 border-t border-[#f0e4f5]">
              <h2 className="font-serif text-base sm:text-lg font-bold tracking-[0.18em] text-[#3b1554] uppercase">
                {event.title}
              </h2>
              <p className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-[#4a1d6d] uppercase">
                {event.timePrefix || `VÀO LÚC ${event.time}`}
              </p>
            </div>

            {/* ── 3. KHỐI HIỂN THỊ NGÀY ĐẶC TRƯNG: [THÁNG] [NGÀY TO] [NĂM] ── */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 py-1">
              {/* THÁNG */}
              <div className="flex-1 text-center">
                <div className="border-t border-b border-[#3b1554]/30 py-1.5 sm:py-2 px-1">
                  <span className="font-serif text-sm sm:text-base font-bold tracking-widest text-[#3b1554] uppercase block">
                    {event.monthText || 'THÁNG 07'}
                  </span>
                </div>
              </div>

              {/* CON SỐ NGÀY RẤT TO Ở CHÍNH GIỮA */}
              <div className="shrink-0 px-2 transform hover:scale-105 transition-transform">
                <span className="font-serif text-5xl sm:text-6xl font-semibold text-[#802534] leading-none select-none block drop-shadow-xs">
                  {event.day || '29'}
                </span>
              </div>

              {/* NĂM */}
              <div className="flex-1 text-center">
                <div className="border-t border-b border-[#3b1554]/30 py-1.5 sm:py-2 px-1">
                  <span className="font-serif text-sm sm:text-base font-bold tracking-widest text-[#3b1554] uppercase block">
                    {event.yearText || 'NĂM 2026'}
                  </span>
                </div>
              </div>
            </div>

            {/* ── 4. NGÀY ÂM LỊCH ── */}
            <div className="text-center">
              <p className="font-serif italic text-xs sm:text-sm text-slate-600">
                {event.lunarText || `(${info.lunarDateText})`}
              </p>
            </div>

            {/* ── 5. ĐỊA ĐIỂM TỔ CHỨC ── */}
            <div className="text-center space-y-1 pt-1">
              <h3 className="font-serif text-sm sm:text-base font-bold tracking-[0.18em] text-[#3b1554] uppercase">
                {event.locationName || 'ĐỊA ĐIỂM TỔ CHỨC'}
              </h3>
              <p className="font-serif text-xs sm:text-[13px] text-slate-700 max-w-xs mx-auto leading-relaxed">
                ({event.address})
              </p>
            </div>
          </div>

          {/* ── 6. KHUNG BẢN ĐỒ GOOGLE MAPS EMBEDDED KÈM NÚT MAPS ── */}
          <div 
            ref={mapRef} 
            className={`space-y-2 pt-2 reveal-init reveal-up ${mapInView ? 'reveal-active' : ''}`}
          >
            <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden border border-[#dfd0ed] shadow-inner bg-slate-100 group">
              {event.mapEmbedUrl ? (
                <iframe
                  title="Google Maps Location"
                  src={event.mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center text-xs space-y-2 bg-[#f9f5fc]">
                  <MapPin className="w-8 h-8 text-[#8b5eb5]" />
                  <span>Bản đồ vị trí sẽ hiển thị tại đây</span>
                </div>
              )}

              {/* Nút Maps nổi ở góc trên bên trái giống hình mẫu */}
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold py-1.5 px-3 rounded-lg shadow-md border border-slate-200 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer z-10"
              >
                <span>Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#3b1554]" />
              </a>
            </div>

            {/* Các nút tiện ích: Chép địa chỉ & Chỉ đường */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={copyAddress}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors cursor-pointer border border-slate-200/70 shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Đã chép địa chỉ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Chép địa chỉ</span>
                  </>
                )}
              </button>

              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#4a1d6d] hover:bg-[#5c2487] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-200" />
                <span>Chỉ đường Maps</span>
              </a>
            </div>

            {/* Thêm vào Google Calendar */}
            <div className="text-center pt-1">
              <a
                href={createGoogleCalendarLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#7c4a9e] hover:text-[#4a1d6d] font-medium py-1 px-3 rounded-full hover:bg-purple-50 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Thêm sự kiện vào Google Calendar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
