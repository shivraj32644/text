import { Dialog, Transition, Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import {
  NonIndividualOnBoardingFields,
  IndividualOnBoardingFields,
  individualOnBoardingSchema,
  nonIndividualOnBoardingSchema,
  useOnBoardNonIndividualClient,
  setFormFieldErrors,
  useGetProfile,
  useOnBoardIndividualClient,
} from '@corpcare/shared/api';
import ReactSelect from 'react-select';
import { CustomToast } from '@corpcare/web/ui';
import toast from 'react-hot-toast';

export function IndividualOnBoardingForm({ accountId, setIsOpen }) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<IndividualOnBoardingFields>({
    resolver: yupResolver(individualOnBoardingSchema),
  });
  const { mutate, isLoading } = useOnBoardIndividualClient();

  const handleSignup = async (data: IndividualOnBoardingFields) => {
    mutate(
      { data, accountId },
      {
        onSuccess() {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={'Onboarded Client successfully.'}
              type="success"
            />
          ));
          setIsOpen(false);
        },
        onError(err: any) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={err?.message || 'Onboarding failed! Please try again.'}
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
      onSubmit={handleSubmit(handleSignup)}
      className={classNames(
        'p-5 lg:p-8 rounded-lg border mt-4 max-w-2xl mx-auto grid lg:grid-cols-2 gap-x-6 gap-y-4 bg-white',
        isLoading && 'animate-pulse'
      )}
    >
      <label>
        <span className="Label">First Name</span>
        <input
          {...register('first_name')}
          autoFocus
          placeholder="Enter client’s first name"
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
          autoFocus
          placeholder="Enter client’s Last name"
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
          placeholder="Enter client’s email address"
          className={classNames('Input', errors.email && 'border-brandError')}
        />

        <span className="FieldError">{errors.email?.message}</span>
      </label>

      <label>
        <span className="Label">Phone</span>
        <input
          {...register('mobile')}
          type="tel"
          placeholder="Enter client’s phone number"
          className={classNames('Input', errors.mobile && 'border-brandError')}
        />

        <span className="FieldError">{errors.mobile?.message}</span>
      </label>

      <label className="">
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

      <button className="Button lg:col-span-2 uppercase">add client</button>
    </form>
  );
}

export function NonIndividualOnBoardingForm({ accountId, setIsOpen }) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<NonIndividualOnBoardingFields>({
    resolver: yupResolver(nonIndividualOnBoardingSchema),
  });
  const { mutate, isLoading } = useOnBoardNonIndividualClient();

  const handleSignup = async (data: NonIndividualOnBoardingFields) => {
    mutate(
      { data, accountId },
      {
        onSuccess() {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={'Onboarded Client successfully.'}
              type="success"
            />
          ));
          setIsOpen(false);
        },
        onError(err: any) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={err?.message || 'Onboarding failed! Please try again.'}
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
          placeholder="Enter client's first name"
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
          autoFocus
          placeholder="Enter client’s Last name"
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
          placeholder="Enter client's email"
          className={classNames('Input', errors.email && 'border-brandError')}
        />

        <span className="FieldError">{errors.email?.message}</span>
      </label>

      <label>
        <span className="Label">Phone</span>
        <input
          {...register('mobile')}
          type="tel"
          placeholder="Enter client's phone Number"
          className={classNames('Input', errors.mobile && 'border-brandError')}
        />

        <span className="FieldError">{errors.mobile?.message}</span>
      </label>

      <label>
        <span className="Label">Company</span>
        <input
          {...register('company_name')}
          placeholder="Enter client's company name"
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
          placeholder="Enter client's designation"
          className={classNames(
            'Input',
            errors.designation && 'border-brandError'
          )}
        />
        <span className="FieldError">{errors.designation?.message}</span>
      </label>

      <label>
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

      <button className="Button lg:col-span-2 uppercase">add client</button>
    </form>
  );
}

export function OnBoardingClientModal({ isOpen, setIsOpen }) {
  const { data: profile } = useGetProfile();

  const accountId = profile?.id;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg text-left align-middle transition-all">
                <Dialog.Title className="uppercase text-white text-[28px] leading-[42px] tracking-wide text-center font-medium">
                  ONBOARD A CLIENT
                </Dialog.Title>
                <Tab.Group>
                  <Tab.List className="Tabs grid grid-cols-2 max-w-md mx-auto mt-3 text-center">
                    <Tab className="uppercase text-base font-normal">
                      Individual
                    </Tab>
                    <Tab className="uppercase text-base font-normal">
                      Non Individual
                    </Tab>
                  </Tab.List>

                  <Tab.Panels>
                    <Tab.Panel>
                      <IndividualOnBoardingForm
                        accountId={accountId}
                        setIsOpen={setIsOpen}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <NonIndividualOnBoardingForm
                        accountId={accountId}
                        setIsOpen={setIsOpen}
                      />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
