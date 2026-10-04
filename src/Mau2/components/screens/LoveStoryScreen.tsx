import React, { useState, useEffect } from 'react';
import { loveMilestones } from '../../data/weddingData';
import { BotanicalSprig } from '../BotanicalSprig';
import { Heart, Sparkles, Coffee, Home, Clock } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface LoveStoryScreenProps {
  targetDate: string; // ISO date
}

export const LoveStoryScreen: React.FC<LoveStoryScreenProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.15 });
  const { ref: countdownRef, isInView: countdownInView } = useInView({ threshold: 0.15 });
  const { ref: timelineRef, isInView: timelineInView } = useInView({ threshold: 0.15 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-4 h-4 text-[#8b5eb5]" />;
      case 'Heart':
        return <Heart className="w-4 h-4 text-purple-500 fill-purple-400/40" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'Home':
        return <Home className="w-4 h-4 text-[#6b3594]" />;
      default:
        return <Heart className="w-4 h-4 text-[#8b5eb5]" />;
    }
  };

  return (
    <div className="relative w-full min-h-full px-4 sm:px-5 py-6 bg-gradient-to-b from-[#faf6fe] via-[#f5ebfc] to-[#faf6fe] text-[#300f47] overflow-hidden">
      <BotanicalSprig position="left" color="#8b5eb5" className="absolute top-2 left-2 scale-75 opacity-70 pointer-events-none" />
      <BotanicalSprig position="right" color="#8b5eb5" className="absolute top-2 right-2 scale-75 opacity-70 pointer-events-none" />

      <div className="max-w-md mx-auto space-y-6 pt-4">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center space-y-1 reveal-init reveal-up ${headerInView ? 'reveal-active' : ''}`}
        >
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#7c4a9e] uppercase">
            HÀNH TRÌNH YÊU THƯƠNG
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#3b1554] tracking-wide">
            Câu Chuyện Tình Yêu
          </h2>
          <div className="w-12 h-0.5 bg-[#a87ccb] mx-auto mt-2" />
        </div>

        {/* Live Countdown Box */}
        <div 
          ref={countdownRef}
          className={`bg-white rounded-2xl p-5 border border-[#e2d3f2] shadow-sm text-center reveal-init reveal-scale ${
            countdownInView ? 'reveal-active' : ''
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#6b3594] font-semibold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-[#8b5eb5]" />
            <span>Đếm ngược ngày trọng đại</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { val: timeLeft.days, label: 'Ngày' },
              { val: timeLeft.hours, label: 'Giờ' },
              { val: timeLeft.minutes, label: 'Phút' },
              { val: timeLeft.seconds, label: 'Giây' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#f8f2fc] rounded-xl p-2.5 border border-[#e8daf5] flex flex-col items-center justify-center"
              >
                <span className="font-serif text-2xl font-bold text-[#3b1554] tabular-nums">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-medium text-slate-500 mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Timeline */}
        <div 
          ref={timelineRef}
          className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#d8c2ed]"
        >
          {loveMilestones.map((milestone, idx) => (
            <div 
              key={idx} 
              className={`relative group reveal-init ${
                idx % 2 === 0 ? 'reveal-left' : 'reveal-right'
              } ${timelineInView ? 'reveal-active' : ''}`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-[#8b5eb5] flex items-center justify-center shadow-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8b5eb5]" />
              </div>

              {/* Card */}
              <div className="bg-white/95 rounded-xl p-4 border border-[#e2d3f2] shadow-2xs hover:border-[#c4a6e3] transition-all">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-[#f8f2fc]">
                      {getIcon(milestone.iconName)}
                    </span>
                    <h3 className="font-serif text-sm font-semibold text-slate-900">
                      {milestone.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-[#6b3594] bg-[#f4eafc] px-2 py-0.5 rounded-full">
                    {milestone.year}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Romantic Quote */}
        <div className="text-center p-4 bg-white/80 rounded-xl border border-purple-100 italic text-xs text-[#541f7a] font-serif">
          "Hạnh phúc không phải là tìm được một người hoàn hảo, mà là học cách nhìn thấy những điều tuyệt vời từ một người không hoàn hảo."
        </div>
      </div>
    </div>
  );
};
