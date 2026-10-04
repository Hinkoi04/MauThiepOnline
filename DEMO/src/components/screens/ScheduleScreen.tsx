import React, { useState } from 'react';
import { weddingEvents } from '../../data/weddingData.ts';
import { WeddingEvent } from '../../types.ts';
import { BotanicalSprig } from '../BotanicalSprig.tsx';
import { MapPin, Clock, Calendar, ExternalLink, Check, Copy } from 'lucide-react';

export const ScheduleScreen: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyAddress = (event: WeddingEvent) => {
    navigator.clipboard.writeText(`${event.locationName}, ${event.address}`);
    setCopiedId(event.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const createGoogleCalendarLink = (event: WeddingEvent) => {
    // 2026-03-28
    const title = encodeURIComponent(event.calendarTitle);
    const details = encodeURIComponent(`Địa điểm: ${event.locationName} - ${event.address}`);
    const location = encodeURIComponent(`${event.locationName}, ${event.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="relative w-full min-h-full px-4 sm:px-5 py-6 bg-gradient-to-b from-[#f3f7fa] via-[#edf3f8] to-[#f8fafc] text-[#1b2b40]">
      <BotanicalSprig position="left" className="absolute top-2 left-2 scale-75 opacity-60" />
      <BotanicalSprig position="right" className="absolute top-2 right-2 scale-75 opacity-60" />

      <div className="max-w-md mx-auto space-y-6 pt-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#607791] uppercase">
            CHƯƠNG TRÌNH HÔN LỄ
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#18293f] tracking-wide">
            Thời Gian & Địa Điểm
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Sự hiện diện của quý vị là niềm hạnh phúc lớn lao cho chúng tôi
          </p>
          <div className="w-12 h-0.5 bg-[#8da2b5] mx-auto mt-2" />
        </div>

        {/* Events Timeline Cards */}
        <div className="space-y-4">
          {weddingEvents.map((evt, idx) => (
            <div
              key={evt.id}
              className={`bg-white rounded-2xl p-5 border transition-all ${
                evt.type === 'reception'
                  ? 'border-[#355070] shadow-md ring-1 ring-[#355070]/20'
                  : 'border-[#d8e3ed] shadow-xs hover:border-[#b0c4de]'
              }`}
            >
              {/* Event Badge & Time */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      evt.type === 'reception'
                        ? 'bg-[#1b2b40] text-amber-200'
                        : 'bg-[#edf3f8] text-[#355070]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-[#1b2b40]">
                    {evt.title}
                  </h3>
                </div>

                {evt.type === 'reception' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                    TIỆC CHÍNH
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="py-3 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <Clock className="w-4 h-4 text-[#355070] shrink-0" />
                  <span className="text-sm font-semibold">{evt.time}</span>
                  <span className="text-slate-400">·</span>
                  <span>{evt.date}</span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#355070] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">{evt.locationName}</span>
                    <span className="text-slate-500 block leading-relaxed">{evt.address}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => copyAddress(evt)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-medium transition-colors"
                >
                  {copiedId === evt.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Chép địa chỉ</span>
                    </>
                  )}
                </button>

                <a
                  href={evt.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#edf3f8] hover:bg-[#dfeaf4] text-[#1b2b40] text-[11px] font-semibold transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#355070]" />
                  <span>Chỉ đường</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>

              <div className="mt-2 text-center">
                <a
                  href={createGoogleCalendarLink(evt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#355070] hover:text-[#18293f] font-medium underline-offset-2 hover:underline"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Thêm sự kiện này vào Google Calendar</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
