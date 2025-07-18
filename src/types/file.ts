export enum ContentType {
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_JPG = 'image/jpg',
  IMAGE_PNG = 'image/png',
  IMAGE_GIF = 'image/gif',
  IMAGE_WEBP = 'image/webp',
  VIDEO_MP4 = 'video/mp4',
  VIDEO_MOV = 'video/mov',
  APPLICATION_PDF = 'application/pdf',
  AUDIO_MPEG = 'audio/mpeg',
  AUDIO_WAV = 'video/wav',
  AUDIO_OGG = 'audio/ogg',
  AUDIO_AAC = 'audio/aac',
  AUDIO_FLAC = 'audio/flac',
}

export type GeneratePresignedUrlParams = {
  contentType: ContentType;
  key: string;
  file: File;
};

export type GeneratePresignedUrlResponse = {
  uploadUrl: string;
  fileUrl: string;
  key: string;
  contentType: ContentType;
  expiredAt: string;
};
