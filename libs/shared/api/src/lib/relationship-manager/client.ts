import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import * as yup from 'yup';
import { nameField, mobileField } from '../common/authentication';
import { useGetProfile } from '../common/authentication';
import { clientApiInstance } from '../common/common';

export const CLIENT_LIST_DATA = 'CLIENT_LIST_DATA';
export const CLIENT_DETAILS_DATA = 'CLIENT_DETAILS_DATA';
const clientOnBoardingFormSchema = yup.object({
  first_name: nameField.required().label('First name'),
  last_name: nameField.required().label('Last name'),
  newsletter_opt_in: yup
    .boolean()
    .oneOf([true], 'Disclaimer is a required field'),
  entity_type: yup
    .string()
    .label('Entity type')
    .required()
    .oneOf(['advisory', 'distributor']),
  email: yup.string().email().label('Email').required(),
  mobile: mobileField.label('Phone').required(),
});

export const individualOnBoardingSchema = clientOnBoardingFormSchema.shape({});
export type IndividualOnBoardingFields = yup.InferType<
  typeof individualOnBoardingSchema
>;

export const nonIndividualOnBoardingSchema = clientOnBoardingFormSchema.shape({
  company_name: yup.string().label('Company').required(),
  designation: yup.string().label('Designation').required(),
});
export type NonIndividualOnBoardingFields = yup.InferType<
  typeof nonIndividualOnBoardingSchema
>;

async function onboardIndividualClient(payload: {
  data: IndividualOnBoardingFields;
  accountId?: string;
}) {
  const { accountId, data } = payload;
  await clientApiInstance.post(
    `/rel_managers/${accountId}/accounts/onboard/individual/`,
    data
  );
  return true;
}
export function useOnBoardIndividualClient() {
  const queryClient = useQueryClient();
  return useMutation(onboardIndividualClient, {
    onSuccess: () => queryClient.resetQueries(CLIENT_LIST_DATA),
  });
}

async function onboardNonIndividualClient(payload: {
  data: NonIndividualOnBoardingFields;
  accountId?: string;
}) {
  const { accountId, data } = payload;
  await clientApiInstance.post(
    `/rel_managers/${accountId}/accounts/onboard/non-individual/`,
    data
  );
  return true;
}
export function useOnBoardNonIndividualClient() {
  const queryClient = useQueryClient();
  return useMutation(onboardNonIndividualClient, {
    onSuccess: () => queryClient.resetQueries(CLIENT_LIST_DATA),
  });
}

async function getClientListData({
  queryKey,
  signal,
}: QueryFunctionContext<
  [string, string, number | undefined, string | undefined]
>) {
  const [, accountId, page, searchedTerm] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: {
      results: {
        account_type: 'individual' | 'non_individual';
        can: string;
        company_name: string;
        entity_type: 'advisory' | 'distributor';
        id: string;
        name: string;
      }[];
      count: number;
      next: string;
      previous: string;
    };
  }>(
    `/rel_managers/${accountId}/accounts/?page=${page}${
      searchedTerm ? `&name=${searchedTerm}` : ''
    }`,
    { signal }
  );

  return data;
}

export function useGetClientListData(page?: number, searchedTerm?: string) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.id || '';
  return useQuery(
    [CLIENT_LIST_DATA, accountId, page, searchedTerm],
    getClientListData,
    {
      enabled: !!accountId,
    }
  );
}

async function getClientDetailsData({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string, string | undefined]>) {
  const [, accountId, clientId] = queryKey;
  if (!clientId) {
    return;
  }
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: {
      account_type: 'individual' | 'non_individual';
      company_name: string | null;
      entity_type: 'advisory' | 'distributor';
      id: string;
      name: string;
    };
  }>(`/rel_managers/${accountId}/accounts/${clientId}/`, { signal });

  return data;
}

export function useGetClientDetailsData({
  clientId,
}: {
  clientId: string | undefined;
}) {
  const { data: profile } = useGetProfile();
  const accountId = profile?.id || '';

  return useQuery(
    [CLIENT_DETAILS_DATA, accountId, clientId],
    getClientDetailsData,
    {
      enabled: !!accountId,
    }
  );
}
