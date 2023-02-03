import { useMutation } from 'react-query';
import { clientApiInstance } from './common';

// Email Verification
async function sendEmailOtp(payload: { email: string }) {
  const {
    data: { data },
  } = await clientApiInstance.post(
    '/auth/user/email-verification/send-otp/',
    payload
  );
  return data;
}
export function useSendEmailOtp() {
  return useMutation(sendEmailOtp);
}

async function verifyEmailOtp(payload: { email: string; otp: string }) {
  if (!payload.otp) {
    throw new Error('OTP entered is invalid! Please try again.');
  }

  await clientApiInstance.post('/auth/user/email-verification/', payload);
  return true;
}
export function useVerifyEmailOtp() {
  return useMutation(verifyEmailOtp);
}

// Mobile Verification
async function sendMobileOtp(payload: { mobile: string }) {
  const {
    data: { data },
  } = await clientApiInstance.post(
    '/auth/user/mobile-verification/send-otp/',
    payload
  );
  return data;
}
export function useSendMobileOtp() {
  return useMutation(sendMobileOtp);
}

async function verifyMobileOtp(payload: { mobile: string; otp: string }) {
  if (!payload.otp) {
    throw new Error('OTP entered is invalid! Please try again.');
  }

  await clientApiInstance.post('/auth/user/mobile-verification/', payload);
  return true;
}
export function useVerifyMobileOtp() {
  return useMutation(verifyMobileOtp);
}
