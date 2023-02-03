import { ReactElement } from 'react';
import {
  ProfileTabsLayout,
  AuthenticatedDashboardLayout,
} from '../../components/index';
import {
  ChangePasswordFields,
  changePasswordFormSchema,
  setFormFieldErrors,
  useChangePassword,
} from '@corpcare/shared/api';
import {
  PasswordNotVisibleIcon,
  PasswordVisibleIcon,
  SpinnerIcon,
  CustomToast,
} from '@corpcare/web/ui';
import { Switch } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const toggleFormSchema = yup.object({
  enable_two_factor_authentication: yup.bool().required(),
  product_recommendation: yup.bool().required(),
  email_alerts: yup.bool().required(),
  watchlist_updates: yup.bool().required(),
  price_alerts: yup.bool().required(),
});
type ToggleFormFields = yup.InferType<typeof toggleFormSchema>;

const SettingsPage = () => {
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

  const {
    watch: toggleWatch,
    control,
    getValues,
    formState: { isDirty },
  } = useForm<ToggleFormFields>({
    resolver: yupResolver(toggleFormSchema),
    defaultValues: {
      enable_two_factor_authentication: false,
      product_recommendation: false,
      email_alerts: false,
      watchlist_updates: false,
      price_alerts: false,
    },
  });
  const values = getValues();
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

  useEffect(() => {
    const handleFormValuesChange = () => {
      console.log({ ...values }, 'toggle_form');
    };
    handleFormValuesChange();
  }, [isDirty, values]);
  return (
    <>
      <ProfileTabsLayout>
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
          {/* <div className="border-[1px] border-light mt-6 bg-white rounded-lg lg:rounded-none opacity-60 pointer-events-none">
            <section className="text-lightGray font-normal text-base lg:text-sm  border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
              2 Factor Authentication
            </section>
            <form className="mx-auto p-5 lg:p-7 ">
              <div className="grid grid-cols-2 gap-6">
                <label className="col-span-2 flex justify-between">
                  <p className="text-base font-medium text-lightGray">
                    Enable 2FA
                  </p>
                  <Controller
                    control={control}
                    name="enable_two_factor_authentication"
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        className={classNames(
                          'relative inline-flex flex-shrink-0 h-[28px] w-[52px] border-2 border-brand rounded cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none bg-white items-center'
                        )}
                        onChange={(e) => onChange(e)}
                        checked={value}
                      >
                        <span
                          className={classNames(
                            toggleWatch('enable_two_factor_authentication')
                              ? 'translate-x-6'
                              : 'translate-x-1',
                            'pointer-events-none inline-block h-[22px] w-[22px] rounded bg-brand shadow transform ring-0 transition ease-in-out duration-200'
                          )}
                        />
                      </Switch>
                    )}
                  />
                </label>
              </div>
            </form>
          </div>
          <div className="border-[1px] border-light mt-6 bg-white rounded-lg lg:rounded-none opacity-60 pointer-events-none">
            <section className="text-lightGray font-normal text-base lg:text-sm border-b-[1px] border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
              Notifications
            </section>
            <form className="mx-auto p-5 lg:p-7">
              <div className="grid grid-cols-2 gap-6">
                <label className="col-span-2 flex justify-between">
                  <p className="text-base font-medium text-lightGray">
                    Product Recommendation
                    <br />
                    <span className="text-sm font-medium text-lightGray">
                      You&lsquo;ll get notification after every payment
                      transaction.
                    </span>
                    <br />
                    <span className="text-sm font-medium text-lightGray">
                      Manage all other notification here.
                    </span>
                  </p>
                  <Controller
                    control={control}
                    name="product_recommendation"
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        className={classNames(
                          'relative inline-flex flex-shrink-0 h-[28px] w-[52px] border-2 border-brand rounded cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none bg-white items-center'
                        )}
                        onChange={(e) => onChange(e)}
                        checked={value}
                      >
                        <span
                          className={classNames(
                            toggleWatch('product_recommendation')
                              ? 'translate-x-6'
                              : 'translate-x-1',
                            'pointer-events-none inline-block h-[22px] w-[22px] rounded bg-brand shadow transform ring-0 transition ease-in-out duration-200'
                          )}
                        />
                      </Switch>
                    )}
                  />
                </label>
                <label className="col-span-2 flex justify-between">
                  <p className="text-base font-medium text-lightGray">
                    Email Alerts
                    <br />
                    <span className="text-sm font-medium text-lightGray">
                      You&lsquo;ll get notification after every payment
                      transaction.
                    </span>
                    <br />
                    <span className="text-sm font-medium text-lightGray">
                      Manage all other notification here.
                    </span>
                  </p>
                  <Controller
                    control={control}
                    name="email_alerts"
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        className={classNames(
                          'relative inline-flex flex-shrink-0 h-[28px] w-[52px] border-2 border-brand rounded cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none bg-white items-center'
                        )}
                        onChange={(e) => onChange(e)}
                        checked={value}
                      >
                        <span
                          className={classNames(
                            toggleWatch('email_alerts')
                              ? 'translate-x-6'
                              : 'translate-x-1',
                            'pointer-events-none inline-block h-[22px] w-[22px] rounded bg-brand shadow transform ring-0 transition ease-in-out duration-200'
                          )}
                        />
                      </Switch>
                    )}
                  />
                </label>
                <label className="col-span-2 flex justify-between">
                  <p className="text-base font-medium text-lightGray">
                    Watchlist Updates
                    <br />
                    <span className="text-sm font-medium text-lightGray">
                      You&lsquo;ll get notification after every payment
                      transaction.
                    </span>
                    <br />
                    <span className="text-sm font-medium text-lightGray">
                      Manage all other notification here.
                    </span>
                  </p>
                  <Controller
                    control={control}
                    name="watchlist_updates"
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        className={classNames(
                          'relative inline-flex flex-shrink-0 h-[28px] w-[52px] border-2 border-brand rounded cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none bg-white items-center'
                        )}
                        onChange={(e) => onChange(e)}
                        checked={value}
                      >
                        <span
                          className={classNames(
                            toggleWatch('watchlist_updates')
                              ? 'translate-x-6'
                              : 'translate-x-1',
                            'pointer-events-none inline-block h-[22px] w-[22px] rounded bg-brand shadow transform ring-0 transition ease-in-out duration-200'
                          )}
                        />
                      </Switch>
                    )}
                  />
                </label>
                <label className="col-span-2 flex justify-between">
                  <p className="text-base font-medium text-lightGray">
                    Price Alerts
                    <br />
                    <span className="text-sm font-medium text-lightGray">
                      You&lsquo;ll get notification after every payment
                      transaction.
                    </span>
                    <br />
                    <span className="text-sm font-medium text-lightGray">
                      Manage all other notification here.
                    </span>
                  </p>
                  <Controller
                    control={control}
                    name="price_alerts"
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        className={classNames(
                          'relative inline-flex flex-shrink-0 h-[28px] w-[52px] border-2 border-brand rounded cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none bg-white items-center'
                        )}
                        onChange={(e) => onChange(e)}
                        checked={value}
                      >
                        <span
                          className={classNames(
                            toggleWatch('price_alerts')
                              ? 'translate-x-6'
                              : 'translate-x-1',
                            'pointer-events-none inline-block h-[22px] w-[22px] rounded bg-brand shadow transform ring-0 transition ease-in-out duration-200'
                          )}
                        />
                      </Switch>
                    )}
                  />
                </label>
              </div>
            </form>
          </div> */}
        </div>
      </ProfileTabsLayout>
    </>
  );
};

export default SettingsPage;

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
