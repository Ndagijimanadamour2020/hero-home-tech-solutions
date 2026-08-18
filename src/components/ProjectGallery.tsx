'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  videoUrl?: string | null;
  title: string;
}

export default function ProjectGallery({ images, videoUrl, title }: Props) {
  const slides = images.filter(Boolean);
  const [index, setIndex] = useState(0);

  if (!slides.length && !videoUrl) return null;

  const move = (step: number) => setIndex((current) => (current + step + slides.length) % slides.length);

  return (
    <div className="space-y-4">
      {videoUrl && (
        <div className="aspect-video overflow-hidden rounded-2xl border border-slate-800">
          <iframe src={videoUrl} title={`${title} demo video`} allowFullScreen className="h-full w-full" />
        </div>
      )}

      {slides.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slides[index]} alt={`${title} screenshot ${index + 1}`} className="h-[22rem] w-full object-cover" />

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white hover:bg-slate-950"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white hover:bg-slate-950"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}

      {slides.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {slides.map((url, slideIndex) => (
            <button
              key={url}
              type="button"
              onClick={() => setIndex(slideIndex)}
              className={`h-16 w-24 overflow-hidden rounded-lg border ${
                slideIndex === index ? 'border-blue-500' : 'border-slate-800 opacity-60'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`${title} thumbnail ${slideIndex + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
