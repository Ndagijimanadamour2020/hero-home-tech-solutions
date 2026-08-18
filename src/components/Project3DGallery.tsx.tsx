'use client';

import { useState } from 'react';

export default function Project3DGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const total = images.length;

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden perspective-1000 py-10">
      <div className="relative w-72 h-96 flex items-center justify-center transform-style-3d transition-transform duration-500">
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
              <img src={img} alt={`Project Slide ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <button onClick={() => setIndex((index - 1 + total) % total)} className="absolute left-4 z-30 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full border border-slate-600">
        &#8592;
      </button>
      <button onClick={() => setIndex((index + 1) % total)} className="absolute right-4 z-30 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full border border-slate-600">
        &#8594;
      </button>
    </div>
  );
}