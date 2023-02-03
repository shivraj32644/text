import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import * as yup from 'yup';
import {
  AuthTokenDetails,
  clearAuthTokens,
  getAuthTokens,
  setAuthTokens,
} from './auth';
import { clientApiInstance, publicApiInstance } from './common';

export const nameField = yup
  .string()
  .matches(/^[aA-zZ\s]+$/, 'Please Enter only alphabets'); //regex for both small and capital letters with space for users like - V S Singh

export const mobileField = yup
  .string()
  .min(10, 'Please Enter valid Phone no.')
  .max(10, 'Please Enter valid Phone no.');

export const otpField = yup
  .string()
  .matches(/^[0-9]{6}$/, 'Must be exactly 6 digits');

// TYPES

// profile

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  email: string;
  mobile: string;
  email_verified: boolean;
  mobile_verified: boolean;
  gender: string;
  birth_date: string | null;
  marital_status: string;
  newsletter_opt_in: boolean;
  designation: string | null;
  accounts: { id: string; status: 'active' }[];
  avatar_url?: string;
}

export const clientProfileSchema = yup.object({
  first_name: nameField.required().label('First name'),
  last_name: nameField.required().label('Last name'),
  email: yup.string().email().label('Email').required(),
  mobile: mobileField.label('Phone').required(),
  birth_date: yup.string().label('Date of birth').nullable(),
  gender: yup.string().label('Gender'),
  marital_status: yup.string().label('Marital Status'),
  designation: yup.string().label('Designation'),
});
export type ClientProfileFields = yup.InferType<typeof clientProfileSchema>;

// Signin
export const clientSigninFormSchema = yup.object({
  email: yup.string().email().label('Email').required(),
  password: yup.string().label('Password').required(),
});
export type ClientSigninFields = yup.InferType<typeof clientSigninFormSchema>;

export const clientSigninWithEmailOtpFormSchema = yup.object({
  email: yup.string().email().label('Email').required(),
  otp: otpField.label('OTP').required(),
});
export type ClientSigninWithEmailOtpFields = yup.InferType<
  typeof clientSigninWithEmailOtpFormSchema
>;

// Verification
export const clientEmailVerificationFormSchema = yup.object({
  email: yup.string().email().label('Email').required(),
  otp: otpField.label('OTP').required(),
});

export type ClientEmailVerificationFields = yup.InferType<
  typeof clientEmailVerificationFormSchema
>;

export const clientMobileVerificationFormSchema = yup.object({
  mobile: yup.string().label('Phone').required(),
  otp: otpField.label('OTP').required(),
});

export type ClientMobileVerificationFields = yup.InferType<
  typeof clientMobileVerificationFormSchema
>;

