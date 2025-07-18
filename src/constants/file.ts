import { ContentType } from '@/types/file';

export const VIDEO_SIZE_MAX = 1024 * 1024 * 20; // 20 MB
export const IMAGE_SIZE_MAX = 1024 * 1024 * 10; // 10 MB
export const AUDIO_SIZE_MAX = 1024 * 1024 * 10; // 10 MB

export const validImage = [
  ContentType.IMAGE_PNG,
  ContentType.IMAGE_JPEG,
  ContentType.IMAGE_JPG,
  ContentType.IMAGE_GIF,
];
export const validVideo = [ContentType.VIDEO_MP4, ContentType.VIDEO_MOV];
export const validAudio = [
  ContentType.AUDIO_AAC,
  ContentType.AUDIO_FLAC,
  ContentType.AUDIO_MPEG,
  ContentType.AUDIO_OGG,
  ContentType.AUDIO_WAV,
];

export const contentTypeVideo = [ContentType.VIDEO_MOV, ContentType.VIDEO_MP4];
export const contentTypeImage = [
  ContentType.IMAGE_GIF,
  ContentType.IMAGE_JPEG,
  ContentType.IMAGE_GIF,
  ContentType.IMAGE_JPG,
  ContentType.IMAGE_PNG,
  ContentType.IMAGE_WEBP,
];
