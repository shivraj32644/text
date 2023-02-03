import { QueryFunctionContext, useMutation, useQuery } from 'react-query';
import { Url } from 'url';
import { cmsApiInstance } from '../cms-content/common';

const FORM_DATA_DETAILS = 'FORM_DATA_DETAILS';
export interface IForm {
  button?: {
    href?: Url;
    label?: string;
    target?: string;
    isExternal?: boolean;
    theme?: 'primary' | 'secondary';
  };
  inputs?: {
    label?: string;
    name?: string;
    placeholder?: string;
    type?: 'text' | 'tel' | 'textarea' | 'file';
    validations?: {
      type?: string;
      params?: string[];
    }[];
    validationType?: 'string';
  }[];
  slug?: string;
  title?: string;
}
export async function fetchFormDataDetails({
  queryKey,
}: QueryFunctionContext<[string, string | undefined]>) {
  const [, slug] = queryKey;
  const {
    data: { data },
  } = await cmsApiInstance.get<{
    data: {
      attributes: IForm;
    }[];
  }>(`/forms?&filters[$and][0][slug][$eq]=${slug}&populate=deep,5`);
  return data[0]?.attributes;
}

export function useGetFetchFormDataDetails(slug?: string) {
  return useQuery([FORM_DATA_DETAILS, slug], fetchFormDataDetails, {
    enabled: !!slug,
  });
}

export interface IFormData {
  token?: string;
  formName?: string;
  data?: {
    name?: string;
    email?: string;
    phone?: number;
    message?: string;
  };
  formOrigin?:
    | 'contact-us'
    | 'partner-with-us'
    | 'stay-tuned'
    | 'query-support'
    | 'webinar-register'
    | 'request-demo'
    | 'join-us';
}
async function submitFormData(payload: IFormData) {
  const {
    data: { data: response },
  } = await cmsApiInstance.post<{
    data: any;
  }>(`/form-data/`, {
    data: payload,
  });
  return response;
}

export function useSubmitFormData() {
  return useMutation(submitFormData);
}

async function uploadFileOnMediaLibrary(payload: { file: File | '' }) {
  const { file } = payload;
  const formData = new FormData();
  formData.append('files', file);
  const { data } = await cmsApiInstance.post<
    {
      id?: number;
      name?: string;
      alternativeText?: null;
      caption?: null;
      width?: number;
      height?: number;
      formats?: null;
      hash?: string;
      ext?: string;
      mime?: string;
      size?: number;
      url?: string;
      previewUrl?: null;
      provider?: string;
      provider_metadata?: null;
      createdAt?: Date;
      updatedAt?: Date;
    }[]
  >(`/upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });

  return data[0];
}

export function useUploadFileOnMediaLibrary() {
  return useMutation(uploadFileOnMediaLibrary);
}

async function deleteFileOnMediaLibrary(id?: number) {
  const { data } = await cmsApiInstance.delete<{ data: any }>(
    `/upload/files/${id}`
  );
  console.log(data);
  return data;
}

export function useDeleteFileOnMediaLibrary() {
  return useMutation(deleteFileOnMediaLibrary);
}
