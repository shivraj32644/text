import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  CART_TYPE,
  frequencyOptions,
  IOptions,
  setFormFieldErrors,
  txnStateTypeOptions,
  txnTypeOptions,
  useGetAccountCANsList,
  useGetProfile,
  usePurchaseTransaction,
  useRedeemTransaction,
  useSIPTransaction,
  useSTPTransaction,
  useSwitchTransaction,
  useSWPTransaction,
} from '@corpcare/shared/api';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import ReactSelect from 'react-select';
import classNames from 'classnames';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import range from 'lodash/range';
import toast from 'react-hot-toast';
import { CustomToast, SpinnerIcon } from '@corpcare/web/ui';

const PurchaseTransactionForm = ({
  cansList,
  accountId,
  cart_id,
  transaction_type,
  can_number,
}) => {
  const { mutate, isLoading } = usePurchaseTransaction();

  const transactionSchema = yup.object({
    cartId: yup.string().required().label('Cart ID'),
    txType: yup.string().required().label('tx Type'),
    canId: yup.string().required().label('CAN ID'),
    consent: yup
      .bool()
      .required()
      .oneOf([true], 'Please read and accept the details'),
  });

  type TransactionFields = yup.InferType<typeof transactionSchema>;
  const router = useRouter();

  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<TransactionFields>({
    resolver: yupResolver(transactionSchema),
  });
  useEffect(() => {
    reset({ cartId: cart_id, txType: transaction_type, canId: can_number });
  }, [reset, can_number, cart_id, transaction_type]);
  const handleFormSubmit = (data: TransactionFields) => {
    mutate(
      { formData: data, account_id: accountId },
      {
        onSuccess(data) {
          // setIsOpen(true);
          router.push(data?.payment_link as string);
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
      }
    );
  };
  return (
    <form
      className="bg-white mt-3 mx-auto rounded-lg lg:p-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="border lg:border-l lg:border-r border-l-0 border-r-0 border-light">
        <section className="text-lightGray font-normal text-lg lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
          Transaction Details
        </section>
        <div className="mx-auto p-5 lg:p-7">
          <div className="grid grid-cols-2 gap-6">
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">CAN</span>
              <Controller
                control={control}
                name="canId"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={cansList?.items?.map((item) => {
                        return {
                          value: item?.can_number,
                          label: item?.can_number,
                        };
                      })}
                      isDisabled
                      value={cansList?.items
                        ?.map((item) => {
                          return {
                            value: item?.can_number,
                            label: item?.can_number,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.canId
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
              <span className="FieldError">{errors.canId?.message}</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex lg:mt-8 gap-2 lg:p-0 p-5">
        <input
          {...register('consent')}
          type="checkbox"
          className={classNames(
            'w-4 lg:w-6 flex-shrink-0',
            errors.consent && 'border-brandError'
          )}
        />
        <p className="text-lightGray text-sm font-normal">
          I/We have read and understood the contents of the Offer
          Document(s)/Scheme Information Document(s)/Statement of Additional
          Information(s) and Addendum(s) thereto of the respective Scheme(s) and
          agrees to abide by the terms, conditions, rules and regulations of the
          Scheme(s) applicable from time to time.
          <br />
          <br />
          I/We authorise CorpCare to execute the above transaction(s)
          notwithstanding the advice of inappropriateness highlighted to me /
          us.
          <br />
          <br />
          I/We have understood the details of the Scheme and have not received
          nor been induced by any rebate or gifts, directly or indirectly, in
          making this investment.
          <br />
          <br />
          I/We hereby declare that I/We am /are authorised to make this
          investments and that the amount invested in the scheme is through
          legitimate sources only and does not involved and is not designed for
          the purpose of any contravention or evasion of any Act, Rules,
          Regulations, Notifications or Directions issued by any regulatory
          authorities in India.
          <br />
          <br />
          I/We confirm that the details provided by me/us is true, correct and
          complete.
        </p>
      </div>
      <span className="FieldError">{errors.consent?.message}</span>

      <section className="flex items-center justify-start max-w-md gap-4 lg:mt-6 lg:p-0 p-5">
        <button
          className="Button uppercase w-full"
          type="submit"
          disabled={isLoading}
        >
          Submit
          {isLoading && (
            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
          )}
        </button>
      </section>
    </form>
  );
};

const RedemptionTransactionForm = ({
  cansList,
  accountId,
  cart_id,
  can_number,
}) => {
  const { mutate, isLoading } = useRedeemTransaction();

  const transactionSchema = yup.object({
    cartId: yup.string().required().label('Cart ID'),
    txn_type: yup.string().required().label('Txn Type'),
    folio_num: yup.string().required().label('Folio Num'),
    txn_vol: yup.string().when('txn_type', {
      is: (val) => val !== 'E',
      then: yup.string().required().label('Txn Vol'),
    }),
    canId: yup.string().required().label('CAN ID'),
    consent: yup
      .bool()
      .required()
      .oneOf([true], 'Please read and accept the details'),
  });

  type TransactionFields = yup.InferType<typeof transactionSchema>;
  const router = useRouter();

  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<TransactionFields>({
    resolver: yupResolver(transactionSchema),
  });
  useEffect(() => {
    reset({ cartId: cart_id, canId: can_number });
  }, [reset, can_number, cart_id]);

  const handleFormSubmit = (data: TransactionFields) => {
    mutate(
      { formData: data, account_id: accountId },
      {
        onSuccess(data) {
          // setIsOpen(true);
          router.push(data?.mfu_app_link_pri as string);
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
      }
    );
  };
  return (
    <form
      className="bg-white mt-3 mx-auto rounded-lg lg:p-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="border lg:border-l lg:border-r border-l-0 border-r-0 border-light">
        <section className="text-lightGray font-normal text-lg lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
          Transaction Details
        </section>
        <div className="mx-auto p-5 lg:p-7">
          <div className="grid grid-cols-2 gap-6">
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">CAN</span>
              <Controller
                control={control}
                name="canId"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={cansList?.items?.map((item) => {
                        return {
                          value: item?.can_number,
                          label: item?.can_number,
                        };
                      })}
                      isDisabled
                      value={cansList?.items
                        ?.map((item) => {
                          return {
                            value: item?.can_number,
                            label: item?.can_number,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.canId
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
              <span className="FieldError">{errors.canId?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Folio Number</span>
              <input
                {...register('folio_num')}
                placeholder="Enter your Folio Number"
                className={classNames(
                  'Input',
                  errors.folio_num && 'border-brandError'
                )}
              />

              <span className="FieldError">{errors.folio_num?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Txn Vol</span>
              <input
                {...register('txn_vol')}
                placeholder="Enter your Txn Vol"
                className={classNames(
                  'Input',
                  errors.txn_vol && 'border-brandError',
                  'disabled:cursor-not-allowed'
                )}
                disabled={watch('txn_type') === 'E'}
              />

              <span className="FieldError">{errors.txn_vol?.message}</span>
            </label>
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">Txn Type</span>
              <Controller
                control={control}
                name="txn_type"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={txnTypeOptions}
                      value={txnTypeOptions.find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                        watch('txn_type') === 'E' && setValue('txn_vol', '');
                      }}
                      isSearchable={false}
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
                            : errors.txn_type
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
              <span className="FieldError">{errors.txn_type?.message}</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex lg:mt-8 gap-2 lg:p-0 p-5">
        <input
          {...register('consent')}
          type="checkbox"
          className={classNames(
            'w-4 lg:w-6 flex-shrink-0',
            errors.consent && 'border-brandError'
          )}
        />
        <p className="text-lightGray text-sm font-normal">
          I/We have read and understood the contents of the Offer
          Document(s)/Scheme Information Document(s)/Statement of Additional
          Information(s) and Addendum(s) thereto of the respective Scheme(s) and
          agrees to abide by the terms, conditions, rules and regulations of the
          Scheme(s) applicable from time to time.
          <br />
          <br />
          I/We authorise CorpCare to execute the above transaction(s)
          notwithstanding the advice of inappropriateness highlighted to me /
          us.
          <br />
          <br />
          I/We have understood the details of the Scheme and have not received
          nor been induced by any rebate or gifts, directly or indirectly, in
          making this investment.
          <br />
          <br />
          I/We hereby declare that I/We am /are authorised to make this
          investments and that the amount invested in the scheme is through
          legitimate sources only and does not involved and is not designed for
          the purpose of any contravention or evasion of any Act, Rules,
          Regulations, Notifications or Directions issued by any regulatory
          authorities in India.
          <br />
          <br />
          I/We confirm that the details provided by me/us is true, correct and
          complete.
        </p>
      </div>
      <span className="FieldError">{errors.consent?.message}</span>

      <section className="flex items-center justify-start max-w-md gap-4 lg:mt-6 lg:p-0 p-5">
        <button
          className="Button uppercase w-full"
          type="submit"
          disabled={isLoading}
        >
          Submit
          {isLoading && (
            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
          )}
        </button>
      </section>
    </form>
  );
};

const SwitchTransactionForm = ({
  cansList,
  accountId,
  cart_id,
  can_number,
}) => {
  const { mutate, isLoading } = useSwitchTransaction();

  const transactionSchema = yup.object({
    cartId: yup.string().required().label('Cart ID'),
    txn_type: yup.string().required().label('Txn Type'),
    folio_num: yup.string().required().label('Folio Num'),
    txn_vol: yup.string().when('txn_type', {
      is: (val) => val !== 'E',
      then: yup.string().required().label('Txn Vol'),
    }),
    canId: yup.string().required().label('CAN ID'),
    tar_scheme_code: yup.string().required().label('Tar Scheme Code'),
    src_scheme_code: yup.string().required().label('Src Scheme Code'),
    consent: yup
      .bool()
      .required()
      .oneOf([true], 'Please read and accept the details'),
  });

  type TransactionFields = yup.InferType<typeof transactionSchema>;
  const router = useRouter();
  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<TransactionFields>({
    resolver: yupResolver(transactionSchema),
  });
  useEffect(() => {
    reset({ cartId: cart_id, canId: can_number });
  }, [reset, can_number, cart_id]);

  const handleFormSubmit = (data: TransactionFields) => {
    mutate(
      { formData: data, account_id: accountId },
      {
        onSuccess(data) {
          // setIsOpen(true);
          router.push(data?.mfu_app_link_pri as string);
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
      }
    );
  };
  return (
    <form
      className="bg-white mt-3 mx-auto rounded-lg lg:p-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="border lg:border-l lg:border-r border-l-0 border-r-0 border-light">
        <section className="text-lightGray font-normal text-lg lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
          Transaction Details
        </section>
        <div className="mx-auto p-5 lg:p-7">
          <div className="grid grid-cols-2 gap-6">
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">CAN</span>
              <Controller
                control={control}
                name="canId"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={cansList?.items?.map((item) => {
                        return {
                          value: item?.can_number,
                          label: item?.can_number,
                        };
                      })}
                      isDisabled
                      value={cansList?.items
                        ?.map((item) => {
                          return {
                            value: item?.can_number,
                            label: item?.can_number,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.canId
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
              <span className="FieldError">{errors.canId?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Folio Number</span>
              <input
                {...register('folio_num')}
                placeholder="Enter your Folio Number"
                className={classNames(
                  'Input',
                  errors.folio_num && 'border-brandError'
                )}
              />

              <span className="FieldError">{errors.folio_num?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Txn Vol</span>
              <input
                {...register('txn_vol')}
                placeholder="Enter your Txn Vol"
                className={classNames(
                  'Input',
                  errors.txn_vol && 'border-brandError',
                  'disabled:cursor-not-allowed'
                )}
                disabled={watch('txn_type') === 'E'}
              />

              <span className="FieldError">{errors.txn_vol?.message}</span>
            </label>
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">Txn Type</span>
              <Controller
                control={control}
                name="txn_type"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={txnTypeOptions}
                      value={txnTypeOptions.find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                        watch('txn_type') === 'E' && setValue('txn_vol', '');
                      }}
                      isSearchable={false}
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
                            : errors.txn_type
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
              <span className="FieldError">{errors.txn_type?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Tar Scheme Code</span>
              <input
                {...register('tar_scheme_code')}
                placeholder="Enter your Tar Scheme Code"
                className={classNames(
                  'Input',
                  errors.tar_scheme_code && 'border-brandError'
                )}
              />

              <span className="FieldError">
                {errors.tar_scheme_code?.message}
              </span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Src Scheme Code</span>
              <input
                {...register('src_scheme_code')}
                placeholder="Enter your Src Scheme Code"
                className={classNames(
                  'Input',
                  errors.src_scheme_code && 'border-brandError'
                )}
              />

              <span className="FieldError">
                {errors.src_scheme_code?.message}
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex lg:mt-8 gap-2 lg:p-0 p-5">
        <input
          {...register('consent')}
          type="checkbox"
          className={classNames(
            'w-4 lg:w-6 flex-shrink-0',
            errors.consent && 'border-brandError'
          )}
        />
        <p className="text-lightGray text-sm font-normal">
          I/We have read and understood the contents of the Offer
          Document(s)/Scheme Information Document(s)/Statement of Additional
          Information(s) and Addendum(s) thereto of the respective Scheme(s) and
          agrees to abide by the terms, conditions, rules and regulations of the
          Scheme(s) applicable from time to time.
          <br />
          <br />
          I/We authorise CorpCare to execute the above transaction(s)
          notwithstanding the advice of inappropriateness highlighted to me /
          us.
          <br />
          <br />
          I/We have understood the details of the Scheme and have not received
          nor been induced by any rebate or gifts, directly or indirectly, in
          making this investment.
          <br />
          <br />
          I/We hereby declare that I/We am /are authorised to make this
          investments and that the amount invested in the scheme is through
          legitimate sources only and does not involved and is not designed for
          the purpose of any contravention or evasion of any Act, Rules,
          Regulations, Notifications or Directions issued by any regulatory
          authorities in India.
          <br />
          <br />
          I/We confirm that the details provided by me/us is true, correct and
          complete.
        </p>
      </div>
      <span className="FieldError">{errors.consent?.message}</span>

      <section className="flex items-center justify-start max-w-md gap-4 lg:mt-6 lg:p-0 p-5">
        <button
          className="Button uppercase w-full"
          type="submit"
          disabled={isLoading}
        >
          Submit
          {isLoading && (
            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
          )}
        </button>
      </section>
    </form>
  );
};

const SWPTransactionForm = ({ cansList, accountId, cart_id, can_number }) => {
  const { mutate, isLoading } = useSWPTransaction();

  const transactionSchema = yup.object({
    cartId: yup.string().required().label('Cart ID'),
    txn_type: yup.string().required().label('Txn Type'),
    folio_num: yup.string().required().label('Folio Num'),
    txn_vol: yup.string().required().label('Txn Vol'),
    canId: yup.string().required().label('CAN ID'),
    frequency: yup.string().required().label('Frequency'),
    day: yup
      .number()
      .required()
      .label('Day')
      .typeError('Please Enter a Valid Day')
      .min(1, 'Please Enter a Valid Day')
      .max(31, 'Please Enter a Valid Day'),
    start_month: yup
      .number()
      .required()
      .label('Start Month')
      .typeError('Please Enter a Valid Month')
      .min(1, 'Please Enter a Valid Month')
      .max(12, 'Please Enter a Valid Month'),
    start_year: yup.string().required().label('Start Year'),
    end_month: yup
      .number()
      .required()
      .label('End Month')
      .typeError('Please Enter a Valid Month')
      .min(1, 'Please Enter a Valid Month')
      .max(12, 'Please Enter a Valid Month'),
    end_year: yup.string().required().label('End Year'),
    consent: yup
      .bool()
      .required()
      .oneOf([true], 'Please read and accept the details'),
  });

  type TransactionFields = yup.InferType<typeof transactionSchema>;
  const router = useRouter();

  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
  } = useForm<TransactionFields>({
    resolver: yupResolver(transactionSchema),
  });
  useEffect(() => {
    reset({ cartId: cart_id, canId: can_number });
  }, [reset, can_number, cart_id]);

  const handleFormSubmit = (data: TransactionFields) => {
    if (
      Number(watch('start_year')) === new Date().getFullYear() &&
      range(new Date().getMonth() + 1, 13)?.filter(
        (item) => item === watch('start_month')
      )?.length === 0
    ) {
      setError(
        'start_month',
        {
          type: 'focus',
          message: 'Start Date Can Not Be Less Than Current Month',
        },
        { shouldFocus: true }
      );

      return;
    }
    mutate(
      { formData: data, account_id: accountId },
      {
        onSuccess(data) {
          // setIsOpen(true);
          router.push(data?.mfu_app_link_pri as string);
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
      }
    );
  };
  return (
    <form
      className="bg-white mt-3 mx-auto rounded-lg lg:p-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="border lg:border-l lg:border-r border-l-0 border-r-0 border-light">
        <section className="text-lightGray font-normal text-lg lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
          Transaction Details
        </section>
        <div className="mx-auto p-5 lg:p-7">
          <div className="grid grid-cols-2 gap-6">
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">CAN</span>
              <Controller
                control={control}
                name="canId"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={cansList?.items?.map((item) => {
                        return {
                          value: item?.can_number,
                          label: item?.can_number,
                        };
                      })}
                      isDisabled
                      value={cansList?.items
                        ?.map((item) => {
                          return {
                            value: item?.can_number,
                            label: item?.can_number,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.canId
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
              <span className="FieldError">{errors.canId?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Folio Number</span>
              <input
                {...register('folio_num')}
                placeholder="Enter your Folio Number"
                className={classNames(
                  'Input',
                  errors.folio_num && 'border-brandError'
                )}
              />

              <span className="FieldError">{errors.folio_num?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Txn Vol</span>
              <input
                {...register('txn_vol')}
                placeholder="Enter your Txn Vol"
                className={classNames(
                  'Input',
                  errors.txn_vol && 'border-brandError',
                  'disabled:cursor-not-allowed'
                )}
                disabled={watch('txn_type') === 'E'}
              />

              <span className="FieldError">{errors.txn_vol?.message}</span>
            </label>
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">Txn Type</span>
              <Controller
                control={control}
                name="txn_type"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={txnStateTypeOptions}
                      value={txnStateTypeOptions.find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.txn_type
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
              <span className="FieldError">{errors.txn_type?.message}</span>
            </label>
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">Frequency</span>
              <Controller
                control={control}
                name="frequency"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={frequencyOptions}
                      value={frequencyOptions.find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.frequency
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
              <span className="FieldError">{errors.frequency?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Day</span>
              <Controller
                control={control}
                name="day"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={range(1, 32)?.map((item) => {
                        return {
                          value: item as any,
                          label: item as any,
                        };
                      })}
                      value={range(1, 32)
                        ?.map((item) => {
                          return {
                            value: item as any,
                            label: item as any,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.day
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
              <span className="FieldError">{errors.day?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Start Month</span>
              <Controller
                control={control}
                name="start_month"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={range(1, 13)?.map((item) => {
                        return {
                          value: item as any,
                          label: item as any,
                        };
                      })}
                      value={range(1, 13)
                        ?.map((item) => {
                          return {
                            value: item as any,
                            label: item as any,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.start_month
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
              <span className="FieldError">{errors.start_month?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Start Year</span>
              <Controller
                control={control}
                name="start_year"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <DatePicker
                      selected={value ? new Date(value) : null}
                      onChange={(val) =>
                        val
                          ? onChange(dayjs(val).format('YYYY'))
                          : onChange(null)
                      }
                      className={classNames(
                        'Input',
                        errors.start_year && 'border-brandError'
                      )}
                      showYearPicker
                      minDate={
                        new Date(
                          new Date().getFullYear() - 1,
                          new Date().getMonth(),
                          new Date().getDate()
                        )
                      }
                      dateFormat="yyyy"
                    />
                  );
                }}
              />
              <span className="FieldError">{errors.start_year?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">End Month</span>
              <Controller
                control={control}
                name="end_month"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={range(1, 13)?.map((item) => {
                        return {
                          value: item as any,
                          label: item as any,
                        };
                      })}
                      value={range(1, 13)
                        ?.map((item) => {
                          return {
                            value: item as any,
                            label: item as any,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.end_month
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
              <span className="FieldError">{errors.end_month?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">End Year</span>
              <Controller
                control={control}
                name="end_year"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <DatePicker
                      selected={value ? new Date(value) : null}
                      onChange={(val) =>
                        val
                          ? onChange(dayjs(val).format('YYYY'))
                          : onChange(null)
                      }
                      className={classNames(
                        'Input',
                        errors.end_year && 'border-brandError'
                      )}
                      showYearPicker
                      dateFormat="yyyy"
                      minDate={
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          new Date().getDate()
                        )
                      }
                    />
                  );
                }}
              />
              <span className="FieldError">{errors.end_year?.message}</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex lg:mt-8 gap-2 lg:p-0 p-5">
        <input
          {...register('consent')}
          type="checkbox"
          className={classNames(
            'w-4 lg:w-6 flex-shrink-0',
            errors.consent && 'border-brandError'
          )}
        />
        <p className="text-lightGray text-sm font-normal">
          I/We have read and understood the contents of the Offer
          Document(s)/Scheme Information Document(s)/Statement of Additional
          Information(s) and Addendum(s) thereto of the respective Scheme(s) and
          agrees to abide by the terms, conditions, rules and regulations of the
          Scheme(s) applicable from time to time.
          <br />
          <br />
          I/We authorise CorpCare to execute the above transaction(s)
          notwithstanding the advice of inappropriateness highlighted to me /
          us.
          <br />
          <br />
          I/We have understood the details of the Scheme and have not received
          nor been induced by any rebate or gifts, directly or indirectly, in
          making this investment.
          <br />
          <br />
          I/We hereby declare that I/We am /are authorised to make this
          investments and that the amount invested in the scheme is through
          legitimate sources only and does not involved and is not designed for
          the purpose of any contravention or evasion of any Act, Rules,
          Regulations, Notifications or Directions issued by any regulatory
          authorities in India.
          <br />
          <br />
          I/We confirm that the details provided by me/us is true, correct and
          complete.
        </p>
      </div>
      <span className="FieldError">{errors.consent?.message}</span>

      <section className="flex items-center justify-start max-w-md gap-4 lg:mt-6 lg:p-0 p-5">
        <button
          className="Button uppercase w-full"
          type="submit"
          disabled={isLoading}
        >
          Submit
          {isLoading && (
            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
          )}
        </button>
      </section>
    </form>
  );
};

const SIPTransactionForm = ({ cansList, accountId, cart_id, can_number }) => {
  const { mutate, isLoading } = useSIPTransaction();

  const transactionSchema = yup.object({
    cartId: yup.string().required().label('Cart ID'),
    txn_type: yup.string().required().label('Txn Type'),
    folio_num: yup.string().required().label('Folio Num'),
    txn_vol: yup.string().required().label('Txn Vol'),
    canId: yup.string().required().label('CAN ID'),
    frequency: yup.string().required().label('Frequency'),
    day: yup
      .number()
      .required()
      .label('Day')
      .typeError('Please Enter a Valid Day')
      .min(1, 'Please Enter a Valid Day')
      .max(31, 'Please Enter a Valid Day'),
    start_month: yup
      .number()
      .required()
      .label('Start Month')
      .typeError('Please Enter a Valid Month')
      .min(1, 'Please Enter a Valid Month')
      .max(12, 'Please Enter a Valid Month'),
    start_year: yup.string().required().label('Start Year'),
    end_month: yup
      .number()
      .required()
      .label('End Month')
      .typeError('Please Enter a Valid Month')
      .min(1, 'Please Enter a Valid Month')
      .max(12, 'Please Enter a Valid Month'),
    end_year: yup.string().required().label('End Year'),
    consent: yup
      .bool()
      .required()
      .oneOf([true], 'Please read and accept the details'),
  });

  type TransactionFields = yup.InferType<typeof transactionSchema>;
  const router = useRouter();

  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
  } = useForm<TransactionFields>({
    resolver: yupResolver(transactionSchema),
  });
  useEffect(() => {
    reset({ cartId: cart_id, canId: can_number });
  }, [reset, can_number, cart_id]);

  const handleFormSubmit = (data: TransactionFields) => {
    if (
      Number(watch('start_year')) === new Date().getFullYear() &&
      range(new Date().getMonth() + 1, 13)?.filter(
        (item) => item === watch('start_month')
      )?.length === 0
    ) {
      setError(
        'start_month',
        {
          type: 'focus',
          message: 'Start Date Can Not Be Less Than Current Month',
        },
        { shouldFocus: true }
      );

      return;
    }
    mutate(
      { formData: data, account_id: accountId },
      {
        onSuccess() {
          // setIsOpen(true);
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
      }
    );
  };

  return (
    <form
      className="bg-white mt-3 mx-auto rounded-lg lg:p-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="border lg:border-l lg:border-r border-l-0 border-r-0 border-light">
        <section className="text-lightGray font-normal text-lg lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
          Transaction Details
        </section>
        <div className="mx-auto p-5 lg:p-7">
          <div className="grid grid-cols-2 gap-6">
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">CAN</span>
              <Controller
                control={control}
                name="canId"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={cansList?.items?.map((item) => {
                        return {
                          value: item?.can_number,
                          label: item?.can_number,
                        };
                      })}
                      isDisabled
                      value={cansList?.items
                        ?.map((item) => {
                          return {
                            value: item?.can_number,
                            label: item?.can_number,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.canId
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
              <span className="FieldError">{errors.canId?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Folio Number</span>
              <input
                {...register('folio_num')}
                placeholder="Enter your Folio Number"
                className={classNames(
                  'Input',
                  errors.folio_num && 'border-brandError'
                )}
              />

              <span className="FieldError">{errors.folio_num?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Txn Vol</span>
              <input
                {...register('txn_vol')}
                placeholder="Enter your Txn Vol"
                className={classNames(
                  'Input',
                  errors.txn_vol && 'border-brandError',
                  'disabled:cursor-not-allowed'
                )}
                disabled={watch('txn_type') === 'E'}
              />

              <span className="FieldError">{errors.txn_vol?.message}</span>
            </label>
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">Txn Type</span>
              <Controller
                control={control}
                name="txn_type"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={txnTypeOptions}
                      value={txnTypeOptions.find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.txn_type
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
              <span className="FieldError">{errors.txn_type?.message}</span>
            </label>
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">Frequency</span>
              <Controller
                control={control}
                name="frequency"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={frequencyOptions}
                      value={frequencyOptions.find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.frequency
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
              <span className="FieldError">{errors.frequency?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Day</span>
              <Controller
                control={control}
                name="day"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={range(1, 32)?.map((item) => {
                        return {
                          value: item as any,
                          label: item as any,
                        };
                      })}
                      value={range(1, 32)
                        ?.map((item) => {
                          return {
                            value: item as any,
                            label: item as any,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.day
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
              <span className="FieldError">{errors.day?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Start Month</span>
              <Controller
                control={control}
                name="start_month"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={range(1, 13)?.map((item) => {
                        return {
                          value: item as any,
                          label: item as any,
                        };
                      })}
                      value={range(1, 13)
                        ?.map((item) => {
                          return {
                            value: item as any,
                            label: item as any,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.start_month
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
              <span className="FieldError">{errors.start_month?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Start Year</span>
              <Controller
                control={control}
                name="start_year"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <DatePicker
                      selected={value ? new Date(value) : null}
                      onChange={(val) =>
                        val
                          ? onChange(dayjs(val).format('YYYY'))
                          : onChange(null)
                      }
                      className={classNames(
                        'Input',
                        errors.start_year && 'border-brandError'
                      )}
                      showYearPicker
                      minDate={
                        new Date(
                          new Date().getFullYear() - 1,
                          new Date().getMonth(),
                          new Date().getDate()
                        )
                      }
                      dateFormat="yyyy"
                    />
                  );
                }}
              />
              <span className="FieldError">{errors.start_year?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">End Month</span>
              <Controller
                control={control}
                name="end_month"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={range(1, 13)?.map((item) => {
                        return {
                          value: item as any,
                          label: item as any,
                        };
                      })}
                      value={range(1, 13)
                        ?.map((item) => {
                          return {
                            value: item as any,
                            label: item as any,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.end_month
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
              <span className="FieldError">{errors.end_month?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">End Year</span>
              <Controller
                control={control}
                name="end_year"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <DatePicker
                      selected={value ? new Date(value) : null}
                      onChange={(val) =>
                        val
                          ? onChange(dayjs(val).format('YYYY'))
                          : onChange(null)
                      }
                      className={classNames(
                        'Input',
                        errors.end_year && 'border-brandError'
                      )}
                      showYearPicker
                      dateFormat="yyyy"
                      minDate={
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          new Date().getDate()
                        )
                      }
                    />
                  );
                }}
              />
              <span className="FieldError">{errors.end_year?.message}</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex lg:mt-8 gap-2 lg:p-0 p-5">
        <input
          {...register('consent')}
          type="checkbox"
          className={classNames(
            'w-4 lg:w-6 flex-shrink-0',
            errors.consent && 'border-brandError'
          )}
        />
        <p className="text-lightGray text-sm font-normal">
          I/We have read and understood the contents of the Offer
          Document(s)/Scheme Information Document(s)/Statement of Additional
          Information(s) and Addendum(s) thereto of the respective Scheme(s) and
          agrees to abide by the terms, conditions, rules and regulations of the
          Scheme(s) applicable from time to time.
          <br />
          <br />
          I/We authorise CorpCare to execute the above transaction(s)
          notwithstanding the advice of inappropriateness highlighted to me /
          us.
          <br />
          <br />
          I/We have understood the details of the Scheme and have not received
          nor been induced by any rebate or gifts, directly or indirectly, in
          making this investment.
          <br />
          <br />
          I/We hereby declare that I/We am /are authorised to make this
          investments and that the amount invested in the scheme is through
          legitimate sources only and does not involved and is not designed for
          the purpose of any contravention or evasion of any Act, Rules,
          Regulations, Notifications or Directions issued by any regulatory
          authorities in India.
          <br />
          <br />
          I/We confirm that the details provided by me/us is true, correct and
          complete.
        </p>
      </div>
      <span className="FieldError">{errors.consent?.message}</span>

      <section className="flex items-center justify-start max-w-md gap-4 lg:mt-6 lg:p-0 p-5">
        <button
          className="Button uppercase w-full"
          type="submit"
          disabled={isLoading}
        >
          Submit
          {isLoading && (
            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
          )}
        </button>
      </section>
    </form>
  );
};

const STPTransactionForm = ({ cansList, accountId, cart_id, can_number }) => {
  const { mutate, isLoading } = useSTPTransaction();

  const transactionSchema = yup.object({
    cartId: yup.string().required().label('Cart ID'),
    txn_type: yup.string().required().label('Txn Type'),
    folio_num: yup.string().required().label('Folio Num'),
    txn_vol: yup.string().required().label('Txn Vol'),
    canId: yup.string().required().label('CAN ID'),
    frequency: yup.string().required().label('Frequency'),
    day: yup
      .number()
      .required()
      .label('Day')
      .typeError('Please Enter a Valid Day')
      .min(1, 'Please Enter a Valid Day')
      .max(31, 'Please Enter a Valid Day'),
    start_month: yup
      .number()
      .required()
      .label('Start Month')
      .typeError('Please Enter a Valid Month')
      .min(1, 'Please Enter a Valid Month')
      .max(12, 'Please Enter a Valid Month'),
    start_year: yup.string().required().label('Start Year'),
    end_month: yup
      .number()
      .required()
      .label('End Month')
      .typeError('Please Enter a Valid Month')
      .min(1, 'Please Enter a Valid Month')
      .max(12, 'Please Enter a Valid Month'),
    end_year: yup.string().required().label('End Year'),
    consent: yup
      .bool()
      .required()
      .oneOf([true], 'Please read and accept the details'),
    tar_scheme_code: yup.string().required().label('Tar Scheme Code'),
    src_scheme_code: yup.string().required().label('Src Scheme Code'),
  });

  type TransactionFields = yup.InferType<typeof transactionSchema>;
  const router = useRouter();

  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
  } = useForm<TransactionFields>({
    resolver: yupResolver(transactionSchema),
  });
  useEffect(() => {
    reset({ cartId: cart_id, canId: can_number });
  }, [reset, can_number, cart_id]);

  const handleFormSubmit = (data: TransactionFields) => {
    if (
      Number(watch('start_year')) === new Date().getFullYear() &&
      range(new Date().getMonth() + 1, 13)?.filter(
        (item) => item === watch('start_month')
      )?.length === 0
    ) {
      setError(
        'start_month',
        {
          type: 'focus',
          message: 'Start Date Can Not Be Less Than Current Month',
        },
        { shouldFocus: true }
      );

      return;
    }
    mutate(
      { formData: data, account_id: accountId },
      {
        onSuccess(data) {
          // setIsOpen(true);
          router.push(data?.mfu_app_link_pri as string);
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
      }
    );
  };
  return (
    <form
      className="bg-white mt-3 mx-auto rounded-lg lg:p-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="border lg:border-l lg:border-r border-l-0 border-r-0 border-light">
        <section className="text-lightGray font-normal text-lg lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
          Transaction Details
        </section>
        <div className="mx-auto p-5 lg:p-7">
          <div className="grid grid-cols-2 gap-6">
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">CAN</span>
              <Controller
                control={control}
                name="canId"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={cansList?.items?.map((item) => {
                        return {
                          value: item?.can_number,
                          label: item?.can_number,
                        };
                      })}
                      isDisabled
                      value={cansList?.items
                        ?.map((item) => {
                          return {
                            value: item?.can_number,
                            label: item?.can_number,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.canId
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
              <span className="FieldError">{errors.canId?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Folio Number</span>
              <input
                {...register('folio_num')}
                placeholder="Enter your Folio Number"
                className={classNames(
                  'Input',
                  errors.folio_num && 'border-brandError'
                )}
              />

              <span className="FieldError">{errors.folio_num?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Txn Vol</span>
              <input
                {...register('txn_vol')}
                placeholder="Enter your Txn Vol"
                className={classNames(
                  'Input',
                  errors.txn_vol && 'border-brandError',
                  'disabled:cursor-not-allowed'
                )}
                disabled={watch('txn_type') === 'E'}
              />

              <span className="FieldError">{errors.txn_vol?.message}</span>
            </label>
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">Txn Type</span>
              <Controller
                control={control}
                name="txn_type"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={txnStateTypeOptions}
                      value={txnStateTypeOptions.find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.txn_type
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
              <span className="FieldError">{errors.txn_type?.message}</span>
            </label>
            <label className="col-span-2 lg:col-span-1">
              <span className="Label">Frequency</span>
              <Controller
                control={control}
                name="frequency"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={frequencyOptions}
                      value={frequencyOptions.find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.frequency
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
              <span className="FieldError">{errors.frequency?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Day</span>
              <Controller
                control={control}
                name="day"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={range(1, 32)?.map((item) => {
                        return {
                          value: item as any,
                          label: item as any,
                        };
                      })}
                      value={range(1, 32)
                        ?.map((item) => {
                          return {
                            value: item as any,
                            label: item as any,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.day
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
              <span className="FieldError">{errors.day?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Start Month</span>
              <Controller
                control={control}
                name="start_month"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={range(1, 13)?.map((item) => {
                        return {
                          value: item as any,
                          label: item as any,
                        };
                      })}
                      value={range(1, 13)
                        ?.map((item) => {
                          return {
                            value: item as any,
                            label: item as any,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.start_month
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
              <span className="FieldError">{errors.start_month?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Start Year</span>
              <Controller
                control={control}
                name="start_year"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <DatePicker
                      selected={value ? new Date(value) : null}
                      onChange={(val) =>
                        val
                          ? onChange(dayjs(val).format('YYYY'))
                          : onChange(null)
                      }
                      className={classNames(
                        'Input',
                        errors.start_year && 'border-brandError'
                      )}
                      showYearPicker
                      minDate={
                        new Date(
                          new Date().getFullYear() - 1,
                          new Date().getMonth(),
                          new Date().getDate()
                        )
                      }
                      dateFormat="yyyy"
                    />
                  );
                }}
              />
              <span className="FieldError">{errors.start_year?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">End Month</span>
              <Controller
                control={control}
                name="end_month"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">Select</div>
                      }
                      options={range(1, 13)?.map((item) => {
                        return {
                          value: item as any,
                          label: item as any,
                        };
                      })}
                      value={range(1, 13)
                        ?.map((item) => {
                          return {
                            value: item as any,
                            label: item as any,
                          };
                        })
                        .find((c) => c.value === value)}
                      onChange={(e: IOptions) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
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
                            : errors.end_month
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
              <span className="FieldError">{errors.end_month?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">End Year</span>
              <Controller
                control={control}
                name="end_year"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <DatePicker
                      selected={value ? new Date(value) : null}
                      onChange={(val) =>
                        val
                          ? onChange(dayjs(val).format('YYYY'))
                          : onChange(null)
                      }
                      className={classNames(
                        'Input',
                        errors.end_year && 'border-brandError'
                      )}
                      showYearPicker
                      dateFormat="yyyy"
                      minDate={
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          new Date().getDate()
                        )
                      }
                    />
                  );
                }}
              />
              <span className="FieldError">{errors.end_year?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Tar Scheme Code</span>
              <input
                {...register('tar_scheme_code')}
                placeholder="Enter your Tar Scheme Code"
                className={classNames(
                  'Input',
                  errors.tar_scheme_code && 'border-brandError'
                )}
              />

              <span className="FieldError">
                {errors.tar_scheme_code?.message}
              </span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Src Scheme Code</span>
              <input
                {...register('src_scheme_code')}
                placeholder="Enter your Src Scheme Code"
                className={classNames(
                  'Input',
                  errors.src_scheme_code && 'border-brandError'
                )}
              />

              <span className="FieldError">
                {errors.src_scheme_code?.message}
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex lg:mt-8 gap-2 lg:p-0 p-5">
        <input
          {...register('consent')}
          type="checkbox"
          className={classNames(
            'w-4 lg:w-6 flex-shrink-0',
            errors.consent && 'border-brandError'
          )}
        />
        <p className="text-lightGray text-sm font-normal">
          I/We have read and understood the contents of the Offer
          Document(s)/Scheme Information Document(s)/Statement of Additional
          Information(s) and Addendum(s) thereto of the respective Scheme(s) and
          agrees to abide by the terms, conditions, rules and regulations of the
          Scheme(s) applicable from time to time.
          <br />
          <br />
          I/We authorise CorpCare to execute the above transaction(s)
          notwithstanding the advice of inappropriateness highlighted to me /
          us.
          <br />
          <br />
          I/We have understood the details of the Scheme and have not received
          nor been induced by any rebate or gifts, directly or indirectly, in
          making this investment.
          <br />
          <br />
          I/We hereby declare that I/We am /are authorised to make this
          investments and that the amount invested in the scheme is through
          legitimate sources only and does not involved and is not designed for
          the purpose of any contravention or evasion of any Act, Rules,
          Regulations, Notifications or Directions issued by any regulatory
          authorities in India.
          <br />
          <br />
          I/We confirm that the details provided by me/us is true, correct and
          complete.
        </p>
      </div>
      <span className="FieldError">{errors.consent?.message}</span>

      <section className="flex items-center justify-start max-w-md gap-4 lg:mt-6 lg:p-0 p-5">
        <button
          className="Button uppercase w-full"
          type="submit"
          disabled={isLoading}
        >
          Submit
          {isLoading && (
            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
          )}
        </button>
      </section>
    </form>
  );
};

export const TransactionDetails = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: profile } = useGetProfile();

  const { data: cansList } = useGetAccountCANsList();

  const accountId = profile?.accounts?.[0]?.id || '';
  const router = useRouter();
  const { cart_id, transaction_type, can_number } = router.query as {
    cart_id: string;
    transaction_type: CART_TYPE;
    can_number: string;
  };
  useEffect(() => {
    if (!cart_id || !transaction_type || !can_number) {
      router.push('/mutual-funds/cart');
      return;
    }
  }, [can_number, cart_id, transaction_type, router]);
  return (
    <>
      <section className="text-lightGray text-xl font-medium mt-8 lg:block hidden">
        Transaction Details
      </section>
      {transaction_type === 'PURCHASE' && (
        <PurchaseTransactionForm
          cansList={cansList}
          accountId={accountId}
          cart_id={cart_id}
          transaction_type={transaction_type}
          can_number={can_number}
        />
      )}
      {transaction_type === 'REDEMPTION' && (
        <RedemptionTransactionForm
          cansList={cansList}
          accountId={accountId}
          cart_id={cart_id}
          can_number={can_number}
        />
      )}
      {transaction_type === 'SWITCH' && (
        <SwitchTransactionForm
          cansList={cansList}
          accountId={accountId}
          cart_id={cart_id}
          can_number={can_number}
        />
      )}
      {transaction_type === 'SWP' && (
        <SWPTransactionForm
          cansList={cansList}
          accountId={accountId}
          cart_id={cart_id}
          can_number={can_number}
        />
      )}
      {transaction_type === 'SIP' && (
        <SIPTransactionForm
          cansList={cansList}
          accountId={accountId}
          cart_id={cart_id}
          can_number={can_number}
        />
      )}
      {transaction_type === 'STP' && (
        <STPTransactionForm
          cansList={cansList}
          accountId={accountId}
          cart_id={cart_id}
          can_number={can_number}
        />
      )}
    </>
  );
};
