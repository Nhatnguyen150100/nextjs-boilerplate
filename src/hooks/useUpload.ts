import { uploadService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useUpload() {
  const uploadFile = useMutation({
    mutationFn: uploadService.uploadFile,
  });

  const removeFile = useMutation({
    mutationFn: uploadService.removeFile,
  });

  return { uploadFile, removeFile };
}
