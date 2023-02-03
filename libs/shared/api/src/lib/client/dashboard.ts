import { QueryFunctionContext, useMutation, useQuery } from 'react-query';
import { clientApiInstance } from '../common/common';
import { useGetProfile } from '../common/authentication';
import pick from 'lodash/pick';
import { IMutualFundSchema } from './mutual-funds';

// TYPES
export interface AssetDashboardSummary {
  assetId: number;
  assetClass: string;
  detailsSectionName: string;
  assetValue: number;
  investedVal: number;
  currentVal: number;
  returns: number;
  irr: number;
  assetDuration?: string;
}

interface AssetAllocationDashboardData {
  chartData: [
    {
      name: string;
      exposure: number;
      metaData: {
        mktValue: number;
        returns: number;
        returnPerCent: number;
        cost: number;
        productList: [
          {
            prodName: string;
            currentVal: number;
            exposure: number;
          }
        ];
      };
    }
  ];
}

interface ProductsDashboardData {
  chartData: {
    name: string;
    exposure: number;
    metaData: {
      currMktVal: number;
      returns: number;
      returnPerCent: number;
      cost: number;
      currentVal: number;
    };
  }[];
}

type CapitalGainsDashboardData = Record<
  'realised' | 'unrealised',
  {
    prodList:
      | { name: string; stVal: number | null; ltValue: number | null }[]
      | null;
    schemeList: null;
  }
>;

interface MarketCapDashboardData {
  exposure: number;
  currentVal: number;
  returns: null;
  change: null;
  chartData: {
    name: string;
    value: number;
    metaData: {
      exposure: number;
      currentVal: number;
      productList: {
        prodName: string;
        currentVal: number;
        exposure: number;
      }[];
    };
  }[];
}

interface RatingDashboardData {
  exposure: number;
  currentVal: number;
  returns: null;
  change: null;
  chartData: {
    name: string;
    exposure: number;
    currentVal: number;
    metaData: {
      debtValue: number;
      debtExp: number;
      mfValue: number;
      mfExp: number;
      aifValue: number;
      aifExp: number;
      pmsValue: number;
      pmsExp: number;
    };
  }[];
}

interface TopSectorsDashboardData {
  currentValue: number;
  exposure: number;
  companySectorlist: {
    sectName: string;
    currentValue: number;
    exposure: number;
    sectDetailsList: {
      prodName: string;
      currentVal: number;
      exposure: number;
    }[];
  }[];
}

interface TopCompanyDashboardData {
  currentValue: number;
  exposure: number;
  companySectorlist: {
    compName: string;
    currentValue: number;
    exposure: number;
    compDetailsList: {
      prodName: string;
      currentVal: number;
      exposure: number;
    }[];
  }[];
}

interface DurationDashboardData {
  chartData: {
    name: string;
    exposure: 0;
  }[];
}

interface AssetDashboardData {
  assetAllocation: AssetAllocationDashboardData;
  products: ProductsDashboardData;
  capitalGains: CapitalGainsDashboardData;
  marketCap: MarketCapDashboardData;
  rating: RatingDashboardData;
  topSectors: TopSectorsDashboardData;
  topCompany: TopCompanyDashboardData;
  duration: DurationDashboardData;
}

interface CategoryPerformanceDashboardData {
  chartData: {
    name: string;
    exposure: number;
    metaData: {
      cost: number;
      returns: number;
      mktValue: number;
      issuerList: string[];
      returnPerCent: number;
    };
  }[];
}

type AssetDashboardDataListItem =
  | (AssetAllocationDashboardData & { type: 'assetAllocation' })
  | (ProductsDashboardData & { type: 'products' })
  | (CapitalGainsDashboardData & { type: 'capitalGains' })
  | (MarketCapDashboardData & { type: 'marketCap' })
  | (RatingDashboardData & { type: 'rating' })
  | (TopSectorsDashboardData & { type: 'topSectors' })
  | (TopCompanyDashboardData & { type: 'topCompany' })
  | (DurationDashboardData & { type: 'duration' })
  | (CategoryPerformanceDashboardData & { type: 'categoryPerformance' });

interface DashboardInvestmentGrowth {
  aum: number;
  month: string;
  newNewAssets: number;
}

