import { QueryFunctionContext, useMutation, useQuery } from 'react-query';
import { useGetProfile } from '../common/authentication';
import { clientApiInstance } from '../common/common';
const ACCOUNT_CANS_LIST = 'ACCOUNT_CANS_LIST';

export interface IOptions {
  value: string;
  label: string;
}

export interface IHoldingType {
  value: string;
  label: string;
}
export const holdingTypeOptions: IHoldingType[] = [
  { value: 'AS', label: 'Anyone or survivor' },
  { value: 'JO', label: 'Joint' },
  { value: 'SI', label: 'Single' },
];

export interface IInvestorCategory {
  value: string;
  label: string;
}
export const investorCategoryOptions: IInvestorCategory[] = [
  { value: 'I', label: 'Individual' },
  { value: 'M', label: 'Minor' },
  { value: 'S', label: 'Sole Proprietor' },
];

export interface ITaxStatus {
  value: string;
  label: string;
}

export const proofUploadOptions: IOptions[] = [
  { value: 'pan_card', label: 'Pan Card' },
  { value: 'bank_proof', label: 'Bank proof' },
  { value: 'minor_guardian_proof', label: 'Minor Birth Certificate' },
  { value: 'others', label: 'Others' },
];

export const bankAccountTypeOptions: IOptions[] = [
  { value: 'OD', label: 'Overdraft' },
  { value: 'CC', label: 'Cash Credit' },
  { value: 'CA', label: 'Current Account' },
  { value: 'SB', label: 'Savings Bank Account' },
  { value: 'NRO', label: 'Non-Resident Ordinary' },
  { value: 'NRE', label: 'Non-Resident External' },
  { value: 'SNRR', label: 'Special Non-Resident Rupee' },
  { value: 'FCNR', label: 'Foreign Currency Non-Resident' },
  { value: 'SNRA', label: 'Special Non-Resident Account' },
  { value: 'PSB', label: 'Public Sector Bank' },
  { value: 'CLSB', label: 'Corp Classic Savings Bank Account' },
  { value: 'OTH', label: 'Others' },
];

export const bankAccountProofDocumentTypeOptions: IOptions[] = [
  { value: '14', label: 'Latest bank passbook' },
  { value: '15', label: 'Latest bank account statement' },
  { value: '77', label: 'Cheque copy' },
  { value: '78', label: 'Bank letter' },
];

export const taxStatusOptions = (type: string) => {
  if (type === 'I') {
    return [
      { value: 'RI', label: '01-RES.IND' },
      { value: 'NRI', label: '02-NRI-NRE' },
      { value: 'NNI', label: '03-NRI-NRO' },
      { value: 'PI', label: '04-Foreign National' },
      { value: 'NPI', label: '05-PIO' },
    ];
  } else if (type === 'M') {
    return [
      { value: 'RM', label: '01-RES.IND (Minor)' },
      { value: 'NRM', label: '02-NRI-NRE (Minor)' },
      { value: 'NNM', label: '03-NRI-NRO (Minor)' },
      { value: 'PM', label: '04-Foreign National (Minor)' },
      { value: 'NPM', label: '05-PIO (Minor)' },
    ];
  } else if (type === 'S') {
    return [{ value: 'RS', label: '01-RES.IND (Sole-Proprietor)' }];
  }
  return undefined;
};

export const holderTypeOptions = (index: number) => {
  if (index === 0) {
    return [{ value: 'PR', label: 'Primary' }];
  } else {
    return [
      { value: 'SR', label: 'Secondary' },
      { value: 'TH', label: 'Third' },
      { value: 'GU', label: 'Guardian' },
    ];
  }
};

export const indentiTypeOptions: IOptions[] = [
  { value: 'A', label: 'Passport' },
  { value: 'B', label: 'Election ID Card' },
  { value: 'C', label: 'PAN Card' },
  { value: 'D', label: 'ID Card' },
  { value: 'E', label: 'Driving License' },
  { value: 'G', label: 'UIDIA / Aadhar letter' },
  { value: 'H', label: 'NREGA Job Card ' },
  { value: 'O', label: 'Others' },
  { value: 'T', label: 'TIN' },
  { value: 'X', label: 'Not categorized' },
];

export interface ICANCriteria {
  holding_type: 'AS' | 'JO' | 'SI';
  investor_category: 'I' | 'M' | 'S';
  tax_status: '01' | '02' | '03' | '04' | '05';
  holder_count: string;
}

