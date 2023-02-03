import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as yup from 'yup';
import {
  LogoutIcon,
  SpinnerIcon,
  CustomToast,
  LogoutModal,
  useAuth,
} from '@corpcare/web/ui';
import { AuthenticatedDashboardLayout } from '../components/AuthenticatedDashboardLayout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { DashboardHead } from '../components/DashboardHead';
import Link from 'next/link';
import {
  ClientProfileFields,
  clientProfileSchema,
  setFormFieldErrors,
  User,
  useUpdateProfile,
  mobileField,
  nameField,
} from '@corpcare/shared/api';
import ReactSelect from 'react-select';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export const rmProfileSchema = yup.object({
  name: nameField.required().label('Name'),
  user_id: nameField.required().label('User Id'),
  email: yup.string().email().label('Email').required(),
  mobile: mobileField.label('Phone').required(),
});
export type RmProfileFields = yup.InferType<typeof rmProfileSchema>;

const changePasswordFormSchema = yup.object({
  current_password: yup.string().label('Current Password').required(),
  new_password: yup.string().label('New Password').required(),
  confirm_new_password: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Passwords must match'),
});
type ChangePasswordFields = yup.InferType<typeof changePasswordFormSchema>;

export const ProfileBasicDetailsForm = ({ profile }: { profile: User }) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ClientProfileFields>({
    resolver: yupResolver(clientProfileSchema),
    defaultValues: {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      mobile: profile.mobile.split('+91 ')[1],
      birth_date: profile.birth_date || undefined,
      designation: profile.designation || undefined,
      gender: profile.gender,
      marital_status: profile.marital_status,
    },
  });
  const { mutate, isLoading: isUpdating } = useUpdateProfile(
    dirtyFields?.email || dirtyFields?.mobile
  );
  const handleUpdateProfile = (payload: ClientProfileFields) => {
    mutate(payload, {
      onSuccess() {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={'SuccessFully updated profile details'}
            type="error"
          />
        ));
      },
      onError(err: any) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={
              err?.message || 'Failed to update profile! Please try again.'
            }
            type="error"
          />
        ));
        setFormFieldErrors(err, setError);
      },
    });
  };
  return (
    <div className="bg-white mt-6 lg:mt-8 mx-auto rounded-lg lg:p-8">
      <div className="border border-light">
        <section className="text-lightGray  text-lg font-medium lg:text-sm lg:font-normal border-b border-light rounded-t rounded-b-none px-7 py-3 bg-lighter ">
          Basic Details
        </section>
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className={classNames(
            'mx-auto p-5 lg:p-7',
            isUpdating ? 'animate-pulse' : ''
          )}
        >
          <div className="grid grid-cols-2 gap-6">
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Name</span>

              <input
                {...register('first_name')}
                placeholder="Enter your first name"
                className={classNames(
                  'Input',
                  errors.first_name && 'border-brandError'
                )}
              />

              <span className="FieldError">{errors.first_name?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
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

            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Email</span>
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                className={classNames(
                  'Input',
                  errors.email && 'border-brandError'
                )}
              />
              <span className="FieldError">{errors.email?.message}</span>
            </label>

            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Mobile Number</span>
              <input
                {...register('mobile')}
                type="tel"
                placeholder="Enter your mobile number"
                className={classNames(
                  'Input',
                  errors.mobile && 'border-brandError'
                )}
              />
              <span className="FieldError">{errors.mobile?.message}</span>
            </label>

            <label className="lg:col-span-1 col-span-2">
              <span className="Label uppercase">Designation</span>
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
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Date of Birth</span>
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
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Gender</span>
              <Controller
                control={control}
                name="gender"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">
                          Select your Gender
                        </div>
                      }
                      options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                      ]}
                      value={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                      ].find((c) => c.value === value)}
                      onChange={(e: any) => {
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
                            : errors.gender
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
              <span className="FieldError">{errors.gender?.message}</span>
            </label>
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">Martial Status</span>
              <Controller
                control={control}
                name="marital_status"
                render={({ field: { value, onChange, name, ref } }) => {
                  return (
                    <ReactSelect
                      placeholder={
                        <div className="text-sm text-lighterGray">
                          Select Your Martial Status
                        </div>
                      }
                      options={[
                        { value: 'Married', label: 'Married' },
                        { value: 'Single', label: 'Single' },
                      ]}
                      value={[
                        { value: 'Married', label: 'Married' },
                        { value: 'Single', label: 'Single' },
                      ].find((c) => c.value === value)}
                      onChange={(e: any) => {
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
                            : errors.marital_status
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
                {errors.marital_status?.message}
              </span>
            </label>
            <button
              className="Button col-span-2 uppercase"
              type="submit"
              disabled={isUpdating}
            >
              Save Details
              {isUpdating && (
                <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ProfileChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFields>({
    resolver: yupResolver(changePasswordFormSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  const handlePasswordFormSubmit = (data: ChangePasswordFields) => {
    console.log({ data }, 'change_password_form');
  };

  return (
    <>
      <div className="lg:bg-white mt-6 lg:mt-8 mx-auto rounded-lg lg:p-8">
        <div className="border-[1px] border-light bg-white rounded-lg lg:rounded-none">
          <section className="text-lightGray font-normal text-base lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
            Change Password
          </section>
          <form
            className="mx-auto p-5 lg:p-7"
            onSubmit={handleSubmit(handlePasswordFormSubmit)}
          >
            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-2">
                <span className="Label">Current Password</span>
                <input
                  {...register('current_password')}
                  type="text"
                  placeholder="Enter your Current Password"
                  className="Input"
                />
                <span className="FieldError">
                  {errors.current_password?.message}
                </span>
              </label>
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">New Password</span>
                <input
                  {...register('new_password')}
                  type="text"
                  placeholder="Enter your New Password"
                  className="Input"
                />
                <span className="FieldError">
                  {errors.new_password?.message}
                </span>
              </label>
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">Confirm Password</span>
                <input
                  {...register('confirm_new_password')}
                  type="text"
                  placeholder="Enter your Confirm Password"
                  className="Input"
                />
                <span className="FieldError">
                  {errors.confirm_new_password?.message}
                </span>
              </label>
              <button className="col-span-2 Button uppercase">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default function Profile() {
  const { profile, refetch } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">My Profile</h2>
        <Link href="/profile">
          <a className="text-xs text-lightGray">My Profile</a>
        </Link>
      </DashboardHead>

      <div className="p-4 lg:p-8 pb-16 overflow-y-auto">
        <section className="rounded-t-lg  bg-white flex justify-between px-5 py-8 lg:p-12 border-b border-brandLight">
          <div className="flex gap-2 justify-center items-center">
            {/* <div className="border-[1px] border-[#DDDDDD] rounded-full w-16 h-16 flex items-center justify-center">
                <img
                  src="/profile-demo-picture.png"
                  alt="demo_avatar"
                  className="w-12 h-12"
                />
              </div> */}
            <div className="flex flex-col">
              <span className="text-sm lg:text-xl font-normal text-lightGray">
                {profile?.first_name} {profile?.last_name}
              </span>
              <span className="text-sm font-normal text-lightGray">
                {profile?.email}
              </span>
            </div>
          </div>
          <button onClick={() => setIsOpen(true)}>
            <LogoutIcon className="hover:cursor-pointer lg:h-12 lg:w-12 w-7 h-7 text-lightGray" />
          </button>
        </section>
        <ProfileBasicDetailsForm profile={profile} />
        <ProfileChangePasswordForm />
        <LogoutModal setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
    </div>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
