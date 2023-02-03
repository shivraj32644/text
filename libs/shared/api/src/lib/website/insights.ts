import { QueryFunctionContext, useQuery } from 'react-query';
import { cmsApiInstance } from '../cms-content/common';
const INSIGHT = 'INSIGHT';

export async function fetchInsight({
  queryKey,
}: QueryFunctionContext<[string, number | undefined]>) {
  const [, page] = queryKey;
  const perPage = 12;

  const {
    data: {
      data: { attributes },
    },
  } = await cmsApiInstance.get('/market-insights?populate=deep,5');
  const {
    data: { data, meta },
  } = await cmsApiInstance.get(
    `/insights?populate=deep,5&pagination[page]=${page}&pagination[pageSize]=${perPage}&pagination[withCount]=true`
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

export function useGetInsight(page?: number) {
  return useQuery([INSIGHT, page], fetchInsight);
}
