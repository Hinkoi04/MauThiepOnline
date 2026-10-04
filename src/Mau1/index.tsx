import React, { useState, useCallback } from 'react'
import { Globe, ChevronLeft, ChevronRight, ChevronDown, Sparkles } from 'lucide-react'
import './Mau1.css'
import { EnvelopeCover } from './EnvelopeCover'
import { IMGS, SLIDES, COLORS } from './constants'

export interface Mau1Props {
  defaultOpened?: boolean
}

export default function Mau1({ defaultOpened = false }: Mau1Props) {
  const [opened, setOpened] = useState(defaultOpened)
  const [slideIdx, setSlideIdx] = useState(0)
  const handleEnvelopeDone = useCallback(() => setOpened(true), [])
  const [form, setForm] = useState({ name: '', message: '', attend: '' })
  const [submitted, setSubmitted] = useState(false)

  const prevSlide = () => setSlideIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  const nextSlide = () => setSlideIdx((i) => (i + 1) % SLIDES.length)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ background: COLORS.cream, minHeight: '100vh', width: '100%', boxSizing: 'border-box', position: 'relative' }}>
      {!opened && <EnvelopeCover onDone={handleEnvelopeDone} />}
      <div style={{ maxWidth: 430, margin: '0 auto', overflow: 'hidden', boxShadow: '0 0 40px rgba(0,0,0,0.06)' }}>

        {/* ── SECTION 1: COVER ── */}
        <section style={{ background: '#fff', position: 'relative', minHeight: '100vh' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: 48,
              background: COLORS.navy,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                transform: 'rotate(-90deg)',
                whiteSpace: 'nowrap',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 13,
                  letterSpacing: 4,
                  fontWeight: 700,
                }}
              >
                VƯƠNG ĐIỆU HOA
              </span>
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 7.5,
                  letterSpacing: 2,
                  opacity: 0.7,
                  textTransform: 'uppercase',
                }}
              >
                English Linguistics of International Relations
              </span>
              <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 7.5, opacity: 0.55 }}>
                K49 · 2022–2026
              </span>
            </div>
          </div>

          <div style={{ paddingLeft: 60, paddingRight: 20, paddingTop: 32, paddingBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: COLORS.navy,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Globe size={20} color="#fff" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 8,
                    color: COLORS.textMuted,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  Bộ Ngoại Giao
                </div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 700,
                    fontSize: 12,
                    color: COLORS.navy,
                    letterSpacing: 1,
                    lineHeight: 1.3,
                  }}
                >
                  Học Viện Ngoại Giao
                </div>
                <div
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 7.5,
                    color: COLORS.textMuted,
                    letterSpacing: 0.5,
                  }}
                >
                  Diplomatic Academy of Vietnam
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 20, textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 36,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                GRADUATION
              </div>
              <div
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  fontSize: 40,
                  color: '#1a1a1a',
                  lineHeight: 1,
                  marginTop: -2,
                }}
              >
                Ceremony
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                aspectRatio: '3/4',
                marginBottom: 20,
                boxShadow: '0 8px 40px rgba(27,44,94,0.18)',
              }}
            >
              <img
                src={IMGS.hero}
                alt="Diệu Hoa"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '45%',
                  background: 'linear-gradient(to top, rgba(10,16,36,0.65), transparent)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Dancing Script, cursive',
                    fontSize: 40,
                    color: '#fff',
                    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                  }}
                >
                  Diệu Hoa
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-block',
                  borderTop: `1px solid ${COLORS.navy}`,
                  borderBottom: `1px solid ${COLORS.navy}`,
                  padding: '8px 20px',
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 10,
                  letterSpacing: 4,
                  color: COLORS.navy,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                Every End Is A New Beginning
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: INVITATION DETAILS ── */}
        <section
          style={{
            background: COLORS.creamDark,
            padding: '48px 20px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: '40px 28px 0',
              boxShadow: '0 4px 32px rgba(27,44,94,0.08)',
              marginBottom: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 10,
                letterSpacing: 5,
                color: COLORS.textMuted,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Thân Mời
            </div>
            <div
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: 46,
                color: '#1a1a1a',
                marginBottom: 24,
                lineHeight: 1,
              }}
            >
              Bạn Thanh
            </div>

            <div
              style={{
                width: 48,
                height: 1,
                background: COLORS.navy,
                margin: '0 auto 24px',
              }}
            />

            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 11,
                letterSpacing: 3,
                color: COLORS.textMuted,
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              10:45, Thứ Bảy
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                marginBottom: 28,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 8,
                    letterSpacing: 3,
                    color: COLORS.textMuted,
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}
                >
                  Tháng
                </div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 22,
                    fontWeight: 700,
                    color: COLORS.navy,
                  }}
                >
                  07
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 80,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  lineHeight: 1,
                }}
              >
                25
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: 8,
                    letterSpacing: 3,
                    color: COLORS.textMuted,
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}
                >
                  Năm
                </div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 22,
                    fontWeight: 700,
                    color: COLORS.navy,
                  }}
                >
                  2026
                </div>
              </div>
            </div>

            <div
              style={{
                width: 48,
                height: 1,
                background: '#e8e2d8',
                margin: '0 auto 24px',
              }}
            />

            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 9,
                letterSpacing: 3,
                color: COLORS.textMuted,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Tại địa điểm:
            </div>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.navy,
                letterSpacing: 1,
                lineHeight: 1.35,
                marginBottom: 10,
              }}
            >
              Trung Tâm Hội Nghị<br />Quốc Gia (NCC)
            </div>
            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 12,
                color: COLORS.textMuted,
                marginBottom: 36,
              }}
            >
              số 01 Phạm Hùng, Từ Liêm, Hà Nội.
            </div>

            <div
              style={{
                marginLeft: -28,
                marginRight: -28,
                overflow: 'hidden',
                borderRadius: '0 0 12px 12px',
              }}
            >
              <img
                src={IMGS.group}
                alt="Sinh viên tốt nghiệp"
                style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 3: THANH XUÂN / MEMORY ── */}
        <section
          style={{
            background: COLORS.cream,
            paddingTop: 48,
            paddingBottom: 48,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 28,
              background: COLORS.creamDark,
              clipPath:
                'polygon(0 0,3% 100%,7% 20%,11% 100%,15% 20%,19% 100%,23% 15%,27% 100%,31% 10%,35% 100%,39% 20%,43% 100%,47% 30%,51% 100%,55% 20%,59% 100%,63% 15%,67% 100%,71% 25%,75% 100%,79% 10%,83% 100%,87% 20%,91% 100%,95% 15%,100% 80%,100% 0)',
            }}
          />

          <div style={{ padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  fontSize: 50,
                  color: '#1a1a1a',
                  lineHeight: 1,
                }}
              >
                Thanh xuân
              </div>
              <div
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  fontSize: 30,
                  color: COLORS.textMuted,
                  lineHeight: 1.2,
                }}
              >
                Của chúng mình
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'stretch', minHeight: 320 }}>
              {/* Film strip — infinite scroll */}
              <div
                style={{
                  flex: '0 0 42%',
                  background: '#111',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  maxHeight: 360,
                }}
              >
                {/* Sprocket holes left */}
                <div
                  style={{
                    position: 'absolute',
                    left: 4,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 2,
                        background: '#2a2a2a',
                      }}
                    />
                  ))}
                </div>
                {/* Sprocket holes right */}
                <div
                  style={{
                    position: 'absolute',
                    right: 4,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 2,
                        background: '#2a2a2a',
                      }}
                    />
                  ))}
                </div>

                {/* Scrolling track — images duplicated for seamless loop */}
                <div
                  className="film-scroll-track"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    padding: '8px 16px',
                  }}
                >
                  {[
                    IMGS.film1,
                    IMGS.film2,
                    IMGS.film3,
                    IMGS.film1,
                    IMGS.film2,
                    IMGS.film3,
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Ký ức"
                      style={{
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'cover',
                        borderRadius: 2,
                        display: 'block',
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Portrait */}
              <div style={{ flex: 1, borderRadius: 4, overflow: 'hidden' }}>
                <img
                  src={IMGS.portrait2}
                  alt="Tốt nghiệp"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: PERSONAL LETTER ── */}
        <section style={{ background: '#fff', padding: '52px 28px' }}>
          <div
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 27,
              color: COLORS.textMuted,
              textAlign: 'center',
              marginBottom: 36,
              lineHeight: 1.4,
            }}
          >
            Đi qua hoài nghi — giữ lại chính mình
          </div>

          <div
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: 14.5,
              lineHeight: 1.95,
              color: COLORS.textBody,
            }}
          >
            <p style={{ marginBottom: 22 }}>
              Ngoại giao đến với mình như một cơ hội, mang theo rất nhiều điều để học, để lớn lên.
              Nhưng đồng thời, cũng âm thầm lấy đi của mình không ít thứ. Và điều đầu tiên mình
              nhận ra đã đánh mất, chính là sự tự tin vốn đã chẳng mấy dồi dào. Ở đây, ai cũng giỏi,
              giỏi đến mức khiến mình đôi khi thấy bản thân nhỏ lại giữa những nỗ lực chưa kịp gọi tên.
            </p>
            <p style={{ marginBottom: 22 }}>
              Nhưng hoá ra những áp lực từng trải qua cũng chỉ tóm gọn trong tiếng thở dài trôi đi mất,
              chỉ có trải nghiệm và sự mạnh mẽ là ở lại. Tôi luyện nên một chính mình kiên cường của
              ngày hôm nay.
            </p>
            <p>
              Mong rằng mỗi chúng ta trong hôm nay hay trong muôn ngày sau nữa đều sẽ sống đời kiêu
              hãnh khiêm nhường, hạnh phúc có bình an và tinh khiết, thanh yên giữa đời sống vội và
              ngoài kia.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 40 }}>
            <div style={{ flex: 1, height: 1, background: '#e5e0d8' }} />
            <div style={{ fontFamily: 'Dancing Script, cursive', fontSize: 24, color: COLORS.gold }}>
              ✦
            </div>
            <div style={{ flex: 1, height: 1, background: '#e5e0d8' }} />
          </div>
        </section>

        {/* ── SECTION 5: PHOTO GALLERY ── */}
        <section style={{ background: COLORS.cream, padding: '48px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 10,
                letterSpacing: 4,
                color: COLORS.textMuted,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Bộ ảnh
            </div>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 26,
                color: COLORS.navy,
                fontWeight: 700,
              }}
            >
              Kỷ niệm tốt nghiệp
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ gridRow: 'span 2', borderRadius: 8, overflow: 'hidden' }}>
              <img
                src={IMGS.g1}
                alt="Kỷ niệm 1"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '1' }}>
              <img
                src={IMGS.g2}
                alt="Kỷ niệm 2"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '1' }}>
              <img
                src={IMGS.g3}
                alt="Kỷ niệm 3"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div
              style={{
                gridColumn: 'span 2',
                borderRadius: 8,
                overflow: 'hidden',
                aspectRatio: '16/7',
              }}
            >
              <img
                src={IMGS.g4}
                alt="Kỷ niệm 4"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 6: SLIDESHOW ── */}
        <section style={{ background: '#fff', paddingBottom: 48 }}>
          <div
            style={{
              background: COLORS.navy,
              padding: '28px 20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 20,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              Học Viện Ngoại Giao
            </div>
            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 10,
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              Diplomatic Academy of Vietnam
            </div>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
            <img
              key={slideIdx}
              src={SLIDES[slideIdx]}
              alt={`Ảnh ${slideIdx + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <button
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '50%',
                width: 44,
                height: 44,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                color: COLORS.navy,
              }}
            >
              <ChevronLeft size={22} color={COLORS.navy} />
            </button>
            <button
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '50%',
                width: 44,
                height: 44,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                color: COLORS.navy,
              }}
            >
              <ChevronRight size={22} color={COLORS.navy} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, padding: '14px 20px', overflowX: 'auto' }}>
            {SLIDES.map((src, i) => (
              <div
                key={i}
                onClick={() => setSlideIdx(i)}
                style={{
                  flexShrink: 0,
                  width: 72,
                  height: 72,
                  borderRadius: 6,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: `2px solid ${i === slideIdx ? COLORS.navy : 'transparent'}`,
                  transition: 'border-color 0.2s',
                  opacity: i === slideIdx ? 1 : 0.6,
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 7: RSVP FORM ── */}
        <section style={{ background: COLORS.creamDark, padding: '52px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.navy,
                marginBottom: 14,
              }}
            >
              Xác nhận tham dự
            </div>
            <p
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 14,
                color: COLORS.textMuted,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Vui lòng xác nhận sự tham dự của bạn để mình chuẩn bị đón tiếp một cách chu đáo nhất. Trân trọng cảm ơn!
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div
                style={{
                  fontFamily: 'Dancing Script, cursive',
                  fontSize: 48,
                  color: COLORS.navy,
                  marginBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                <span>Cảm ơn bạn!</span>
                <Sparkles size={28} color={COLORS.gold} />
              </div>
              <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 14, color: COLORS.textMuted }}>
                Mình đã nhận được xác nhận của bạn rồi.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="text"
                placeholder="Tên của bạn"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                style={{
                  border: '1px solid #ccc6bb',
                  borderRadius: 8,
                  padding: '15px 16px',
                  fontSize: 14,
                  fontFamily: 'Lato, sans-serif',
                  background: '#fff',
                  outline: 'none',
                  color: COLORS.textBody,
                }}
              />
              <textarea
                placeholder="Lời nhắn gửi"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={4}
                style={{
                  border: '1px solid #ccc6bb',
                  borderRadius: 8,
                  padding: '15px 16px',
                  fontSize: 14,
                  fontFamily: 'Lato, sans-serif',
                  background: '#fff',
                  outline: 'none',
                  resize: 'none',
                  color: COLORS.textBody,
                }}
              />
              <div style={{ position: 'relative' }}>
                <select
                  value={form.attend}
                  onChange={(e) => setForm((f) => ({ ...f, attend: e.target.value }))}
                  required
                  style={{
                    width: '100%',
                    border: '1px solid #ccc6bb',
                    borderRadius: 8,
                    padding: '15px 16px',
                    fontSize: 14,
                    fontFamily: 'Lato, sans-serif',
                    background: '#fff',
                    outline: 'none',
                    color: form.attend ? COLORS.textBody : COLORS.textMuted,
                    appearance: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="" disabled>
                    Xác nhận tham dự?
                  </option>
                  <option value="yes">Mình sẽ tham dự</option>
                  <option value="no">Mình không thể đến</option>
                  <option value="maybe">Mình chưa chắc chắn</option>
                </select>
                <div
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: COLORS.textMuted,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChevronDown size={16} />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  background: COLORS.navy,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '17px',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: 'Lato, sans-serif',
                  marginTop: 4,
                }}
              >
                Xác Nhận
              </button>
            </form>
          )}
        </section>

        {/* ── THANK YOU FOOTER ── */}
        <section style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={IMGS.thankyou}
            alt=""
            style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, ${COLORS.navy}bb 0%, rgba(0,0,0,0.15) 100%)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 40,
            }}
          >
            <div
              style={{
                fontFamily: 'Dancing Script, cursive',
                fontSize: 56,
                color: '#fff',
                lineHeight: 1,
              }}
            >
              Thank you!
            </div>
            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 10,
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: 4,
                textTransform: 'uppercase',
                marginTop: 8,
              }}
            >
              Vương Diệu Hoa · K49 · 2026
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