async function getCANRegRequestData({
  accountId,
  canRequestId,
}: {
  accountId: string;
  canRequestId: string;
}) {
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: {
      account_id: string;
      checklist_completed: CAN_CHECKLIST_ID[];
      data: {
        data: {
          can_criteria: ICANCriteria;
          holders: Record<'id', string>[];
          bank_accounts: Record<'id', string>[];
          nominees: Record<'id', string>[];
          proof_documents: {
            type: string;
            file_url: string;
          }[];
        };
      };
      id: string;
      status: 'pending' | 'complete';
    };
  }>(`/accounts/${accountId}/can-requests/${canRequestId}/`);

  return data;
}

export function useGetCANRegRequestData() {
  return useMutation(getCANRegRequestData);
}

export enum CAN_CHECKLIST_ID {
  CAN_CRITERIA = 'can_criteria',
  HOLDERS = 'holders',
  BANK_ACOUNTS = 'bank_accounts',
  NOMINEES = 'nominees',
  PROOF_DOCUMENTS = 'proof_documents',
}

async function updateCANRegChecklist(payload: {
  data: any;
  canChecklistId: CAN_CHECKLIST_ID;
  accountId?: string;
  canRequestId?: string;
}) {
  const { data, canChecklistId, accountId, canRequestId } = payload;
  const res = await clientApiInstance.put(
    `/accounts/${accountId}/can-requests/${canRequestId}/checklists/${canChecklistId}/`,
    { data }
  );
  return res.data;
}
export function useUpdateCANRegChecklist() {
  return useMutation(updateCANRegChecklist);
}

async function postCANCriteria(payload: {
  data: {
    can_criteria: ICANCriteria;
    holders?: Record<'id', string>[];
    bank_accounts?: Record<'id', string>[];
    nominees?: Record<'id', string>[];
    proof_documents?: {
      type: string;
      file_url: string;
    }[];
  };
  accountId?: string;
}) {
  const { accountId, data: formData } = payload;
  const res = await clientApiInstance.post<{
    data: {
      account_id: string;
      checklist_completed: CAN_CHECKLIST_ID[];
      data: {
        data: {
          can_criteria: ICANCriteria;
          holders: Record<'id', string>[];
          bank_accounts: Record<'id', string>[];
          nominees: Record<'id', string>[];
          proof_documents: {
            type: string;
            file_url: string;
          }[];
        };
      };
      id: string;
      status: 'pending' | 'complete';
    };
  }>(`/accounts/${accountId}/can-requests/`, {
    data: formData,
  });
  return res.data.data;
}
export function usePostCANCriteria() {
  return useMutation(postCANCriteria);
}

// can-holder details

export const relationshipOptions: IOptions[] = [
  { value: '01', label: 'Mother' },
  { value: '02', label: 'Father' },
  { value: '03', label: 'Court appointed legal guardian' },
];

export const relationshipNomineesOptions: IOptions[] = [
  { value: 'Mother', label: 'Mother' },
  { value: 'Father', label: 'Father' },
  {
    value: 'Court appointed legal guardian',
    label: 'Court appointed legal guardian',
  },
];
export const relationshipProofOptions: IOptions[] = [
  { value: '01', label: 'Birth certificate' },
  { value: '02', label: 'Ration card' },
  { value: '03', label: 'Passport' },
  { value: '04', label: 'PAN card' },
  { value: '05', label: 'Court order' },
];

export const wealthSourceOptions: IOptions[] = [
  { value: '01', label: 'Salary' },
  { value: '02', label: 'Business income' },
  { value: '03', label: 'Gift' },
  { value: '04', label: 'Ancestrol property' },
  { value: '05', label: 'Rental income' },
  { value: '06', label: 'Prize money' },
  { value: '07', label: 'Royalty' },
  { value: '08', label: 'Others' },
];

export const kraAddressTypeOptions: IOptions[] = [
  { value: '1', label: 'Residential or business' },
  { value: '2', label: 'Residential' },
  { value: '3', label: 'Business' },
  { value: '4', label: 'Registered office' },
];

export const occupationOptions: IOptions[] = [
  { value: '01', label: 'Private Sector Service' },
  { value: '02', label: 'Public Sector' },
  { value: '03', label: 'Business' },
  { value: '04', label: 'Professional' },
  { value: '05', label: 'Agriculturist' },
  { value: '06', label: 'Retired' },
  { value: '07', label: 'Housewife' },
  { value: '08', label: 'Student' },
  { value: '09', label: 'Forex dealer' },
  { value: '10', label: 'Government service' },
  { value: '11', label: 'Doctor' },
  { value: '12', label: 'Service' },
  { value: '99', label: 'Others' },
];

