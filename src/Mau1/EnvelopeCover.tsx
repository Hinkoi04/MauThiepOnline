import { useState, useCallback } from 'react'
import { Globe, ChevronUp } from 'lucide-react'
import { COLORS } from './constants'

export type CoverPhase = 'idle' | 'sliding' | 'exiting'

export interface EnvelopeCoverProps {
  onDone: () => void
}

export function EnvelopeCover({ onDone }: EnvelopeCoverProps) {
  const [phase, setPhase] = useState<CoverPhase>('idle')

  const handleTap = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('sliding')
    setTimeout(() => setPhase('exiting'), 1100)
    setTimeout(onDone, 1700)
  }, [phase, onDone])

  return (
    <div
      onClick={handleTap}
      className={phase === 'exiting' ? 'overlay-fade-out' : ''}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'linear-gradient(160deg, #091326 0%, #1B2C5E 50%, #122147 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: phase === 'idle' ? 'pointer' : 'default',
        userSelect: 'none',
        overflow: 'hidden',
        transition:
          phase === 'sliding' || phase === 'exiting'
            ? 'transform 1.1s cubic-bezier(0.32, 0, 0.2, 1), opacity 0.7s ease 0.3s'
            : 'none',
        transform:
          phase === 'sliding' || phase === 'exiting'
            ? 'translateY(-100%)'
            : 'translateY(0)',
      }}
    >
      {/* Ambient Bokeh glows */}
      {([
        [180, 180, '6%', '8%'],
        [140, 140, '70%', '75%'],
        [110, 110, '50%', '12%'],
        [160, 160, '75%', '30%'],
        [90, 90, '15%', '70%'],
      ] as [number, number, string, string][]).map(([w, h, t, l], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: w,
            height: h,
            borderRadius: '50%',
            top: t,
            left: l,
            pointerEvents: 'none',
            background: 'rgba(201,168,76,0.08)',
            filter: 'blur(35px)',
          }}
        />
      ))}

      {/* Main Full-Size Cover Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 480,
          height: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '48px 24px 40px',
          boxSizing: 'border-box',
        }}
      >
        {/* Double Gold Border Frames */}
        <div
          style={{
            position: 'absolute',
            inset: 16,
            border: '1.5px solid rgba(201, 168, 76, 0.4)',
            borderRadius: 8,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 22,
            border: '1px solid rgba(201, 168, 76, 0.2)',
            borderRadius: 4,
            pointerEvents: 'none',
          }}
        />

        {/* Top: Institution Emblem & Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 5,
            marginTop: 12,
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              background: 'rgba(201,168,76,0.12)',
              border: '1.5px solid rgba(201,168,76,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              boxShadow: '0 0 24px rgba(201,168,76,0.2)',
            }}
          >
            <Globe size={26} color={COLORS.gold} strokeWidth={1.75} />
          </div>

          <div
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: 9,
              letterSpacing: 3.5,
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            Bộ Ngoại Giao
          </div>
          <div
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 2,
              color: 'rgba(255,255,255,0.95)',
              textTransform: 'uppercase',
              marginBottom: 3,
            }}
          >
            Học Viện Ngoại Giao
          </div>
          <div
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: 8.5,
              letterSpacing: 1.5,
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Diplomatic Academy of Vietnam
          </div>
        </div>

        {/* Center: Ceremony Title & Name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 5,
            margin: 'auto 0',
          }}
        >
          <div style={{ width: 50, height: 1, background: 'rgba(201,168,76,0.5)', marginBottom: 28 }} />

          <div
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: 5,
              color: '#ffffff',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: 6,
              textShadow: '0 2px 14px rgba(0,0,0,0.4)',
            }}
          >
            GRADUATION
          </div>
          <div
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 46,
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1,
              marginBottom: 28,
            }}
          >
            Ceremony
          </div>

          <div style={{ width: 50, height: 1, background: 'rgba(201,168,76,0.5)', marginBottom: 24 }} />

          <div
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 42,
              color: COLORS.gold,
              lineHeight: 1,
              marginBottom: 10,
              textShadow: '0 0 16px rgba(201,168,76,0.4)',
            }}
          >
            Diệu Hoa
          </div>
          <div
            style={{
              fontFamily: 'Lato, sans-serif',
              fontSize: 10,
              letterSpacing: 3,
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
            }}
          >
            K49 · 2022 – 2026
          </div>
        </div>

        {/* Bottom: Tap to Open Indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 5,
            marginBottom: 12,
          }}
        >
          {phase === 'idle' && (
            <div
              className="tap-bounce"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <ChevronUp size={22} color={COLORS.gold} strokeWidth={2} />
              <div
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontSize: 10.5,
                  letterSpacing: 4,
                  color: 'rgba(255,255,255,0.7)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Chạm để mở thiệp
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
