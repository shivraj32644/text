import { QueryFunctionContext, useMutation, useQuery } from 'react-query';
import { clientApiInstance } from '../common/common';
import { useGetProfile } from '../common/authentication';
const KYC_DOCUMENT_TYPES = 'KYC_DOCUMENT_TYPES';
const KYC_SUBMISSION = 'KYC_SUBMISSION';
const KYC_ADDRESS_DATA = 'KYC_ADDRESS_DATA';
const KYC_DOCUMENTS = 'KYC_DOCUMENTS';
const BANK_ACCOUNT_DOCUMENTS = 'BANK_ACCOUNT_DOCUMENTS';
const KYC_BASIC_DETAILS = 'KYC_BASIC_DETAILS';

//get kyc personal documents list
export interface InterfaceKycDocumentsTypes {
  id: string;
  category: 'mandatory' | 'address_proof' | 'identity_proof';
  type: string;
  accountType: 'individual' | string;
}

export interface IKycDocument {
  account?: string;
  id?: string;
  is_verified?: boolean;
  kyc_document?: string;
  updated_by?: string;
  url?: string;
  verified_by?: null;
}
async function getKycDocumentsTypes({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: InterfaceKycDocumentsTypes[];
  }>(`/accounts/${accountId}/kyc-document-types/`, { signal });

  return data;
}

export function useGetKycDocumentsType() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery([KYC_DOCUMENT_TYPES, accountId], getKycDocumentsTypes, {
    enabled: !!accountId,
  });
}

