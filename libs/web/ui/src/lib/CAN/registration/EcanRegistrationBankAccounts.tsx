import { DustbinIcon, SpinnerIcon } from '@corpcare/web/ui';
import classNames from 'classnames';
const special = ['Default', 'Second', 'Third', 'Fourth', 'Fifth'];
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import {
  bankAccountProofDocumentTypeOptions,
  bankAccountTypeOptions,
  IOptions,
  useGetCANBanksChoices,
} from '@corpcare/shared/api';
import { useEffect } from 'react';

const ecanRegistrationBankDetailsFormSchema = yup.object().shape({
  bank_form: yup
    .array()
    .of(
      yup.object().shape({
        account_number: yup.string().required().label('Account Number'),
        re_account_number: yup
          .string()
          .label('Re-Account Number')
          .required()
          .oneOf([yup.ref('account_number')], 'Account Number must match'),
        account_type: yup.string().label('Account Type').required(),
        bank: yup.string().required().label('Bank Name').required(),
        ifsc_code: yup
          .string()
          .label('Ifsc Code')
          .required()
          .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Not a Valid IFSC'),
        micr_code: yup
          .string()
          .label('Micr Code')
          .required()
          .matches(/^[0-9]{9}$/, 'Not a Valid MICR'),
        is_primary: yup.bool().label('Primary'),
        is_secondary: yup.bool().label('Secondary'),
        proof_doc_type: yup.string().label('Proof Doc type').required(),
      })
    )
    .min(1, 'Please Enter atleast one Bank Account Details'),
});
export type EcanRegistrationBankDetailsFormDetails = yup.InferType<
  typeof ecanRegistrationBankDetailsFormSchema
>;

