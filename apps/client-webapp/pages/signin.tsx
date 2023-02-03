import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import {
  ClientSigninFields,
  clientSigninFormSchema,
  ClientSigninWithEmailOtpFields,
  clientSigninWithEmailOtpFormSchema,
  setFormFieldErrors,
  useSendEmailSignInOtp,
  useSigninClient,
  useSigninWithEmailOtpClient,
} from '@corpcare/shared/api';
import { useCallback, useEffect, useState } from 'react';
import { SpinnerIcon, useCountdown, CustomToast } from '@corpcare/web/ui';
import toast from 'react-hot-toast';

export function SigninForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ClientSigninFields>({
    resolver: yupResolver(clientSigninFormSchema),
  });
  const { mutate, isLoading } = useSigninClient();
  const handleSignin = async (data: ClientSigninFields) => {
    mutate(data, {
      onSuccess() {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={'Successfully logged in.'}
            type="success"
          />
        ));
        router.push(`/`);
      },
      onError(err: any) {
        setFormFieldErrors(err, setError);
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={err.message || 'Something went wrong! Please try again.'}
            type="error"
          />
        ));
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(handleSignin)}
      className={classNames(
        'p-5 lg:p-8 rounded-lg border mt-4 max-w-md mx-auto grid gap-6 bg-white',
        isLoading && 'animate-pulse'
      )}
    >
      <label>
        <span className="Label">Email</span>
        <input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          className={classNames('Input', errors.email && 'border-brandError')}
        />

        <span className="FieldError">{errors.email?.message}</span>
      </label>

      <label>
        <span className="Label">Password</span>
        <input
          {...register('password')}
          type="password"
          placeholder="Enter your password"
          className={classNames(
            'Input',
            errors.password && 'border-brandError'
          )}
        />

        <span className="FieldError">{errors.password?.message}</span>
      </label>

      <button className="Button uppercase" disabled={isLoading}>
        Sign in
        {isLoading && (
          <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
        )}
      </button>
    </form>
  );
}

function SignInWithEmailOtpForm() {
  const router = useRouter();

  const {
    mutate: sendOtp,
    isLoading: isSending,
    isSuccess: isSuccessSendEmailOtp,
  } = useSendEmailSignInOtp();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    trigger,
    getValues,
    watch,
    setValue,
  } = useForm<ClientSigninWithEmailOtpFields & { isOtpSend: boolean }>({
    resolver: yupResolver(clientSigninWithEmailOtpFormSchema),
  });

  const { mutate, isLoading } = useSigninWithEmailOtpClient();

  const handleSendOtp = useCallback(async () => {
    const validation = await trigger('email');
    if (!validation) {
      return;
    }
    sendOtp(
      { email: getValues('email') },
      {
        onSuccess(data) {
          setValue('isOtpSend', true);
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={data?.message || 'SuccessFully Sended OTP'}
              type="success"
            />
          ));
        },
        onError(err: any) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={err.message || 'Failed to send otp! Please try again.'}
              type="error"
            />
          ));
        },
      }
    );
  }, [getValues, trigger, sendOtp, setValue]);

  const handleSignin = async (data: ClientSigninWithEmailOtpFields) => {
    mutate(data, {
      onSuccess() {
        router.push(`/`);
      },
      onError(err: any) {
        setFormFieldErrors(err, setError);
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={err.message || 'Failed to Sign In! Please try again.'}
            type="error"
          />
        ));
      },
    });
  };

  const [countdown] = useCountdown(isSuccessSendEmailOtp ? 30 : 0);

  return (
    <form
      onSubmit={handleSubmit(handleSignin)}
      className={classNames(
        'p-5 lg:p-8 rounded-lg border mt-4 max-w-md mx-auto grid gap-6 bg-white',
        isLoading && 'animate-pulse'
      )}
    >
      <label>
        <span className="Label">Email</span>
        <input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          className={classNames('Input', errors.email && 'border-brandError')}
        />

        <span className="FieldError">{errors.email?.message}</span>
      </label>
      {watch('isOtpSend') && (
        <>
          <label>
            <span className="Label">OTP</span>
            <input
              {...register('otp')}
              type="tel"
              placeholder="Enter OTP received in email"
              className={classNames('Input', errors.otp && 'border-brandError')}
            />
            <span className="FieldError">{errors.otp?.message}</span>
          </label>

          <button className="Button uppercase" disabled={isLoading}>
            Sign in
            {isLoading && (
              <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
            )}
          </button>
        </>
      )}

      <div className="text-center">
        {countdown === 0 ? (
          <button
            onClick={handleSendOtp}
            type="button"
            disabled={isSending || isLoading}
            className="OutlineButton bg-transparent text-sm py-1"
          >
            &#8635; Send OTP
          </button>
        ) : (
          <button
            type="button"
            className="OutlineButton bg-transparent text-base py-1 hover:cursor-not-allowed"
          >
            &#8635; Resend&nbsp;({countdown})
          </button>
        )}
      </div>
    </form>
  );
}

export default function Signin() {
  const [signInMode, setSignInMode] = useState<'email-pass' | 'email-otp'>(
    'email-pass'
  );
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/dashboard');
  }, [router]);

  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-[#f1ece5]">
      <div
        style={{ backgroundImage: 'url(form-screen-bg-2.png)' }}
        className="p-10 bg-neutral-900 lg:flex flex-col bg-cover bg-center hidden"
      >
        <div>
          <img className="max-h-14" src="corpcare-logo-white.png" alt="" />
        </div>

        <p className="mt-auto text-5xl tracking-wide leading-tight font-semibold text-white hidden lg:block">
          Welcome back to CorpCare, where growth meets your business.
        </p>
      </div>
      <div className="bg-[#2F2F2F] p-4 items-center lg:hidden flex">
        <img
          className="max-h-10 w-36 self-end"
          src="corpcare-logo-white.png"
          alt="corpcare"
        />
      </div>
      <div className="p-4 lg:p-10 self-center">
        <h1 className="text-2xl lg:text-3xl text-darkGray text-center font-medium mt-5">
          Sign In
        </h1>

        {signInMode === 'email-pass' ? (
          <SigninForm />
        ) : (
          <SignInWithEmailOtpForm />
        )}

        <div className="text-center">
          {/* forgot password */}
          {signInMode === 'email-pass' ? (
            <div className="flex justify-center flex-col">
              <Link href="/forgot-password">
                <a className="p-2 text-lightGray text-sm lg:text-xl inline-block mt-3">
                  Forgot password&nbsp;?
                </a>
              </Link>
              <a
                className="cursor-pointer OutlineButton inline-block mt-3 uppercase max-w-xs mx-auto"
                onClick={() => {
                  setSignInMode('email-otp');
                }}
              >
                Sign in with OTP
              </a>
            </div>
          ) : (
            <a
              className="cursor-pointer OutlineButton inline-block my-3 uppercase"
              onClick={() => {
                setSignInMode('email-pass');
              }}
            >
              Sign in with Password
            </a>
          )}
          <br />

          <Link href="/signup">
            <a className="OutlineButton inline-block uppercase">
              Need an account? Sign up
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
