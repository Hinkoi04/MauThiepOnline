import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Video, ArrowRight, ArrowDown } from 'lucide-react'
import type { TemplateItem } from '../types/template'

interface TemplateCardProps {
  template: TemplateItem
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const [isHovered, setIsHovered] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const navigate = useNavigate()
  const Component = template.component

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    const el = viewportRef.current
    if (!el) return

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    const maxScroll = el.scrollHeight - el.clientHeight
    if (maxScroll <= 0) return

    // Speed: smooth continuous scroll like a demo video (approx 7 seconds for full card)
    const duration = Math.max(6000, maxScroll * 3.5)
    const startScrollTop = el.scrollTop
    const remainingDistance = maxScroll - startScrollTop
    let startTime: number | null = null

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      el.scrollTop = startScrollTop + remainingDistance * progress

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step)
      }
    }

    animationFrameRef.current = requestAnimationFrame(step)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    const el = viewportRef.current
    if (!el) return

    // Smoothly scroll back to the very top
    el.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCardClick = () => {
    navigate(template.path)
  }

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 18,
        border: '1px solid #e5e2db',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHovered
          ? '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(27, 44, 94, 0.15)'
          : '0 8px 24px rgba(0, 0, 0, 0.05)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
        position: 'relative',
      }}
      className="template-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Mini Window Titlebar (macOS Style Header) ── */}
      <div
        style={{
          background: isHovered ? '#eeebe2' : '#f6f4ee',
          borderBottom: '1px solid #e8e4dc',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
          transition: 'background 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
        </div>

        <div
          style={{
            fontSize: 12,
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 700,
            color: '#4a4742',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>{template.code}</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span style={{ fontWeight: 500, color: '#7a756f' }}>{template.categoryName}</span>
        </div>

        {/* Video / Auto-scroll indicator badge */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: 12,
            background: isHovered ? '#1B2C5E' : 'rgba(0,0,0,0.06)',
            color: isHovered ? '#ffffff' : '#666',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'all 0.25s ease',
          }}
        >
          <Video size={13} />
          <span>{isHovered ? 'Đang cuộn...' : 'Video Preview'}</span>
        </div>
      </div>

      {/* ── Mini Video-Like Auto-Scrolling Window Preview ── */}
      <div
        ref={viewportRef}
        style={{
          position: 'relative',
          height: 480,
          background: '#0e172a',
          overflowY: 'hidden', // Auto-scrolled smoothly by script
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleCardClick}
        title={`Bấm để mở trực tiếp ${template.path}`}
      >
        {/* Floating Hint Overlay on top of preview */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: isHovered ? 'rgba(15, 23, 42, 0.78)' : 'rgba(15, 23, 42, 0.58)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            fontSize: 11,
            fontWeight: 500,
            padding: '6px 12px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'background 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          {isHovered ? (
            <>
              <ArrowDown size={13} />
              <span>Rê chuột đang tự động cuộn mẫu · Bấm để mở thiệp</span>
            </>
          ) : (
            <>
              <Video size={13} />
              <span>Rê chuột để xem video · Bấm để mở thiệp</span>
            </>
          )}
        </div>

        {/* Live Invitation rendered with defaultOpened={true} for full showcase */}
        <div
          style={{
            width: '100%',
            maxWidth: 430,
            minHeight: '100%',
            position: 'relative',
            background: '#FAF8F4',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {/* @ts-expect-error pass defaultOpened to template component */}
          <Component defaultOpened={true} />
        </div>
      </div>

      {/* ── Card Information & Actions ── */}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1, background: '#ffffff' }}>
        <div
          onClick={handleCardClick}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, cursor: 'pointer' }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: '#1a1a1a',
              fontFamily: 'Playfair Display, serif, system-ui',
            }}
          >
            {template.title}
          </h3>
          <span
            style={{
              fontSize: 11,
              padding: '3px 8px',
              borderRadius: 12,
              background: `${template.themeColor}18`,
              color: template.themeColor,
              fontWeight: 700,
            }}
          >
            {template.badge || 'Demo'}
          </span>
        </div>

        <p
          style={{
            margin: '0 0 12px',
            fontSize: 13,
            color: '#666',
            lineHeight: 1.5,
          }}
        >
          {template.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {template.tags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 6,
                background: '#f3f1ec',
                color: '#5a554e',
                fontWeight: 500,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Button: Direct navigation to template.path */}
        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid #f0eee9' }}>
          <button
            onClick={handleCardClick}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 10,
              background: template.themeColor,
              color: '#ffffff',
              border: 'none',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.3,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s',
              boxShadow: `0 4px 14px ${template.themeColor}35`,
            }}
          >
            <span>Mở xem thiệp ({template.path})</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
