import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  ClientEmailVerificationFields,
  ClientMobileVerificationFields,
  clientEmailVerificationFormSchema,
  clientMobileVerificationFormSchema,
  PROFILE_QUERY_KEY,
  setFormFieldErrors,
  useGetProfile,
  useSendEmailOtp,
  useVerifyEmailOtp,
  useSendMobileOtp,
  useVerifyMobileOtp,
  useLogoutClient,
} from '@corpcare/shared/api';
import classNames from 'classnames';
import { useQueryClient } from 'react-query';
import {
  RoundSuccessCircleIcon,
  useCountdown,
  CustomToast,
} from '@corpcare/web/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function VerificationForm() {
  const router = useRouter() as NextRouter;
  const { data: profile } = useGetProfile();
  const {
    mutate: sendEmailOtp,
    isLoading: isSendingEmailOtp,
    isSuccess: isSuccessSendEmailOtp,
  } = useSendEmailOtp();
  const {
    mutate: sendMobileOtp,
    isLoading: isSendingMobileOtp,
    isSuccess: isSuccessSendMobileOtp,
  } = useSendMobileOtp();

  const {
    mutate: verifyEmailOtp,
    isLoading: isVerifyingEmailOtp,
    isSuccess: isEmailOtpVerified,
  } = useVerifyEmailOtp();
  const {
    mutate: verifyOtp,
    isLoading: isVerifyingMobileOtp,
    isSuccess: isMobileOtpVerified,
  } = useVerifyMobileOtp();

  const queryClient = useQueryClient();

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    setError: setEmailError,
    formState: { errors: emailErrors },
    setValue: setEmailValue,
    watch: emailWatch,
  } = useForm<ClientEmailVerificationFields & { isEmailOtpSend: boolean }>({
    resolver: yupResolver(clientEmailVerificationFormSchema),
    defaultValues: {
      email: profile?.email,
    },
  });
  const {
    register: registerMobile,
    handleSubmit: handleMobileSubmit,
    setError: setMobileError,
    formState: { errors: mobileErrors },
    setValue: setMobileValue,
    watch: mobileWatch,
  } = useForm<ClientMobileVerificationFields & { isMobileOtpSend: boolean }>({
    resolver: yupResolver(clientMobileVerificationFormSchema),
    defaultValues: {
      mobile: profile?.mobile,
    },
  });
  const [emailcountdown] = useCountdown(isSuccessSendEmailOtp ? 30 : 0);
  const [mobilecountdown] = useCountdown(isSuccessSendMobileOtp ? 30 : 0);
  const handleLogout = useLogoutClient();

  const handleSendMobileOtp = () => {
    if (!profile?.mobile) {
      throw new Error('User is not authenticated! Please login to proceed.');
    }
    sendMobileOtp(
      { mobile: profile.mobile },
      {
        onSuccess(data) {
          setMobileValue('isMobileOtpSend', true);

          toast.custom((t) => (
            <CustomToast
              t={t}
              message={
                data?.message ||
                'We have sent a OTP to your mobile successfully!'
              }
              type="success"
            />
          ));
        },
        onError(err: any) {
          toast?.custom((t) => (
            <CustomToast
              t={t}
              message={err.message || 'Failed to send otp! Please try again.'}
              type="error"
            />
          ));
        },
      }
    );
  };

  const handleMobileFormSubmit = (data: ClientMobileVerificationFields) => {
    verifyOtp(data, {
      async onSuccess() {
        await queryClient.invalidateQueries(PROFILE_QUERY_KEY);
        // await router.push('/');
      },
      onError(err: any) {
        setFormFieldErrors(err, setMobileError);
        toast?.custom((t) => (
          <CustomToast
            t={t}
            message={err?.message || 'Failed to verify otp! Please try again.'}
            type="error"
          />
        ));
      },
    });
  };

  const handleEmailSendOtp = () => {
    if (!profile?.email) {
      throw new Error('User is not authenticated! Please login to proceed.');
    }
    sendEmailOtp(
      { email: profile.email },
      {
        onSuccess(data) {
          setEmailValue('isEmailOtpSend', true);

          toast?.custom((t) => (
            <CustomToast
              t={t}
              message={
                data?.message ||
                'We have sent a OTP to your email successfully!'
              }
              type="success"
            />
          ));
        },
        onError(err: any) {
          toast?.custom((t) => (
            <CustomToast
              t={t}
              message={err.message || 'Failed to send otp! Please try again'}
              type="success"
            />
          ));
        },
      }
    );
  };

  const handleEmailFormSubmit = (data: ClientEmailVerificationFields) => {
    verifyEmailOtp(data, {
      async onSuccess() {
        await queryClient.invalidateQueries(PROFILE_QUERY_KEY);
        // await router.push('/');
      },
      onError(err: any) {
        setFormFieldErrors(err, setEmailError);
        toast?.custom((t) => (
          <CustomToast
            t={t}
            message={err?.message || 'Failed to verify otp! Please try again.'}
            type="error"
          />
        ));
      },
    });
  };

  if (!profile) {
    throw new Error('User is not authenticated!');
  }

  return (
    <div className="p-5 lg:p-8 rounded-lg border mt-4 max-w-md mx-auto grid gap-6 bg-white">
      {profile?.email_verified ? (
        <label>
          <span className="Label">Email</span>
          <div className="relative flex items-center justify-between">
            <input
              {...registerEmail('email')}
              type="text"
              disabled
              className={classNames(
                'Input pr-10 truncate',
                emailErrors.email && 'border-brandError'
              )}
            />
            <RoundSuccessCircleIcon className="text-green-600 w-6 h-6 absolute flex items-center right-2 lg:right-4" />
          </div>
          <span className="block text-[#209E52] text-xs mt-1 tracking-[0.02em]">
            Email successfully verified.
          </span>
        </label>
      ) : (
        <form
          onSubmit={handleEmailSubmit(handleEmailFormSubmit)}
          className={
            isSendingEmailOtp || isVerifyingEmailOtp ? 'animate-pulse' : ''
          }
        >
          {emailWatch('isEmailOtpSend') && (
            <label>
              <span className="Label">Email</span>
              <div className="relative flex items-center justify-between">
                <input
                  {...registerEmail('otp')}
                  type="tel"
                  className={classNames(
                    'Input pr-10 truncate',
                    emailErrors.otp && 'border-brandError'
                  )}
                  disabled={isEmailOtpVerified}
                />
                {isEmailOtpVerified ? (
                  <RoundSuccessCircleIcon className="text-green-600 w-4 h-4 lg:w-6 lg:h-6 absolute flex items-center right-2 lg:right-4" />
                ) : (
                  <button
                    className="absolute text-lighterGray lg:pr-2 font-normal text-xs lg:text-sm uppercase right-2 lg:right-4 cursor-pointer"
                    type="submit"
                  >
                    Verify
                  </button>
                )}
              </div>
              {isEmailOtpVerified ? (
                <span className="block text-[#209E52] text-xs mt-1 tracking-[0.02em]">
                  Email successfully verified.
                </span>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="block text-lighterGray text-xs mt-1">
                    Enter the 6-digit code sent to {profile?.email}.
                  </span>
                  {emailcountdown === 0 ? (
                    <span
                      className="block text-lighterGray text-xs mt-1 uppercase  cursor-pointer"
                      onClick={() => handleEmailSendOtp()}
                    >
                      resend
                    </span>
                  ) : (
                    <span className="block text-brand text-xs mt-1">
                      0:{emailcountdown}
                    </span>
                  )}
                </div>
              )}

              <span className="FieldError">{emailErrors.otp?.message}</span>
            </label>
          )}
          {!emailWatch('isEmailOtpSend') && (
            <label>
              <span className="Label">Email</span>
              <div className="relative flex items-center justify-between">
                <input
                  {...registerEmail('email')}
                  type="text"
                  disabled
                  className={classNames(
                    'Input pr-20 truncate',
                    emailErrors.email && 'border-brandError'
                  )}
                />
                <button
                  className="absolute  text-lighterGray font-normal text-xs lg:text-sm uppercase cursor-pointer right-0 pr-3"
                  onClick={() => handleEmailSendOtp()}
                >
                  Get code
                </button>
              </div>
            </label>
          )}
        </form>
      )}
      {profile?.mobile_verified ? (
        <label>
          <span className="Label">Email</span>
          <div className="relative flex items-center justify-between">
            <input
              {...registerMobile('mobile')}
              type="text"
              disabled
              className={classNames(
                'Input pr-10 truncate',
                mobileErrors.mobile && 'border-brandError'
              )}
            />
            <RoundSuccessCircleIcon className="text-green-600 lg:w-6 lg:h-6 w-4 h-4 absolute right-2 lg:right-4" />
          </div>
          <span className="block text-[#209E52] text-xs mt-1 tracking-[0.02em]">
            Phone successfully verified.
          </span>
        </label>
      ) : (
        <form
          onSubmit={handleMobileSubmit(handleMobileFormSubmit)}
          className={
            isSendingMobileOtp || isVerifyingMobileOtp ? 'animate-pulse' : ''
          }
        >
          {mobileWatch('isMobileOtpSend') && (
            <label>
              <span className="Label">Phone</span>
              <div className="relative flex items-center justify-between">
                <input
                  {...registerMobile('otp')}
                  type="tel"
                  className={classNames(
                    'Input truncate pr-10',
                    mobileErrors.otp && 'border-brandError'
                  )}
                  disabled={isMobileOtpVerified}
                />
                {isMobileOtpVerified ? (
                  <RoundSuccessCircleIcon className="text-green-600 w-4 h-4 lg:w-6 lg:h-6 absolute right-2 lg:right-4" />
                ) : (
                  <button
                    className="absolute text-lighterGray lg:pr-2 font-normal text-xs lg:text-sm uppercase right-2 lg:right-4 cursor-pointer"
                    type="submit"
                  >
                    Verify
                  </button>
                )}
              </div>
              {isMobileOtpVerified ? (
                <span className="block text-[#209E52] text-xs mt-1 tracking-[0.02em]">
                  Phone successfully verified.
                </span>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="block text-lighterGray text-xs mt-1">
                    Enter the 6-digit code sent to {profile?.mobile}.
                  </span>
                  {mobilecountdown === 0 ? (
                    <span
                      className="block text-lighterGray text-xs mt-1 uppercase cursor-pointer"
                      onClick={() => handleSendMobileOtp()}
                    >
                      resend
                    </span>
                  ) : (
                    <span className="block text-brand text-xs mt-1">
                      0:{mobilecountdown}
                    </span>
                  )}
                </div>
              )}
              <span className="FieldError">{mobileErrors.otp?.message}</span>
            </label>
          )}
          {!mobileWatch('isMobileOtpSend') && (
            <label>
              <span className="Label">Phone</span>
              <div className="relative flex items-center justify-between">
                <input
                  {...registerMobile('mobile')}
                  type="text"
                  disabled
                  className={classNames(
                    'Input pr-20 truncate',
                    mobileErrors.mobile && 'border-brandError'
                  )}
                />
                <button
                  className="absolute  text-lighterGray font-normal text-xs lg:text-sm uppercase cursor-pointer right-0 pr-3"
                  onClick={() => handleSendMobileOtp()}
                >
                  Get code
                </button>
              </div>
            </label>
          )}
        </form>
      )}
      <button
        className="OutlineButton uppercase lg:text-base text-sm"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  );
}

