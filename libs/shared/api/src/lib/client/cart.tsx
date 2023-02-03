import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useGetProfile } from '../common/authentication';
import { clientApiInstance } from '../common/common';
const CART_MF_ITEMS = 'CART_MF_ITEMS';

//get the mf cart items list for transaction type
export enum CART_TYPE {
  PURCHASE = 'PURCHASE',
  SWITCH = 'SWITCH',
  REDEMPTION = 'REDEMPTION',
  SIP = 'SIP',
  STP = 'STP',
  SWP = 'SWP',
}

//get the mf cart items list for transaction type

export interface ICart {
  id: string;
  transaction_type: CART_TYPE;
  status: 'pending' | 'draft';
  total_amount: number;
  cart_items: {
    mf_scheme_name: string;
    mf_scheme_logo_url: string;
    mf_scheme_amc_name: string;
    amount: number;
    mf_scheme: string;
    id: string;
  }[];
}
async function getCartMfItems({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string, string, string | undefined]>) {
  const [, accountId, transaction_type, can_number] = queryKey;
  if (!accountId) {
    return;
  }
  const {
    data: {
      data: { carts },
    },
  } = await clientApiInstance.get<{
    data: {
      carts: ICart | undefined;
    };
  }>(
    `/accounts/${accountId}/mf-carts/?transaction_type=${transaction_type}&can_number=${
      can_number ? can_number : ''
    }`,
    {
      signal,
    }
  );

  return carts;
}

export function useGetCartMfItems(
  transaction_type: string,
  can_number?: string | undefined,
  client_id?: string | undefined
) {
  const { data: profile } = useGetProfile();
  const accountId = !client_id
    ? profile?.accounts?.[0]?.id || ''
    : client_id || '';
  return useQuery(
    [CART_MF_ITEMS, accountId, transaction_type, can_number],
    getCartMfItems,
    {
      enabled: !!accountId,
    }
  );
}

async function addMfCartItems(payload: {
  data: {
    mf_scheme_id: string;
    transaction_type: string;
    amount: number;
    can_number: string;
  };
  accountId?: string;
}) {
  const { accountId, data } = payload;
  const {
    data: { data: response },
  } = await clientApiInstance.post<{ data: { message: string } }>(
    `/accounts/${accountId}/mf-carts/`,
    data
  );
  return response;
}
export function useAddMfCartItems() {
  return useMutation(addMfCartItems);
}

async function deleteMfCartItem(payload: {
  cart_id: string;
  accountId?: string;
  mf_scheme_id?: string;
  mf_cart_item_id?: string;
}) {
  const { accountId, cart_id, mf_scheme_id, mf_cart_item_id } = payload;
  const {
    data: { data },
  } = await clientApiInstance.delete<{ data: { message: string } }>(
    `/accounts/${accountId}/mf-carts/${cart_id}/items/`,
    { data: { mf_scheme_id: mf_scheme_id, mf_cart_item_id: mf_cart_item_id } }
  );
  return data;
}
export function useDeleteMfCartItem() {
  const queryClient = useQueryClient();
  return useMutation(deleteMfCartItem, {
    onSuccess: () => queryClient.resetQueries(CART_MF_ITEMS),
  });
}
