import { QueryFunctionContext, useMutation, useQuery } from 'react-query';
import { useGetProfile } from '../common/authentication';
import { clientApiInstance } from '../common/common';
import { IOptions } from './ecan-registration';
const EPAYEEZZ_REGISTRATION_LIST = 'EPAYEEZZ_REGISTRATION_LIST';
const EPAYEEZZ_REGISTRATION_STATUS = 'EPAYEEZZ_REGISTRATION_STATUS';
const LIST_REGISTERED_BANK_ACCOUNTS = 'LIST_REGISTERED_BANK_ACCOUNTS';

export const registrationModeOptions: IOptions[] = [
  { value: 'PN', label: 'Payment Net Banking Mode' },
  { value: 'PD', label: 'Payment Debit Card Mode' },
];

async function postEpayeezzRegistration(payload: {
  formData: {
    can_number?: string;
    start_date?: string | null;
    max_amount?: string;
    bank_id?: string;
    bank_account_number?: string;
  };
  accountId: string | undefined;
}) {
  const { formData, accountId } = payload;
  const {
    data: { data },
  } = await clientApiInstance.post<{
    data: {
      id?: string;
      can_number?: string;
      bank_account_number?: string;
      mmrn_number?: string;
      mmrn_reg_status?: string;
      mmrn_reg_status_label?: string;
      mmrn_aggr_status?: string;
      mmrn_aggr_status_label?: string;
      created_at?: Date;
      updated_at?: Date;
    };
  }>(`/accounts/${accountId}/epayeezz-registration/`, formData);
  return data;
}
export function usePostEpayeezzRegistration() {
  return useMutation(postEpayeezzRegistration);
}

async function getePayEezzRegistrationsList({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const { data } = await clientApiInstance.get<{
    data: {
      count?: number;
      next?: null;
      previous?: null;
      items?: {
        id?: string;
        can_number?: string;
        bank_account_number?: string;
        mmrn_number?: string;
        mmrn_reg_status?: string;
        mmrn_reg_status_label?: string;
        mmrn_aggr_status?: string;
        mmrn_aggr_status_label?: string;
        created_at?: Date;
        updated_at?: Date;
      }[];
    };
  }>(`/accounts/${accountId}/epayeezz-registration/`, { signal });
  return data;
}

export function useGetePayEezzRegistrationsList() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [EPAYEEZZ_REGISTRATION_LIST, accountId],
    getePayEezzRegistrationsList,
    {
      enabled: !!accountId,
    }
  );
}

async function getePayEezzRegistrationStatus({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string, string | undefined]>) {
  const [, accountId, epayeezz_reg_id] = queryKey;
  const { data } = await clientApiInstance.get<{
    data: any;
  }>(`/accounts/${accountId}/epayeezz-registration/${epayeezz_reg_id}/status`, {
    signal,
  });
  return data;
}

export function useGetePayEezzRegistrationStatus(epayeezz_reg_id?: string) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [EPAYEEZZ_REGISTRATION_STATUS, accountId, epayeezz_reg_id],
    getePayEezzRegistrationStatus,
    {
      enabled: !!accountId,
    }
  );
}

async function getListRegisteredBankAccounts({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string, string]>) {
  const [, accountId, can_number] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: {
      count?: number;
      next?: null;
      previous?: null;
      items?: {
        id?: string;
        can_number?: string;
        bank_id?: string;
        bank_name?: string;
        account_number?: string;
        account_type?: string;
        account_type_label?: string;
        ifsc_code?: string;
        micr_code?: string;
        is_primary?: boolean;
        is_secondary?: boolean;
        proof_doc_type?: number;
        proof_doc_type_label?: string;
        created_at?: Date;
        updated_at?: Date;
      }[];
    };
  }>(`/accounts/${accountId}/bank-accounts/?can_number=${can_number}`, {
    signal,
  });

  return data;
}

export function useGetListRegisteredBankAccounts(can_number: string) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [LIST_REGISTERED_BANK_ACCOUNTS, accountId, can_number],
    getListRegisteredBankAccounts,
    {
      enabled: !!accountId && !!can_number,
    }
  );
}
