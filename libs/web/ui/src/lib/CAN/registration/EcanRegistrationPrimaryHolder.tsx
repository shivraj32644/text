import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactSelect from 'react-select';
import { DustbinIcon, SpinnerIcon } from '@corpcare/web/ui';
import classNames from 'classnames';
import { Fragment, useEffect } from 'react';
import {
  grossIncomeOptions,
  holderTypeOptions,
  IOptions,
  kraAddressTypeOptions,
  occupationOptions,
  pepOptions,
  relationshipOptions,
  relationshipProofOptions,
  taxResidencyFlagOptions,
  useGetCANCountryList,
  wealthSourceOptions,
  mobileField,
} from '@corpcare/shared/api';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { NestedArray } from '../../utils/nestedFieldArray';

function is18orOlder(dateString: string) {
  const dob = new Date(dateString);
  const dobPlus18 = new Date(
    dob.getFullYear() + 18,
    dob.getMonth(),
    dob.getDate()
  );
  return dobPlus18.valueOf() <= Date.now();
}
const ecanRegistrationHolderFormSchema = yup.object().shape({
  holder_form: yup
    .array()
    .of(
      yup.object().shape({
        type: yup.string().label('Holder Type').required(),
        name: yup.string().label('Name').required(),
        pan: yup
          .string()
          .required()
          .nullable()
          .label('Pan')
          .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Not a Valid PAN'),
        re_pan: yup
          .string()
          .required()
          .nullable()
          .label('Re-Pan')
          .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Not a Valid PAN')
          .oneOf([yup.ref('pan')], 'Pan must match'),
        mobile: mobileField.label('Phone').required(),
        email: yup.string().email().label('Email').required(),
        dob: yup.string().label('Date of birth').required().nullable(),
        relationship: yup.string().when('dob', {
          is: (val) => !is18orOlder(val),
          then: yup.string().label('Relation Type').required(),
        }),
        relation_proof: yup.string().when('dob', {
          is: (val) => !is18orOlder(val),
          then: yup.string().label('Relation Proof Type').required(),
        }),
        radio: yup
          .string()
          .label('Field')
          .required('This Field is Required')
          .oneOf(['Gross', 'Networth'])
          .nullable(),
        gross_income: yup
          .string()
          .label('Gross Income')
          .when('radio', {
            is: (val) => val === 'Gross',
            then: yup.string().label('Gross Income').required(),
          }),
        net_worth: yup
          .string()
          .label('Net Worth')
          .when('radio', {
            is: (val) => val === 'Networth',
            then: yup.string().label('Networth').required(),
          }),
        wealth_source: yup.string().label('Wealth Source').required(),
        wealth_source_other: yup
          .string()
          .label('Wealth Source Other')
          .when('wealth_source', {
            is: (val) => val === '08',
            then: yup.string().label('Wealth Source Other').required(),
          }),
        kra_address_type: yup.string().label('KRA Address Type').required(),
        occupation: yup.string().label('Occupation').required(),
        occupation_other: yup
          .string()
          .label('Occupation Other')
          .when('occupation', {
            is: (val) => val === '99',
            then: yup.string().label('Occupation Other').required(),
          }),
        pep: yup.string().label('Pep').required(),
        birth_place: yup
          .string()
          .label('City of Birth')
          .required()
          .test('len', 'Birth City must be less than 60 characters.', (val) => {
            if (val == undefined) {
              return true;
            }
            return val.length <= 60;
          })
          .matches(/^[aA-zZ\s]+$/, 'Please Enter Valid City'),
        birth_country: yup.string().label('Birth Country').required(),
        citizenship: yup.string().label('Citizenship').required(),
        nationality: yup.string().label('Nationality').required(),
        tax_residency_flag: yup.string().label('Tax Residency Flag').required(),
        tax_records: yup.array().when('tax_residency_flag', {
          is: (val) => val === 'Y',
          then: yup
            .array()
            .of(
              yup.object().shape({
                tax_country: yup.string().label('Tax Country').required(),
                tax_country_oth: yup.string().label('Tax Country').required(),
                tax_ref_no: yup.string().label('Tax Ref. Number').required(),
                identi_type: yup.string().label('Identity Type').required(),
                identi_type_oth: yup
                  .string()
                  .label('Identity Type Other')
                  .required(),
              })
            )
            .min(1, 'Please Enter atleast one Tax Record Details'),
        }),
      })
    )
    .min(1, 'Please Enter atleast one Holder Details'),
});

