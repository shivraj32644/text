import { useMutation } from 'react-query';
import { clientApiInstance } from './common';
import * as yup from 'yup';

export const changePasswordFormSchema = yup.object({
  current_password: yup.string().label('Current Password').required(),
  new_password: yup.string().label('New Password').required(),
  confirm_new_password: yup
    .string()
    .required()
    .label('Confirm New Password')
    .oneOf([yup.ref('new_password')], 'Passwords must match'),
});
export type ChangePasswordFields = yup.InferType<
  typeof changePasswordFormSchema
>;

// forgot password
async function forgotPassword(payload: { email: string }) {
  const {
    data: { data },
  } = await clientApiInstance.post('/auth/forgot-password/', payload);
  return data;
}

export function useForgotPassword() {
  return useMutation(forgotPassword);
}

// reset password
async function resetPassword(payload: {
  email: string;
  ticket: string;
  password: string;
}) {
  const {
    data: { data },
  } = await clientApiInstance.post<{ data: { message: string } }>(
    '/auth/reset-password/',
    payload
  );
  return data;
}

export function useResetPassword() {
  return useMutation(resetPassword);
}

async function changePassword(payload: ChangePasswordFields) {
  const {
    data: { data },
  } = await clientApiInstance.post<{ data: { message: string } }>(
    '/auth/user/change-password/',
    payload
  );
  return data;
}

export function useChangePassword() {
  return useMutation(changePassword);
}
