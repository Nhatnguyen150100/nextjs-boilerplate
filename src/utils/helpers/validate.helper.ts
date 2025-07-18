import {
  AUDIO_SIZE_MAX,
  IMAGE_SIZE_MAX,
  VIDEO_SIZE_MAX,
  validAudio,
  validImage,
  validVideo,
} from '@/constants/file';
import { ContentType } from '@/types/file';

export const isValidOtp = (value: string): boolean => {
  return /^\d+$/.test(value);
};

export const isSingleDigit = (value: string): boolean => {
  return /^[0-9]?$/.test(value);
};

export const validateVideo = (file: File) => {
  if (!validVideo.includes(file.type as ContentType)) {
    return 'File is not in correct format';
  }

  if (file.size > VIDEO_SIZE_MAX) {
    return 'File exceeds maximum size, please check again!';
  }

  return '';
};

export const validateImage = (file: File) => {
  if (!validImage.includes(file.type as ContentType)) {
    return 'File is not in correct format';
  }

  if (file.size > IMAGE_SIZE_MAX) {
    return 'File exceeds maximum size, please check again!';
  }

  return '';
};

export const validateAudio = (file: File) => {
  if (!validAudio.includes(file.type as ContentType)) {
    return 'File is not in correct format';
  }

  if (file.size > AUDIO_SIZE_MAX) {
    return 'File exceeds maximum size, please check again!';
  }

  return '';
};
