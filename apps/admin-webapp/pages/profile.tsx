import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as yup from 'yup';
import {
  LogoutIcon,
  PasswordNotVisibleIcon,
  PasswordVisibleIcon,
  SpinnerIcon,
  CustomToast,
  useAuth,
  LogoutModal,
  EditIcon,
} from '@corpcare/web/ui';
import { AuthenticatedDashboardLayout } from '../components/AuthenticatedDashboardLayout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { DashboardHead } from '../components/DashboardHead';
import Link from 'next/link';
import {
  ChangePasswordFields,
  changePasswordFormSchema,
  setFormFieldErrors,
  useChangePassword,
  useGetProfile,
  mobileField,
  nameField,
  useUpdateProfile,
  useUploadProfilePicture,
} from '@corpcare/shared/api';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Popover, Transition } from '@headlessui/react';

export const adminProfileSchema = yup.object({
  first_name: nameField.required().label('First name'),
  last_name: nameField.required().label('Last name'),
  email: yup.string().email().label('Email').required(),
  mobile: mobileField.label('Phone').required(),
});
export type AdminProfileFields = yup.InferType<typeof adminProfileSchema>;

export const ProfileBasicDetailsForm = () => {
  const { profile, refetch } = useAuth();
  const { mutate, isLoading } = useUpdateProfile();
  useEffect(() => {
    refetch();
  }, [refetch]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AdminProfileFields>({
    resolver: yupResolver(adminProfileSchema),
    defaultValues: {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      mobile: profile.mobile.split('+91 ')[1],
    },
  });

  const handleUpdateProfile = (data: any) => {
    mutate(data, {
      onSuccess(data, variables, context) {
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
    <div className="bg-white mt-6 lg:mt-8 mx-auto rounded-lg lg:p-8">
      <div className="border border-light">
        <section className="text-lightGray  text-lg font-medium lg:text-sm lg:font-normal border-b border-light rounded-t rounded-b-none px-7 py-3 bg-lighter ">
          Basic Details
        </section>
        <form
          className="mx-auto p-5 lg:p-7"
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <div className="grid grid-cols-2 gap-6">
            <label className="lg:col-span-1 col-span-2">
              <span className="Label">First Name</span>

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
                placeholder="Enter your Last Name"
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
            <button
              className="Button col-span-2 uppercase"
              disabled={isLoading}
            >
              Update Details
              {isLoading && (
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
    setError,
  } = useForm<ChangePasswordFields>({
    resolver: yupResolver(changePasswordFormSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });
  const { mutate, isLoading } = useChangePassword();
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showReNewPassword, setShowReNewPassword] = useState<boolean>(false);
  const handlePasswordFormSubmit = (data: ChangePasswordFields) => {
    mutate(data, {
      onSuccess(response) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={
              response?.message || 'SuccessFully Updated Profile Password'
            }
            type="success"
          />
        ));
      },
      onError(err: any) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            message={
              err.message || 'Failed to update password! Please try again.'
            }
            type="error"
          />
        ));
        setFormFieldErrors(err, setError);
      },
    });
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
                <div className="relative flex items-center justify-between">
                  <input
                    {...register('current_password')}
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Enter your Current Password"
                    className="Input"
                  />
                  {!showCurrentPassword && (
                    <PasswordNotVisibleIcon
                      className="w-6 h-6 absolute right-2 cursor-pointer text-brand"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    />
                  )}
                  {showCurrentPassword && (
                    <PasswordVisibleIcon
                      className="w-6 h-6 absolute right-2 cursor-pointer text-brand"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    />
                  )}
                </div>
                <span className="FieldError">
                  {errors.current_password?.message}
                </span>
              </label>
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">New Password</span>
                <div className="relative flex items-center justify-between">
                  <input
                    {...register('new_password')}
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter your New Password"
                    className="Input"
                  />
                  {!showNewPassword && (
                    <PasswordNotVisibleIcon
                      className="w-6 h-6 absolute right-2 cursor-pointer text-brand"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  )}
                  {showNewPassword && (
                    <PasswordVisibleIcon
                      className="w-6 h-6 absolute right-2 cursor-pointer text-brand"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  )}
                </div>
                <span className="FieldError">
                  {errors.new_password?.message}
                </span>
              </label>
              <label className="col-span-2 lg:col-span-1">
                <span className="Label">Confirm Password</span>
                <div className="relative flex items-center justify-between">
                  <input
                    {...register('confirm_new_password')}
                    type={showReNewPassword ? 'text' : 'password'}
                    placeholder="Re-Enter your New Password"
                    className="Input"
                  />
                  {!showReNewPassword && (
                    <PasswordNotVisibleIcon
                      className="w-6 h-6 absolute right-2 cursor-pointer text-brand"
                      onClick={() => setShowReNewPassword(!showReNewPassword)}
                    />
                  )}
                  {showReNewPassword && (
                    <PasswordVisibleIcon
                      className="w-6 h-6 absolute right-2 cursor-pointer text-brand"
                      onClick={() => setShowReNewPassword(!showReNewPassword)}
                    />
                  )}
                </div>
                <span className="FieldError">
                  {errors.confirm_new_password?.message}
                </span>
              </label>
              <button
                className="Button col-span-2 uppercase"
                disabled={isLoading}
              >
                Update Password
                {isLoading && (
                  <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default function Profile() {
  const { data: profile, refetch } = useGetProfile();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    refetch();
  }, [refetch]);

  const { mutate: upload, isLoading } = useUploadProfilePicture();
  const handleFileUpload = async (file: File | '') => {
    try {
      upload(
        { file },
        {
          onSuccess(response) {
            refetch();
            toast.custom((t) => (
              <CustomToast
                t={t}
                message={
                  response?.message || 'SuccessFully updated profile image'
                }
                type="success"
              />
            ));
          },
          onError(err: any) {
            toast.custom((t) => (
              <CustomToast
                t={t}
                message={
                  err?.message ||
                  'Failed to upload profile image! Please try again.'
                }
                type="error"
              />
            ));
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  function onFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files) return;
    const filesArr = Array.from(files);
    filesArr.forEach((file) => handleFileUpload(file));
  }

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">My Profile</h2>
        <Link href="/profile">
          <a className="text-xs text-lightGray">My Profile</a>
        </Link>
      </DashboardHead>

      <div className="p-4 lg:p-8 pb-16 overflow-y-auto">
        <section className="rounded-lg  bg-white flex justify-between px-5 py-8 lg:p-12 border-b border-brandLight w-full">
          <div
            className="flex gap-2 justify-start items-center"
            style={{
              flex: '1 1 100%',
              minWidth: 0,
            }}
          >
            <div className="border border-[#DDDDDD] rounded-full w-28 h-28 flex items-center justify-center relative flex-shrink-0">
              <img
                src={
                  profile?.avatar_url === ''
                    ? '/profile-demo-pic.png'
                    : profile?.avatar_url
                }
                alt={profile?.first_name}
                className="w-24 h-auto object-cover rounded-full max-h-24"
              />

              <div className="absolute w-full max-w-sm px-4 -bottom-4 right-5 lg:right-10">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-white border px-3 py-2 text-sm font-medium text-brand hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span>Edit</span>
                        <EditIcon
                          className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-brand transition duration-150 ease-in-out group-hover:text-opacity-80`}
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 translate-x-1/2 transform w-40 cursor-pointer border rounded-md">
                          <label className="cursor-pointer text-brand tracking-[0.02em] text-sm lg:text-base font-normal hover:text-white bg-white hover:bg-brand px-4 py-3 rounded-md block">
                            <input
                              type="file"
                              className="sr-only cursor-pointer"
                              onChange={(
                                event: ChangeEvent<HTMLInputElement>
                              ) => onFileInputChange(event)}
                              disabled={isLoading}
                              accept=".png, .jpeg, .jpg,.pdf,.doc,.docx"
                            />
                            Upload a Photo
                          </label>
                          {profile?.avatar_url !== '' && (
                            <label
                              onClick={() => handleFileUpload('')}
                              className="cursor-pointer text-brand tracking-[0.02em] text-sm lg:text-base font-normal hover:text-white bg-white hover:bg-brand px-4 py-3 rounded-md block"
                            >
                              Remove Photo
                            </label>
                          )}
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </div>
            <div className="flex flex-col  space-y-1 truncate">
              <span className="text-sm lg:text-xl font-normal text-lightGray truncate">
                {profile?.first_name} {profile?.last_name}
              </span>
              <span className="text-sm font-normal text-lightGray truncate">
                {profile?.email}
              </span>
            </div>
          </div>
          <button onClick={() => setIsOpen(true)}>
            <LogoutIcon className="hover:cursor-pointer lg:h-12 lg:w-12 w-7 h-7 text-lightGray" />
          </button>
        </section>
        <ProfileBasicDetailsForm />
        <ProfileChangePasswordForm />
      </div>
      <LogoutModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
