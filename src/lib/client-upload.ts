export type UploadKind = 'image' | 'archive';

export async function uploadFiles(files: File[], kind: UploadKind): Promise<string[]> {
  const payload = new FormData();
  payload.append('kind', kind);
  files.forEach((file) => payload.append('files', file));

  const res = await fetch('/api/admin/upload', { method: 'POST', body: payload });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Upload failed.');
  }

  return Array.isArray(data.urls) ? data.urls : [];
}