export const pepOptions: IOptions[] = [
  { value: 'PEP', label: 'Politically exposed person' },
  { value: 'RPEP', label: 'Related to politically exposed person' },
  { value: 'NA', label: 'Not applicable' },
];

export const taxResidencyFlagOptions: IOptions[] = [
  { value: 'Y', label: 'Yes - Tax Resident in a Country other than India' },
  {
    value: 'N',
    label: 'No - Not a Tax Resident in a Country other than India',
  },
];

export const grossIncomeOptions: IOptions[] = [
  { value: '01', label: 'Below 1 Lac' },
  { value: '02', label: '1 to 5 Lac' },
  { value: '03', label: '5 to 10 Lac' },
  { value: '04', label: '10 to 25 Lac' },
  { value: '05', label: '25 Lac to 1 Crore' },
  { value: '06', label: 'Greater than 1 Crore' },
];

export const proofUploadByCANOptions: IOptions[] = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];
const CAN_COUNTRY_LIST = 'CAN_COUNTRY_LIST';
const CAN_PEANDING_REGISTRATION_LIST = 'CAN_PEANDING_REGISTRATION_LIST';
const CAN_BANKS_CHOICES = 'CAN_BANKS_CHOICES';

async function getCANCountryList({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, account_id] = queryKey;
  const { data } = await clientApiInstance.get<
    {
      code: string;
      name: string;
    }[]
  >(`/accounts/${account_id}/can-countries/`, { signal });
  return data;
}

export function useGetCANCountryList() {
  const { data: profile } = useGetProfile();
  const account_id = profile?.accounts?.[0]?.id || '';
  return useQuery([CAN_COUNTRY_LIST, account_id], getCANCountryList, {
    enabled: !!account_id,
  });
}

async function getCANBanksChoices() {
  const { data } = await clientApiInstance.get<
    {
      id: string;
      name: string;
    }[]
  >(`/can-banks/`);

  return data;
}

export function useGetCANBanksChoices() {
  return useQuery([CAN_BANKS_CHOICES], getCANBanksChoices);
}

async function getPendingCANRegistrationList({
  queryKey,
  signal,
}: QueryFunctionContext<[string, number, string]>) {
  const [, page, accountId] = queryKey;
  const { data } = await clientApiInstance.get<{
    data: {
      count: number;
      previous: string;
      next: string;
      items: {
        account_id: string;
        id: string;
        status: string;
        checklist_completed: string[];
        data: {
          data: {
            [key: string]: any;
          };
        };
      }[];
    };
  }>(`/accounts/${accountId}/can-requests/?page=${page}`, { signal });
  return data;
}

export function useGetPendingCANRegistrationList(page?: number) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [CAN_PEANDING_REGISTRATION_LIST, page || 1, accountId],
    getPendingCANRegistrationList,
    {
      enabled: !!accountId,
    }
  );
}

async function postCANProofUploadDetails(payload: { file: File | '' }) {
  const { file } = payload;
  const formData = new FormData();
  formData.append('file', file);
  const {
    data: { data },
  } = await clientApiInstance.post(`/accounts/can-proof-upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return data;
}
export function usePostCANProofUploadDetails() {
  return useMutation(postCANProofUploadDetails);
}
export interface ICreatedCANData {
  id?: string;
  can_number?: string;
  holding_type?: string;
  investor_category?: string;
  tax_status?: string;
  holder_count?: string;
  created_at?: string;
}
async function createCANBySubmittingCANRequest(payload: {
  can_request_id: string;
  accountId: string | undefined;
}) {
  const { can_request_id, accountId } = payload;

  const {
    data: { data },
  } = await clientApiInstance.post<{
    data?: ICreatedCANData;
  }>(`/accounts/${accountId}/cans/`, {
    can_request_id,
  });
  return data;
}
export function useCreateCANBySubmittingCANRequest() {
  return useMutation(createCANBySubmittingCANRequest);
}

async function getAccountCANsList({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: {
      next: string | null;
      previous: string | null;
      items: {
        id?: string;
        can_number?: string;
        status?: 'PROVISIONAL' | 'APPROVED' | 'INVALID';
        mfu_status?: string;
        mfu_status_message?: string;
        is_all_nominees_verified?: boolean;
        holding_type?: string;
        investor_category?: string;
        tax_status?: string;
        holder_count?: number;
        created_at?: Date;
      }[];
    };
  }>(`/accounts/${accountId}/cans/`, { signal });
  return data;
}

export function useGetAccountCANsList() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery([ACCOUNT_CANS_LIST, accountId], getAccountCANsList, {
    enabled: !!accountId,
  });
}
