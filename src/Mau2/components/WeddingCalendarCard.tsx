import React from 'react';
import { initialWeddingInfo, galleryPhotos } from '../data/weddingData';
import { Heart } from 'lucide-react';

interface WeddingCalendarCardProps {
  photoUrl?: string;
  weddingDateStr?: string;
  dayToHighlight?: number;
}

export const WeddingCalendarCard: React.FC<WeddingCalendarCardProps> = ({
  photoUrl = galleryPhotos[0]?.url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=85',
  weddingDateStr = '29.07.2026',
  dayToHighlight = 29,
}) => {
  const info = initialWeddingInfo;

  // July 2026 calendar data: July 1, 2026 is a Wednesday (Wed)
  // Mon (0), Tue (1), Wed (2), Thu (3), Fri (4), Sat (5), Sun (6)
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // July 2026 calendar days:
  // Week 1: null, null, 1, 2, 3, 4, 5
  // Week 2: 6, 7, 8, 9, 10, 11, 12
  // Week 3: 13, 14, 15, 16, 17, 18, 19
  // Week 4: 20, 21, 22, 23, 24, 25, 26
  // Week 5: 27, 28, 29, 30, 31, null, null
  const daysGrid: (number | null)[] = [
    null, null, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, null, null,
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-3.5 select-none">
      {/* Couple Names & Date in Cursive Calligraphy */}
      <div className="text-center space-y-0.5">
        <h3 className="font-calligraphy text-2xl sm:text-3xl text-[#3b1554]">
          {info.groomName} & {info.brideName}
        </h3>
        <p className="font-serif text-lg sm:text-xl font-medium tracking-[0.2em] text-[#541f7a]">
          {weddingDateStr}
        </p>
      </div>

      {/* Main Calendar Card in Pastel Purple Tone */}
      <div className="bg-gradient-to-br from-[#9880ad] via-[#8f75a4] to-[#866c9b] text-white rounded-3xl p-4 sm:p-5 shadow-lg border border-purple-200/40 relative overflow-hidden">
        <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
          
          {/* ── CỘT TRÁI: ẢNH CƯỚI ĐỨNG CÓ THANH NGÀY DƯỚI ĐÁY ── */}
          <div className="col-span-5 flex flex-col items-center">
            <div className="w-full rounded-2xl overflow-hidden shadow-md bg-white border border-white/90">
              <div className="w-full h-44 sm:h-52 overflow-hidden bg-slate-200">
                <img
                  src={photoUrl}
                  alt="Ảnh cưới"
                  className="w-full h-full object-cover object-[center_20%]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Thanh hiển thị ngày cưới dưới đáy ảnh */}
              <div className="bg-white py-1 text-center border-t border-slate-100">
                <span className="font-serif text-[11px] sm:text-xs font-semibold tracking-wider text-slate-800">
                  {weddingDateStr}
                </span>
              </div>
            </div>
          </div>

          {/* ── CỘT PHẢI: LỊCH THÁNG & NGÀY CƯỚI TRÁI TIM ── */}
          <div className="col-span-7 space-y-2.5 pl-1 sm:pl-2">
            {/* Header Tháng */}
            <div className="text-right pr-1">
              <span className="font-sans text-sm sm:text-base font-bold tracking-wide text-white drop-shadow-xs">
                Tháng 07.2026
              </span>
            </div>

            {/* Thứ trong tuần */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {weekdays.map((d, i) => (
                <span
                  key={i}
                  className="text-[10px] sm:text-[11px] font-semibold text-purple-200 tracking-tight"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Lưới ngày */}
            <div className="grid grid-cols-7 gap-y-1.5 sm:gap-y-2 gap-x-1 text-center items-center">
              {daysGrid.map((day, idx) => {
                if (day === null) {
                  return <div key={idx} className="h-6 sm:h-7" />;
                }
                const isWeddingDay = day === dayToHighlight;

                return (
                  <div key={idx} className="flex items-center justify-center h-6 sm:h-7">
                    {isWeddingDay ? (
                      /* Ngày cưới được làm nổi bật với biểu tượng trái tim đỏ */
                      <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-md animate-pulse">
                        <Heart className="absolute inset-0 w-full h-full text-rose-600 fill-rose-600 -z-10 scale-125 opacity-40 animate-ping" />
                        <span className="z-10 text-[11px] sm:text-xs font-bold leading-none">
                          {day}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11.5px] sm:text-xs font-normal text-white/90">
                        {day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
