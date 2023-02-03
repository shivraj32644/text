import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { IOptions } from '../client/ecan-registration';
import {
  ClientProfileFields,
  IAccountInfo,
  useGetProfile,
  User,
} from '../common/authentication';
import { clientApiInstance } from '../common/common';
const ALL_ACCOUNTS = 'ALL_ACCOUNTS';

export const sortingOptionsList: IOptions[] = [
  { value: '&can=null', label: 'CAN Unavailable' },
  { value: '&unassigned_rm=1', label: 'RM Not Assigned' },
];
export const CLIENTS_DETAILS_QUERY_KEY = 'CLIENTS_DETAILS_QUERY_KEY';
export interface IRMDetails {
  account_type?: 'individual' | 'non_individual';
  id?: string;
  account_number?: string;
  name?: string;
  entity_type?: 'advisory' | 'distributor';
  status?: string;
  is_kyc_verified?: boolean;
  kyc_status?: string;
  default_can_number?: string;
  primary_rel_manager?: {
    id?: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    role_type?: 'service' | 'sales';
  } | null;
  created_at?: Date;
}
export interface IUnAssignedRM {
  count?: number;
  previous?: string | null;
  next?: string | null;
  items?: IRMDetails[];
}

async function getAllAccountsListData({
  queryKey,
  signal,
}: QueryFunctionContext<
  [
    string,
    number | undefined,
    0 | 1 | undefined,
    string | undefined,
    string | undefined
  ]
>) {
  const [, page, unassigned_rm, searchTerm, sortingTerm] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: IUnAssignedRM;
  }>(
    `/accounts/?page=${page}${
      unassigned_rm ? `&unassigned_rm=${unassigned_rm}` : ''
    }${searchTerm ? `&search=${searchTerm}` : ''}${
      sortingTerm ? sortingTerm : ''
    }`,
    {
      signal,
    }
  );
  return data;
}

export function useGetAllAccountsListData(
  page?: number,
  unassigned_rm?: 0 | 1 | undefined,
  searchTerm?: string,
  sortingTerm?: string
) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery(
    [ALL_ACCOUNTS, page, unassigned_rm, searchTerm, sortingTerm],
    getAllAccountsListData,
    {
      enabled: !!accountId,
    }
  );
}

async function assignRelationshipManager(payload: {
  client_id: string;
  rel_mgr_id: string;
  is_primary: boolean;
}) {
  const { client_id, rel_mgr_id, is_primary } = payload;
  const {
    data: { data },
  } = await clientApiInstance.put(`/accounts/${client_id}/rel_manager/`, {
    rel_mgr_id: rel_mgr_id,
    is_primary: is_primary,
  });
  return data;
}
export function useAssignRelationshipManager() {
  return useMutation(assignRelationshipManager);
}

async function fetchProfile({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string | undefined]>) {
  const [, client_id] = queryKey;
  if (!client_id) {
    return;
  }
  const {
    data: { data },
  } = await clientApiInstance.get<{ data: IAccountInfo }>(
    `/accounts/${client_id}/`
  );
  return data;
}
export function useGetClientProfileDetails(client_id: string) {
  return useQuery([CLIENTS_DETAILS_QUERY_KEY, client_id], fetchProfile);
}

// async function updateProfile(payload: ClientProfileFields, client_id?: string) {
//   if (!client_id) {
//     return;
//   }
//   const {
//     data: { data },
//   } = await clientApiInstance.put<{ data: User }>(
//     `/users/${client_id}`,
//     payload
//   );
//   return data;
// }
// export function useUpdateProfileClientDetails(redirecting?: boolean) {
//   const queryClient = useQueryClient();
//   return useMutation(updateProfile, {
//     onSuccess: () => {
//       redirecting && queryClient.resetQueries(CLIENTS_DETAILS_QUERY_KEY);
//     },
//   });
// }
