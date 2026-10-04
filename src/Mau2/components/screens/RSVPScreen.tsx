import { useState } from 'react';
import { BotanicalSprig } from '../BotanicalSprig';
import type { WeddingInfo, RSVPResponse } from '../../types';
import { CheckCircle2, Send } from 'lucide-react';

interface RSVPScreenProps {
  weddingInfo: WeddingInfo;
  onSubmittedSuccess?: () => void;
}

export const RSVPScreen: React.FC<RSVPScreenProps> = ({ weddingInfo }) => {
  const [name, setName] = useState(
    weddingInfo.guestName && weddingInfo.guestName !== 'Anh/ Chị & Người thương'
      ? weddingInfo.guestName
      : ''
  );
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | 'unsure'>('yes');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [attendingEvent, setAttendingEvent] = useState<string>('Tiệc Cưới Trống Đồng Palace (17:30)');
  const [dietary, setDietary] = useState<'standard' | 'vegetarian' | 'other'>('standard');
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const rsvpData: RSVPResponse = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      attending,
      guestCount,
      attendingEvent,
      dietary,
      note: note.trim(),
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      localStorage.setItem('wedding_rsvps', JSON.stringify([rsvpData, ...existing]));
    } catch {
      // fallback
    }

    setIsSubmitted(true);
  };

  return (
    <div className="relative w-full min-h-full px-4 sm:px-5 py-6 bg-gradient-to-b from-[#f3f7fa] via-[#edf3f8] to-[#f8fafc] text-[#1b2b40]">
      <BotanicalSprig position="left" className="absolute top-2 left-2 scale-75 opacity-60" />
      <BotanicalSprig position="right" className="absolute top-2 right-2 scale-75 opacity-60" />

      <div className="max-w-md mx-auto space-y-6 pt-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#607791] uppercase">
            XÁC NHẬN THAM DỰ
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#18293f] tracking-wide">
            Đăng Ký Tham Dự (RSVP)
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Vui lòng phản hồi trước ngày 20/03/2026 để chúng mình chuẩn bị chu đáo nhất
          </p>
          <div className="w-12 h-0.5 bg-[#8da2b5] mx-auto mt-2" />
        </div>

        {isSubmitted ? (
          <div className="bg-white rounded-2xl p-6 border border-[#d8e3ed] shadow-xs text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl font-semibold text-slate-900">
                Gửi phản hồi thành công!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cảm ơn <strong>{name}</strong> rất nhiều! Chúng mình đã ghi nhận thông tin phản hồi của bạn. Hẹn gặp bạn trong ngày vui nhé!
              </p>
            </div>

            <div className="p-3 bg-[#f0f5fa] rounded-xl text-xs text-slate-600 text-left space-y-1">
              <div><strong>Trạng thái:</strong> {attending === 'yes' ? 'Sẽ tham dự' : attending === 'no' ? 'Rất tiếc không thể đến' : 'Chưa chắc chắn'}</div>
              {attending === 'yes' && (
                <>
                  <div><strong>Số người đi cùng:</strong> {guestCount} người</div>
                  <div><strong>Buổi lễ:</strong> {attendingEvent}</div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs text-[#355070] font-semibold underline underline-offset-2"
            >
              Chỉnh sửa thông tin đã gửi
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-5 border border-[#d8e3ed] shadow-xs space-y-4 text-xs"
          >
            {/* Guest Name */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 block">
                Họ và tên của bạn <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên quý khách (VD: Nguyễn Văn A)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#355070] focus:ring-1 focus:ring-[#355070] text-slate-800"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 block">
                Số điện thoại liên hệ
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912 xxx xxx"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#355070] focus:ring-1 focus:ring-[#355070] text-slate-800"
              />
            </div>

            {/* Attendance Choice */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 block">
                Bạn sẽ tham dự chứ? <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'yes', label: 'Chắc chắn đến ✨' },
                  { id: 'unsure', label: 'Chưa chắc 🤔' },
                  { id: 'no', label: 'Rất tiếc vắng mặt' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAttending(item.id as 'yes' | 'no' | 'unsure')}
                    className={`py-2 px-2 rounded-xl text-center font-medium transition-all ${
                      attending === item.id
                        ? 'bg-[#1b2b40] text-white shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {attending !== 'no' && (
              <>
                {/* Guest Count */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800 block">
                    Số lượng người tham dự
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`flex-1 py-2 rounded-xl text-center font-semibold transition-all ${
                          guestCount === num
                            ? 'bg-[#1b2b40] text-white'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {num} người
                      </button>
                    ))}
                  </div>
                </div>

                {/* Event Choice */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800 block">
                    Buổi tiệc bạn sẽ tham dự
                  </label>
                  <select
                    value={attendingEvent}
                    onChange={(e) => setAttendingEvent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#355070] text-slate-800"
                  >
                    <option value="Tiệc Cưới Trống Đồng Palace (17:30)">
                      Tiệc Cưới Trống Đồng Palace (17:30 - 28/03/2026)
                    </option>
                    <option value="Lễ Thành Hôn Nhà Trai (11:00)">
                      Lễ Thành Hôn Nhà Trai (11:00 - 28/03/2026)
                    </option>
                    <option value="Lễ Vu Quy Nhà Gái (08:30)">
                      Lễ Vu Quy Nhà Gái (08:30 - 28/03/2026)
                    </option>
                    <option value="Tham dự trọn vẹn cả ngày">
                      Tham dự trọn vẹn cả ngày
                    </option>
                  </select>
                </div>

                {/* Dietary Preference */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-800 block">
                    Khẩu phần ăn
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDietary('standard')}
                      className={`py-2 px-3 rounded-xl font-medium text-center transition-colors ${
                        dietary === 'standard'
                          ? 'bg-[#1b2b40] text-white'
                          : 'bg-slate-50 text-slate-600 border border-slate-200'
                      }`}
                    >
                      Món ăn thông thường
                    </button>
                    <button
                      type="button"
                      onClick={() => setDietary('vegetarian')}
                      className={`py-2 px-3 rounded-xl font-medium text-center transition-colors ${
                        dietary === 'vegetarian'
                          ? 'bg-[#1b2b40] text-white'
                          : 'bg-slate-50 text-slate-600 border border-slate-200'
                      }`}
                    >
                      Ăn chay / Dị ứng thực phẩm
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Note / Message */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800 block">
                Lời nhắn gửi đến Cô Dâu & Chú Rể
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Gửi gắm lời chúc hoặc lưu ý đặc biệt cho cô dâu chú rể nhé..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#355070] text-slate-800 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#1b2b40] hover:bg-[#283e5c] text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors text-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Gửi Xác Nhận Tham Dự</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
