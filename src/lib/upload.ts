import { createHash } from 'crypto';

export type UploadResourceType = 'image' | 'raw';

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder: string;
}

function readConfig(): CloudinaryConfig {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'File uploads are not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.'
    );
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'hero-home-tech/projects',
  };
}

function signParams(params: Record<string, string>, apiSecret: string) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return createHash('sha1').update(`${payload}${apiSecret}`).digest('hex');
}

export async function uploadFile(file: File, resourceType: UploadResourceType): Promise<string> {
  const { cloudName, apiKey, apiSecret, folder } = readConfig();

  const signedParams: Record<string, string> = {
    folder,
    timestamp: String(Math.floor(Date.now() / 1000)),
  };

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', apiKey);
  form.append('signature', signParams(signedParams, apiSecret));
  Object.entries(signedParams).forEach(([key, value]) => form.append(key, value));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    { method: 'POST', body: form }
  );

  const result = await response.json();

  if (!response.ok || !result.secure_url) {
    throw new Error(result?.error?.message || 'Upload failed.');
  }

  return String(result.secure_url);
}
