import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { nameField, mobileField } from '../common/authentication';
import * as yup from 'yup';
import { clientApiInstance } from '../common/common';
import { useGetProfile } from '../common/authentication';
export interface IRelationshipManager {
  account_status: string;
  amfi_certificate_url: string;
  clients: string;
  email: string;
  euin_ria: string;
  euin_ria_expiry: string;
  first_name: string;
  id: string;
  last_name: string;
  mobile: string;
  name: string;
  role_type: 'service' | 'sales';
}
export interface IRoleType {
  value: string;
  label: string;
}
export const roleTypeOptions: IRoleType[] = [
  {
    value: 'sales',
    label: 'Sales RM',
  },
  {
    value: 'service',
    label: 'Service RM',
  },
];

// TYPES
const ALL_RELATIONSHIP_MANAGER_LIST = 'ALL_RELATIONSHIP_MANAGER_LIST';
const RELATIONSHIP_MANAGER_DETAILS = 'RELATIONSHIP_MANAGER_DETAILS';

export const relationshipManagerFormSchema = yup.object({
  first_name: nameField.required().label('First name'),
  last_name: nameField.required().label('Last name'),
  email: yup.string().email().label('Email').required(),
  mobile: mobileField.label('Phone').required(),
  role_type: yup
    .string()
    .label('Role type')
    .required()
    .oneOf(['sales', 'service']),
  euin_ria: yup
    .string()
    .label('EUIN/RIA')
    .required()
    .max(10, 'Please Enter Valid EUIN/RIA'),
  amfi_certificate_url: yup.string().label('Certificate').required(),
});

export const relationshipAddManagerFormSchema =
  relationshipManagerFormSchema.shape({
    euin_ria_expiry: yup
      .string()
      .label('EUIN/RIA Expiry')
      .required()
      .nullable(),
  });
export type RelationshipManagerAddFields = yup.InferType<
  typeof relationshipAddManagerFormSchema
>;

export type RelationshipManagerUpdateFields = yup.InferType<
  typeof relationshipManagerFormSchema
>;

// QUERY KEYS

// API METHODS

//add relationship-manager
async function addRelationshipManager(
  payload: RelationshipManagerUpdateFields
) {
  const {
    data: { data },
  } = await clientApiInstance.post('/rel_managers/', payload);
  return data;
}
export function useAddRelationshipManager() {
  const queryClient = useQueryClient();
  return useMutation(addRelationshipManager, {
    onSuccess: () => queryClient.resetQueries(ALL_RELATIONSHIP_MANAGER_LIST),
  });
}

//upload relationship manager certificate

async function uploadRMCertificate(payload: { file: File | '' }) {
  const formData = new FormData();
  formData.append('file', payload?.file);
  const {
    data: { data },
  } = await clientApiInstance.post('/rel_managers/certificate/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });

  return data;
}
export function useUploadRMCertificate() {
  return useMutation(uploadRMCertificate);
}

async function getRelationshipManagerList({
  queryKey,
  signal,
}: QueryFunctionContext<
  [
    string,
    number | undefined,
    string | undefined,
    'sales' | 'service' | undefined
  ]
>) {
  const [, page, searchedTerm, role_type] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: {
      count: number;
      next: string;
      previous: string;
      results: IRelationshipManager[];
    };
  }>(
    `/rel_managers/?page=${page}${searchedTerm ? `&name=${searchedTerm}` : ''}${
      role_type ? `&role_type=${role_type}` : ''
    }`,
    {
      signal,
    }
  );
  return data;
}

export function useGetRelationshipManagerList(
  page?: number,
  searchedTerm?: string,
  role_type?: 'sales' | 'service'
) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [ALL_RELATIONSHIP_MANAGER_LIST, page, searchedTerm, role_type],
    getRelationshipManagerList,
    {
      enabled: !!accountId,
    }
  );
}

async function getRelationshipManagerDetails({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, relationshipManagerID] = queryKey;
  if (relationshipManagerID === undefined) return;
  const { data } = await clientApiInstance.get<IRelationshipManager>(
    `/rel_managers/${relationshipManagerID}/`,
    { signal }
  );
  return data;
}

export function useGetRelationshipManagerDetails(
  relationshipManagerID: string
) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [RELATIONSHIP_MANAGER_DETAILS, relationshipManagerID],
    getRelationshipManagerDetails,
    {
      enabled: !!accountId,
    }
  );
}

async function updateRelationshipManagerDetails(payload: {
  data: RelationshipManagerUpdateFields;
  relationshipId: string;
}) {
  await clientApiInstance.put(
    `/rel_managers/${payload?.relationshipId}/`,
    payload.data
  );
  return true;
}
export function useUpdateRelationshipManagerDetails() {
  return useMutation(updateRelationshipManagerDetails);
}

async function deleteRelationshipManagerDetails(relationshipId: string) {
  await clientApiInstance.delete(`/rel_managers/${relationshipId}/`);
  return true;
}
export function useDeleteRelationshipManagerDetails() {
  const queryClient = useQueryClient();
  return useMutation(deleteRelationshipManagerDetails, {
    onSuccess: () => queryClient.resetQueries(ALL_RELATIONSHIP_MANAGER_LIST),
  });
}
