import { useMutation } from 'react-query';
import { clientApiInstance } from './common';

async function uploadProfilePicture(payload: { file: File | '' }) {
  const { file } = payload;
  const formData = new FormData();
  formData.append('file', file);
  const {
    data: { data },
  } = await clientApiInstance.post<{ data: { message: string } }>(
    `/auth/user/avatar/`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
  );
  return data;
}

export function useUploadProfilePicture() {
  return useMutation(uploadProfilePicture);
}
