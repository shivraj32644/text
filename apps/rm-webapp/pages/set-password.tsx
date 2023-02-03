import { useRouter } from 'next/router';
import Error from 'next/error';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { setFormFieldErrors, useResetPassword } from '@corpcare/shared/api';
import { CustomToast } from '@corpcare/web/ui';
import toast from 'react-hot-toast';

const setPasswordFormSchema = yup.object({
  password: yup.string().label('Password').required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
type SetPasswordFields = yup.InferType<typeof setPasswordFormSchema>;

function SetpasswordForm() {
  const router = useRouter();
  const { email, ticket } = router.query as { email: string; ticket: string };

  const { mutate, isSuccess, isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SetPasswordFields>({
    resolver: yupResolver(setPasswordFormSchema),
  });

  const handleForgotPassword = ({ password }: SetPasswordFields) => {
    mutate(
      { email, ticket, password },
      {
        onSuccess(data) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={
                data?.message ||
                'Password was reset successfully! Please signin to continue.'
              }
              type="success"
            />
          ));
          router.push('/signin');
        },
        onError(err: any) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={err.message || 'Something went wrong! Please try again.'}
              type="error"
            />
          ));
          setFormFieldErrors(err, setError);
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleForgotPassword)}
      className={classNames(
        'p-5 lg:p-8 rounded-lg border mt-4 max-w-md mx-auto grid gap-6 bg-white',
        isLoading && 'animate-pulse'
      )}
    >
      <label>
        <span className="Label">Email</span>
        <input value={email} disabled className="Input" />
      </label>

      <label>
        <span className="Label">New Password</span>
        <input
          {...register('password')}
          type="password"
          placeholder="Enter a new password"
          className={classNames(
            'Input',
            errors.password && 'border-brandError'
          )}
        />

        <span className="FieldError">{errors.password?.message}</span>
      </label>

      <label>
        <span className="Label">Confirm New Password</span>
        <input
          {...register('confirm_password')}
          type="password"
          placeholder="Re-enter your new password"
          className={classNames(
            'Input',
            errors.confirm_password && 'border-brandError'
          )}
        />

        <span className="FieldError">{errors.confirm_password?.message}</span>
      </label>

      <button disabled={isLoading || isSuccess} className="Button">
        Submit
      </button>
    </form>
  );
}

export default function SetPasswordPage() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/signin');
  }, [router]);

  if (!router.query.email || !router.query.ticket) {
    return <Error statusCode={404} />;
  }

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
          Set Password
        </h1>

        <SetpasswordForm />
      </div>
    </div>
  );
}
