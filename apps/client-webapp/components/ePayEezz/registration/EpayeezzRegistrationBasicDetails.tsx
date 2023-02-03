import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import ReactSelect from 'react-select';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import * as yup from 'yup';
import {
  IOptions,
  registrationModeOptions,
  setFormFieldErrors,
  useGetAccountCANsList,
  useGetListRegisteredBankAccounts,
  useGetProfile,
  usePostEpayeezzRegistration,
} from '@corpcare/shared/api';
import EpayeezzRegistrationRequestSuccess from './EpayeezzRegistrationRequestSuccess';
import { useState } from 'react';
import { CustomToast, SpinnerIcon } from '@corpcare/web/ui';
import toast from 'react-hot-toast';

export const epayeezzFormSchema = yup.object({
  can_number: yup.string().label('CAN').required(),
  start_date: yup.string().label('Start Date').nullable().required(),
  max_amount: yup.string().label('Max Amount').required(),
  bank_id: yup.string().required().label('Bank ID').required(),
  bank_account_number: yup
    .string()
    .required()
    .label('Bank Account Number')
    .required(),
  reg_mode: yup.string().required().label('Registration Mode').required(),
});
export type EpayeezzFormFields = yup.InferType<typeof epayeezzFormSchema>;

export const EpayeezzRegistrationBasicDetails = () => {
  const [mmrn_number, setmmrn_number] = useState<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    setError,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EpayeezzFormFields>({
    resolver: yupResolver(epayeezzFormSchema),
  });
  const { data: cansList } = useGetAccountCANsList();
  const { mutate, isLoading } = usePostEpayeezzRegistration();
  const { data: bankChoices } = useGetListRegisteredBankAccounts(
    watch('can_number')
  );
  const { data: profile } = useGetProfile();

  const accountId = profile?.accounts?.[0]?.id || '';
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFormSubmit = (formData: EpayeezzFormFields) => {
    mutate(
      { formData, accountId },
      {
        onSuccess(response) {
          setmmrn_number(response?.mmrn_number);
          setIsOpen(true);
          toast.custom((t) => (
            <CustomToast
              t={t}
              message="SuccessFully submitted ePayEeez Details"
              type="success"
            />
          ));
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
    <>
      <section className="text-lightGray text-base lg:text-xl font-medium mt-4 lg:mt-8">
        ePayEeez Registration
      </section>
      <form
        className={classNames(
          'lg:bg-white mt-3 mx-auto rounded-lg lg:p-8',
          isLoading && 'animate-pulse'
        )}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="border-[1px] border-light">
          <section className="text-lightGray font-normal text-lg lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 lg:bg-lighter hidden lg:block">
            ePayEeez Registration Details
          </section>
          <div className="bg-white mt-3 mx-auto rounded-lg p-5 lg:p-7">
            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">CAN</span>
                <Controller
                  control={control}
                  name="can_number"
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
                          setValue('bank_id', '', {
                            shouldValidate: true,
                          });
                          setValue('bank_account_number', '', {
                            shouldValidate: true,
                          });
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
                              : errors.can_number
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
                <span className="FieldError">{errors.can_number?.message}</span>
              </label>
              <label className="lg:col-span-1 col-span-2">
                <span className="Label">Start Date</span>
                <Controller
                  control={control}
                  name="start_date"
                  render={({ field: { value, onChange, name, ref } }) => {
                    return (
                      <DatePicker
                        selected={value ? new Date(value) : null}
                        onChange={(val) =>
                          val
                            ? onChange(dayjs(val).format('YYYY-MM-DD'))
                            : onChange(null)
                        }
                        className={classNames(
                          'Input',
                          errors.start_date && 'border-brandError'
                        )}
                        minDate={
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate() + 2
                          )
                        }
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="Start Date"
                      />
                    );
                  }}
                />
                <span className="FieldError">{errors.start_date?.message}</span>
              </label>
              <label className="lg:col-span-1 col-span-2">
                <span className="Label">Max Amount</span>
                <input
                  {...register('max_amount')}
                  placeholder="Enter Amount"
                  className={classNames(
                    'Input',
                    errors.max_amount && 'border-brandError'
                  )}
                />
                <span className="FieldError">{errors.max_amount?.message}</span>
              </label>

              <label className="lg:col-span-1 col-span-2">
                <span className="Label">Bank Name</span>
                <Controller
                  control={control}
                  name="bank_id"
                  render={({ field: { value, onChange, name, ref } }) => {
                    return (
                      <ReactSelect
                        placeholder={
                          <div className="text-sm text-lighterGray">Select</div>
                        }
                        noOptionsMessage={({ inputValue }) =>
                          !inputValue && !watch('can_number')
                            ? 'Please Select CAN Number to proceed further'
                            : 'No results found'
                        }
                        options={bankChoices?.items?.map((item) => {
                          return {
                            value: item?.bank_id,
                            label: item?.bank_name,
                            id: item?.id,
                          } as any;
                        })}
                        value={
                          watch('bank_id') === '' || !watch('bank_id')
                            ? value
                            : bankChoices?.items
                                ?.map((item) => {
                                  return {
                                    value: item?.bank_id,
                                    label: item?.bank_name,
                                    id: item?.id,
                                  } as any;
                                })
                                .find((c) => c.value === value)
                        }
                        onChange={(e: any) => {
                          onChange(e.value);
                          const bank_account_number =
                            bankChoices?.items?.filter(
                              (item) => item?.id === e?.id
                            );
                          bank_account_number &&
                            setValue(
                              'bank_account_number',
                              bank_account_number[0]?.account_number as string,
                              {
                                shouldValidate: true,
                              }
                            );
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
                              : errors.bank_id
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
                <span className="FieldError">{errors.bank_id?.message}</span>
              </label>
              <label className="lg:col-span-1 col-span-2">
                <span className="Label">Bank Account Number</span>
                <input
                  {...register('bank_account_number')}
                  placeholder="Enter Bank Account Number"
                  disabled
                  className={classNames(
                    'Input disabled:cursor-not-allowed',
                    errors.bank_account_number && 'border-brandError'
                  )}
                />
                <span className="FieldError">
                  {errors.bank_account_number?.message}
                </span>
              </label>
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">Registration Mode</span>
                <Controller
                  control={control}
                  name="reg_mode"
                  render={({ field: { value, onChange, name, ref } }) => {
                    return (
                      <ReactSelect
                        placeholder={
                          <div className="text-sm text-lighterGray">Select</div>
                        }
                        options={registrationModeOptions}
                        value={registrationModeOptions?.find(
                          (c) => c.value === value
                        )}
                        onChange={(e?: IOptions) => {
                          onChange(e?.value);
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
                              : errors?.reg_mode
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
                <span className="FieldError">{errors.reg_mode?.message}</span>
              </label>
            </div>
          </div>
        </div>
        <button
          className="Button col-span-2 uppercase max-w-[228px] w-full mt-6"
          type="submit"
          disabled={isLoading}
        >
          Submit
          {isLoading && (
            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
          )}
        </button>
      </form>
      <EpayeezzRegistrationRequestSuccess
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        mmrn_number={mmrn_number}
      />
    </>
  );
};