// QUERY KEYS
const DASHBOARD_TOTAL_SUMMARY_DETAILS = 'DASHBOARD_TOTAL_SUMMARY_DETAILS';
const DASHBOARD_ASSET_DATA = 'DASHBOARD_ASSET_DATA';
const DASHBOARD_INVESTMENT_GROWTH_DATA = 'DASHBOARD_INVESTMENT_GROWTH_DATA';
const DASHBOARD_FUND_CODES = 'DASHBOARD_FUND_CODES';
const MARKET_ACTION_LIST = 'MARKET_ACTION_LIST';
// API METHODS

// assets list
async function getDashboardAssetsList({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: AssetDashboardSummary & {
      assetBreakup: AssetDashboardSummary[];
    };
  }>(`/accounts/${accountId}/dashboard/total_summary_details/`, { signal });

  const { assetBreakup, ...total } = data;
  return [total, ...assetBreakup];
}
export function useGetDashboardAssetsList() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [DASHBOARD_TOTAL_SUMMARY_DETAILS, accountId],
    getDashboardAssetsList,
    { enabled: !!accountId }
  );
}

async function getAssetDashboardData({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string, string]>) {
  const [, accountId, sectionName] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: AssetDashboardData;
  }>(`/accounts/${accountId}/dashboard/${sectionName}/`, { signal });

  const dataWithType = (
    Object.keys(data).sort() as (keyof AssetDashboardData)[]
  ).map((key) => ({
    type: key,
    ...data[key],
  })) as AssetDashboardDataListItem[];

  return dataWithType;
}

export function useGetAssetDashboardData(sectionName: string) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [DASHBOARD_ASSET_DATA, accountId, sectionName],
    getAssetDashboardData,
    { enabled: !!accountId }
  );
}

async function getDashboardInvestmentGrowthData({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: DashboardInvestmentGrowth[];
  }>(`/accounts/${accountId}/dashboard/investment_growth_details/`, { signal });

  return data;
}

export function useGetDashboardInvestmentGrowthData() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [DASHBOARD_INVESTMENT_GROWTH_DATA, accountId],
    getDashboardInvestmentGrowthData,
    { enabled: !!accountId }
  );
}

async function fundPerformanceAnalysis(payload: {
  invested_amount?: number;
  is_cwi_check?: boolean;
  nav_date?: number;
  return_period?: number;
  fund_code: (string | undefined)[];
}) {
  const {
    data: { data },
  } = await clientApiInstance.post('/mf-performance/analysis/', payload);
  return data;
}

export function useFundPerformanceAnalysis() {
  return useMutation(fundPerformanceAnalysis);
}

export async function fetchMutualFundCodes({
  queryKey,
}: QueryFunctionContext<
  [string, string, number | undefined, string | undefined]
>) {
  const [, accountId, page, searchedTerm] = queryKey;

  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: {
      items?: IMutualFundSchema[];
      count: number;
      next: string;
      prev: string;
    };
  }>(
    `/accounts/${accountId}/mf-schemes/?support_crisil=1&page=${page}${
      searchedTerm && `&search=${searchedTerm}`
    }`
  );
  const filteredData: {
    items?: IMutualFundSchema[];
    count: number;
    next: string;
    prev: string;
  } = {
    ...data,
    items: data?.items
      ?.filter(
        (_filteredContent) =>
          !!_filteredContent?.crisil_scheme_code &&
          _filteredContent?.crisil_scheme_code !== ''
      )
      ?.map((item) => pick(item, 'crisil_scheme_code', 'plan_name')),
  };
  return filteredData;
}
export function useGetMutualFundCodes(page?: number, searchedTerm?: string) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [DASHBOARD_FUND_CODES, accountId, page, searchedTerm],
    fetchMutualFundCodes,
    { enabled: !!accountId }
  );
}

export async function getMarketActionList({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    [key: string]: {
      change_in_percentage?: string;
      change_in_points?: string;
      index_name?: string;
      last_traded_price?: string;
    };
    // dji_avg?: null;
    // ftse_100?: null;
    // nasdaq_comp_index?: null;
    // nifty_50_bank: null;
  }>(`/accounts/${accountId}/dashboard/market_action_details/`);
  return data;
}
export function useGetMarkeActionList() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery([MARKET_ACTION_LIST, accountId], getMarketActionList, {
    enabled: !!accountId,
  });
}
