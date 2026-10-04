import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { TEMPLATES } from '../data/templates'

interface TemplatePageProps {
  customComponent?: React.ComponentType
}

export const TemplatePage: React.FC<TemplatePageProps> = ({ customComponent }) => {
  const { templateCode } = useParams<{ templateCode?: string }>()
  const navigate = useNavigate()

  // Find template by code or path if not passed directly
  const template = TEMPLATES.find((t) => {
    if (!templateCode) return false
    const cleanCode = templateCode.toLowerCase().replace(/[^a-z0-9]/g, '')
    const tCode = t.code.toLowerCase().replace(/[^a-z0-9]/g, '')
    const tId = t.id.toLowerCase().replace(/[^a-z0-9]/g, '')
    const tPath = t.path.toLowerCase().replace(/[^a-z0-9]/g, '')
    return cleanCode === tCode || cleanCode === tId || cleanCode === tPath
  }) || TEMPLATES[0] // fallback to first template

  const Component = customComponent || template?.component

  if (!Component) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAF8F4',
          padding: 24,
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: 24, color: '#1B2C5E', marginBottom: 12 }}>
          Không tìm thấy mẫu thiệp
        </h2>
        <p style={{ color: '#7a7068', marginBottom: 24 }}>
          Mẫu thiệp bạn đang tìm kiếm không tồn tại hoặc chưa được cập nhật.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#1B2C5E',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ← Quay lại danh sách mẫu
        </button>
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0a101f',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Floating Back-to-Catalog Pill */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Link
          to="/"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            color: '#1B2C5E',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: 24,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
            border: '1px solid rgba(27,44,94,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
        >
          <ArrowLeft size={15} />
          <span>Tất cả mẫu</span>
        </Link>
      </div>

      {/* Main Single Mobile Viewport Container */}
      <div
        style={{
          width: '100%',
          maxWidth: 450,
          minHeight: '100vh',
          background: '#FAF8F4',
          position: 'relative',
          boxShadow: '0 0 60px rgba(0,0,0,0.5)',
        }}
      >
        <Component />
      </div>
    </div>
  )
}