//upload kyc personal documents
async function uploadKycDocuments(payload: {
  kyc_document_type_id: string;
  file: File | '';
  accountId: string;
}) {
  const { kyc_document_type_id, accountId, file } = payload;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('kyc_document_type_id', kyc_document_type_id);
  const {
    data: { data: response },
  } = await clientApiInstance.post<{
    data: IKycDocument;
  }>(`/accounts/${accountId}/kyc-documents/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return response;
}

export function useUploadKycDocuments() {
  return useMutation(uploadKycDocuments);
}

//get submitted kyc documents list
async function getKycDocumentsData({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: IKycDocument[];
  }>(`/accounts/${accountId}/kyc-documents/`, { signal });

  return data;
}

export function useGetKycDocumentsData() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery([KYC_DOCUMENTS, accountId], getKycDocumentsData, {
    enabled: !!accountId,
  });
}

// upload bank account file
async function uploadBankAccountFile(payload: {
  file: File;
  accountId: string;
}) {
  const { accountId, file } = payload;
  const formData = new FormData();
  formData.append('file', file);
  const {
    data: { data },
  } = await clientApiInstance.post(
    `/accounts/${accountId}/bank-account-documents/`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
  );
  return data;
}

export function useUploadBankAccountFile() {
  return useMutation(uploadBankAccountFile);
}

//get bank accounts list
async function getBankAccountList({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: any[];
  }>(`/accounts/${accountId}/bank-accounts/`, { signal });

  return data;
}

export function useGetBankAccountListData() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery([BANK_ACCOUNT_DOCUMENTS, accountId], getBankAccountList, {
    enabled: !!accountId,
  });
}

//add bank account to the bank accounts list
async function addbankAccount(payload: {
  data: {
    bank_form: {
      account_number: number;
      account_type: string;
      bank: string;
      micr: string;
      ifsc: string;
      is_primary: boolean;
      is_secondary: boolean;
      proof_doc_type: string;
      proof_doc_url: string;
    }[];
  };
  accountId?: string;
}) {
  const { accountId, data } = payload;
  const refData = data?.bank_form;
  await clientApiInstance.post(
    `/accounts/${accountId}/bank-accounts/`,
    ...refData
  );
  return true;
}
export function useAddBankAccount() {
  return useMutation(addbankAccount);
}

//get the kyc submission status
export async function getKycSubmissionData({
  accountId,
}: {
  accountId: string;
}) {
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: { message: string };
  }>(`/accounts/${accountId}/kyc-verification/submit/`);

  return data;
}

// //get the kyc submission status
// async function getKycSubmissionData({
//   queryKey,
//   signal,
// }: QueryFunctionContext<[string, string, boolean]>) {
//   const [, accountId, fetchSubmission] = queryKey;
//   if (!fetchSubmission) return;
//   const {
//     data: { data },
//   } = await clientApiInstance.get<{
//     data: { message: string };
//   }>(`/accounts/${accountId}/kyc-submit/`, { signal });

//   return data;
// }

// export function useGetKycSubmissionData({
//   fetchSubmission,
// }: {
//   fetchSubmission: boolean;
// }) {
//   const { data: profile } = useGetProfile();
//   const accountId = profile?.accounts?.[0]?.id || '';
//   return useQuery(
//     [KYC_SUBMISSION, accountId, fetchSubmission],
//     getKycSubmissionData,
//     {
//       enabled: !!accountId,
//     }
//   );
// }

//post the kyc address
async function postKycAddress(payload: {
  data: {
    line_1?: string;
    line_2?: string;
    city?: string;
    state?: string;
    country_code?: string;
    zipcode?: string;
  };
  accountId?: string;
}) {
  const { accountId, data } = payload;
  await clientApiInstance.post(`/accounts/${accountId}/address/`, data);
  return true;
}
export function usePostKycAddress() {
  return useMutation(postKycAddress);
}

//get the kyc address registered
async function getKycAddressData({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: {
      line_1?: string;
      line_2?: string;
      city?: string;
      state?: string;
      country?: string;
      zipcode?: string;
    };
  }>(`/accounts/${accountId}/address/`, { signal });

  return data;
}

export function useGetKycAddressData() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery([KYC_ADDRESS_DATA, accountId], getKycAddressData, {
    enabled: !!accountId,
  });
}

//update the registered address
async function updateKycAddress(payload: {
  data: {
    line_1?: string;
    line_2?: string;
    city?: string;
    state?: string;
    country_code?: string;
    zipcode?: string;
  };
  accountId?: string;
}) {
  const { accountId, data } = payload;
  await clientApiInstance.put(`/accounts/${accountId}/address/`, data);
  return true;
}
export function useUpdateKycAddress() {
  return useMutation(updateKycAddress);
}

//get the kyc basic details
async function getKycBasicDetails({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: {
      pan_number: string;
      business_entity_type?: string;
      industry_name?: string;
      gst_number?: string;
      cin_number?: string;
      company_name?: string;
      company_inc_year?: string;
      company_reg_place_name?: string;
    };
  }>(`/accounts/${accountId}/basic-details/`, { signal });

  return data;
}

export function useGetKycBasicDetails() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery([KYC_BASIC_DETAILS, accountId], getKycBasicDetails, {
    enabled: !!accountId,
  });
}

//update the kyc basic details
async function updateKycNonIndividualBasicDetails(payload: {
  data: {
    pan_number: string;
    business_entity_type?: string;
    industry_name?: string;
    gst_number?: string;
    cin_number?: string;
    company_name?: string;
    company_inc_year?: string;
    company_reg_place_name?: string;
  };
  accountId?: string;
}) {
  const { accountId, data } = payload;
  await clientApiInstance.put(`/accounts/${accountId}/basic-details/`, data);
  return true;
}
export function useUpdateNonIndividualKycBasicDetails() {
  return useMutation(updateKycNonIndividualBasicDetails);
}

async function updateKycIndividualBasicDetails(payload: {
  data: {
    pan_number: string;
    name?: string;
    mobile?: string;
    email?: string;
    birth_date?: string;
  };
  accountId?: string;
}) {
  const { accountId, data } = payload;
  await clientApiInstance.put(`/accounts/${accountId}/basic-details/`, data);
  return true;
}
export function useUpdateIndividualKycBasicDetails() {
  return useMutation(updateKycIndividualBasicDetails);
}
