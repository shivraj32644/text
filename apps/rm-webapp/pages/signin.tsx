import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import {
  ClientSigninFields,
  clientSigninFormSchema,
  setFormFieldErrors,
  useSigninRelationshipManager,
} from '@corpcare/shared/api';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CustomToast } from '@corpcare/web/ui';

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
  const { mutate, isLoading } = useSigninRelationshipManager();
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
        router.push(`/clients`);
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

      <button disabled={isLoading} className="Button uppercase">
        Sign in
      </button>
    </form>
  );
}

export default function Signin() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/');
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

        <SigninForm />

        <div className="text-center">
          {/* forgot password */}
          <Link href="/forgot-password">
            <a className="p-2 text-lightGray text-sm lg:text-xl inline-block mt-3">
              Forgot password&nbsp;?
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