export default function VerificationPage() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/');
  }, [router]);

  const { data: profile, isLoading, error } = useGetProfile();

  useEffect(() => {
    if (isLoading) return;

    if (!profile || error) {
      router.push('/signin');
      return;
    }

    if (profile.email_verified && profile.mobile_verified) {
      router?.replace('/');
      return;
    }
  }, [isLoading, error, profile, router]);

  if (!profile || (profile.email_verified && profile.mobile_verified)) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-2">
        <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
        <h1 className="text-center text-base lg:text-lg">Loading ....</h1>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 min-h-screen bg-[#f1ece5]">
      <div
        style={{ backgroundImage: 'url(form-screen-bg.png)' }}
        className="p-10 bg-neutral-900 lg:flex flex-col bg-cover bg-center lg:col-span-2 hidden"
      >
        <div>
          <img className="max-h-14" src="corpcare-logo-white.png" alt="" />
        </div>

        <p className="mt-auto text-5xl tracking-wide leading-tight font-semibold text-white hidden lg:block">
          Welcome to India&apos;s first corporate treasury management platform.
        </p>
      </div>
      <div className="bg-[#2F2F2F] p-4 items-center lg:hidden flex">
        <img
          className="max-h-10 w-36 self-end"
          src="corpcare-logo-white.png"
          alt="corpcare"
        />
      </div>
      <div className="p-4 lg:p-10 self-center lg:col-span-3">
        <h1 className="text-2xl lg:text-3xl text-darkGray text-center font-medium mt-5">
          Verify your Account
        </h1>

        <VerificationForm />
      </div>
    </div>
  );
}
