import type { TemplateItem } from '../types/template'
import Mau1 from '../Mau1'
import Mau2 from '../Mau2'

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'mau-2',
    code: 'Mau2',
    path: '/mau2',
    title: 'Thiệp Cưới Tên Chú Rể & Tên Cô Dâu',
    subtitle: 'Save The Date - Luxury Pastel Lavender & Gold',
    category: 'wedding',
    categoryName: 'Thiệp cưới',
    description: 'Mẫu thiệp cưới trực tuyến tone Tím Pastel (Lavender & Lilac) quý phái kết hợp ánh kim Gold hoàng gia, tích hợp Save The Date, hiệu ứng phong bì mở đầu, cánh hoa rơi, phát nhạc lãng mạn, lịch trình, album ảnh, sổ lưu bút và 2 thẻ QR mừng cưới dạng viên thuốc so le độc đáo.',
    tags: ['Thiệp cưới', 'Tím pastel', 'Lavender', 'Save The Date', 'Phong bì mở', 'Cổng vòm', 'Nhạc cưới', 'Mừng cưới QR'],
    themeColor: '#4A1D6D',
    accentColor: '#C8A452',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=820&fit=crop&auto=format',
    component: Mau2,
    badge: 'Hot',
    isAvailable: true,
  },
  {
    id: 'mau-1',
    code: 'Mau1',
    path: '/mau1',
    title: 'Thiệp Tốt Nghiệp Hoàng Gia',
    subtitle: 'Graduation Ceremony - Royal Navy & Gold',
    category: 'graduation',
    categoryName: 'Tốt nghiệp',
    description: 'Thiệp mời lễ tốt nghiệp trang trọng với hiệu ứng phong bì trượt mở độc đáo, dải phim kỷ niệm thanh xuân cuộn mượt và form RSVP trực tuyến.',
    tags: ['Tốt nghiệp', 'Phong bì 3D', 'Cuộn phim', 'RSVP'],
    themeColor: '#1B2C5E',
    accentColor: '#C9A84C',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618355776464-8666794d2520?w=600&h=820&fit=crop&auto=format',
    component: Mau1,
    badge: 'Mới nhất',
    isAvailable: true,
  },
]

