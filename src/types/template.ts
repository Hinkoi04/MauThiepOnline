import React from 'react'

export type TemplateCategory = 'all' | 'graduation' | 'wedding' | 'birthday' | 'event'

export interface TemplateItem {
  id: string
  code: string // e.g. 'Mau1', 'Mau2'
  path: string // e.g. '/mau1', '/mau2'
  title: string
  subtitle: string
  category: 'graduation' | 'wedding' | 'birthday' | 'event'
  categoryName: string
  description: string
  tags: string[]
  themeColor: string
  accentColor: string
  thumbnailUrl: string
  component: React.ComponentType
  badge?: string
  isAvailable?: boolean
}
