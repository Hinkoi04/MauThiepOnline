import React, { useState } from 'react';
import { galleryPhotos } from '../../data/weddingData.ts';
import { GalleryPhoto } from '../../types.ts';
import { BotanicalSprig } from '../BotanicalSprig.tsx';
import { X, ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react';

export const GalleryScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [photoLikes, setPhotoLikes] = useState<{ [id: string]: number }>({
    g1: 42,
    g2: 38,
    g3: 29,
    g4: 51,
    g5: 45,
    g6: 33,
  });

  const categories = ['Tất cả', 'Chân dung', 'Phóng sự', 'Chi tiết', 'Ngoại cảnh'];

  const filteredPhotos =
    selectedCategory === 'Tất cả'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === selectedCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const currentIndex = activePhoto
    ? filteredPhotos.findIndex((p) => p.id === activePhoto.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredPhotos.length - 1) {
      setActivePhoto(filteredPhotos[currentIndex + 1]);
    } else {
      setActivePhoto(filteredPhotos[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActivePhoto(filteredPhotos[currentIndex - 1]);
    } else {
      setActivePhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  return (
    <div className="relative w-full min-h-full px-4 sm:px-5 py-6 bg-gradient-to-b from-[#f3f7fa] via-[#edf3f8] to-[#f8fafc] text-[#1b2b40]">
      <BotanicalSprig position="left" className="absolute top-2 left-2 scale-75 opacity-60" />
      <BotanicalSprig position="right" className="absolute top-2 right-2 scale-75 opacity-60" />

      <div className="max-w-md mx-auto space-y-5 pt-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#607791] uppercase">
            ALBUM KỶ NIỆM
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#18293f] tracking-wide">
            Khoảnh Khắc Ngọt Ngào
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Từng bức hình lưu giữ tình yêu trọn vẹn của chúng mình
          </p>
          <div className="w-12 h-0.5 bg-[#8da2b5] mx-auto mt-2" />
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1b2b40] text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-xl overflow-hidden bg-white border border-[#d8e3ed] shadow-2xs aspect-3/4 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-white">
                <span className="text-xs font-semibold leading-tight drop-shadow-xs">
                  {photo.title}
                </span>
                <span className="text-[10px] text-slate-200 mt-0.5">
                  {photo.caption}
                </span>
              </div>

              {/* Like heart button */}
              <button
                onClick={(e) => handleLike(photo.id, e)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs flex items-center gap-1 text-[10px] transition-transform active:scale-90"
              >
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                <span>{photoLikes[photo.id] || 0}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Large Photo Display */}
          <div
            className="max-w-lg w-full max-h-[75vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.url}
              alt={activePhoto.title}
              className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="text-center mt-3 text-white">
              <h3 className="font-serif text-lg font-medium">{activePhoto.title}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
