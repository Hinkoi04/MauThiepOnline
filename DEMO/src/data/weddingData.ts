import { WeddingInfo, WeddingEvent, LoveMilestone, GalleryPhoto, GuestWish, BankAccount } from '../types.ts';

export const initialWeddingInfo: WeddingInfo = {
  groomName: 'Quốc Tuấn',
  groomFullName: 'Nguyễn Quốc Tuấn',
  groomParents: {
    father: 'Nguyễn Văn Hùng',
    mother: 'Lê Thị Thu Hà',
  },
  brideName: 'Bích Hạnh',
  brideFullName: 'Trần Bích Hạnh',
  brideParents: {
    father: 'Trần Văn Đức',
    mother: 'Phạm Thị Mai',
  },
  weddingDate: '2026-03-28T17:30:00',
  solarDateText: '28 · 03 · 2026',
  lunarDateText: 'NHẰM NGÀY 10 THÁNG 2 NĂM BÍNH NGỌ',
  badgeDate: '28.03',
  guestName: 'Anh/ Chị & Người...',
};

export const weddingEvents: WeddingEvent[] = [
  {
    id: 'vu-quy',
    title: 'Lễ Vu Quy (Nhà Gái)',
    time: '08:30',
    date: 'Thứ Bảy, 28/03/2026',
    locationName: 'Tư gia Nhà Gái',
    address: 'Số 18, Ngõ 42 Liễu Giai, Ba Đình, Hà Nội',
    mapUrl: 'https://maps.google.com/?q=Số+18+Ngõ+42+Liễu+Giai+Hà+Nội',
    calendarTitle: 'Lễ Vu Quy: Quốc Tuấn & Bích Hạnh',
    type: 'bride_house',
  },
  {
    id: 'thanh-hon',
    title: 'Lễ Thành Hôn (Nhà Trai)',
    time: '11:00',
    date: 'Thứ Bảy, 28/03/2026',
    locationName: 'Tư gia Nhà Trai',
    address: 'Số 68 Hoàng Hoa Thám, Tây Hồ, Hà Nội',
    mapUrl: 'https://maps.google.com/?q=68+Hoàng+Hoa+Thám+Tây+Hồ+Hà+Nội',
    calendarTitle: 'Lễ Thành Hôn: Quốc Tuấn & Bích Hạnh',
    type: 'groom_house',
  },
  {
    id: 'tiec-cuoi',
    title: 'Tiệc Cưới Thân Mật',
    time: '17:30',
    date: 'Thứ Bảy, 28/03/2026',
    locationName: 'Trung Tâm Hội Nghị Tiệc Cưới Trống Đồng Palace',
    address: 'Sảnh Diamond - 489 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    mapUrl: 'https://maps.google.com/?q=Trống+Đồng+Palace+489+Hoàng+Quốc+Việt',
    calendarTitle: 'Tiệc Cưới: Quốc Tuấn & Bích Hạnh',
    type: 'reception',
  },
];

export const loveMilestones: LoveMilestone[] = [
  {
    year: '2021',
    title: 'Lần đầu chạm ánh mắt',
    description: 'Một buổi chiều thu Hà Nội tại quán cà phê phố cổ, ánh mắt vô tình giao nhau bắt đầu cho một hành trình diệu kỳ.',
    iconName: 'Coffee',
  },
  {
    year: '2022',
    title: 'Lời ngỏ lời yêu thương',
    description: 'Chuyến đi Đà Lạt đầu tiên dưới màn sương sớm, chàng trai đã gom đủ can đảm nắm lấy bàn tay dịu dàng của cô gái.',
    iconName: 'Heart',
  },
  {
    year: '2025',
    title: 'Em đồng ý nhé!',
    description: 'Bên bờ biển lúc hoàng hôn buông xuống, một chiếc nhẫn lấp lánh và câu trả lời "Em đồng ý" ngập tràn giọt nước mắt hạnh phúc.',
    iconName: 'Sparkles',
  },
  {
    year: '2026',
    title: 'Về chung một nhà',
    description: 'Ngày 28.03.2026 - Chúng mình chính thức viết tiếp chương mới của cuộc đời bằng một đám cưới ấm áp bên người thân thương.',
    iconName: 'Home',
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'g1',
    title: 'Khoảnh khắc trao lời hẹn ước',
    category: 'Chân dung',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    caption: 'Bên nhau trong ánh nắng ngập tràn hạnh phúc',
  },
  {
    id: 'g2',
    title: 'Nắm tay qua năm tháng',
    category: 'Phóng sự',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    caption: 'Từng ánh mắt và nụ cười trao nhau',
  },
  {
    id: 'g3',
    title: 'Bó hoa trao gửi yêu thương',
    category: 'Chi tiết',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    caption: 'Hương hoa ngọt ngào ngày chung đôi',
  },
  {
    id: 'g4',
    title: 'Hoàng hôn bên người thương',
    category: 'Ngoại cảnh',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    caption: 'Hành trình cùng nhau đi qua mọi nẻo đường',
  },
  {
    id: 'g5',
    title: 'Nụ cười rạng rỡ của nàng',
    category: 'Chân dung',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    caption: 'Khoảnh khắc đẹp nhất khi nhìn thấy nụ cười của em',
  },
  {
    id: 'g6',
    title: 'Lời hứa trọn đời',
    category: 'Lễ nghi',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    caption: 'Từ hôm nay, ta có nhau trọn kiếp này',
  },
];

export const initialWishes: GuestWish[] = [
  {
    id: 'w1',
    senderName: 'Văn Toàn & Mỹ Linh',
    relation: 'Bạn thân Chú Rể',
    message: 'Chúc mừng Quốc Tuấn và Bích Hạnh! Chúc hai bạn trăm năm hạnh phúc, sớm đón thiên thần nhỏ nhé! Luôn yêu thương và nắm chặt tay nhau như ngày đầu.',
    likes: 18,
    timestamp: 'Vừa xong',
  },
  {
    id: 'w2',
    senderName: 'Chị Phương Mai',
    relation: 'Đồng nghiệp Cô Dâu',
    message: 'Cô dâu Bích Hạnh xinh đẹp rạng ngời! Chúc em gái bước vào cuộc sống hôn nhân ngập tràn tiếng cười, hạnh phúc viên mãn suốt đời!',
    likes: 12,
    timestamp: '15 phút trước',
  },
  {
    id: 'w3',
    senderName: 'Gia đình Bác Đức',
    relation: 'Nhà Trai',
    message: 'Bác chúc hai cháu Quốc Tuấn & Bích Hạnh luôn thuận hòa, yêu thương tôn trọng lẫn nhau, cùng vun đắp một tổ ấm thật hạnh phúc và bền vững.',
    likes: 24,
    timestamp: '1 giờ trước',
  },
];

export const bankAccounts: BankAccount[] = [
  {
    ownerName: 'NGUYEN QUOC TUAN',
    bankName: 'Vietcombank',
    bankCode: 'VCB',
    accountNumber: '998828032026',
    branch: 'Chi nhánh Hà Nội',
    role: 'groom',
  },
  {
    ownerName: 'TRAN BICH HANH',
    bankName: 'Techcombank',
    bankCode: 'TCB',
    accountNumber: '190368280326',
    branch: 'Chi nhánh Ba Đình',
    role: 'bride',
  },
];
