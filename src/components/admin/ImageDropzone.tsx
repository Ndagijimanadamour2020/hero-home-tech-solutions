'use client';

import { useRef, useState } from 'react';
import { uploadFiles } from '@/lib/client-upload';

interface Props {
  urls: string[];
  onChange: (urls: string[]) => void;
  onError: (message: string) => void;
  disabled?: boolean;
}

export default function ImageDropzone({ urls, onChange, onError, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (fileList: FileList | null) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const uploaded = await uploadFiles(files, 'image');
      onChange([...urls, ...uploaded]);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) void handleFiles(e.dataTransfer.files);
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
          dragging ? 'border-blue-500 bg-blue-500/5' : 'border-slate-700 bg-slate-950'
        } ${disabled ? 'pointer-events-none opacity-50' : ''}`}
      >
        <p className="text-sm font-semibold text-slate-200">
          {uploading ? 'Uploading images...' : 'Drag & drop images here'}
        </p>
        <p className="mt-1 text-xs text-slate-500">or click to select multiple files (PNG, JPG, WebP)</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => void handleFiles(e.target.files)}
        />
      </div>

      {urls.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {urls.map((url) => (
            <div key={url} className="relative overflow-hidden rounded-lg border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="Uploaded project preview" className="h-24 w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(urls.filter((item) => item !== url))}
                className="absolute right-1 top-1 rounded bg-slate-950/80 px-2 py-1 text-xs font-semibold text-rose-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
