import React from 'react';
import { weddingEvents } from '../../data/weddingData.ts';
import { BotanicalSprig } from '../BotanicalSprig.tsx';
import { MapPin, Clock, ExternalLink } from 'lucide-react';

export const ScheduleScreen: React.FC = () => {

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

              {/* Action Button - Chỉ đường */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href={evt.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#edf3f8] hover:bg-[#dfeaf4] text-[#1b2b40] text-xs font-semibold transition-colors w-full"
                >
                  <MapPin className="w-4 h-4 text-[#355070]" />
                  <span>Chỉ đường Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
