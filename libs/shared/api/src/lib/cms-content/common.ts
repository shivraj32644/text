import Axios from 'axios';
import qs from 'qs';

//
// CONSTANTS
//
export const CMS_API_BASE = process.env['NEXT_PUBLIC_CMS_API_BASE'];

//
// INSTANCE
//
export const cmsApiInstance = Axios.create({
  baseURL: CMS_API_BASE,
  paramsSerializer(params) {
    return qs.stringify(params, { encodeValuesOnly: true });
  },
});

//
// INTERCEPTORS
//

//
// COMMON TYPES
//
export interface Image {
  id: number;
  attributes: {
    alternativeText: string;
    url: string;
    formats: null | {
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
}
export interface CmsImage {
  data: Image;
}

//
// COMMON UTILS
//
export function normalizeCmsImage(image?: CmsImage) {
  if (!image || !image.data)
    return { url: '', alternativeText: '', small: '', thumbnail: '' };
  const {
    data: {
      attributes: { url, alternativeText, formats },
    },
  } = image;
  return {
    url:
      url?.split('/uploads/')?.length === 1
        ? url
        : CMS_API_BASE?.replace('/api', '') + url,
    alternativeText,
    small:
      url?.split('/uploads/')?.length === 1
        ? formats?.small?.url || url
        : CMS_API_BASE?.replace('/api', '') + (formats?.small?.url || url),
    thumbnail:
      url?.split('/uploads/')?.length === 1
        ? formats?.thumbnail?.url || url
        : CMS_API_BASE?.replace('/api', '') + (formats?.thumbnail?.url || url),
  };
}

export function normalizeMultipleCmsImage(image?: Image) {
  if (!image) return { url: '', alternativeText: '', small: '', thumbnail: '' };

  const {
    attributes: { url, alternativeText, formats },
  } = image;

  return {
    url:
      url?.split('/uploads/')?.length === 1
        ? url
        : CMS_API_BASE?.replace('/api', '') + url,
    alternativeText,
    small:
      url?.split('/uploads/')?.length === 1
        ? formats?.small?.url || url
        : CMS_API_BASE?.replace('/api', '') + (formats?.small?.url || url),
    thumbnail:
      url?.split('/uploads/')?.length === 1
        ? formats?.thumbnail?.url || url
        : CMS_API_BASE?.replace('/api', '') + (formats?.thumbnail?.url || url),
  };
}
