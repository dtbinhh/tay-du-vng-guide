import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

export interface LightboxImage {
  file: string;
  title: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}

export function Lightbox({ images, index, onClose, onChangeIndex }: LightboxProps) {
  useEffect(() => {
    if (index === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onChangeIndex((index - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onChangeIndex((index + 1) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [index, images.length, onClose, onChangeIndex]);

  if (index === null || !images[index]) return null;
  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0b0e14]/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 min-w-0">
          <ZoomIn className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-sm font-medium text-slate-100 truncate">{current.title}</span>
          {images.length > 1 && (
            <span className="text-xs text-slate-400 shrink-0">
              ({index + 1}/{images.length})
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center p-3 sm:p-6 overflow-auto">
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChangeIndex((index - 1 + images.length) % images.length);
            }}
            className="fixed left-2 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-2.5 sm:p-3 rounded-full bg-black/70 border border-white/15 text-white hover:bg-amber-500/20 hover:border-amber-400/50 transition"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        <img
          src={current.file}
          alt={current.title}
          onClick={(e) => e.stopPropagation()}
          className="max-w-full max-h-[82dvh] object-contain rounded-lg shadow-2xl border border-white/10"
        />

        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChangeIndex((index + 1) % images.length);
            }}
            className="fixed right-2 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-2.5 sm:p-3 rounded-full bg-black/70 border border-white/15 text-white hover:bg-amber-500/20 hover:border-amber-400/50 transition"
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
