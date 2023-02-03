import {
  IRoleType,
  RelationshipManagerAddFields,
  relationshipManagerFormSchema,
  roleTypeOptions,
  setFormFieldErrors,
  useAddRelationshipManager,
  useUploadRMCertificate,
} from '@corpcare/shared/api';
import { BlackCrossCircle, CustomToast } from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { ChangeEvent, Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
export default function AddNewRMModal({ isOpen, setIsOpen }) {
  const { mutate: upload, isSuccess: isUploadedSuccess } =
    useUploadRMCertificate();
  const { mutate } = useAddRelationshipManager();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    getValues,
    setValue,
  } = useForm<RelationshipManagerAddFields>({
    resolver: yupResolver(relationshipManagerFormSchema),
  });
  const handleFormSubmit = (data: RelationshipManagerAddFields) => {
    try {
      mutate(data, {
        onSuccess(data, variables, context) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={
                data?.message || 'Successfully added relationship manager.'
              }
              type="success"
            />
          ));
          setIsOpen(false);
        },
        onError(error: any) {
          setFormFieldErrors(error, setError);
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={
                error?.message || 'Something went wrong! Please try again.'
              }
              type="error"
            />
          ));
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      upload(
        { file },
        {
          onSuccess(data) {
            setValue('amfi_certificate_url', data?.url);
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
            setError('amfi_certificate_url', {
              type: 'custom',
              message: err?.message,
            });
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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-between border-b border-brandLight bg-lighter px-5 py-3 lg:px-10 lg:py-4">
                    <p className="font-medium text-lg lg:text-xl text-lightGray">
                      ADD New RM
                    </p>
                    <BlackCrossCircle
                      className="h-6 w-6 hover:cursor-pointer text-white"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  <section className="flex flex-col lg:px-8 lg:py-7 p-5">
                    <form
                      className="grid grid-cols-2 gap-4 lg:gap-5"
                      onSubmit={handleSubmit(handleFormSubmit)}
                    >
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">First Name</span>
                        <input
                          {...register('first_name')}
                          type="text"
                          placeholder="Enter RM’s First Name"
                          className={classNames(
                            'Input',
                            errors.first_name && 'border-brandError'
                          )}
                        />
                        <span className="FieldError">
                          {errors.first_name?.message}
                        </span>
                      </label>
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">Last Name</span>
                        <input
                          {...register('last_name')}
                          type="text"
                          placeholder="Enter RM’s Last Name"
                          className={classNames(
                            'Input',
                            errors.last_name && 'border-brandError'
                          )}
                        />
                        <span className="FieldError">
                          {errors.last_name?.message}
                        </span>
                      </label>
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">Email-id</span>
                        <input
                          {...register('email')}
                          type="text"
                          placeholder="Enter RM’s Email ID"
                          className={classNames(
                            'Input',
                            errors.email && 'border-brandError'
                          )}
                        />
                        <span className="FieldError">
                          {errors.email?.message}
                        </span>
                      </label>
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">Phone Number</span>
                        <input
                          {...register('mobile')}
                          type="text"
                          placeholder="Enter RM’s Mobile Number"
                          className={classNames(
                            'Input',
                            errors.mobile && 'border-brandError'
                          )}
                        />
                        <span className="FieldError">
                          {errors.mobile?.message}
                        </span>
                      </label>
                      <label className="col-span-2">
                        <span className="Label">Role</span>
                        <Controller
                          control={control}
                          name="role_type"
                          render={({
                            field: { value, onChange, name, ref },
                          }) => {
                            return (
                              <ReactSelect
                                placeholder={
                                  <div className="text-sm text-lighterGray">
                                    Select Role
                                  </div>
                                }
                                options={roleTypeOptions}
                                value={roleTypeOptions.find(
                                  (c) => c.value === value
                                )}
                                onChange={(e: IRoleType) => {
                                  onChange(e.value);
                                }}
                                isSearchable={false}
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
                                      : errors.role_type
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
                          {errors.role_type?.message}
                        </span>
                      </label>
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">EUIN/RIA</span>
                        <input
                          {...register('euin_ria')}
                          type="text"
                          placeholder="Enter RM’s EUIN/RIA"
                          className={classNames(
                            'Input',
                            errors.euin_ria && 'border-brandError'
                          )}
                        />
                        <span className="FieldError">
                          {errors.euin_ria?.message}
                        </span>
                      </label>
                      <label className="lg:col-span-1 col-span-2">
                        <span className="Label">Expiry Date</span>

                        <Controller
                          control={control}
                          name="euin_ria_expiry"
                          render={({
                            field: { value, onChange, name, ref },
                          }) => {
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
                                  errors.euin_ria_expiry && 'border-brandError'
                                )}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="Enter Expiry Date"
                              />
                            );
                          }}
                        />
                        <span className="FieldError">
                          {errors.euin_ria_expiry?.message}
                        </span>
                      </label>
                      <label className="lg:col-span-1 col-span-2 flex flex-col items-start justify-start">
                        <span className="Label">Upload AMFI Certificate</span>
                        <span className="Label">
                          {
                            getValues('amfi_certificate_url')
                              ?.split('rm-documents/')[1]
                              ?.split(/-(.+)/)[1]
                          }
                        </span>
                        <label
                          className={classNames(
                            'Button lg:py-2 lg:px-4 p-2 text-sm text-lightGray  border border-brand rounded bg-white font-normal cursor-pointer relative',
                            isUploadedSuccess
                              ? ' bg-[#D7FFE7] border-[#209E52] text-[#209E52] hover:bg-[#209E52] cursor-not-allowed'
                              : ''
                          )}
                        >
                          <input
                            type="file"
                            className="sr-only"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              onFileInputChange(event)
                            }
                            disabled={isUploadedSuccess}
                            accept=".png, .jpeg, .jpg,.pdf,.doc,.docx"
                          />
                          {isUploadedSuccess ? 'Uploaded' : 'Choose Files'}
                        </label>
                        <span className="FieldError">
                          {errors.amfi_certificate_url?.message}
                        </span>
                      </label>
                      <button
                        className="Button uppercase w-full col-span-2 lg:text-base text-sm"
                        type="submit"
                      >
                        add new rm
                      </button>
                    </form>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
