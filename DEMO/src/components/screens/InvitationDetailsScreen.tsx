import React from 'react';
import { WeddingInfo } from '../../types.ts';
import { BotanicalSprig } from '../BotanicalSprig.tsx';
import { Heart, Calendar, Users, MapPin, Sparkles } from 'lucide-react';

interface InvitationDetailsScreenProps {
  weddingInfo: WeddingInfo;
  onGoToSchedule: () => void;
  onGoToRSVP: () => void;
}

export const InvitationDetailsScreen: React.FC<InvitationDetailsScreenProps> = ({
  weddingInfo,
  onGoToSchedule,
  onGoToRSVP,
}) => {
  return (
    <div className="relative w-full min-h-full px-5 py-6 bg-gradient-to-b from-[#f3f7fa] via-[#edf3f8] to-[#f8fafc] text-[#1b2b40]">
      {/* Decorative corners */}
      <BotanicalSprig position="left" className="absolute top-2 left-2 scale-75 opacity-60" />
      <BotanicalSprig position="right" className="absolute top-2 right-2 scale-75 opacity-60" />

      <div className="max-w-md mx-auto text-center space-y-6 pt-4">
        {/* Title */}
        <div className="space-y-1">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#607791] uppercase">
            THƯ NGỎ
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#18293f] tracking-wide">
            Lời Mời Trang Trọng
          </h2>
          <div className="w-12 h-0.5 bg-[#8da2b5] mx-auto mt-2" />
        </div>

        {/* Formal Invitation Card */}
        <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-6 border border-[#d8e3ed] shadow-xs text-center space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            Hôn nhân là bến đỗ bình yên, nơi tình yêu được đơm hoa kết trái. Trong ngày vui trọng đại của cuộc đời, sự hiện diện và lời chúc phúc của quý khách là niềm vinh hạnh to lớn đối với gia đình chúng tôi.
          </p>

          <div className="p-3 bg-[#f0f5fa] rounded-xl border border-[#d0deeb]">
            <span className="text-[11px] uppercase tracking-wider text-[#546b84] font-medium block">
              Trân trọng kính mời
            </span>
            <span className="font-calligraphy text-2xl sm:text-3xl text-[#1a2d48] font-normal block mt-1">
              {weddingInfo.guestName}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Tới dự bữa cơm thân mật chung vui cùng gia đình chúng tôi
            </span>
          </div>

          {/* Families Section */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-left">
            {/* Groom Family */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#355070] block">
                NHÀ TRAI
              </span>
              <p className="text-xs text-slate-600">
                <span className="text-slate-400 block text-[10px]">Thân phụ:</span>
                <span className="font-medium text-slate-800">{weddingInfo.groomParents.father}</span>
              </p>
              <p className="text-xs text-slate-600">
                <span className="text-slate-400 block text-[10px]">Thân mẫu:</span>
                <span className="font-medium text-slate-800">{weddingInfo.groomParents.mother}</span>
              </p>
              <p className="text-xs font-semibold text-[#1b2b40] pt-1">
                Chú rể: <span className="font-serif">{weddingInfo.groomFullName}</span>
              </p>
            </div>

            {/* Bride Family */}
            <div className="space-y-1 border-l border-slate-100 pl-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#355070] block">
                NHÀ GÁI
              </span>
              <p className="text-xs text-slate-600">
                <span className="text-slate-400 block text-[10px]">Thân phụ:</span>
                <span className="font-medium text-slate-800">{weddingInfo.brideParents.father}</span>
              </p>
              <p className="text-xs text-slate-600">
                <span className="text-slate-400 block text-[10px]">Thân mẫu:</span>
                <span className="font-medium text-slate-800">{weddingInfo.brideParents.mother}</span>
              </p>
              <p className="text-xs font-semibold text-[#1b2b40] pt-1">
                Cô dâu: <span className="font-serif">{weddingInfo.brideFullName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Date Highlight */}
        <div className="bg-[#1b2b40] text-white rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-center gap-2 text-amber-200 text-xs tracking-wider uppercase font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thời gian diễn ra</span>
          </div>
          <div className="font-serif text-2xl font-medium tracking-wide">
            {weddingInfo.solarDateText}
          </div>
          <div className="text-xs text-slate-300 font-sans tracking-wide">
            {weddingInfo.lunarDateText}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onGoToSchedule}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#cbd8e5] text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Calendar className="w-4 h-4 text-[#355070]" />
            <span>Xem lịch trình</span>
          </button>
          <button
            onClick={onGoToRSVP}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1b2b40] text-white text-xs font-semibold hover:bg-[#263c59] transition-colors shadow-sm"
          >
            <Users className="w-4 h-4 text-amber-200" />
            <span>Xác nhận tham dự</span>
          </button>
        </div>
      </div>
    </div>
  );
};
