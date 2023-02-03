import { QueryFunctionContext, useQuery } from 'react-query';
import { publicApiInstance } from '../common/common';
const PUBLIC_MUTUAL_FUND_SCHEMA = 'PUBLIC_MUTUAL_FUND_SCHEMA';

export interface IPublicMutualFundSchema {
  success?: boolean;
  data?: {
    count?: number;
    next?: string | null;
    previous?: string | null;
    items?: Item[];
  };
}

export interface Item {
  plan_name?: string;
  sub_category?: '1' | '2' | '3' | '4';
  category?: '1' | '2' | '3' | '4';
  id?: string;
  amc?: {
    name?: string;
    logo_url?: string;
  };
  return_average?: {
    report_date?: string | null;
    month_1?: string | null;
    month_3?: string | null;
    month_6?: string | null;
    year_1?: string | null;
    year_3?: string | null;
    year_5?: string | null;
    year_10?: string | null;
    inception?: string | null;
  } | null;
}

export async function fetchPublicMutualFundSchema({
  queryKey,
}: QueryFunctionContext<[string, number | undefined]>) {
  const [, page] = queryKey;
  const {
    data: { data },
  } = await publicApiInstance.get<IPublicMutualFundSchema>(
    `/mf-schemes/?page=${page}&scheme_id_in=CFDGGAXF,DFCCGG,MONGZT,798D,LQAGGRMF,8101P,53TNH,151GZB`
  );

  return data;
}

export function useGetPublicMutualSchema(page?: number) {
  return useQuery(
    [PUBLIC_MUTUAL_FUND_SCHEMA, page],
    fetchPublicMutualFundSchema
  );
}
