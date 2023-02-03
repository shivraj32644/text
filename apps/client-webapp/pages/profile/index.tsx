import { ReactElement } from 'react';
import {
  ProfileTabsLayout,
  AuthenticatedDashboardLayout,
} from '../../components/index';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import {
  ClientProfileFields,
  clientProfileSchema,
  setFormFieldErrors,
  useUpdateProfile,
} from '@corpcare/shared/api';
import ReactSelect from 'react-select';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { CustomToast, SpinnerIcon, useAuth } from '@corpcare/web/ui';

const ProfilePage = () => {
  const { profile, refetch } = useAuth();

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
        refetch();
        toast.custom((t) => (
          <CustomToast
            t={t}
            message="SuccessFully updated profile details"
            type="success"
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
    <ProfileTabsLayout>
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

                <span className="FieldError">
                  {errors.designation?.message}
                </span>
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
    </ProfileTabsLayout>
  );
};

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
