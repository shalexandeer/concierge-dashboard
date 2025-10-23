import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";
import { UploadResponse } from "./types";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadResponse> => {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post<ApiResponse<UploadResponse>>(
        '/uploads/images',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.data;
    },
  });
};

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: async (filename: string): Promise<void> => {
      await api.delete(`/uploads/images/${filename}`);
    },
  });
};
