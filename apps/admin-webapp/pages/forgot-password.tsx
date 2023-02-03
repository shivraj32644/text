import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { setFormFieldErrors, useForgotPassword } from '@corpcare/shared/api';
import Link from 'next/link';
import { SpinnerIcon } from '@corpcare/web/ui';
import toast from 'react-hot-toast';
import { CustomToast } from '@corpcare/web/ui';

function ForgotPasswordForm() {
  const { mutate, isLoading, isSuccess } = useForgotPassword();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ email: string }>();

  const handleForgotPassword = (payload: { email: string }) => {
    mutate(payload, {
      onSuccess(data) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={
              data?.message ||
              'Email was send successfully! Please check your mail'
            }
            type="success"
          />
        ));
      },
      onError(err: Error) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={err.message || 'Something went wrong! Please try again.'}
            type="error"
          />
        ));
        setFormFieldErrors(err, setError);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleForgotPassword)}
      className={classNames(
        'p-5 lg:p-8 rounded-lg border mt-4 max-w-md mx-auto grid gap-6 bg-white',
        isLoading && 'animate-pulse'
      )}
    >
      {!isSuccess && (
        <span className="text-sm font-normal text-lightGray">
          Please enter the email address you’d like to receive your password
          resent information.
        </span>
      )}
      <label>
        <span className="Label">Email</span>
        <input
          {...register('email')}
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          disabled={isSuccess}
          className={classNames(
            'Input disabled:cursor-not-allowed',
            errors.email && 'border-brandError'
          )}
        />

        <span className="FieldError">{errors.email?.message}</span>
      </label>

      <button className="Button  uppercase" disabled={isLoading || isSuccess}>
        REQUEST RESET LINK
        {isLoading && (
          <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
        )}
      </button>
    </form>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/reset-password');
  }, [router]);

  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-[#f1ece5]">
      <div
        style={{ backgroundImage: 'url(form-screen-bg.png)' }}
        className="p-10 bg-neutral-900 lg:flex flex-col bg-cover bg-center hidden"
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
      <div className="p-4 lg:p-10 self-center">
        <h1 className="text-2xl lg:text-3xl text-darkGray text-center font-medium mt-5">
          Forgot Password
        </h1>
        <ForgotPasswordForm />
        <Link href="/signin">
          <a className="OutlineButton text-center block mt-3 uppercase w-28 mx-auto text-sm">
            sign in
          </a>
        </Link>
      </div>
    </div>
  );
}
