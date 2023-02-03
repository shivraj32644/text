import {
  IAccountInfo,
  setFormFieldErrors,
  useGetAccountInfoData,
  useGetKycBasicDetails,
  useGetProfile,
  User,
  useUpdateIndividualKycBasicDetails,
  useUpdateNonIndividualKycBasicDetails,
  nameField,
  mobileField,
} from '@corpcare/shared/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  businessEntityListOptions,
  IBusinessEntityList,
  IIndustryList,
  industryListOptions,
  SpinnerIcon,
  CustomToast,
} from '@corpcare/web/ui';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect } from 'react';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { NextRouter, useRouter } from 'next/router';

const IndividualBasicDetailsFormSchema = yup.object({
  birth_date: yup.string().required().label('Birth Date').nullable(),
  email: yup.string().required().label('Email'),
  mobile: mobileField.required().label('Mobile'),
  name: nameField.required().label('Name'),
  pan_number: yup
    .string()
    .required()
    .nullable()
    .label('Pan')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Not a Valid PAN'),
});

type IndividualBasicDetailsFormFields = yup.InferType<
  typeof IndividualBasicDetailsFormSchema
>;

export const KycIndividualBasicDetailsForm = ({
  basicDetails,
  setCurrentTabIndex,
  profile,
  currentTabIndex,
  accountInfo,
}: {
  basicDetails:
    | {
        birth_date?: string | undefined;
        email?: string | undefined;
        mobile?: string | undefined;
        name?: string | undefined;
        pan_number?: string | undefined;
      }
    | undefined;
  currentTabIndex: 'basic-details';
  setCurrentTabIndex: Dispatch<
    SetStateAction<
      'basic-details' | 'personal-documents' | 'registered-address'
    >
  >;
  profile: User | undefined;
  accountInfo?: IAccountInfo;
}) => {
  const { mutate, isLoading } = useUpdateIndividualKycBasicDetails();
  const router = useRouter() as NextRouter;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    control,
  } = useForm<IndividualBasicDetailsFormFields>({
    resolver: yupResolver(IndividualBasicDetailsFormSchema),
  });

  useEffect(() => {
    reset({
      birth_date: basicDetails?.birth_date,
      email: basicDetails?.email,
      name: basicDetails?.name,
      pan_number: basicDetails?.pan_number,
      mobile:
        basicDetails?.mobile?.split('+91 ').length === 1
          ? basicDetails?.mobile
          : basicDetails?.mobile?.split('+91 ')[1],
    });
  }, [reset, basicDetails]);
  const shouldBeDisabled =
    accountInfo?.kyc_status === 'submitted' ||
    accountInfo?.kyc_status === 'verified';
  const handleFormSubmit = (data: IndividualBasicDetailsFormFields) => {
    const accountId = profile?.accounts?.[0]?.id || '';
    if (shouldBeDisabled) {
      setCurrentTabIndex('personal-documents');
      router?.replace({
        pathname: '/profile/kyc-verification',
        hash: 'personal-documents',
      });
      return;
    }
    mutate(
      { data, accountId },
      {
        onSuccess() {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={'Successfully submitted basic details.'}
              type="success"
            />
          ));
          setCurrentTabIndex('personal-documents');
          router?.replace({
            pathname: '/profile/kyc-verification',
            hash: 'personal-documents',
          });
        },
        onError(err: any) {
          setFormFieldErrors(err, setError);
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={
                err?.message || 'Something went wrong! Please try again.'
              }
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
      <div className="border-[1px] border-light">
        <section className="text-lightGray font-normal text-lg lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
          Basic Details
        </section>
        <div className="mx-auto p-5 lg:p-7">
          <div className="grid grid-cols-2 gap-6">
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Name as per PAN</span>
              <input
                {...register('name')}
                type="text"
                placeholder="Enter Your Name"
                className={classNames(
                  'Input',
                  errors.name && 'border-brandError'
                )}
                disabled={shouldBeDisabled}
              />
              <span className="FieldError">{errors.name?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Mobile Number</span>
              <input
                {...register('mobile')}
                type="text"
                placeholder="Enter your Mobile Number"
                className={classNames(
                  'Input',
                  errors.mobile && 'border-brandError'
                )}
                disabled={shouldBeDisabled}
              />
              <span className="FieldError">{errors.mobile?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Email-Id</span>
              <input
                {...register('email')}
                type="text"
                placeholder="Enter your Email Id"
                className={classNames(
                  'Input',
                  errors.email && 'border-brandError'
                )}
                disabled={shouldBeDisabled}
              />
              <span className="FieldError">{errors.email?.message}</span>
            </label>

            <label className="lg:col-span-1 col-span-2">
              <span className="Label uppercase">DOB</span>

              <Controller
                control={control}
                name="birth_date"
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
                        errors.birth_date && 'border-brandError'
                      )}
                      disabled={shouldBeDisabled}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="Date of Birth"
                      maxDate={
                        new Date(
                          new Date().getFullYear() - 18,
                          new Date().getMonth(),
                          new Date().getDate()
                        )
                      }
                    />
                  );
                }}
              />
              <span className="FieldError">{errors.birth_date?.message}</span>
            </label>
            <label className="col-span-2">
              <span className="Label">PAN Number</span>
              <input
                {...register('pan_number')}
                type="text"
                placeholder="Enter your PAN Number"
                className={classNames(
                  'Input',
                  errors.pan_number && 'border-brandError'
                )}
                disabled={shouldBeDisabled}
              />
              <span className="FieldError">{errors.pan_number?.message}</span>
            </label>
            <button
              type="submit"
              className="Button col-span-1 lg:hidden"
              disabled={isLoading}
            >
              Next
              {isLoading && (
                <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
              )}
            </button>
          </div>
        </div>
      </div>

      <button
        className="Button col-span-2 uppercase max-w-[228px] w-full mt-6 hidden lg:block"
        disabled={isLoading}
      >
        Next
        {isLoading && (
          <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
        )}
      </button>
    </form>
  );
};

