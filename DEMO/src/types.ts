export interface WeddingInfo {
  groomName: string;
  groomFullName: string;
  groomParents: {
    father: string;
    mother: string;
  };
  brideName: string;
  brideFullName: string;
  brideParents: {
    father: string;
    mother: string;
  };
  weddingDate: string; // e.g. "2026-03-28"
  solarDateText: string; // "28 · 03 · 2026"
  lunarDateText: string; // "NHẰM NGÀY 10 THÁNG 2 NĂM BÍNH NGỌ"
  badgeDate: string; // "28.03"
  guestName: string; // "Anh/ Chị & Người..."
}

export interface WeddingEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  locationName: string;
  address: string;
  mapUrl: string;
  calendarTitle: string;
  type: 'groom_house' | 'bride_house' | 'reception';
}

export interface LoveMilestone {
  year: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  url: string;
  caption: string;
}

export interface GuestWish {
  id: string;
  senderName: string;
  relation: string;
  message: string;
  likes: number;
  timestamp: string;
}

export interface RSVPResponse {
  id: string;
  name: string;
  phone: string;
  attending: 'yes' | 'no' | 'unsure';
  guestCount: number;
  attendingEvent: string;
  dietary: 'standard' | 'vegetarian' | 'other';
  note?: string;
  createdAt: string;
}

export interface BankAccount {
  ownerName: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  branch?: string;
  role: 'groom' | 'bride';
  avatar?: string;
}
