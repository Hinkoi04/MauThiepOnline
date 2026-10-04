import React, { useState, useMemo } from 'react'
import {
  Sparkles,
  GraduationCap,
  Heart,
  Cake,
  CalendarDays,
  Search,
  X,
  Mail,
  Plus,
} from 'lucide-react'
import { TEMPLATES } from '../data/templates'
import type { TemplateCategory } from '../types/template'
import { TemplateCard } from '../components/TemplateCard'

export const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories: { id: TemplateCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Tất cả mẫu', icon: <Sparkles size={15} /> },
    { id: 'graduation', label: 'Lễ tốt nghiệp', icon: <GraduationCap size={15} /> },
    { id: 'wedding', label: 'Thiệp cưới', icon: <Heart size={15} /> },
    { id: 'birthday', label: 'Sinh nhật', icon: <Cake size={15} /> },
    { id: 'event', label: 'Sự kiện / Hội thảo', icon: <CalendarDays size={15} /> },
  ]

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((tpl) => {
      const matchCategory = selectedCategory === 'all' || tpl.category === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      const matchSearch =
        !query ||
        tpl.title.toLowerCase().includes(query) ||
        tpl.code.toLowerCase().includes(query) ||
        tpl.description.toLowerCase().includes(query) ||
        tpl.tags.some((tag) => tag.toLowerCase().includes(query))
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FAF8F4',
        color: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Top Navigation / Header ── */}
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e8e5dc',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #1B2C5E 0%, #2a438c 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(27,44,94,0.25)',
              }}
            >
              <Mail size={20} />
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  color: '#1B2C5E',
                  fontFamily: 'Playfair Display, serif, system-ui',
                }}
              >
                Mẫu Thiệp Online
              </h1>
              <div style={{ fontSize: 11, color: '#7a7068', letterSpacing: 0.5 }}>
                Bộ sưu tập thiệp mời điện tử đa phong cách
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: 280, maxWidth: '100%' }}>
            <span
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#888',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search size={15} />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm mẫu thiệp, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 34px',
                borderRadius: 20,
                border: '1px solid #dcd7ce',
                background: '#ffffff',
                fontSize: 13,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero Banner ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, #FAF8F4 0%, #F0EBE1 100%)',
          padding: '48px 24px 36px',
          textAlign: 'center',
          borderBottom: '1px solid #e5dfd4',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#ffffff',
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              color: '#1B2C5E',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              marginBottom: 16,
            }}
          >
            <Sparkles size={14} color="#C9A84C" />
            <span>Khám phá các mẫu thiệp điện tử độc quyền & tương tác</span>
          </div>

          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: '#1B2C5E',
              fontFamily: 'Playfair Display, serif, system-ui',
              letterSpacing: -0.5,
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            Danh Sách Mẫu Thiệp Mời
          </h2>
          <p
            style={{
              fontSize: 15,
              color: '#6e655d',
              lineHeight: 1.6,
              margin: '0 auto 28px',
              maxWidth: 620,
            }}
          >
            Xem trước giao diện thu nhỏ tự động cuộn demo của từng mẫu, nhấp chuột để trải nghiệm demo tương tác với đầy đủ hiệu ứng trượt mở và form phản hồi trực tiếp.
          </p>

          {/* Category Filter Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`cat-btn ${isActive ? 'active' : ''}`}
                  style={{
                    background: isActive ? '#1B2C5E' : '#ffffff',
                    color: isActive ? '#ffffff' : '#575049',
                    border: '1px solid',
                    borderColor: isActive ? '#1B2C5E' : '#dcd7cd',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: isActive
                      ? '0 4px 12px rgba(27,44,94,0.2)'
                      : '0 2px 4px rgba(0,0,0,0.02)',
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Main Catalog Grid ── */}
      <main
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '40px 24px 64px',
          width: '100%',
          boxSizing: 'border-box',
          flex: 1,
        }}
      >
        {/* Results bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
            color: '#7a7068',
            fontSize: 14,
          }}
        >
          <div>
            Đang hiển thị <strong>{filteredTemplates.length}</strong> mẫu thiệp
          </div>
        </div>

        {/* Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 32,
          }}
        >
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
            />
          ))}

          {/* Add New Template Placeholder Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              border: '2px dashed #d5cfc4',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              minHeight: 460,
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#f2eee6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                color: '#1B2C5E',
              }}
            >
              <Plus size={24} />
            </div>
            <h4 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: '#1B2C5E' }}>
              Thêm Mẫu Thiệp Mới
            </h4>
            <p style={{ fontSize: 13, color: '#7a7068', lineHeight: 1.5, margin: '0 0 18px', maxWidth: 280 }}>
              Chỉ cần tạo thư mục mới (ví dụ <code>src/Mau2</code>) và khai báo đường dẫn (ví dụ <code>path: '/mau2'</code>) vào <code>src/data/templates.ts</code>
            </p>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                background: '#f6f4ee',
                padding: '8px 12px',
                borderRadius: 6,
                color: '#555',
                textAlign: 'left',
              }}
            >
              src/Mau2/index.tsx<br />
              src/data/templates.ts (path: '/mau2')
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: '1px solid #e5dfd4',
          background: '#ffffff',
          padding: '24px',
          textAlign: 'center',
          fontSize: 13,
          color: '#8c8277',
          marginTop: 'auto',
        }}
      >
        <div>© 2026 Mẫu Thiệp Online · Hệ thống hiển thị và xem trước thiệp mời điện tử</div>
      </footer>
    </div>
  )
}
