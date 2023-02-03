import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import KycVerificationSuccess from './KycVerificationSuccess';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import ReactSelect from 'react-select';
import {
  getKycSubmissionData,
  setFormFieldErrors,
  useGetAccountInfoData,
  useGetKycAddressData,
  useGetProfile,
  usePostKycAddress,
  useUpdateKycAddress,
} from '@corpcare/shared/api';
import {
  countryListOptions,
  ICountryList,
  IStateList,
  stateListOptions,
  CustomToast,
} from '@corpcare/web/ui';
import toast from 'react-hot-toast';
import { NextRouter, useRouter } from 'next/router';

const RegisteredAddressFormSchema = yup.object({
  line_1: yup.string().required().label('Field'),
  line_2: yup.string().required().label('Field'),
  city: yup.string().required().label('City'),
  state: yup.string().label('State'),
  country_code: yup.string().required().label('Country'),
  zipcode: yup
    .string()
    .required()
    .label('Pin Code')
    .matches(/^[0-9]{6}$/, 'Must be exactly 6 digits'),
});

type RegisteredAddressFormFields = yup.InferType<
  typeof RegisteredAddressFormSchema
>;

export const KycVerificationRegisteredAddress = ({
  currentTabIndex,
  setCurrentTabIndex,
}: {
  setCurrentTabIndex: Dispatch<
    SetStateAction<
      'basic-details' | 'personal-documents' | 'registered-address'
    >
  >;
  currentTabIndex: 'registered-address';
}) => {
  const { data: address, refetch } = useGetKycAddressData();
  const { data: profile } = useGetProfile();
  const { mutate, isSuccess: kycPostAddressSuccess } = usePostKycAddress();
  const { mutate: updateAddress } = useUpdateKycAddress();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState<boolean>(false);
  const { data: accountInfo } = useGetAccountInfoData();
  const router = useRouter() as NextRouter;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = useForm<RegisteredAddressFormFields>({
    resolver: yupResolver(RegisteredAddressFormSchema),
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const countryCodeRef = countryListOptions.find(
      (c) => c.value === address?.country || c.label === address?.country
    );
    reset({
      ...address,
      country_code: countryCodeRef?.value,
    });
  }, [reset, address]);

  const shouldBeDisabled =
    accountInfo?.kyc_status === 'submitted' ||
    accountInfo?.kyc_status === 'verified';

  const handleAddressFormSubmit = (data: RegisteredAddressFormFields) => {
    const accountId = profile?.accounts?.[0]?.id || '';
    if (shouldBeDisabled) return;
    try {
      if (address === undefined) {
        mutate(
          { data, accountId },
          {
            onSuccess() {
              toast.custom((t) => (
                <CustomToast
                  t={t}
                  message={'SuccessFully submitted Address Details.'}
                  type="success"
                />
              ));
            },
            onError(err: any) {
              toast.custom((t) => (
                <CustomToast
                  t={t}
                  message={err.message || 'Failed to Submit Address Details.'}
                  type="error"
                />
              ));
              setFormFieldErrors(err, setError);
            },
          }
        );
      } else {
        updateAddress(
          { data, accountId },
          {
            onSuccess() {
              toast.custom((t) => (
                <CustomToast
                  t={t}
                  message={'SucessFully Updated Address Details'}
                  type="success"
                />
              ));
            },
            onError(err: any) {
              toast.custom((t) => (
                <CustomToast
                  t={t}
                  message={err?.message || 'Failed to Update Details'}
                  type="error"
                />
              ));
              setFormFieldErrors(err, setError);
            },
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlekycSubmission = async () => {
    const accountId = profile?.accounts?.[0]?.id || '';
    if (shouldBeDisabled) {
      router.push('/profile');
      return;
    }
    try {
      await getKycSubmissionData({ accountId });
      setIsOpen(true);
    } catch (error) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={error?.message || 'Something went wrong! Please try again.'}
          type="error"
        />
      ));
      error?.message === 'Account kyc is already submitted' && setIsOpen(true);
      error?.message === 'Account kyc is already submitted' &&
        setIsAlreadySubmitted(true);
    }
  };

  return (
    <>
      <section className="text-lightGray text-xl font-medium mt-8 lg:block hidden">
        Registered Address
      </section>
      <div className="lg:bg-white mt-3 mx-auto rounded-lg lg:p-8">
        <div className="border border-brandLight bg-white">
          <section className="text-lightGray font-normal text-sm rounded-t rounded-b-none px-7 py-3 bg-lighter border-b border-brandLight">
            Registered Address
          </section>
          <form
            className="mx-auto p-5 lg:p-7"
            onSubmit={handleSubmit(handleAddressFormSubmit)}
          >
            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">Address Line 1</span>
                <input
                  {...register('line_1')}
                  type="text"
                  placeholder="Enter Your Address"
                  className={classNames(
                    'Input',
                    errors.line_1 && 'border-brandError'
                  )}
                  disabled={shouldBeDisabled}
                />
                <span className="FieldError">{errors.line_1?.message}</span>
              </label>
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">Address Line 2</span>
                <input
                  {...register('line_2')}
                  type="text"
                  placeholder="Enter Your Address"
                  className={classNames(
                    'Input',
                    errors.line_2 && 'border-brandError'
                  )}
                  disabled={shouldBeDisabled}
                />
                <span className="FieldError">{errors.line_2?.message}</span>
              </label>
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">Pincode</span>
                <input
                  {...register('zipcode')}
                  type="text"
                  placeholder="Enter Your Pin Code"
                  className={classNames(
                    'Input',
                    errors.zipcode && 'border-brandError'
                  )}
                  disabled={shouldBeDisabled}
                />
                <span className="FieldError">{errors.zipcode?.message}</span>
              </label>
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">City</span>
                <input
                  {...register('city')}
                  type="text"
                  placeholder="Enter Your City Name"
                  className={classNames(
                    'Input',
                    errors.city && 'border-brandError'
                  )}
                  disabled={shouldBeDisabled}
                />
                <span className="FieldError">{errors.city?.message}</span>
              </label>
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">State</span>
                <Controller
                  control={control}
                  name="state"
                  render={({ field: { value, onChange, name, ref } }) => (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">
                          Select your State
                        </div>
                      }
                      classNamePrefix={classNames('Input')}
                      options={stateListOptions}
                      value={stateListOptions.find((c) => c.value === value)}
                      onChange={(e: IStateList) => {
                        onChange(e.value);
                      }}
                      isSearchable={false}
                      name={name}
                      isDisabled={shouldBeDisabled}
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
                            : errors.state
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
                  )}
                />
                <span className="FieldError">{errors.state?.message}</span>
              </label>
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">Country</span>
                <Controller
                  control={control}
                  name="country_code"
                  render={({ field: { value, onChange, name, ref } }) => {
                    return (
                      <ReactSelect
                        placeholder={
                          <div className="text-sm text-lighterGray">
                            Select your Country
                          </div>
                        }
                        classNamePrefix={classNames('Input')}
                        options={countryListOptions}
                        value={countryListOptions.find(
                          (c) => c.value === value || c.label === value
                        )}
                        onChange={(e: ICountryList) => {
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
                              : errors.country_code
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
                  {errors.country_code?.message}
                </span>
              </label>
              <button
                className="Button col-span-2 uppercase max-w-[228px] w-full "
                type="submit"
                disabled={shouldBeDisabled}
              >
                Submit Details
              </button>
            </div>
          </form>
        </div>
        <section className="flex items-center mt-4">
          <button
            className="OutlineButton  uppercase max-w-[228px] w-full"
            onClick={() => {
              router?.replace({
                pathname: '/profile/kyc-verification',
                hash: 'personal-documents',
              });
              setCurrentTabIndex('personal-documents');
            }}
          >
            Prev
          </button>
          <button
            className="Button uppercase max-w-[228px] w-full  ml-4 "
            onClick={handlekycSubmission}
            disabled={!kycPostAddressSuccess && !address}
          >
            Submit
          </button>
        </section>
      </div>
      <KycVerificationSuccess
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isSubmissionError={isAlreadySubmitted}
      />
    </>
  );
};
