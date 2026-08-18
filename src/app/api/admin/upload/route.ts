export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { uploadFile, type UploadResourceType } from '@/lib/upload';

const MAX_FILE_BYTES = 50 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const kind = String(form.get('kind') || 'image');
    const files = form.getAll('files').filter((entry): entry is File => entry instanceof File);

    if (!files.length) {
      return NextResponse.json({ error: 'No files were provided.' }, { status: 400 });
    }

    if (kind !== 'image' && kind !== 'archive') {
      return NextResponse.json({ error: 'Unsupported upload kind.' }, { status: 400 });
    }

    for (const file of files) {
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: `${file.name} exceeds the 50MB upload limit.` },
          { status: 400 }
        );
      }
      if (kind === 'image' && !file.type.startsWith('image/')) {
        return NextResponse.json({ error: `${file.name} is not an image.` }, { status: 400 });
      }
      if (kind === 'archive' && !file.name.toLowerCase().endsWith('.zip')) {
        return NextResponse.json({ error: `${file.name} is not a .zip archive.` }, { status: 400 });
      }
    }

    const resourceType: UploadResourceType = kind === 'image' ? 'image' : 'raw';
    const urls = await Promise.all(files.map((file) => uploadFile(file, resourceType)));

    return NextResponse.json({ urls });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed.' },
      { status: 500 }
    );
  }
}