export const EcanRegistrationBankAccounts = ({
  onSubmit,
  goBack,
  data,
  isLoading,
}: {
  onSubmit: (data: any, isDirty: boolean) => Promise<void>;
  goBack: () => void;
  data: any;
  isLoading: boolean;
}) => {
  const { data: bankChoicesOptions } = useGetCANBanksChoices();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(ecanRegistrationBankDetailsFormSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'bank_form',
  });

  useEffect(() => {
    if (data?.data?.data?.bank_accounts) {
      const dataReference = data?.data?.data?.bank_accounts?.map((item) => {
        return {
          ...item,
          re_account_number: item?.account_number,
        };
      });
      reset({ bank_form: dataReference });
    }
  }, [reset, data]);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, isDirty))}>
      <section className="text-lightGray text-xl font-medium mt-8">
        Bank Accounts
      </section>
      {fields.map((field, index) => {
        return (
          <div
            className="mt-3 mx-auto rounded-lg lg:p-8 lg:bg-white"
            key={index}
          >
            <div className="border border-light  bg-white rounded-lg">
              <section className="text-lightGray font-normal text-sm lg:text-base border-b border-light rounded-t rounded-b-none px-5 lg:px-7 py-3 bg-lighter flex justify-between items-center">
                {index === 0 ? 'Default' : special[index]} Bank Account Details
                {index !== 0 && (
                  <DustbinIcon
                    className="w-5 h-5 lg:w-6 lg:h-6 text-brand hover:cursor-pointer"
                    onClick={() => {
                      remove(index);
                    }}
                  />
                )}
              </section>
              <div className="mx-auto p-5 lg:p-7">
                <div className="grid grid-cols-2 gap-5 lg:gap-6 relative">
                  <input
                    {...register(`bank_form.${index}.is_primary`, {
                      value: index === 0 ? true : false,
                    })}
                    key={field.id}
                    type="checkbox"
                    className={classNames('Input sr-only')}
                  />
                  <input
                    {...register(`bank_form.${index}.is_secondary`, {
                      value: index === 1 ? true : false,
                    })}
                    key={field.id}
                    type="checkbox"
                    className={classNames('Input sr-only')}
                  />
                  <label className="lg:col-span-1 col-span-2">
                    <span className="Label">Bank Account Number</span>
                    <input
                      {...register(`bank_form.${index}.account_number`)}
                      key={field.id}
                      type="text"
                      placeholder="Enter your Bank Account Number"
                      className={classNames(
                        'Input',
                        errors['bank_form']?.[index]?.account_number &&
                          'border-brandError'
                      )}
                    />
                    <span className="FieldError">
                      {errors['bank_form']?.[index]?.account_number?.message}
                    </span>
                  </label>
                  <label className="lg:col-span-1 col-span-2">
                    <span className="Label">Re- Enter Bank A/c No.</span>
                    <input
                      {...register(`bank_form.${index}.re_account_number`)}
                      key={field.id}
                      type="text"
                      placeholder="Re- Enter your Bank Account Number"
                      className={classNames(
                        'Input',
                        errors['bank_form']?.[index]?.re_account_number &&
                          'border-brandError'
                      )}
                    />
                    <span className="FieldError">
                      {errors['bank_form']?.[index]?.re_account_number?.message}
                    </span>
                  </label>
                  <label className="lg:col-span-1 col-span-2">
                    <span className="Label">Bank Account Type</span>
                    <Controller
                      control={control}
                      name={`bank_form.${index}.account_type`}
                      key={field.id}
                      render={({ field: { value, onChange, name, ref } }) => {
                        return (
                          <ReactSelect
                            placeholder={
                              <div className="text-sm text-lighterGray">
                                Select
                              </div>
                            }
                            key={field.id}
                            options={bankAccountTypeOptions}
                            value={bankAccountTypeOptions.find(
                              (c) => c.value === value
                            )}
                            onChange={(e: IOptions) => {
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
                                  : errors['bank_form']?.[index]?.account_type
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
                      {errors['bank_form']?.[index]?.account_type?.message}
                    </span>
                  </label>
                  <label className="lg:col-span-1 col-span-2">
                    <span className="Label">Bank Name</span>
                    <Controller
                      control={control}
                      name={`bank_form.${index}.bank`}
                      key={field.id}
                      render={({ field: { value, onChange, name, ref } }) => {
                        return (
                          <ReactSelect
                            placeholder={
                              <div className="text-sm text-lighterGray">
                                Select
                              </div>
                            }
                            key={field.id}
                            options={bankChoicesOptions?.map((item) => {
                              return {
                                value: item?.id,
                                label: item?.name,
                              };
                            })}
                            value={bankChoicesOptions
                              ?.map((item) => {
                                return {
                                  value: item?.id,
                                  label: item?.name,
                                };
                              })
                              .find((c) => c.value === value)}
                            onChange={(e: IOptions) => {
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
                                  : errors['bank_form']?.[index]?.bank
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
                      {errors['bank_form']?.[index]?.bank?.message}
                    </span>
                  </label>
                  <label className="lg:col-span-1 col-span-2">
                    <span className="Label uppercase">MICR</span>
                    <input
                      {...register(`bank_form.${index}.micr_code`)}
                      key={field.id}
                      type="text"
                      placeholder="Enter Your MICR"
                      className={classNames(
                        'Input',
                        errors['bank_form']?.[index]?.micr_code &&
                          'border-brandError'
                      )}
                    />
                    <span className="FieldError">
                      {errors['bank_form']?.[index]?.micr_code?.message}
                    </span>
                  </label>
                  <label className="lg:col-span-1 col-span-2">
                    <span className="Label">IFSC</span>
                    <input
                      {...register(`bank_form.${index}.ifsc_code`)}
                      key={field.id}
                      type="text"
                      placeholder="Enter your IFSC"
                      className={classNames(
                        'Input',
                        errors['bank_form']?.[index]?.ifsc_code &&
                          'border-brandError'
                      )}
                    />
                    <span className="FieldError">
                      {errors['bank_form']?.[index]?.ifsc_code?.message}
                    </span>
                  </label>
                  <label className="col-span-2">
                    <span className="Label">Bank Proof Document</span>
                    <Controller
                      control={control}
                      name={`bank_form.${index}.proof_doc_type`}
                      key={field.id}
                      render={({ field: { value, onChange, name, ref } }) => {
                        return (
                          <ReactSelect
                            placeholder={
                              <div className="text-sm text-lighterGray">
                                Select
                              </div>
                            }
                            key={field.id}
                            options={bankAccountProofDocumentTypeOptions}
                            value={bankAccountProofDocumentTypeOptions.find(
                              (c) => c.value === value
                            )}
                            onChange={(e: IOptions) => {
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
                                  : errors['bank_form']?.[index]?.proof_doc_type
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
                      {errors['bank_form']?.[index]?.proof_doc_type?.message}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <span
        className={classNames(
          'OutlineButton col-span-2 uppercase max-w-[160px] lg:max-w-[228px] w-full mt-6 inline-flex justify-center',
          fields.length >= 4 ? 'hidden' : ''
        )}
        onClick={() => append({})}
      >
        Add bank
      </span>
      {!!errors['bank_form']?.message && (
        <span className="FieldError">{errors['bank_form'].message}</span>
      )}
      <section className="flex items-center gap-5 lg:gap-6 mt-5 lg:mt-6">
        <button
          className="OutlineButton col-span-1 uppercase max-w-[160px] lg:max-w-[228px] w-full "
          onClick={goBack}
          type="button"
        >
          Prev
        </button>
        <button
          className="Button col-span-1 uppercase max-w-[160px] lg:max-w-[228px] w-full"
          type="submit"
          disabled={isLoading}
        >
          Next
          {isLoading && (
            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
          )}
        </button>
      </section>
    </form>
  );
};
