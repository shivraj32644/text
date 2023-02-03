/* eslint-disable no-extra-boolean-cast */
import { QueryFunctionContext, useQuery } from 'react-query';
import { useGetProfile } from '../common/authentication';
import { clientApiInstance } from '../common/common';
const MUTUAL_FUNDS_SCHEMA = 'MUTUAL_FUNDS_SCHEMA';
const MUTUAL_FUNDS_SCHEMA_DETAILS = 'MUTUAL_FUNDS_SCHEMA_DETAILS';
const MUTUAL_FUNDS_AMC_LIST = 'MUTUAL_FUNDS_AMC_LIST';
export interface OptionsProps {
  value: string;
  label: string;
}
export const CategoryOptions: OptionsProps[] = [
  { value: '1', label: 'Equity' },
  { value: '2', label: 'DEBT' },
  { value: '3', label: 'Cash/Liquid/Money/Market' },
  { value: '4', label: 'Hybrid' },
];

export const PlanDividendOptions: OptionsProps[] = [
  { value: 'GR', label: 'Growth' },
  { value: 'DIV', label: 'Dividend' },
  { value: 'BO', label: 'Bonus' },
  { value: 'DVID', label: 'Daily Dividend' },
  { value: 'WDIV', label: 'Weekly Dividend' },
  { value: 'MDIV', label: 'Monthly Dividend' },
  { value: 'FDIV', label: 'Fortnightly Dividend' },
  { value: 'QDIV', label: 'Quarterly Dividend' },
  { value: 'HDIV', label: 'Half Yearly Dividend' },
  { value: 'ADIV', label: 'Annual Dividend' },
];

export const FundSizeOptions: OptionsProps[] = [
  { value: '0,1000', label: '< 1000 Crores' },
  { value: '1000,5000', label: '1,000 - 5,000 Crores' },
  { value: '5000,10000', label: '5,000 - 10,000 Crores' },
  { value: '10000,15000', label: '10,000 - 15,000 Crores' },
  { value: '15000,20000', label: '15,000 - 20,000 Crores' },
  { value: '20000,0', label: '> 20,000Crores' },
];
export const AvailabletoInvestOptions: OptionsProps[] = [
  { value: 'true', label: 'SIP' },
];

interface IMutualFundsSchema {
  items: IMutualFundSchema[];
  count: number;
  next: string;
  previous: string;
}
export async function fetchMutualFundSchema({
  queryKey,
}: QueryFunctionContext<
  [
    string,
    string | undefined,
    number | undefined,
    string | undefined,
    string[] | undefined,
    string[] | undefined,
    string[] | undefined,
    string[] | undefined,
    string[] | undefined,
    boolean | undefined
  ]
>) {
  const [
    ,
    accountId,
    page,
    searchedTerm,
    options,
    amc,
    category,
    funds_size,
    SIP,
    is_recommended,
  ] = queryKey;
  const optionsReference = options?.join('&');
  const categoryReference = category?.join('&');
  const sipReference = SIP?.join('&');
  const amcReference = amc?.join('&');
  if (!accountId) {
    return;
  }
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: IMutualFundsSchema;
  }>(
    `/accounts/${accountId}/mf-schemes/?page=${page}${
      !!optionsReference ? `&${optionsReference}` : ''
    }${!!categoryReference ? `&${categoryReference}` : ''}${
      !!sipReference ? `&${sipReference}` : ''
    }${is_recommended ? `&recommended=${is_recommended}` : ''}${
      searchedTerm ? `&search=${searchedTerm}` : ''
    }${funds_size?.length !== 0 && !!funds_size ? `&${funds_size}` : ''}${
      amc?.length !== 0 && !!amc ? `&${amcReference}` : ''
    }`
  );

  return data;
}

export function useGetMutualSchema(
  page?: number,
  searchedTerm?: string | undefined,
  options?: string[] | undefined,
  amc?: string[] | undefined,
  funds_size?: string[] | undefined,
  category?: string[] | undefined,
  SIP?: string[] | undefined,
  is_recommended?: boolean | undefined,
  client_id?: string | undefined
) {
  const { data: profile } = useGetProfile();
  const accountId = !client_id
    ? profile?.accounts?.[0]?.id || ''
    : client_id || '';
  return useQuery(
    [
      MUTUAL_FUNDS_SCHEMA,
      accountId,
      page,
      searchedTerm,
      options,
      amc,
      category,
      funds_size,
      SIP,
      is_recommended,
    ],
    fetchMutualFundSchema,
    { enabled: !!accountId }
  );
}