export const EcanRegistrationPrimaryHolder = ({
  onSubmit,
  goBack,
  data,
  isLoading,
}: {
  onSubmit: (data: any, isDirty: boolean) => Promise<void>;
  goBack: () => void;
  data;
  isLoading: boolean;
}) => {
  const { data: countryList } = useGetCANCountryList();

  const {
    register,
    handleSubmit,
    control,
    unregister,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(ecanRegistrationHolderFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'holder_form',
  });

  useEffect(() => {
    if (data?.data?.data?.holders) {
      const dataReference = data?.data?.data?.holders?.map((item) => {
        return {
          ...item,
          radio: item?.gross_income !== '' ? 'Gross' : 'Networth',
          re_pan: item?.pan,
        };
      });

      reset({ holder_form: dataReference });
    }
  }, [reset, data]);
  useEffect(() => {
    if (
      data?.data?.data?.holders === undefined &&
      data?.data?.data?.can_criteria?.holding_type === 'SI'
    ) {
      append({});
    }
  }, [append, data]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data, isDirty);
      })}
      // className={classNames(isLoading ? 'animate-pulse' : '')}
    >
      {fields.map((field, index) => {
        return (
          <Fragment key={index}>
            <section
              className="text-lightGray text-lg lg:text-xl font-medium mt-8"
              key={index}
            >
              {index === 0
                ? 'Primary'
                : index === 1
                ? 'Secondary'
                : index === 2
                ? 'Third'
                : 'Fourth'}
              &nbsp;Holder
            </section>

            <div className="lg:bg-white mt-3 mx-auto rounded-lg lg:p-8">
              <div className="border border-light bg-white rounded-lg">
                <section className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-5 lg:px-7 py-3 bg-lighter flex justify-between items-center">
                  Basic Details
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
                  <div className="grid grid-cols-2 gap-5 lg:gap-6">
                    <label className="col-span-2">
                      <span className="Label">Holder Type</span>
                      <Controller
                        control={control}
                        name={`holder_form.${index}.type`}
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
                              options={holderTypeOptions(index)}
                              value={holderTypeOptions(index).find(
                                (c) => c.value === value
                              )}
                              onChange={(e: IOptions) => {
                                onChange(e.value);
                                e?.value === 'PR' &&
                                  unregister(
                                    `holder_form.${index}.relationship`
                                  );
                                e?.value === 'PR' &&
                                  unregister(
                                    `holder_form.${index}.relation_proof`
                                  );
                              }}
                              name={name}
                              styles={{
                                control: (base, state) => ({
                                  ...base,
                                  padding: '2px',
                                  '@media only screen and (min-width: 1024px)':
                                    {
                                      padding: '6px',
                                    },
                                  boxShadow: state.isFocused ? 'none' : 'none',
                                  borderColor: state.isFocused
                                    ? '#C5A265'
                                    : errors['holder_form']?.[index]?.type
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
                        {errors['holder_form']?.[index]?.type?.message}
                      </span>
                    </label>
                    {watch(`holder_form.${index}.type`) !== 'PR' && (
                      <label className="col-span-2 lg:col-span-1">
                        <span className="Label">Relationship</span>
                        <Controller
                          control={control}
                          name={`holder_form.${index}.relationship`}
                          key={field.id}
                          render={({
                            field: { value, onChange, name, ref },
                          }) => {
                            return (
                              <ReactSelect
                                placeholder={
                                  <div className="text-sm text-lighterGray">
                                    Select
                                  </div>
                                }
                                key={field.id}
                                options={relationshipOptions}
                                value={relationshipOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(e: IOptions) => {
                                  onChange(e?.value);
                                }}
                                isClearable
                                name={name}
                                styles={{
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
                                      : errors['holder_form']?.[index]
                                          ?.relationship
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
                          {
                            errors['holder_form']?.[index]?.relationship
                              ?.message
                          }
                        </span>
                      </label>
                    )}
                    {watch(`holder_form.${index}.type`) !== 'PR' && (
                      <label className="col-span-2 lg:col-span-1">
                        <span className="Label">Relation Proof</span>
                        <Controller
                          control={control}
                          name={`holder_form.${index}.relation_proof`}
                          key={field.id}
                          render={({
                            field: { value, onChange, name, ref },
                          }) => {
                            return (
                              <ReactSelect
                                placeholder={
                                  <div className="text-sm text-lighterGray">
                                    Select
                                  </div>
                                }
                                key={field.id}
                                options={relationshipProofOptions}
                                value={relationshipProofOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(e: IOptions) => {
                                  onChange(e?.value);
                                }}
                                isClearable
                                name={name}
                                styles={{
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
                                      : errors['holder_form']?.[index]
                                          ?.relation_proof
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
                          {
                            errors['holder_form']?.[index]?.relation_proof
                              ?.message
                          }
                        </span>
                      </label>
                    )}

                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Name</span>
                      <input
                        {...register(`holder_form.${index}.name`)}
                        key={field.id}
                        type="text"
                        placeholder="Enter your Name"
                        className={classNames(
                          'Input',
                          errors['holder_form']?.[index]?.name &&
                            'border-brandError'
                        )}
                      />
                      <span className="FieldError">
                        {errors['holder_form']?.[index]?.name?.message}
                      </span>
                    </label>
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Phone No</span>
                      <input
                        {...register(`holder_form.${index}.mobile`)}
                        key={field.id}
                        type="text"
                        placeholder="Enter your Phone No"
                        className={classNames(
                          'Input',
                          errors['holder_form']?.[index]?.mobile &&
                            'border-brandError'
                        )}
                      />
                      <span className="FieldError">
                        {errors['holder_form']?.[index]?.mobile?.message}
                      </span>
                    </label>
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Email-id</span>
                      <input
                        {...register(`holder_form.${index}.email`)}
                        key={field.id}
                        type="text"
                        placeholder="Enter your Email-id"
                        className={classNames(
                          'Input',
                          errors['holder_form']?.[index]?.email &&
                            'border-brandError'
                        )}
                      />
                      <span className="FieldError">
                        {errors['holder_form']?.[index]?.email?.message}
                      </span>
                    </label>
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Date of Birth</span>
                      <Controller
                        control={control}
                        name={`holder_form.${index}.dob`}
                        key={field.id}
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
                                errors['holder_form']?.[index]?.dob &&
                                  'border-brandError'
                              )}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              placeholderText="Date of Birth"
                              maxDate={
                                watch(`holder_form.${index}.type`) === 'PR'
                                  ? new Date(
                                      new Date().getFullYear() - 18,
                                      new Date().getMonth(),
                                      new Date().getDate()
                                    )
                                  : null
                              }
                            />
                          );
                        }}
                      />
                      <span className="FieldError">
                        {errors['holder_form']?.[index]?.dob?.message}
                      </span>
                    </label>
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">PAN/PEKRN</span>
                      <input
                        {...register(`holder_form.${index}.pan`)}
                        key={field.id}
                        type="text"
                        placeholder="Enter your PAN/PEKRN"
                        className={classNames(
                          'Input',
                          errors['holder_form']?.[index]?.pan &&
                            'border-brandError'
                        )}
                      />
                      <span className="FieldError">
                        {errors['holder_form']?.[index]?.pan?.message}
                      </span>
                    </label>
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Re-Enter PAN/PEKRN</span>
                      <input
                        {...register(`holder_form.${index}.re_pan`)}
                        key={field.id}
                        type="text"
                        placeholder="Re - Enter your PAN/PEKRN"
                        className={classNames(
                          'Input',
                          errors['holder_form']?.[index]?.re_pan &&
                            'border-brandError'
                        )}
                      />
                      <span className="FieldError">
                        {errors['holder_form']?.[index]?.re_pan?.message}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="border border-light mt-8 bg-white rounded-lg">
                <section className="text-lightGray font-normal text-sm border-b border-light rounded-t rounded-b-none px-5 lg:px-7 py-3 bg-lighter">
                  Additional KYC Details
                </section>
                <div className="mx-auto p-5 lg:p-7">
                  <div className="grid grid-cols-2 gap-5 lg:gap-6">
                    <label className="col-span-2 flex items-center gap-2">
                      <span className="Label !mb-0">Gross</span>
                      <input
                        {...register(`holder_form.${index}.radio`)}
                        type="radio"
                        value="Gross"
                        className="w-4 h-4"
                        onChange={(e) => {
                          setValue(
                            `holder_form.${index}.radio`,
                            e.target.value
                          );
                          e?.target?.value === 'Gross' &&
                            setValue(`holder_form.${index}.net_worth`, 0);
                        }}
                      />
                      <span className="Label !mb-0">Networth</span>
                      <input
                        {...register(`holder_form.${index}.radio`)}
                        type="radio"
                        value="Networth"
                        className="w-4 h-4"
                        onChange={(e) => {
                          setValue(
                            `holder_form.${index}.radio`,
                            e.target.value
                          );
                          e?.target?.value === 'Networth' &&
                            setValue(`holder_form.${index}.gross_income`, '');
                        }}
                      />
                      <span className="FieldError">
                        {errors['holder_form']?.[index]?.radio?.message}
                      </span>
                    </label>
                    {watch(`holder_form.${index}.radio`) === 'Gross' && (
                      <label className="col-span-2">
                        <Controller
                          control={control}
                          name={`holder_form.${index}.gross_income`}
                          key={field.id}
                          render={({
                            field: { value, onChange, name, ref },
                          }) => {
                            return (
                              <ReactSelect
                                placeholder={
                                  <div className="text-sm text-lighterGray">
                                    Select
                                  </div>
                                }
                                key={field.id}
                                options={grossIncomeOptions}
                                value={grossIncomeOptions.find(
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
                                    '@media only screen and (min-width: 1024px)':
                                      {
                                        padding: '6px',
                                      },
                                    boxShadow: state.isFocused
                                      ? 'none'
                                      : 'none',
                                    borderColor: state.isFocused
                                      ? '#C5A265'
                                      : errors['holder_form']?.[index]
                                          ?.gross_income
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
                          {
                            errors['holder_form']?.[index]?.gross_income
                              ?.message
                          }
                        </span>
                      </label>
                    )}
                    {watch(`holder_form.${index}.radio`) === 'Networth' && (
                      <label className="col-span-2">
                        <input
                          {...register(`holder_form.${index}.net_worth`)}
                          key={field.id}
                          type="text"
                          placeholder="Enter your Net Worth"
                          className={classNames(
                            'Input',
                            errors['holder_form']?.[index]?.net_worth &&
                              'border-brandError'
                          )}
                        />
                        <span className="FieldError">
                          {errors['holder_form']?.[index]?.net_worth?.message}
                        </span>
                      </label>
                    )}
                    <label className="col-span-2 lg:col-span-1">
                      <span className="Label">Source of Wealth</span>
                      <Controller
                        control={control}
                        name={`holder_form.${index}.wealth_source`}
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
                              options={wealthSourceOptions}
                              value={wealthSourceOptions.find(
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
                                  '@media only screen and (min-width: 1024px)':
                                    {
                                      padding: '6px',
                                    },
                                  boxShadow: state.isFocused ? 'none' : 'none',
                                  borderColor: state.isFocused
                                    ? '#C5A265'
                                    : errors['holder_form']?.[index]
                                        ?.wealth_source
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
                        {errors['holder_form']?.[index]?.wealth_source?.message}
                      </span>
                    </label>
                    <label className="col-span-2 lg:col-span-1">
                      <span className="Label">Occupation</span>
                      <Controller
                        control={control}
                        name={`holder_form.${index}.occupation`}
                        render={({ field: { value, onChange, name, ref } }) => {
                          return (
                            <ReactSelect
                              placeholder={
                                <div className="text-sm text-lighterGray">
                                  Select
                                </div>
                              }
                              options={occupationOptions}
                              value={occupationOptions.find(
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
                                  '@media only screen and (min-width: 1024px)':
                                    {
                                      padding: '6px',
                                    },
                                  boxShadow: state.isFocused ? 'none' : 'none',
                                  borderColor: state.isFocused
                                    ? '#C5A265'
                                    : errors['holder_form']?.[index]?.occupation
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
                        {errors['holder_form']?.[index]?.occupation?.message}
                      </span>
                    </label>
                    <label className="col-span-2 lg:col-span-1">
                      <span className="Label">Political Exposure</span>
                      <Controller
                        control={control}
                        name={`holder_form.${index}.pep`}
                        render={({ field: { value, onChange, name, ref } }) => {
                          return (
                            <ReactSelect
                              placeholder={
                                <div className="text-sm text-lighterGray">
                                  Select
                                </div>
                              }
                              options={pepOptions}
                              value={pepOptions.find((c) => c.value === value)}
                              onChange={(e: IOptions) => {
                                onChange(e.value);
                              }}
                              name={name}
                              styles={{
                                control: (base, state) => ({
                                  ...base,
                                  padding: '2px',
                                  '@media only screen and (min-width: 1024px)':
                                    {
                                      padding: '6px',
                                    },
                                  boxShadow: state.isFocused ? 'none' : 'none',
                                  borderColor: state.isFocused
                                    ? '#C5A265'
                                    : errors['holder_form']?.[index]?.pep
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
                        {errors['holder_form']?.[index]?.pep?.message}
                      </span>
                    </label>
                    <label className="col-span-2 lg:col-span-1">
                      <span className="Label">KRA Address Type</span>
                      <Controller
                        control={control}
                        name={`holder_form.${index}.kra_address_type`}
                        render={({ field: { value, onChange, name, ref } }) => {
                          return (
                            <ReactSelect
                              placeholder={
                                <div className="text-sm text-lighterGray">
                                  Select
                                </div>
                              }
                              options={kraAddressTypeOptions}
                              value={kraAddressTypeOptions.find(
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
                                  '@media only screen and (min-width: 1024px)':
                                    {
                                      padding: '6px',
                                    },
                                  boxShadow: state.isFocused ? 'none' : 'none',
                                  borderColor: state.isFocused
                                    ? '#C5A265'
                                    : errors['holder_form']?.[index]
                                        ?.kra_address_type
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
                        {
                          errors['holder_form']?.[index]?.kra_address_type
                            ?.message
                        }
                      </span>
                    </label>
                    {watch(`holder_form.${index}.wealth_source`) === '08' && (
                      <label className="col-span-2 lg:col-span-1">
                        <span className="Label">Wealth Source Other</span>
                        <input
                          {...register(
                            `holder_form.${index}.wealth_source_other`
                          )}
                          key={field.id}
                          type="text"
                          placeholder="Enter your Wealth Source"
                          className={classNames(
                            'Input',
                            errors['holder_form']?.[index]
                              ?.wealth_source_other && 'border-brandError'
                          )}
                        />
                        <span className="FieldError">
                          {
                            errors['holder_form']?.[index]?.wealth_source_other
                              ?.message
                          }
                        </span>
                      </label>
                    )}

                    {watch(`holder_form.${index}.occupation`) === '99' && (
                      <label className="col-span-2 lg:col-span-1">
                        <span className="Label">Occupation Other</span>
                        <input
                          {...register(`holder_form.${index}.occupation_other`)}
                          key={field.id}
                          type="text"
                          placeholder="Enter your Occupation Source"
                          className={classNames(
                            'Input',
                            errors['holder_form']?.[index]?.occupation_other &&
                              'border-brandError'
                          )}
                        />
                        <span className="FieldError">
                          {
                            errors['holder_form']?.[index]?.occupation_other
                              ?.message
                          }
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className="border border-light mt-8 bg-white rounded-lg">
                <section className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-5 lg:px-7 py-3 bg-lighter">
                  FATCA Details
                </section>
                <div className="mx-auto p-5 lg:p-7">
                  <div className="grid grid-cols-2 gap-5 lg:gap-6">
                    <label className="col-span-2">
                      <span className="Label">
                        Tax Residency in a country other than India?
                      </span>
                      <Controller
                        control={control}
                        name={`holder_form.${index}.tax_residency_flag`}
                        render={({ field: { value, onChange, name, ref } }) => {
                          return (
                            <ReactSelect
                              placeholder={
                                <div className="text-sm text-lighterGray">
                                  Select
                                </div>
                              }
                              options={taxResidencyFlagOptions}
                              value={taxResidencyFlagOptions.find(
                                (c) => c.value === value
                              )}
                              onChange={(e: IOptions) => {
                                onChange(e?.value);
                                e?.value === 'N' &&
                                  unregister(
                                    `holder_form[${index}].tax_records`
                                  );
                              }}
                              name={name}
                              styles={{
                                control: (base, state) => ({
                                  ...base,
                                  padding: '2px',
                                  '@media only screen and (min-width: 1024px)':
                                    {
                                      padding: '6px',
                                    },
                                  boxShadow: state.isFocused ? 'none' : 'none',
                                  borderColor: state.isFocused
                                    ? '#C5A265'
                                    : errors['holder_form']?.[index]
                                        ?.tax_residency_flag
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
                        {
                          errors['holder_form']?.[index]?.tax_residency_flag
                            ?.message
                        }
                      </span>
                    </label>
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">City of Birth</span>
                      <input
                        {...register(`holder_form.${index}.birth_place`)}
                        key={field.id}
                        type="text"
                        placeholder="Enter your City of Birth"
                        className={classNames(
                          'Input',
                          errors['holder_form']?.[index]?.birth_place &&
                            'border-brandError'
                        )}
                      />
                      <span className="FieldError">
                        {errors['holder_form']?.[index]?.birth_place?.message}
                      </span>
                    </label>
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Country of Birth</span>
                      <Controller
                        control={control}
                        name={`holder_form.${index}.birth_country`}
                        render={({ field: { value, onChange, name, ref } }) => {
                          return (
                            <ReactSelect
                              placeholder={
                                <div className="text-sm text-lighterGray">
                                  Select
                                </div>
                              }
                              options={countryList
                                ?.filter((item) => item.name === 'India')
                                ?.map((item) => {
                                  return {
                                    value: item.code,
                                    label: item.name,
                                  };
                                })}
                              value={countryList
                                ?.filter((item) => item.name === 'India')
                                ?.map((item) => {
                                  return {
                                    value: item.code,
                                    label: item.name,
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
                                  '@media only screen and (min-width: 1024px)':
                                    {
                                      padding: '6px',
                                    },
                                  boxShadow: state.isFocused ? 'none' : 'none',
                                  borderColor: state.isFocused
                                    ? '#C5A265'
                                    : errors['holder_form']?.[index]
                                        ?.birth_country
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
                        {errors['holder_form']?.[index]?.birth_country?.message}
                      </span>
                    </label>
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Country of Citizenship</span>
                      <Controller
                        control={control}
                        name={`holder_form.${index}.citizenship`}
                        render={({ field: { value, onChange, name, ref } }) => {
                          return (
                            <ReactSelect
                              placeholder={
                                <div className="text-sm text-lighterGray">
                                  Select
                                </div>
                              }
                              options={countryList
                                ?.filter((item) => item.name === 'India')
                                ?.map((item) => {
                                  return {
                                    value: item.code,
                                    label: item.name,
                                  };
                                })}
                              value={countryList
                                ?.filter((item) => item.name === 'India')
                                ?.map((item) => {
                                  return {
                                    value: item.code,
                                    label: item.name,
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
                                  '@media only screen and (min-width: 1024px)':
                                    {
                                      padding: '6px',
                                    },
                                  boxShadow: state.isFocused ? 'none' : 'none',
                                  borderColor: state.isFocused
                                    ? '#C5A265'
                                    : errors['holder_form']?.[index]
                                        ?.citizenship
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
                        {errors['holder_form']?.[index]?.citizenship?.message}
                      </span>
                    </label>
                    <label className="lg:col-span-1 col-span-2">
                      <span className="Label">Country of Nationality</span>
                      <Controller
                        control={control}
                        name={`holder_form.${index}.nationality`}
                        render={({ field: { value, onChange, name, ref } }) => {
                          return (
                            <ReactSelect
                              placeholder={
                                <div className="text-sm text-lighterGray">
                                  Select
                                </div>
                              }
                              options={countryList
                                ?.filter((item) => item.name === 'India')
                                ?.map((item) => {
                                  return {
                                    value: item.code,
                                    label: item.name,
                                  };
                                })}
                              value={countryList
                                ?.filter((item) => item.name === 'India')
                                ?.map((item) => {
                                  return {
                                    value: item.code,
                                    label: item.name,
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
                                  '@media only screen and (min-width: 1024px)':
                                    {
                                      padding: '6px',
                                    },
                                  boxShadow: state.isFocused ? 'none' : 'none',
                                  borderColor: state.isFocused
                                    ? '#C5A265'
                                    : errors['holder_form']?.[index]
                                        ?.nationality
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
                        {errors['holder_form']?.[index]?.nationality?.message}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              {watch(`holder_form.${index}.tax_residency_flag`) === 'Y' && (
                <div className="border border-light mt-8 bg-white rounded-lg">
                  <section className="text-lightGray font-normal text-sm border-b-[1px] border-light rounded-t rounded-b-none px-5 lg:px-7 py-3 bg-lighter">
                    Tax Record Details
                  </section>
                  <div className="mx-auto p-5 lg:p-7">
                    <NestedArray
                      nestIndex={index}
                      {...{ control, register, unregister }}
                      countryList={countryList}
                      errors={errors}
                    />
                  </div>
                </div>
              )}
            </div>
          </Fragment>
        );
      })}
      <span
        className={classNames(
          'OutlineButton col-span-2 uppercase max-w-[160px] lg:max-w-[228px] w-full mt-6 inline-flex justify-center',
          fields.length >= 4 ? 'hidden' : '',
          data?.data?.data?.can_criteria?.holding_type === 'SI' && 'hidden'
        )}
        onClick={() => append({})}
      >
        Add Holders
      </span>
      {!!errors['holder_form']?.message && (
        <span className="FieldError">{errors['holder_form'].message}</span>
      )}
      <section className="flex items-center gap-5 lg:gap-6 mt-6">
        <button
          className="OutlineButton uppercase max-w-[160px] lg:max-w-[228px] w-full"
          onClick={goBack}
          type="button"
        >
          Prev
        </button>
        <button
          className="Button uppercase max-w-[160px] lg:max-w-[228px] w-full"
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