const NonIndividualBasicDetailsFormSchema = yup.object({
  business_entity_type: yup.string().required().label('Business Entity Type'),
  cin_number: yup
    .string()
    .required()
    .label('CIN')
    .matches(
      /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/,
      'Not a valid CIN'
    ),
  company_name: yup.string().required().label('Company Name'),
  gst_number: yup
    .string()
    .required()
    .label('Gst')
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      'Not a Valid GST'
    ),
  pan_number: yup
    .string()
    .required()
    .nullable()
    .label('Pan')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Not a Valid PAN'),
  industry_name: yup.string().required().label('Industry'),
  company_reg_place_name: yup
    .string()
    .required()
    .label('Place of Registration'),
  company_inc_year: yup
    .string()
    .required()
    .label('Year of Registration')
    .matches(/^(19|20)[\d]{2,2}$/, 'Not a Valid Year'),
  name: nameField.required().label('Name'),
});

type NonIndividualBasicDetailsFormFields = yup.InferType<
  typeof NonIndividualBasicDetailsFormSchema
>;

export const KycNonIndividualBasicDetailsForm = ({
  basicDetails,
  setCurrentTabIndex,
  currentTabIndex,
  profile,
  accountInfo,
}: {
  basicDetails:
    | {
        pan_number: string;
        business_entity_type?: string | undefined;
        industry_name?: string | undefined;
        gst_number?: string | undefined;
        cin_number?: string | undefined;
        company_name?: string | undefined;
        company_inc_year?: string | undefined;
        company_reg_place_name?: string | undefined;
        name?: string | undefined;
      }
    | undefined;
  currentTabIndex: 'basic-details';
  setCurrentTabIndex: Dispatch<
    SetStateAction<
      'basic-details' | 'personal-documents' | 'registered-address'
    >
  >;
  profile: User | undefined;
  accountInfo: IAccountInfo;
}) => {
  const { mutate, isLoading } = useUpdateNonIndividualKycBasicDetails();
  const router = useRouter() as NextRouter;
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<NonIndividualBasicDetailsFormFields>({
    resolver: yupResolver(NonIndividualBasicDetailsFormSchema),
  });

  useEffect(() => {
    reset({
      business_entity_type: basicDetails?.business_entity_type,
      cin_number: basicDetails?.cin_number,
      company_name: basicDetails?.company_name,
      gst_number: basicDetails?.gst_number,
      pan_number: basicDetails?.pan_number,
      industry_name: basicDetails?.industry_name,
      company_reg_place_name: basicDetails?.company_reg_place_name,
      company_inc_year: basicDetails?.company_inc_year,
      name: basicDetails?.name,
    });
  }, [reset, basicDetails]);

  const shouldBeDisabled =
    accountInfo?.kyc_status === 'submitted' ||
    accountInfo?.kyc_status === 'verified';

  const handleFormSubmit = (data: NonIndividualBasicDetailsFormFields) => {
    const accountId = profile?.accounts?.[0]?.id || '';
    if (shouldBeDisabled) {
      setCurrentTabIndex('personal-documents');
      router?.replace({
        pathname: '/profile/kyc-verification',
        hash: 'personal-documents',
      });
      return;
    }
    mutate(
      { data, accountId },
      {
        onSuccess() {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={'Successfully submitted basic details'}
              type="success"
            />
          ));
          setCurrentTabIndex('personal-documents');
          router?.replace({
            pathname: '/profile/kyc-verification',
            hash: 'personal-documents',
          });
        },
        onError(err: any) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={
                err?.message || 'Something went wrong! Please try again.'
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
    <form
      className="bg-white mt-3 mx-auto rounded-lg lg:p-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="border-[1px] border-light">
        <section className="text-lightGray font-normal text-lg lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
          Basic Details
        </section>
        <div className="mx-auto p-5 lg:p-7">
          <div className="grid grid-cols-2 gap-6">
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Business Entity Type</span>
              <Controller
                control={control}
                name="business_entity_type"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">
                          Select Business your Entity Type
                        </div>
                      }
                      options={businessEntityListOptions}
                      value={businessEntityListOptions.find(
                        (c) => c.value === value
                      )}
                      onChange={(e: IBusinessEntityList) => {
                        onChange(e.value);
                      }}
                      isDisabled={shouldBeDisabled}
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
                            : errors.business_entity_type
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
                {errors.business_entity_type?.message}
              </span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Industry</span>
              <Controller
                control={control}
                name="industry_name"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <CreatableSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">
                          Select your Industry
                        </div>
                      }
                      options={industryListOptions}
                      value={industryListOptions.find((c) => c.value === value)}
                      onChange={(e: IIndustryList) => {
                        onChange(e.value);
                      }}
                      isDisabled={shouldBeDisabled}
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
                            : errors.industry_name
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
                {errors.industry_name?.message}
              </span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Registered Company Name</span>
              <input
                {...register('company_name')}
                type="text"
                placeholder="Enter your Registered Company Name"
                className={classNames(
                  'Input',
                  errors.company_name && 'border-brandError'
                )}
                disabled={shouldBeDisabled}
              />
              <span className="FieldError">{errors.company_name?.message}</span>
            </label>

            <label className="lg:col-span-1 col-span-2">
              <span className="Label uppercase">Business PAN</span>
              <input
                {...register('pan_number')}
                type="text"
                placeholder="Enter your Business PAN"
                className={classNames(
                  'Input',
                  errors.pan_number && 'border-brandError'
                )}
                disabled={shouldBeDisabled}
              />
              <span className="FieldError">{errors.pan_number?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">GST Number</span>
              <input
                {...register('gst_number')}
                type="text"
                placeholder="Enter your GST Number"
                className={classNames(
                  'Input',
                  errors.gst_number && 'border-brandError'
                )}
                disabled={shouldBeDisabled}
              />
              <span className="FieldError">{errors.gst_number?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Year of INC</span>

              <Controller
                control={control}
                name="company_inc_year"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <DatePicker
                      disabled={shouldBeDisabled}
                      selected={value ? new Date(value) : null}
                      onChange={(val) =>
                        val
                          ? onChange(dayjs(val).format('YYYY'))
                          : onChange(null)
                      }
                      className={classNames(
                        'Input',
                        errors.company_inc_year && 'border-brandError'
                      )}
                      showYearPicker
                      dateFormat="yyyy"
                    />
                  );
                }}
              />
              <span className="FieldError">
                {errors.company_inc_year?.message}
              </span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">CIN</span>
              <input
                {...register('cin_number')}
                type="text"
                placeholder="Enter your CIN"
                className={classNames(
                  'Input',
                  errors.cin_number && 'border-brandError'
                )}
                disabled={shouldBeDisabled}
              />
              <span className="FieldError">{errors.cin_number?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Place of Registration</span>
              <input
                {...register('company_reg_place_name')}
                type="text"
                placeholder="Enter your Place of Registration"
                className={classNames(
                  'Input',
                  errors.company_reg_place_name && 'border-brandError'
                )}
                disabled={shouldBeDisabled}
              />
              <span className="FieldError">
                {errors.company_reg_place_name?.message}
              </span>
            </label>
            <button
              type="submit"
              className="Button col-span-1 lg:hidden"
              disabled={isLoading}
            >
              Next
              {isLoading && (
                <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
              )}
            </button>
          </div>
        </div>
      </div>

      <button
        className="Button col-span-2 uppercase max-w-[228px] w-full mt-6 hidden lg:block"
        disabled={isLoading}
      >
        Next
        {isLoading && (
          <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
        )}
      </button>
    </form>
  );
};

export const KycVerificationBasicDetails = ({
  setCurrentTabIndex,
  currentTabIndex,
}: {
  currentTabIndex: 'basic-details';
  setCurrentTabIndex: Dispatch<
    SetStateAction<
      'basic-details' | 'personal-documents' | 'registered-address'
    >
  >;
}) => {
  const { data: profile } = useGetProfile();

  const { data: basicDetails, refetch } = useGetKycBasicDetails();
  const { data: accountInfo } = useGetAccountInfoData();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <section className="text-lightGray text-xl font-medium mt-8 lg:block hidden">
        Basic Details
      </section>
      {accountInfo?.account_type === 'non_individual' ? (
        <KycNonIndividualBasicDetailsForm
          basicDetails={basicDetails}
          setCurrentTabIndex={setCurrentTabIndex}
          profile={profile}
          currentTabIndex={currentTabIndex}
          accountInfo={accountInfo}
        />
      ) : (
        <KycIndividualBasicDetailsForm
          basicDetails={basicDetails}
          setCurrentTabIndex={setCurrentTabIndex}
          profile={profile}
          currentTabIndex={currentTabIndex}
          accountInfo={accountInfo}
        />
      )}
    </>
  );
};