export async function fetchMutualFundAmcList() {
  const {
    data: {
      data: { amcs },
    },
  } = await clientApiInstance.get<{
    data: {
      amcs: {
        logo_url?: string;
        name?: string;
        id?: number;
      }[];
    };
  }>(`/mf-amcs/`);
  return amcs;
}

export function useGetMutualFundAmcList() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery([MUTUAL_FUNDS_AMC_LIST], fetchMutualFundAmcList, {
    enabled: !!accountId,
  });
}

export interface SchemeDetail {
  corpus_date?: string | null;
  corpus?: string | null;
  portfolio_turnover?: string | null;
  expense_ratio?: string | null;
  management_expense?: string | null;
  avg_tenor?: string | null;
  total_stocks?: string | null;
  total_sectors?: string | null;
  yield_to_market?: string | null;
  modified_duration?: string | null;
}
export interface FundManager {
  name?: string;
  from_date?: Date;
  to_date?: Date;
  mf_scheme?: string;
}
export interface IP2PReturn {
  month_1?: number | null;
  month_3?: number | null;
  month_6?: number | null;
  year_1?: number | null;
  year_3?: number | null;
  year_5?: number | null;
  year_7?: number | null;
  year_10?: number | null;
  inception?: number | null;
}
export interface IMutualFundSchema {
  id?: string;
  p2p_return?: IP2PReturn;
  risk_ratio?: IRiskandRatio;
  return_average?: IP2PReturn | null;
  scheme_code?: string;
  fund_code?: string;
  plan_name?: string;
  amfi_id?: string;
  primary_isin?: string;
  secondary_isin?: string;
  nfo_start_date?: Date;
  nfo_end_date?: Date;
  allotment_date?: Date;
  reopen_date?: Date;
  maturity_date?: Date | null;
  entry_load?: string;
  exit_load?: string;
  is_purchase_allowed?: boolean;
  is_nfo_allowed?: boolean;
  is_sip_allowed?: boolean;
  is_switch_out_allowed?: boolean;
  is_switch_in_allowed?: boolean;
  is_stp_in_allowed?: boolean;
  is_stp_out_allowed?: boolean;
  is_swp_allowed?: boolean;
  is_demat_allowed?: boolean;
  is_redemption_allowed?: boolean;
  is_recommended?: boolean;
  scheme_type?: string;
  plan_type?: string;
  plan_dividend_option?: string;
  dividend_reinvestment_option?: string;
  category?: '1' | '2' | '3' | '4';
  sub_category?: string;
  scheme_flag?: string;
  crisil_scheme_code?: string;
  nav?: {
    nav?: string;
    date?: Date;
    mf_scheme?: string;
  };
  benchmark_index?: {
    name?: string;
  };
  fund_manager?: FundManager;
  scheme_detail?: SchemeDetail;
  amc?: {
    name?: string;
    logo_url?: string;
  };
}
export interface IRiskandRatio {
  standard_deviation?: number | null;
  beta?: number | null;
  sharpe_ratio?: number | null;
  treynor_ratio?: number | null;
  upside_capture_ratio?: number | null;
  downside_capture_ratio?: number | null;
  information_ratio?: null;
}
export async function getMutualFundSchemeDetails({
  queryKey,
}: QueryFunctionContext<[string, string | undefined]>) {
  const [, mf_scheme_id] = queryKey;
  if (!mf_scheme_id) return;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data?: IMutualFundSchema;
  }>(`/mf-schemes/${mf_scheme_id}/`);
  return data;
}
export function useGetMutualFundSchemeDetails(mf_scheme_id?: string) {
  return useQuery(
    [MUTUAL_FUNDS_SCHEMA_DETAILS, mf_scheme_id],
    getMutualFundSchemeDetails
  );
}