// Signup
const clientSignupFormSchema = yup.object({
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
  password: yup.string().label('Password').required(),
  confirm_password: yup
    .string()
    .label('Confirm New Password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const individualSignupSchema = clientSignupFormSchema.shape({});
export type IndividualSignupFields = yup.InferType<
  typeof individualSignupSchema
>;

export const nonIndividualSignupSchema = clientSignupFormSchema.shape({
  company_name: yup.string().label('Company').required(),
  designation: yup.string().label('Designation').required(),
});
export type NonIndividualSignupFields = yup.InferType<
  typeof nonIndividualSignupSchema
>;

// QUERY KEYS
export const PROFILE_QUERY_KEY = 'PROFILE_QUERY_KEY';
export const ACCOUNT_INFO_KEY = 'ACCOUNT_INFO_KEY';

// API METHODS

// Refresh tokens
export async function refreshAuthToken() {
  const tokens = getAuthTokens();
  if (!tokens) {
    throw new Error('You are not authenticated! Please login.');
  }
  const { access_token, refresh_token } = tokens;
  try {
    const res = await publicApiInstance.post<{ data: AuthTokenDetails }>(
      '/auth/token/refresh/',
      { access_token, refresh_token }
    );
    setAuthTokens(res.data.data, clientApiInstance);
    return res.data.data;
  } catch (err) {
    console.error(err);
    clearAuthTokens(clientApiInstance);
    throw new Error(err);
  }
}

// Client Signin
async function signinClient(payload: ClientSigninFields) {
  const {
    data: { data },
  } = await publicApiInstance.post<{ data: AuthTokenDetails }>(
    '/auth/signin/',
    payload
  );

  setAuthTokens(data, clientApiInstance);

  clientApiInstance.defaults.headers.common['Authorization'] =
    'Bearer ' + data.access_token;

  return data;
}
export function useSigninClient() {
  const queryClient = useQueryClient();

  return useMutation(async (payload: ClientSigninFields) => {
    await queryClient.resetQueries();
    return signinClient(payload);
  });
}

async function signinWithEmailOtpClient(
  payload: ClientSigninWithEmailOtpFields
) {
  const {
    data: { data },
  } = await publicApiInstance.post<{ data: AuthTokenDetails }>(
    '/auth/email-signin/verify-otp/',
    payload
  );

  setAuthTokens(data, clientApiInstance);

  clientApiInstance.defaults.headers.common['Authorization'] =
    'Bearer ' + data.access_token;

  return data;
}
export function useSigninWithEmailOtpClient() {
  const queryClient = useQueryClient();

  return useMutation(async (payload: ClientSigninWithEmailOtpFields) => {
    await queryClient.resetQueries();
    return signinWithEmailOtpClient(payload);
  });
}

async function sendEmailSignInOtp(payload: { email: string }) {
  const {
    data: { data },
  } = await publicApiInstance.post('/auth/email-signin/send-otp/', payload);
  return data;
}
export function useSendEmailSignInOtp() {
  return useMutation(sendEmailSignInOtp);
}

// Individual Signup
async function signupIndividual(payload: IndividualSignupFields) {
  await publicApiInstance.post('/auth/signup/individual/', payload);
  await signinClient({ email: payload.email, password: payload.password });
}
export function useSignupIndividual() {
  return useMutation(signupIndividual);
}

// Non Individual Signup
async function signupNonIndividual(payload: NonIndividualSignupFields) {
  await publicApiInstance.post('/auth/signup/non-individual/', payload);
  await signinClient({ email: payload.email, password: payload.password });
}
export function useSignupNonIndividual() {
  return useMutation(signupNonIndividual);
}

// Profile

async function fetchProfile() {
  const isAuthenticated =
    !!clientApiInstance.defaults.headers.common['Authorization'];

  if (!isAuthenticated) {
    throw new Error('User is not authenticated!');
  }

  try {
    const {
      data: { data },
    } = await clientApiInstance.get<{ data: User }>('/auth/user/');
    return data;
  } catch (err) {
    console.error(err);
    clearAuthTokens(clientApiInstance);
    throw new Error(err);
  }
}
export function useGetProfile() {
  return useQuery(PROFILE_QUERY_KEY, fetchProfile);
}

async function updateProfile(payload: ClientProfileFields) {
  const {
    data: { data },
  } = await clientApiInstance.put<{ data: User }>('/auth/user/', payload);
  return data;
}
export function useUpdateProfile(redirecting?: boolean) {
  const queryClient = useQueryClient();
  return useMutation(updateProfile, {
    onSuccess: () => {
      redirecting && queryClient.resetQueries(PROFILE_QUERY_KEY);
    },
  });
}

// Logout

export function useLogoutClient() {
  const queryClient = useQueryClient();

  return () => {
    clearAuthTokens(clientApiInstance);
    queryClient.resetQueries();
  };
}
//account info
export interface IAccountInfo {
  id: string;
  name: string;
  company_name: string | null;
  is_is_disclaimer_accepted: boolean;
  status: 'active' | string;
  entity_type: 'advisory' | 'distributor';
  account_type: 'individual' | 'non_individual';
  is_kyc_verified: boolean;
  kyc_verified_at: string | null;
  kyc_verified_by: string | null;
  pan_number: string | null;
  account_number: 'ACS22119615';
  kyc_status: 'verified' | 'pending' | 'submitted' | 'rejected';
}

async function getAccountInfoData({
  queryKey,
  signal,
}: QueryFunctionContext<[string, string]>) {
  const [, accountId] = queryKey;
  const {
    data: { data },
  } = await clientApiInstance.get<{
    data: IAccountInfo;
  }>(`/accounts/${accountId}/`, { signal });
  return data;
}

export function useGetAccountInfoData() {
  const { data: profile } = useGetProfile();
  const accountId = profile?.accounts?.[0]?.id || '';
  return useQuery([ACCOUNT_INFO_KEY, accountId], getAccountInfoData, {
    enabled: !!accountId,
  });
}

async function signinAdmin(payload: ClientSigninFields) {
  const {
    data: { data },
  } = await publicApiInstance.post<{ data: AuthTokenDetails }>(
    '/auth/admin/signin/',
    payload
  );

  setAuthTokens(data, clientApiInstance);

  clientApiInstance.defaults.headers.common['Authorization'] =
    'Bearer ' + data.access_token;

  return data;
}

export function useSigninAdmin() {
  const queryClient = useQueryClient();

  return useMutation(async (payload: ClientSigninFields) => {
    await queryClient.resetQueries();
    return signinAdmin(payload);
  });
}

async function signinRelationshipManager(payload: ClientSigninFields) {
  const {
    data: { data },
  } = await publicApiInstance.post<{ data: AuthTokenDetails }>(
    '/auth/rel_manager/signin/',
    payload
  );

  setAuthTokens(data, clientApiInstance);

  clientApiInstance.defaults.headers.common['Authorization'] =
    'Bearer ' + data.access_token;

  return data;
}

export function useSigninRelationshipManager() {
  const queryClient = useQueryClient();

  return useMutation(async (payload: ClientSigninFields) => {
    await queryClient.resetQueries();
    return signinRelationshipManager(payload);
  });
}
