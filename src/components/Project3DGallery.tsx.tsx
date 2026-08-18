'use client';

import { useState } from 'react';

interface Project3DGalleryProps {
  images: string[];
}

export default function Project3DGallery({ images = [] }: Project3DGalleryProps) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center text-slate-500 border border-slate-800 rounded-lg">
        No preview images uploaded.
      </div>
    );
  }

  const total = images.length;

  return (
    <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden py-10">
      <div className="relative w-72 h-96 flex items-center justify-center">
        {images.map((img, i) => {
          const offset = (i - index + total) % total;
          const angle = (360 / total) * offset;
          const isCurrent = offset === 0;

          return (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`absolute w-64 h-80 rounded-xl overflow-hidden shadow-2xl border border-slate-700 cursor-pointer transition-all duration-500 ease-out ${
                isCurrent ? 'ring-2 ring-blue-500 z-20 scale-105' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                transform: `rotateY(${angle}deg) translateZ(280px)`,
              }}
            >
              <img src={img} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setIndex((index - 1 + total) % total)}
        className="absolute left-4 z-30 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full border border-slate-600"
      >
        &#8592;
      </button>
      <button
        type="button"
        onClick={() => setIndex((index + 1) % total)}
        className="absolute right-4 z-30 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full border border-slate-600"
      >
        &#8594;
      </button>
    </div>
  );
}