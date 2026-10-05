import React from 'react';
import type { WeddingInfo } from '../../types';
import { Calendar, MessageSquareHeart, Heart } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface InvitationDetailsScreenProps {
  weddingInfo: WeddingInfo;
  onGoToSchedule: () => void;
  onGoToGuestbook?: () => void;
}

export const InvitationDetailsScreen: React.FC<InvitationDetailsScreenProps> = ({
  weddingInfo,
  onGoToSchedule,
  onGoToGuestbook,
}) => {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.15 });
  const { ref: letterRef, isInView: letterInView } = useInView({ threshold: 0.15 });
  const { ref: actionRef, isInView: actionInView } = useInView({ threshold: 0.15 });

  return (
    <div className="relative w-full min-h-full px-4 sm:px-6 py-8 bg-gradient-to-b from-[#faf7fb] via-[#f7eff7] to-[#faf7fb] text-[#300f47] overflow-hidden">
      <div className="max-w-md mx-auto text-center space-y-6 pt-2">
        {/* Title */}
        <div 
          ref={titleRef}
          className={`space-y-1 reveal-init reveal-up ${titleInView ? 'reveal-active' : ''}`}
        >
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#7c4a9e] uppercase">
            THƯ NGỎ
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#3b1554] tracking-wide">
            Lời Mời Trang Trọng
          </h2>
          <div className="w-12 h-0.5 bg-[#a87ccb] mx-auto mt-2" />
        </div>

        {/* Formal Invitation Letter Card */}
        <div 
          ref={letterRef}
          className={`bg-white/95 backdrop-blur-xs rounded-3xl p-6 sm:p-7 border border-[#e8dcef] shadow-md text-center space-y-5 reveal-init reveal-scale ${
            letterInView ? 'reveal-active' : ''
          }`}
        >
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans italic">
            "Hôn nhân là bến đỗ bình yên, nơi tình yêu được đơm hoa kết trái. Trong ngày vui trọng đại của cuộc đời, sự hiện diện và lời chúc phúc của quý khách là niềm vinh hạnh to lớn đối với chúng tôi."
          </p>

          <div className="p-4 bg-[#f8f2fc] rounded-2xl border border-[#e8daf5] space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#6b3594] font-medium block">
              Trân trọng kính mời
            </span>
            <span className="font-calligraphy text-2xl sm:text-3xl text-[#3b1554] font-normal block py-0.5">
              {weddingInfo.guestName}
            </span>
            <span className="text-xs text-slate-500 block leading-relaxed">
              Tới dự bữa cơm thân mật chung vui cùng gia đình chúng tôi
            </span>
          </div>

          {/* Couple Signatures */}
          <div className="pt-2 flex items-center justify-center gap-3 text-slate-800">
            <span className="font-calligraphy text-2xl text-[#3b1554]">{weddingInfo.groomFullName}</span>
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
            <span className="font-calligraphy text-2xl text-[#3b1554]">{weddingInfo.brideFullName}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          ref={actionRef}
          className={`grid grid-cols-2 gap-3 pt-1 reveal-init reveal-up ${
            actionInView ? 'reveal-active' : ''
          }`}
        >
          <button
            onClick={onGoToSchedule}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-[#d8c2ed] text-slate-800 text-xs font-semibold hover:bg-purple-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#6b3594]" />
            <span>Xem thời gian & địa điểm</span>
          </button>
          <button
            onClick={onGoToGuestbook}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#4a1d6d] hover:bg-[#5c2487] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <MessageSquareHeart className="w-4 h-4 text-pink-300" />
            <span>Gửi lời chúc</span>
          </button>
        </div>
      </div>
    </div>
  );
};
