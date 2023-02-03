import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactSelect from 'react-select';
import {
  holdingTypeOptions,
  IHoldingType,
  IInvestorCategory,
  investorCategoryOptions,
  IOptions,
  ITaxStatus,
  proofUploadByCANOptions,
  taxStatusOptions,
} from '../../../../../../shared/api/src/index';
import { useEffect } from 'react';
import { SpinnerIcon } from '../../../icons';

const ecanRegistrationCANCriteriaFormSchema = yup.object({
  holding_type: yup.string().label('Holding Nature').required(),
  investor_category: yup.string().label('Investor Category').required(),
  tax_status: yup.string().label('Tax Status').required(),
  proof_upload_by_can: yup
    .string()
    .label('Proof Upload By CAN')
    .required()
    .oneOf(['Y', 'N'])
    .nullable(),
});

type EcanRegistrationCANCriteriaFormFields = yup.InferType<
  typeof ecanRegistrationCANCriteriaFormSchema
>;

export const EcanRegistrationCANCriteria = ({
  onSubmit,
  data,
  isLoading,
}: {
  onSubmit: (data: any, isDirty: boolean) => Promise<void>;
  data: any;
  isLoading: boolean;
}) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<EcanRegistrationCANCriteriaFormFields>({
    resolver: yupResolver(ecanRegistrationCANCriteriaFormSchema),
  });

  useEffect(() => {
    if (data?.data?.data?.can_criteria) reset(data.data.data.can_criteria);
  }, [reset, data]);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, isDirty))}>
      <section className="text-lightGray text-lg lg:text-xl font-medium mt-8">
        CAN Criteria
      </section>
      <div className="lg:bg-white mt-3 mx-auto rounded-lg lg:p-8 ">
        <section className="bg-white lg:p-0 p-5">
          <span className="Label">Choice of eCAN Registration</span>
          <p className="border border-brandLight rounded px-4 py-3 font-normal text-sm tracking-[0.02em] text-lighterGray">
            Completely Electronic
          </p>
        </section>
        <div className="border border-light bg-white mt-8 rounded-lg">
          <section className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-5 lg:px-7 py-3 bg-lighter">
            Account Type
          </section>
          <div className="mx-auto p-5 lg:p-7">
            <div className="grid grid-cols-2 gap-5 lg:gap-6">
              <label>
                <span className="Label">Holding Nature</span>
                <Controller
                  control={control}
                  name="holding_type"
                  render={({ field: { value, onChange, name, ref } }) => {
                    return (
                      <ReactSelect
                        placeholder={
                          <div className="text-sm text-lighterGray">Select</div>
                        }
                        options={holdingTypeOptions}
                        value={holdingTypeOptions.find(
                          (c) => c.value === value
                        )}
                        onChange={(e: IHoldingType) => {
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
                              : errors.holding_type
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
                <span className="FieldError">
                  {errors.holding_type?.message}
                </span>
              </label>
              <label>
                <span className="Label">Investor Category</span>
                <Controller
                  control={control}
                  name="investor_category"
                  render={({ field: { value, onChange, name, ref } }) => {
                    return (
                      <ReactSelect
                        placeholder={
                          <div className="text-sm text-lighterGray">Select</div>
                        }
                        options={investorCategoryOptions}
                        value={investorCategoryOptions.find(
                          (c) => c.value === value
                        )}
                        onChange={(e: IInvestorCategory) => {
                          onChange(e.value);
                          setValue('tax_status', '');
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
                              : errors.investor_category
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
                <span className="FieldError">
                  {errors.investor_category?.message}
                </span>
              </label>
              <label>
                <span className="Label">Tax Status</span>
                <Controller
                  control={control}
                  name="tax_status"
                  render={({ field: { value, onChange, name, ref } }) => {
                    return (
                      <ReactSelect
                        placeholder={
                          <div className="text-sm text-lighterGray">Select</div>
                        }
                        noOptionsMessage={({ inputValue }) =>
                          !inputValue && !watch('investor_category')
                            ? 'Please Select Invest Category to proceed further'
                            : 'No results found'
                        }
                        options={taxStatusOptions(watch('investor_category'))}
                        value={
                          taxStatusOptions(watch('investor_category'))?.find(
                            (c) => c.value === value
                          ) === undefined
                            ? null
                            : taxStatusOptions(
                                watch('investor_category')
                              )?.find((c) => c.value === value)
                        }
                        onChange={(e: ITaxStatus) => {
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
                              : errors.tax_status
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
                          menuList: (base, state) => ({
                            ...base,
                            maxHeight: '100px',
                            '@media only screen and (min-width: 1024px)': {
                              maxHeight: '150px',
                            },
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
                <span className="FieldError">{errors.tax_status?.message}</span>
              </label>
              <label>
                <span className="Label">Proof Upload By CAN</span>
                <Controller
                  control={control}
                  name="proof_upload_by_can"
                  render={({ field: { value, onChange, name, ref } }) => {
                    return (
                      <ReactSelect
                        placeholder={
                          <div className="text-sm text-lighterGray">Select</div>
                        }
                        options={proofUploadByCANOptions}
                        value={proofUploadByCANOptions.find(
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
                              : errors.proof_upload_by_can
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
                <span className="FieldError">
                  {errors.proof_upload_by_can?.message}
                </span>
              </label>
            </div>
          </div>
        </div>
        <button
          className="Button col-span-2 uppercase max-w-[228px] w-full mt-6"
          type="submit"
          disabled={isLoading}
        >
          Next
          {isLoading && (
            <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
          )}
        </button>
      </div>
    </form>
  );
};
