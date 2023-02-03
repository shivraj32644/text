import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as yup from 'yup';
import ReactSelect from 'react-select';
import {
  IMutualFundSchema,
  setFormFieldErrors,
  useAddMfCartItems,
  useGetAccountCANsList,
  useGetProfile,
} from '@corpcare/shared/api';
import { BlackCrossCircle, CustomToast, SpinnerIcon } from '@corpcare/web/ui';
import toast from 'react-hot-toast';

const addMfCartItemSchema = yup.object({
  mf_scheme_id: yup.string().label('Scheme Name').required(),
  transaction_type: yup.string().label('Transaction Type').required(),
  amount: yup
    .number()
    .label('Amount')
    .typeError('Amount must be a number')
    .required(),
  can_number: yup.string().label('CAN Number').required(),
});
type AddMfCartItemFormFields = yup.InferType<typeof addMfCartItemSchema>;
interface OptionsProps {
  value: string;
  label: string;
}

export function AddToCartModal({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data?: IMutualFundSchema;
}) {
  const { data: profile } = useGetProfile();
  const { mutate, isLoading } = useAddMfCartItems();
  const accountId = profile?.accounts?.[0]?.id || '';
  const { data: cansList } = useGetAccountCANsList();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<AddMfCartItemFormFields>({
    resolver: yupResolver(addMfCartItemSchema),
  });
  useEffect(() => {
    reset({
      mf_scheme_id: data?.plan_name,
    });
  }, [data, reset]);

  const TransactionTypeOptions = () => {
    const reference = [
      data?.is_purchase_allowed
        ? { value: 'PURCHASE', label: 'Purchase' }
        : undefined,
      // data?.is_sip_allowed ? { value: 'SIP', label: 'SIP' } : undefined,
    ];
    return reference.filter((item) => item !== undefined);
  };
  const handleFormSubmit = (payload: AddMfCartItemFormFields) => {
    const dataRef = { ...payload };
    dataRef.mf_scheme_id = data?.id as any;
    mutate(
      { data: dataRef, accountId },
      {
        onSuccess(response) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={response?.message || 'Successfully added item to cart.'}
              type="success"
            />
          ));
          setIsOpen(!isOpen);
        },
        onError(err: any) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={
                err?.message || 'Failed to add item to cart! Please try again.'
              }
              type="error"
            />
          ));
          setFormFieldErrors(err, setError);
        },
      }
    );
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
          }}
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-between border-b border-brandLight bg-lighter px-5 py-3 lg:px-10 lg:py-4">
                    <p className="font-medium text-lg lg:text-xl text-lightGray">
                      Add To Cart
                    </p>
                    <BlackCrossCircle
                      className="h-6 w-6 hover:cursor-pointer text-white"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    />
                  </Dialog.Title>
                  <form
                    className="flex flex-col lg:px-8 lg:py-7 p-5"
                    onSubmit={handleSubmit(handleFormSubmit)}
                  >
                    <div className="grid grid-cols-2 gap-4 lg:gap-5">
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">Scheme Name</span>
                        <input
                          {...register('mf_scheme_id')}
                          disabled
                          placeholder="Enter your Scheme Name"
                          className={classNames(
                            'Input',
                            errors.mf_scheme_id && 'border-brandError'
                          )}
                        />
                        <span className="FieldError">
                          {errors.mf_scheme_id?.message}
                        </span>
                      </label>
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">Transaction Type</span>
                        <Controller
                          control={control}
                          name="transaction_type"
                          render={({
                            field: { value, onChange, name, ref },
                          }) => {
                            return (
                              <ReactSelect
                                placeholder={
                                  <div className="text-sm text-lighterGray">
                                    Select your Transaction Type
                                  </div>
                                }
                                options={
                                  TransactionTypeOptions() as {
                                    value: string;
                                    label: string;
                                  }[]
                                }
                                value={TransactionTypeOptions().find(
                                  (c) => c?.value === value
                                )}
                                onChange={(e: OptionsProps) => {
                                  onChange(e.value);
                                }}
                                name={name}
                                styles={{
                                  menuList: (base, state) => ({
                                    ...base,
                                    maxHeight: '150px',
                                  }),
                                  control: (base, state) => ({
                                    ...base,
                                    padding: '2px',
                                    '@media only screen and (min-width: 1024px)':
                                      {
                                        padding: '6px',
                                      },
                                    boxShadow: state.isFocused
                                      ? 'none'
                                      : 'none',
                                    borderColor: state.isFocused
                                      ? '#C5A265'
                                      : errors.transaction_type
                                      ? '#F56B63'
                                      : base.borderColor,
                                    borderRadius: '4px',
                                    '&:hover': {
                                      boxShadow: state.isFocused
                                        ? '#C5A265'
                                        : 'none',
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
                                      backgroundColor: state.isFocused
                                        ? '#EADDC7'
                                        : '',
                                      color: '#555',
                                    },
                                  }),
                                }}
                              />
                            );
                          }}
                        />
                        <span className="FieldError">
                          {errors.transaction_type?.message}
                        </span>
                      </label>
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">Amount</span>
                        <input
                          {...register('amount')}
                          placeholder="Enter Amount"
                          className={classNames(
                            'Input',
                            errors.amount && 'border-brandError'
                          )}
                        />
                        <span className="FieldError">
                          {errors.amount?.message}
                        </span>
                      </label>
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">CAN Number</span>
                        <Controller
                          control={control}
                          name="can_number"
                          render={({
                            field: { value, onChange, name, ref },
                          }) => {
                            return (
                              <ReactSelect
                                placeholder={
                                  <div className="text-sm text-lighterGray">
                                    Select your CAN Number
                                  </div>
                                }
                                noOptionsMessage={({ inputValue }) =>
                                  !inputValue
                                    ? 'Please Register and approve your CAN to proceed further '
                                    : 'No results found'
                                }
                                value={cansList?.items
                                  ?.filter(
                                    (item) => item?.status === 'APPROVED'
                                  )
                                  ?.map((item) => {
                                    return {
                                      value: item?.can_number,
                                      label: item?.can_number,
                                    };
                                  })
                                  .find((c) => c.value === value)}
                                onChange={(e: OptionsProps) => {
                                  onChange(e.value);
                                }}
                                menuPlacement="top"
                                options={cansList?.items
                                  ?.filter(
                                    (item) => item?.status === 'APPROVED'
                                  )
                                  ?.map((item) => {
                                    return {
                                      value: item?.can_number,
                                      label: item?.can_number,
                                    };
                                  })}
                                isSearchable={false}
                                name={name}
                                styles={{
                                  menuList: (base, state) => ({
                                    ...base,
                                    maxHeight: '150px',
                                  }),
                                  control: (base, state) => ({
                                    ...base,
                                    padding: '2px',
                                    '@media only screen and (min-width: 1024px)':
                                      {
                                        padding: '6px',
                                      },
                                    boxShadow: state.isFocused
                                      ? 'none'
                                      : 'none',
                                    borderColor: state.isFocused
                                      ? '#C5A265'
                                      : errors.can_number
                                      ? '#F56B63'
                                      : base.borderColor,
                                    borderRadius: '4px',
                                    '&:hover': {
                                      boxShadow: state.isFocused
                                        ? '#C5A265'
                                        : 'none',
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
                                      backgroundColor: state.isFocused
                                        ? '#EADDC7'
                                        : '',
                                      color: '#555',
                                    },
                                  }),
                                }}
                              />
                            );
                          }}
                        />
                        <span className="FieldError">
                          {errors.can_number?.message}
                        </span>
                      </label>
                      <button
                        className="Button uppercase w-full col-span-2 lg:text-base text-sm"
                        disabled={isLoading}
                      >
                        add transaction to cart
                        {isLoading && (
                          <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
                        )}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
