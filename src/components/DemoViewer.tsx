import React, { useState, useEffect } from 'react'
import { ArrowLeft, RotateCcw, X, Smartphone } from 'lucide-react'
import type { TemplateItem } from '../types/template'

interface DemoViewerProps {
  template: TemplateItem
  onClose: () => void
}

export const DemoViewer: React.FC<DemoViewerProps> = ({ template, onClose }) => {
  const [key, setKey] = useState(0) // Used to trigger remount & replay animations
  const Component = template.component

  // Handle ESC key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const reloadDemo = () => {
    setKey((prev) => prev + 1)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(11, 17, 32, 0.92)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      {/* Top Controls Bar */}
      <header
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          color: '#ffffff',
          zIndex: 10,
        }}
      >
        {/* Template Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: 8,
              color: '#ffffff',
              padding: '8px 14px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'background 0.2s',
            }}
          >
            <ArrowLeft size={16} />
            <span>Danh sách</span>
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  background: template.themeColor,
                  color: '#ffffff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 4,
                }}
              >
                {template.code}
              </span>
              <span style={{ fontSize: 16, fontWeight: 700 }}>{template.title}</span>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.6)' }}>
              {template.subtitle}
            </span>
          </div>
        </div>

        {/* Center: Mobile View Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            color: '#e2e8f0',
          }}
        >
          <Smartphone size={15} />
          <span>Xem trước chuẩn Mobile</span>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={reloadDemo}
            title="Làm mới để xem lại hiệu ứng mở thiệp"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: 8,
              color: '#ffffff',
              padding: '8px 14px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <RotateCcw size={15} />
            <span>Mở lại thiệp</span>
          </button>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#f87171',
              width: 36,
              height: 36,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Single Mobile Screen Preview Container */}
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px 16px',
        }}
      >
        <div
          style={{
            width: 430,
            maxWidth: '100%',
            height: 860,
            maxHeight: 'calc(100vh - 110px)',
            background: '#000000',
            borderRadius: 36,
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.75), 0 0 0 10px #1f293d, 0 0 0 12px rgba(255,255,255,0.1)',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Scrollable Screen Content */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              background: '#FAF8F4',
              position: 'relative',
            }}
          >
            <Component key={key} />
          </div>
        </div>
      </main>
    </div>
  )
}
