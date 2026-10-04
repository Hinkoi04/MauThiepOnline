import React, { useState, useEffect } from 'react';
import { initialWishes } from '../../data/weddingData';
import type { GuestWish } from '../../types';
import { BotanicalSprig } from '../BotanicalSprig';
import { Heart, Send } from 'lucide-react';

export const GuestbookScreen: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes');
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(initialWishes);
      }
    } catch {
      setWishes(initialWishes);
    }
  }, []);

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: GuestWish = {
      id: Date.now().toString(),
      senderName: name.trim(),
      relation: 'Khách mời',
      message: message.trim(),
      likes: 1,
      timestamp: 'Vừa xong',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('wedding_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setName('');
    setMessage('');
  };

  const handleLike = (id: string) => {
    const isLiked = likedIds.includes(id);
    const updatedLiked = isLiked
      ? likedIds.filter((item) => item !== id)
      : [...likedIds, id];
    setLikedIds(updatedLiked);

    const updatedWishes = wishes.map((w) => {
      if (w.id === id) {
        return { ...w, likes: isLiked ? Math.max(0, w.likes - 1) : w.likes + 1 };
      }
      return w;
    });

    setWishes(updatedWishes);
    try {
      localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative w-full min-h-full px-4 sm:px-5 py-6 bg-gradient-to-b from-[#faf6fe] via-[#f5ebfc] to-[#faf6fe] text-[#300f47]">
      <BotanicalSprig position="left" color="#8b5eb5" className="absolute top-2 left-2 scale-75 opacity-70" />
      <BotanicalSprig position="right" color="#8b5eb5" className="absolute top-2 right-2 scale-75 opacity-70" />

      <div className="max-w-md mx-auto space-y-6 pt-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#7c4a9e] uppercase">
            SỔ LƯU BÚT
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#3b1554] tracking-wide">
            Gửi Lời Chúc Phúc
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Mỗi lời chúc là một món quà vô giá dành cho cặp đôi mới cưới
          </p>
          <div className="w-12 h-0.5 bg-[#a87ccb] mx-auto mt-2" />
        </div>

        {/* Input Form: Chỉ Tên và Lời Chúc */}
        <form
          onSubmit={handleSendWish}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2d3f2] shadow-sm space-y-3.5 text-xs"
        >
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">
              Tên của bạn <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ và tên hoặc danh xưng..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c2ed] bg-[#fbf9fe] focus:outline-hidden focus:border-[#8b5eb5] focus:bg-white text-slate-800 text-xs transition-colors"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">
              Lời chúc tốt đẹp nhất <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Gửi lời chúc mừng ngọt ngào đến Cô Dâu & Chú Rể..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#d8c2ed] bg-[#fbf9fe] focus:outline-hidden focus:border-[#8b5eb5] focus:bg-white text-slate-800 text-xs resize-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#4a1d6d] hover:bg-[#5c2487] text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 text-pink-300" />
            <span>Gửi Lời Chúc Mừng</span>
          </button>
        </form>

        {/* Wishes List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-medium text-[#4a1d6d]">
              Lời chúc đã nhận ({wishes.length})
            </span>
            <span className="text-[11px] text-purple-400">Cập nhật liên tục</span>
          </div>

          {wishes.map((wish) => {
            const isLiked = likedIds.includes(wish.id);
            return (
              <div
                key={wish.id}
                className="bg-white rounded-xl p-4 border border-[#e2d3f2] shadow-2xs space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#f3e7fb] text-[#6b3594] font-bold flex items-center justify-center text-xs border border-[#e2d3f2]">
                      {wish.senderName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block leading-tight">
                        {wish.senderName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {wish.timestamp}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(wish.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition-colors cursor-pointer ${
                      isLiked
                        ? 'bg-rose-50 text-rose-600 font-semibold'
                        : 'bg-purple-50 text-[#7c4a9e] hover:bg-purple-100'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isLiked ? 'fill-rose-500 text-rose-500' : 'text-purple-400'
                      }`}
                    />
                    <span>{wish.likes}</span>
                  </button>
                </div>

                <p className="text-slate-700 font-sans leading-relaxed pl-10.5">
                  "{wish.message}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
