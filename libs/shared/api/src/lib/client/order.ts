import { QueryFunctionContext, useQuery } from 'react-query';
import { Url } from 'url';
import { useGetProfile } from '../common/authentication';
import { clientApiInstance } from '../common/common';
import { OptionsProps } from './mutual-funds';
const LIST_ACCOUNTS_ORDER = 'LIST_ACCOUNTS_ORDER';
export type txn_type = 'PURCHASE' | 'REDEMPTION' | 'SIP' | 'STP' | 'SWP' | '';
export type type = 'NORMAL' | 'SYSTEMATIC' | 'SCHEDULED' | 'APPROVAL';
export type status =
  | 'DRAFT'
  | 'RM_REJECTED'
  | 'PENDING'
  | 'COMPLETED'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_FAILED';

export const OrderTxnTypeOptions: OptionsProps[] = [
  { value: 'PURCHASE', label: 'PURCHASE' },
  { value: 'REDEMPTION', label: 'REDEMPTION' },
  { value: 'STP', label: 'SIP' },
  { value: 'SWP', label: 'SWP' },
  { value: 'SWITCH', label: 'SWITCH' },
];

export const OrderStatusOptions: OptionsProps[] = [
  { value: 'DRAFT', label: 'DRAFT' },
  { value: 'RM_REJECTED', label: 'RM REJECTED' },
  { value: 'PENDING', label: 'PENDING' },
  { value: 'COMPLETED', label: 'COMPLETED' },
  { value: 'PAYMENT_PENDING', label: 'PAYMENT PENDING' },
  { value: 'PAYMENT_FAILED', label: 'PAYMENT FAILED' },
];
export type IOrderItems = {
  id?: string;
  order_number?: string;
  status?: string;
  type?: string;
  txn_type?: string;
  product_type?: string;
  order_mode?: string;
  cart_id?: string;
  can_number?: string;
  can_holder_name?: string;
  created_at?: Date;
  completed_at?: Date | null;
};
async function getListAllAccountsOrder({
  queryKey,
  signal,
}: QueryFunctionContext<
  [
    string,
    string,
    type | undefined,
    string | undefined,
    txn_type[] | undefined,
    status[] | undefined
  ]
>) {
  const [, accountId, type, can_number, txn_type, status] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: {
      count?: number;
      next?: null;
      previous?: null;
      items?: IOrderItems[];
    };
  }>(
    `/accounts/${accountId}/orders/?type=${type}&can_number=${can_number}${
      txn_type?.length !== 0 && !!txn_type ? `&txn_type=${txn_type}` : ''
    }${status?.length !== 0 && !!status ? `&status=${status}` : ''}`,
    {
      signal,
    }
  );

  return data;
}

export function useGetListAllAccountsOrder(
  type?: type,
  can_number?: string,
  status?: status[],
  txn_type?: txn_type[]
) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [LIST_ACCOUNTS_ORDER, accountId, type, can_number, txn_type, status],
    getListAllAccountsOrder,
    {
      enabled: !!accountId && !!can_number && !!type,
    }
  );
}
export interface OrderItem {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  mf_scheme_id?: string;
  mf_scheme_name?: string;
  mf_scheme_logo_url?: null;
  amount?: string;
  mfu_order_sequence_no?: number;
  order?: string;
}
export interface IOrderDetails {
  id?: string;
  order_items?: OrderItem[];
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;
  order_number?: string;
  product_type?: string;
  cart_id?: string;
  status?: string;
  primary_can_holder_name?: string;
  total_amount?: string;
  executed_at?: null;
  type?: string;
  txn_type?: string;
  can_number?: string;
  can_holder_name?: string;
  mfu_group_order_no?: string;
  mfu_net_banking_url?: Url;
  mfu_app_link_pri?: string;
  mfu_app_link_h1?: string;
  mfu_app_link_h2?: string;
  completed_at?: null;
  account?: string;
  can?: string;
}
async function getMutualFundOrderDetails({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string, string | undefined]>) {
  const [, accountId, order_id] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: IOrderDetails;
  }>(`/accounts/${accountId}/orders/${order_id}/`, {
    signal,
  });

  return data;
}

export function useGetMutualFundOrderDetails(order_id?: string) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [LIST_ACCOUNTS_ORDER, accountId, order_id],
    getMutualFundOrderDetails,
    {
      enabled: !!accountId && !!order_id,
    }
  );
}
