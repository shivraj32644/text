import { useMutation } from 'react-query';
import { clientApiInstance } from '../common/common';
import { IOptions } from './ecan-registration';

export const txnTypeOptions: IOptions[] = [
  { value: 'E', label: 'All Units' },
  { value: 'A', label: 'Specific Amount' },
  { value: 'U', label: 'Specific Unit' },
];
export const txnStateTypeOptions: IOptions[] = [
  { value: 'F', label: 'Fixed' },
  { value: 'V', label: 'Variable' },
];

export const frequencyOptions: IOptions[] = [
  { value: 'D', label: 'Daily' },
  { value: 'W', label: 'Weekly' },
  { value: 'F', label: 'Fortnightly' },
  { value: 'M', label: 'Monthly' },
  { value: 'B', label: 'Bi-Monthly' },
  { value: 'Q', label: 'Quarterly' },
  { value: 'S', label: 'Semi-Annually' },
  { value: 'A', label: 'Annually' },
];
async function purchaseTransaction(payload: {
  formData: {
    cartId: string | undefined;
    canId: string | undefined;
  };
  account_id: string;
}) {
  const { formData, account_id } = payload;
  const {
    data: { data },
  } = await clientApiInstance.post<{
    data: {
      order_id?: string;
      payment_link?: string;
    };
  }>(`/accounts/${account_id}/mf-carts/${formData?.cartId}/order/purchase/`, {
    can_number: formData?.canId,
  });
  return data;
}
export function usePurchaseTransaction() {
  return useMutation(purchaseTransaction);
}

async function redeemTransaction(payload: {
  formData: {
    cartId: string | undefined;
    canId: string | undefined;
    folio_num: string | undefined;
    txn_vol: string | undefined;
    txn_type: string | undefined;
  };
  account_id: string;
}) {
  const { formData, account_id } = payload;
  const {
    data: { data },
  } = await clientApiInstance.post<{
    data: {
      mfu_app_link_pri?: string;
    };
  }>(`/accounts/${account_id}/mf-carts/${formData?.cartId}/order/redeem/`, {
    can_number: formData?.canId,
    folio_num: formData?.folio_num,
    txn_vol: formData?.txn_type === 'E' ? '' : formData?.txn_vol,
    txn_type: formData?.txn_type,
  });
  return data;
}
export function useRedeemTransaction() {
  return useMutation(redeemTransaction);
}

async function switchTransaction(payload: {
  formData: {
    cartId: string | undefined;
    canId: string | undefined;
    folio_num: string | undefined;
    txn_vol: string | undefined;
    txn_type: string | undefined;
    tar_scheme_code: string | undefined;
    src_scheme_code: string | undefined;
  };
  account_id: string;
}) {
  const { formData, account_id } = payload;
  const {
    data: { data },
  } = await clientApiInstance.post<{
    data: {
      mfu_app_link_pri?: string;
      //       mfu_app_link_h1: ""
      // mfu_app_link_h2: ""
    };
  }>(`/accounts/${account_id}/mf-carts/${formData?.cartId}/order/switch/`, {
    can_number: formData?.canId,
    folio_num: formData?.folio_num,
    txn_vol: formData?.txn_type === 'E' ? '' : formData?.txn_vol,
    txn_type: formData?.txn_type,
    tar_scheme_code: formData?.tar_scheme_code,
    src_scheme_code: formData?.src_scheme_code,
  });
  return data;
}
export function useSwitchTransaction() {
  return useMutation(switchTransaction);
}

async function swpTransaction(payload: {
  formData: {
    cartId: string | undefined;
    canId: string | undefined;
    folio_num: string | undefined;
    txn_vol: string | undefined;
    txn_type: string | undefined;
    frequency: string | undefined;
    day: number | undefined;
    start_month: number | undefined;
    start_year: string | undefined;
    end_month: number | undefined;
    end_year: string | undefined;
  };
  account_id: string;
}) {
  const { formData, account_id } = payload;
  const {
    data: { data },
  } = await clientApiInstance.post<{
    data: {
      mfu_app_link_pri?: string;
      //       mfu_app_link_h1: ""
      // mfu_app_link_h2: ""
    };
  }>(`/accounts/${account_id}/mf-carts/${formData?.cartId}/order/swp/`, {
    can_number: formData?.canId,
    folio_num: formData?.folio_num,
    txn_vol: formData?.txn_type === 'E' ? '' : formData?.txn_vol,
    txn_type: formData?.txn_type,
    frequency: formData?.frequency,
    day: formData?.day,
    start_month: formData?.start_month,
    start_year: formData?.start_year,
    end_month: formData?.end_month,
    end_year: formData?.end_year,
  });
  return data;
}
export function useSWPTransaction() {
  return useMutation(swpTransaction);
}

async function sipTransaction(payload: {
  formData: {
    cartId: string | undefined;
    canId: string | undefined;
    folio_num: string | undefined;
    txn_vol: string | undefined;
    txn_type: string | undefined;
    frequency: string | undefined;
    day: number | undefined;
    start_month: number | undefined;
    start_year: string | undefined;
    end_month: number | undefined;
    end_year: string | undefined;
  };
  account_id: string;
}) {
  const { formData, account_id } = payload;
  await clientApiInstance.post<{
    data: {
      mfu_app_link_pri?: string;
      //       mfu_app_link_h1: ""
      // mfu_app_link_h2: ""
    };
  }>(`/accounts/${account_id}/mf-carts/${formData?.cartId}/order/sip/`, {
    can_number: formData?.canId,
    folio_num: formData?.folio_num,
    txn_vol: formData?.txn_type === 'E' ? '' : formData?.txn_vol,
    txn_type: formData?.txn_type,
    frequency: formData?.frequency,
    day: formData?.day,
    start_month: formData?.start_month,
    start_year: formData?.start_year,
    end_month: formData?.end_month,
    end_year: formData?.end_year,
  });
  return true;
}
export function useSIPTransaction() {
  return useMutation(sipTransaction);
}

async function stpTransaction(payload: {
  formData: {
    cartId: string | undefined;
    canId: string | undefined;
    folio_num: string | undefined;
    txn_vol: string | undefined;
    txn_type: string | undefined;
    frequency: string | undefined;
    day: number | undefined;
    start_month: number | undefined;
    start_year: string | undefined;
    end_month: number | undefined;
    end_year: string | undefined;
    tar_scheme_code: string | undefined;
    src_scheme_code: string | undefined;
  };
  account_id: string;
}) {
  const { formData, account_id } = payload;
  const {
    data: { data },
  } = await clientApiInstance.post<{
    data: {
      mfu_app_link_pri?: string;
      //       mfu_app_link_h1: ""
      // mfu_app_link_h2: ""
    };
  }>(`/accounts/${account_id}/mf-carts/${formData?.cartId}/order/stp/`, {
    can_number: formData?.canId,
    folio_num: formData?.folio_num,
    txn_vol: formData?.txn_type === 'E' ? '' : formData?.txn_vol,
    txn_type: formData?.txn_type,
    frequency: formData?.frequency,
    day: formData?.day,
    start_month: formData?.start_month,
    start_year: formData?.start_year,
    end_month: formData?.end_month,
    end_year: formData?.end_year,
    tar_scheme_code: formData?.tar_scheme_code,
    src_scheme_code: formData?.src_scheme_code,
  });
  return data;
}
export function useSTPTransaction() {
  return useMutation(stpTransaction);
}
