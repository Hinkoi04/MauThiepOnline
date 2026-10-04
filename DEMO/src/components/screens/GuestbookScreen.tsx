import React, { useState, useEffect } from 'react';
import { initialWishes } from '../../data/weddingData.ts';
import { GuestWish } from '../../types.ts';
import { BotanicalSprig } from '../BotanicalSprig.tsx';
import { Heart, Send, MessageSquareHeart, Sparkles } from 'lucide-react';

export const GuestbookScreen: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Bạn bè');
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
      relation: relation.trim(),
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
    <div className="relative w-full min-h-full px-4 sm:px-5 py-6 bg-gradient-to-b from-[#f3f7fa] via-[#edf3f8] to-[#f8fafc] text-[#1b2b40]">
      <BotanicalSprig position="left" className="absolute top-2 left-2 scale-75 opacity-60" />
      <BotanicalSprig position="right" className="absolute top-2 right-2 scale-75 opacity-60" />

      <div className="max-w-md mx-auto space-y-6 pt-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#607791] uppercase">
            SỔ LƯU BÚT
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#18293f] tracking-wide">
            Gửi Lời Chúc Phúc
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Mỗi lời chúc là một món quà vô giá dành cho cặp đôi mới cưới
          </p>
          <div className="w-12 h-0.5 bg-[#8da2b5] mx-auto mt-2" />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSendWish}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-[#d8e3ed] shadow-xs space-y-3 text-xs"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Tên của bạn <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Minh Hằng"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#355070]"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Mối quan hệ</label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:border-[#355070]"
              >
                <option value="Bạn bè">Bạn bè</option>
                <option value="Đồng nghiệp">Đồng nghiệp</option>
                <option value="Họ hàng Nhà Trai">Họ hàng Nhà Trai</option>
                <option value="Họ hàng Nhà Gái">Họ hàng Nhà Gái</option>
                <option value="Anh chị em">Anh chị em</option>
                <option value="Người thân quý">Người thân quý</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Lời chúc tốt đẹp nhất <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Gửi lời chúc ngọt ngào đến Quốc Tuấn & Bích Hạnh nhé..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#355070] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#1b2b40] hover:bg-[#273d5a] text-white font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Gửi Lời Chúc Mừng</span>
          </button>
        </form>

        {/* Wishes List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-medium text-slate-700">
              Lời chúc đã nhận ({wishes.length})
            </span>
            <span className="text-[11px]">Cập nhật liên tục</span>
          </div>

          {wishes.map((wish) => {
            const isLiked = likedIds.includes(wish.id);
            return (
              <div
                key={wish.id}
                className="bg-white rounded-xl p-4 border border-[#d8e3ed] shadow-2xs space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#eef4fa] text-[#355070] font-bold flex items-center justify-center text-xs">
                      {wish.senderName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block leading-tight">
                        {wish.senderName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {wish.relation} · {wish.timestamp}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(wish.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                      isLiked
                        ? 'bg-rose-50 text-rose-600 font-semibold'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                      }`}
                    />
                    <span>{wish.likes}</span>
                  </button>
                </div>

                <p className="text-slate-700 font-sans leading-relaxed pl-9">
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
