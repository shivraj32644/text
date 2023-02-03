import { useQuery, QueryFunctionContext } from 'react-query';
import { Url } from 'url';
import { cmsApiInstance, CmsImage, normalizeCmsImage } from './common';

// TYPES
interface InsightsItem {
  title: string;
  image: CmsImage;
  categories: {
    data: {
      id: number;
      attributes: {
        image: CmsImage;
        title: string;
      };
    }[];
  };
  publishedAt: string;
}

interface InsightDetail extends InsightsItem {
  content: string;
  related: {
    data: { id: string; attributes: InsightsItem }[];
  };
}

interface CategoriesItem {
  title: string;
  image: CmsImage;
}

// QUERY KEYS
const CATEGORIES_QUERY_KEY = 'CATEGORIES_QUERY_KEY';
const CATEGORY_DETAILS_QUERY_KEY = 'CATEGORY_QUERY_KEY';
const INSIGHTS_QUERY_KEY = 'INSIGHTS_QUERY_KEY';
const INSIGHT_DETAILS_QUERY_KEY = 'INSIGHT_DETAILS_QUERY_KEY';

// API METHODS

// Categories List
async function fetchAllCategories({ signal, queryKey }: QueryFunctionContext) {
  const [, pageSize, page] = queryKey;
  const {
    data: { data },
  } = await cmsApiInstance.get<{
    data: { id: number; attributes: CategoriesItem }[];
  }>('/categories', {
    signal,
    params: {
      fields: ['title'],
      populate: 'image',
      pagination: { page, pageSize },
    },
  });

  return data.map(({ id, attributes }) => ({
    id,
    ...attributes,
    image: normalizeCmsImage(attributes.image),
  }));
}

export function useGetAllGetCategories(pageSize = 16, page = 1) {
  return useQuery([CATEGORIES_QUERY_KEY, pageSize, page], fetchAllCategories);
}

async function fetchCategoryDetails({
  signal,
  queryKey,
}: QueryFunctionContext) {
  const [, categoryId] = queryKey;
  const {
    data: { data },
  } = await cmsApiInstance.get<{
    data?: { id?: number; attributes?: { title?: string } }[];
  }>(`/categories/`, {
    signal,
    params: {
      fields: ['title'],
      filters: {
        title: categoryId,
      },
    },
  });

  return data?.map(({ id, attributes }) => ({
    id,
    ...attributes,
  }))[0];
}

export function useGetCategoryDetails(categoryId: string) {
  return useQuery(
    [CATEGORY_DETAILS_QUERY_KEY, categoryId],
    fetchCategoryDetails
  );
}
export interface IInsightsData {
  image?: CmsImage;
  category?: {
    data?: {
      attributes?: {
        title?: string;
        image?: CmsImage;
      };
    };
  };
  social?: {
    socialNetwork?: string;
    url?: Url;
  }[];
  related?: {
    data?: {
      id?: number;
      attributes?: IInsightsData;
    }[];
  };
  slug?: string;
  content?: string;
  title?: string;
  createdAt?: string;
}
// Insights List
async function fetchInsights({ signal, queryKey }: QueryFunctionContext) {
  const [, pageSize, page, category] = queryKey;
  const {
    data: { data, meta },
  } = await cmsApiInstance.get<{
    data?: {
      id?: number;
      attributes?: IInsightsData;
    }[];
    meta?: {
      pagination?: {
        page: number;
        pageSize?: number;
        pageCount?: number;
        total?: number;
      };
    };
  }>('/insights/?populate=deep,5', {
    signal,
    params: {
      pagination: { page, pageSize },
      filters: {
        category: { title: category },
      },
    },
  });
  return {
    data: data?.map(({ id, attributes }) => ({
      id,
      ...attributes,
    })),
    pagination: meta?.pagination,
  };
}

export function useGetInsights(category?: string, pageSize = 16, page = 1) {
  return useQuery(
    [INSIGHTS_QUERY_KEY, pageSize, page, category],
    fetchInsights
  );
}

// Insight Details
async function fetchInsightDetails({ signal, queryKey }: QueryFunctionContext) {
  const [, insightId] = queryKey;

  const {
    data: { data },
  } = await cmsApiInstance.get<{
    data: { id?: number; attributes?: IInsightsData }[];
  }>(`/insights/?populate=deep,5`, {
    signal,
    params: {
      filters: {
        slug: insightId,
      },
    },
  });
  return data?.map(({ id, attributes }) => ({
    id,
    ...attributes,
  }))[0];
}

export function useGetInsightDetails(insightId: string) {
  return useQuery([INSIGHT_DETAILS_QUERY_KEY, insightId], fetchInsightDetails);
}
