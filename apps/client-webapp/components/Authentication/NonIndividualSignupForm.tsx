import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import {
  NonIndividualSignupFields,
  nonIndividualSignupSchema,
  setFormFieldErrors,
  useSignupNonIndividual,
} from '@corpcare/shared/api';
import ReactSelect from 'react-select';
import { CustomToast, SpinnerIcon } from '@corpcare/web/ui';
import toast from 'react-hot-toast';

export function NonIndividualSignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<NonIndividualSignupFields>({
    resolver: yupResolver(nonIndividualSignupSchema),
  });

  const { mutate, isLoading } = useSignupNonIndividual();

  const handleSignup = async (data: NonIndividualSignupFields) => {
    mutate(data, {
      onSuccess() {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={'Signed Up successfully!.'}
            type="success"
          />
        ));
        router.push(`/account-verification`);
      },
      onError(err: any) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={err.message || 'Signup failed! Please try again.'}
            type="error"
          />
        ));
        setFormFieldErrors(err, setError);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className={classNames(
        'p-5 lg:p-8 rounded-lg border mt-4 max-w-2xl mx-auto grid lg:grid-cols-2 gap-6 bg-white',
        isLoading && 'animate-pulse'
      )}
    >
      <label>
        <span className="Label">First Name</span>
        <input
          {...register('first_name')}
          autoFocus
          placeholder="Enter your first name"
          className={classNames(
            'Input',
            errors.first_name && 'border-brandError'
          )}
        />

        <span className="FieldError">{errors.first_name?.message}</span>
      </label>

      <label>
        <span className="Label">Last Name</span>
        <input
          {...register('last_name')}
          placeholder="Enter your last name"
          className={classNames(
            'Input',
            errors.last_name && 'border-brandError'
          )}
        />

        <span className="FieldError">{errors.last_name?.message}</span>
      </label>

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
        <span className="Label">Phone</span>
        <input
          {...register('mobile')}
          type="tel"
          placeholder="Enter your Phone Number"
          className={classNames('Input', errors.mobile && 'border-brandError')}
        />

        <span className="FieldError">{errors.mobile?.message}</span>
      </label>

      <label>
        <span className="Label">Company</span>
        <input
          {...register('company_name')}
          placeholder="Enter company name"
          className={classNames(
            'Input',
            errors.company_name && 'border-brandError'
          )}
        />

        <span className="FieldError">{errors.company_name?.message}</span>
      </label>

      <label>
        <span className="Label">Designation</span>
        <input
          {...register('designation')}
          placeholder="Enter your designation"
          className={classNames(
            'Input',
            errors.designation && 'border-brandError'
          )}
        />
        <span className="FieldError">{errors.designation?.message}</span>
      </label>

      <label className="lg:col-span-2">
        <span className="Label">Entity Type</span>
        <Controller
          control={control}
          name="entity_type"
          render={({ field: { value, onChange, name, ref } }) => {
            return (
              <ReactSelect
                placeholder={
                  <div className="text-sm text-lighterGray">
                    Select your Entity Type
                  </div>
                }
                options={[
                  { value: 'advisory', label: 'Advisory' },
                  { value: 'distributor', label: 'Distributor' },
                ]}
                value={[
                  { value: 'advisory', label: 'Advisory' },
                  { value: 'distributor', label: 'Distributor' },
                ].find((c) => c.value === value)}
                onChange={(e: any) => {
                  onChange(e.value);
                }}
                name={name}
                isSearchable={false}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    padding: '2px',
                    '@media only screen and (min-width: 1024px)': {
                      padding: '6px',
                    },
                    boxShadow: state.isFocused ? 'none' : 'none',
                    borderColor: state.isFocused
                      ? '#C5A265'
                      : errors.entity_type
                      ? '#F56B63'
                      : base.borderColor,
                    borderRadius: '4px',
                    '&:hover': {
                      boxShadow: state.isFocused ? '#C5A265' : 'none',
                      borderColor: state.isFocused
                        ? '#C5A265'
                        : base.borderColor,
                    },
                  }),
                  singleValue: (base, state) => ({
                    ...base,
                    color: '#555',
                    fontSize: '0.875rem' /* 14px */,
                    lineHeight: '1.25rem' /* 20px */,
                    letterSpacing: '0.02em',
                  }),
                  option: (base, state) => ({
                    ...base,
                    fontSize: '16px',
                    backgroundColor: state.isSelected
                      ? '#C5A265'
                      : state.isFocused
                      ? '#EADDC7'
                      : '',
                    color: state.isSelected ? 'white' : '#555',
                    '&:hover': {
                      backgroundColor: state.isFocused ? '#EADDC7' : '',
                      color: '#555',
                    },
                  }),
                }}
              />
            );
          }}
        />
        <span className="FieldError">{errors.entity_type?.message}</span>
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

      <label>
        <span className="Label">Confirm Password</span>
        <input
          {...register('confirm_password')}
          type="password"
          placeholder="Re-enter your password"
          className={classNames(
            'Input',
            errors.confirm_password && 'border-brandError'
          )}
        />

        <span className="FieldError">{errors.confirm_password?.message}</span>
      </label>

      <label className="lg:col-span-2 Label">
        <div className="flex">
          <input
            {...register('newsletter_opt_in')}
            type="checkbox"
            className="min-w-[14px]"
          />
          <span className="ml-2 align-middle text-lightGray">
            I agree to CorpCare storing and processing my information. I also
            agree to receive all types of communications from CorpCare.
          </span>
        </div>
        <span className="FieldError">{errors.newsletter_opt_in?.message}</span>
      </label>

      <button disabled={isLoading} className="Button lg:col-span-2 uppercase">
        sign up
        {isLoading && (
          <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
        )}
      </button>

      <p className="lg:col-span-2 text-center lg:text-base text-sm">
        By Signing up, you agree to our terms of use &amp; policy.
      </p>
    </form>
  );
}
