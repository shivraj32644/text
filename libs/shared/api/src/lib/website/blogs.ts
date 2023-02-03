import { QueryFunctionContext, useQuery } from 'react-query';
import { cmsApiInstance } from '../cms-content/common';
const BLOGS = 'BLOGS';

export async function fetchBlogs({
  queryKey,
}: QueryFunctionContext<[string, number | undefined]>) {
  const [, page] = queryKey;
  const perPage = 12;

  const {
    data: {
      data: { attributes },
    },
  } = await cmsApiInstance.get('/blog?populate=deep,5');
  const {
    data: { data, meta },
  } = await cmsApiInstance.get(
    `/articles?populate=deep,5&pagination[page]=${page}&pagination[pageSize]=${perPage}&pagination[withCount]=true`
  );
  return {
    pagination: meta?.pagination,
    pageData: data,
    blocks: {
      ...attributes,
    },
    perPage,
  };
}

export function useGetBlogs(page?: number) {
  return useQuery([BLOGS, page], fetchBlogs);
}
