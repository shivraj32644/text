import { QueryFunctionContext, useQuery } from 'react-query';
import { cmsApiInstance } from '../cms-content/common';
const WEBINAR = 'WEBINAR';

export async function fetchWebinar({
  queryKey,
}: QueryFunctionContext<[string, number | undefined, number | undefined]>) {
  const [, page, previousWebinarPage] = queryKey;
  const perPage = 12;

  const {
    data: {
      data: { attributes },
    },
  } = await cmsApiInstance.get('/webinar?populate=deep,5');
  const {
    data: { data, meta },
  } = await cmsApiInstance.get(
    `/webinars-data?pagination[page]=${page}&populate=deep,5&pagination[pageSize]=${perPage}&pagination[withCount]=true&filters[$and][0][Upcoming][$eq]=true`
  );
  const {
    data: { data: previousData, meta: previousMeta },
  } = await cmsApiInstance.get(
    `/webinars-data?pagination[page]=${previousWebinarPage}&populate=deep,5&pagination[pageSize]=${perPage}&pagination[withCount]=true&filters[$and][0][Upcoming][$eq]=false`
  );
  return {
    upcomingPagination: meta?.pagination,
    upcomingWebinars: data,
    previousPagination: previousMeta?.pagination,
    previousWebinars: previousData,
    blocks: {
      ...attributes,
    },
    perPage,
  };
}

export function useGetWebinar(page?: number, previousWebinarPage?: number) {
  return useQuery([WEBINAR, page, previousWebinarPage], fetchWebinar);
}
