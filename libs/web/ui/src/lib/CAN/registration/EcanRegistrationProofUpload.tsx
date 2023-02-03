import {
  IOptions,
  proofUploadOptions,
  usePostCANProofUploadDetails,
} from '@corpcare/shared/api';
import {
  ArrowDownCircleBrandFillIcon,
  ChevronCircleArrowIcon,
  CustomToast,
  DustbinBrandIcon,
  SpinnerIcon,
  UploadDocumentIcon,
} from '@corpcare/web/ui';
import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';

const ecanRegistrationCANProofUploadFormSchema = yup.object().shape({
  proof_upload: yup.array().of(
    yup.object().shape({
      type: yup.string().label('Proof Type').required(),
      file_url: yup.string().label('Proof Document').required(),
      file_upload: yup.mixed().label('Document'),
    })
  ),
});

const tableColumns = [
  { name: 'imagePreview' as const, label: 'Image Preview' },
  { name: 'imageName' as const, label: 'Image Name' },
  { name: 'proofType' as const, label: 'Proof Type.' },
  { name: 'action' as const, label: 'Action' },
];
export const EcanRegistrationProofUpload = ({
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
  const { mutate: uploadFile, isLoading: proofUploadLoading } =
    usePostCANProofUploadDetails();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    register,
    formState: { errors, isDirty },
    clearErrors,
    setError,
    unregister,
  } = useForm({
    resolver: yupResolver(ecanRegistrationCANProofUploadFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'proof_upload',
  });

  useEffect(() => {
    if (data?.data?.data?.proof_documents)
      reset({
        proof_upload: data.data.data.proof_documents,
      });
  }, [reset, data]);

  useEffect(() => {
    if (!data?.data?.data?.proof_documents) {
      data?.data?.data?.bank_accounts?.map((item, index) => {
        append({
          type: 'bank_proof',
          file_url: '',
          file_upload: '',
        });
      });
      data?.data?.data?.holders?.map((item, index) => {
        append({
          type: 'pan_card',
          file_url: '',
          file_upload: '',
        });
      });

      data?.data?.data?.nominees?.map((item, index) => {
        if (item?.guardian_relation) {
          append({
            type: 'minor_guardian_proof',
            file_url: '',
            file_upload: '',
          });
        }
      });
      data?.data?.data?.holders?.map((item, index) => {
        if (item?.type !== 'PR') {
          append({
            type: 'others',
            file_url: '',
            file_upload: '',
          });
        }
      });
    } else {
      data?.data?.data?.bank_accounts?.map((item, index) => {
        if (
          data?.data?.data?.proof_documents?.filter(
            (_doc) => _doc?.type === 'bank_proof'
          )?.length <
          index + 1
        ) {
          append({
            type: 'bank_proof',
            file_url: '',
            file_upload: '',
          });
        }
      });
      data?.data?.data?.holders?.map((item, index) => {
        if (
          data?.data?.data?.proof_documents?.filter(
            (_doc) => _doc?.type === 'pan_card'
          )?.length <
          index + 1
        ) {
          append({
            type: 'pan_card',
            file_url: '',
            file_upload: '',
          });
        }
      });

      const nomineesRef = data?.data?.data?.nominees?.filter(
        (item, index) => !!item?.guardian_relation
      );
      nomineesRef?.map((item, index) => {
        if (
          data?.data?.data?.proof_documents?.filter(
            (_doc) => _doc?.type === 'minor_guardian_proof'
          )?.length <
          index + 1
        ) {
          append({
            type: 'minor_guardian_proof',
            file_url: '',
            file_upload: '',
          });
        }
      });
      const holdersRef = data?.data?.data?.holders?.filter(
        (item, index) => item?.type !== 'PR'
      );

      holdersRef?.map((item, index) => {
        if (
          data?.data?.data?.proof_documents?.filter(
            (_doc) => _doc?.type === 'others'
          )?.length <
          index + 1
        ) {
          append({
            type: 'others',
            file_url: '',
            file_upload: '',
          });
        }
      });
    }
  }, [append, data]);

  const handleFileUpload = async (file: File, index: number, name: string) => {
    uploadFile(
      { file },
      {
        onSuccess(data) {
          setValue(`proof_upload.${index}.file_url`, data?.url);
          unregister(`proof_upload.${index}.file_upload`);
          clearErrors();
        },
        onError(error: any) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              message={
                error?.message || 'Something went wrong! Please try again.'
              }
              type="error"
            />
          ));
          setError(`proof_upload.${index}.file_url`, {
            type: 'custom',
            message:
              error?.message || 'Something went wrong! Please try again.',
          });
        },
      }
    );
  };

  function onFileInputChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const { files, name } = event.target;
    if (!files) return;
    const filesArr = Array.from(files);
    filesArr.forEach((file) => handleFileUpload(file, index, name));
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, isDirty))}>
      <section className="text-lightGray text-xl font-medium mt-8">
        Proof Upload
      </section>
      <div className="mt-3 mx-auto lg:p-8 lg:bg-white rounded-lg">
        <div className="border-[1px] border-light mb-4 lg:mb-8 bg-white rounded-lg">
          <section className="text-lightGray font-normal text-sm border-b border-light rounded-t rounded-b-none px-5 lg:px-7 py-3 bg-lighter">
            Proof Upload
          </section>
          <div className="mx-auto p-5 lg:p-7">
            <div className="grid grid-cols-2 gap-6">
              <p className="col-span-2 text-lightGray font-normal text-sm">
                Please ensure that you upload all the required document proofs
                before Submit eCAN as you will not be permitted to upload any
                document images once the CAN data is VERIFIED at CorpCare.
              </p>
              <span
                className="Button col-span-2 uppercase max-w-[130px] lg:max-w-[228px] w-full cursor-pointer text-center"
                onClick={() => append({})}
              >
                ADD FILES
              </span>
            </div>
          </div>
          <div
            className={classNames(
              'bg-white border-t lg:block hidden overflow-auto',
              proofUploadLoading && 'animate-pulse pointer-events-none'
            )}
          >
            <table className="border-hidden">
              <thead>
                <tr className="text-lightGray bg-lighter">
                  {tableColumns.map((col) => (
                    <th
                      className="py-4 font-normal border-x-0 px-6"
                      key={col.name}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {fields.map((field, index) => {
                  return (
                    <tr className="text-lighterGray" key={index}>
                      <td className="border-x-0 p-6">
                        {!watch(`proof_upload.${index}.file_url`) ? (
                          <img
                            src="/cross-image-default-banner.png"
                            alt="upload_image"
                            className="max-w-[100px] h-[60px]"
                          />
                        ) : (
                          <img
                            src={watch(`proof_upload.${index}.file_url`)}
                            alt={
                              !watch(`proof_upload.${index}.file_url`)
                                ? 'File Name'
                                : watch(`proof_upload.${index}.file_url`)
                                    ?.split('can-proof/')[1]
                                    ?.split(/-(.+)/)[1]
                            }
                            className="max-w-[100px] h-[60px] object-scale-down w-auto"
                          />
                        )}
                        <span className="FieldError">
                          {errors['proof_upload']?.[index]?.file_url?.message}
                        </span>
                      </td>
                      <td className="border-x-0 p-6">
                        {!watch(`proof_upload.${index}.file_url`)
                          ? 'File Name'
                          : watch(`proof_upload.${index}.file_url`)
                              ?.split('can-proof/')[1]
                              ?.split(/-(.+)/)[1]}
                      </td>
                      <td className="border-x-0 p-6">
                        <Controller
                          control={control}
                          key={field.id}
                          name={`proof_upload.${index}.type`}
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
                                menuPortalTarget={document.querySelector(
                                  'body'
                                )}
                                options={proofUploadOptions}
                                value={proofUploadOptions.find(
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
                                      : errors['proof_upload']?.[index]?.type
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
                          {errors['proof_upload']?.[index]?.type?.message}
                        </span>
                      </td>
                      <td className="border-x-0 p-6">
                        <label className="OutlineButton inline-block p-2 group relative">
                          {!watch(`proof_upload.${index}.file_url`) ? (
                            <>
                              <input
                                type="file"
                                className="sr-only"
                                {...register(
                                  `proof_upload.${index}.file_upload`,
                                  {
                                    onChange: (e) =>
                                      onFileInputChange(e, index),
                                  }
                                )}
                                accept=".png, .jpeg, .jpg,.gif,.bmp"
                              />

                              <UploadDocumentIcon className="w-5 h-5 lg:w-6 lg:h-6 text-brand group-hover:cursor-pointer group-hover:text-white" />
                            </>
                          ) : (
                            <DustbinBrandIcon
                              className="w-5 h-5 lg:w-6 lg:h-6 text-brand group-hover:cursor-pointer group-hover:text-white"
                              onClick={() => {
                                remove(index);
                              }}
                            />
                          )}
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {fields.map((field, index) => {
          return (
            <div
              key={index}
              className={classNames(
                'rounded-lg divide-y bg-white mb-4 lg:hidden ',
                proofUploadLoading && 'animate-pulse pointer-events-none',
                index + 1 === 2 ? '' : 'mt-6 '
              )}
            >
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="py-3 px-5 flex justify-between items-center w-full">
                      <section className="flex flex-col items-start">
                        <p className="text-sm font-normal text-left text-lightGray">
                          Image Preview/Name
                        </p>
                      </section>
                      <span
                        className={classNames(
                          'px-2 rounded-full  transition-transform',
                          open ? '-rotate-180' : ''
                        )}
                      >
                        <ChevronCircleArrowIcon className="w-5 h-5" />
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col px-5 py-4">
                      {!watch(`proof_upload.${index}.file_url`) ? (
                        <img
                          src="/cross-image-default-banner.png"
                          alt="upload_image"
                          className="max-w-[100px] h-[60px]"
                        />
                      ) : (
                        <img
                          src={watch(`proof_upload.${index}.file_url`)}
                          alt={
                            !watch(`proof_upload.${index}.file_url`)
                              ? 'File Name'
                              : watch(`proof_upload.${index}.file_url`)
                                  ?.split('can-proof/')[1]
                                  ?.split(/-(.+)/)[1]
                          }
                          className="max-w-[100px] h-[60px] object-scale-down w-auto"
                        />
                      )}
                      <span className="FieldError">
                        {errors['proof_upload']?.[index]?.file_url?.message}
                      </span>
                      <p className="text-sm font-normal text-left text-lightGray mt-3">
                        {!watch(`proof_upload.${index}.file_url`)
                          ? 'File Name'
                          : watch(`proof_upload.${index}.file_url`)
                              ?.split('can-proof/')[1]
                              ?.split(/-(.+)/)[1]}
                      </p>
                      <div className="flex items-center justify-between mt-6 gap-5">
                        <label className="flex-grow">
                          <span className="Label">Proof Type</span>
                          <Controller
                            control={control}
                            key={field.id}
                            name={`proof_upload.${index}.type`}
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
                                  options={proofUploadOptions}
                                  value={proofUploadOptions.find(
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
                                        : errors['proof_upload']?.[index]?.type
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
                                      color: state.isSelected
                                        ? 'white'
                                        : '#555',
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
                            {errors['proof_upload']?.[index]?.type?.message}
                          </span>
                        </label>
                        <label className="OutlineButton p-2 group relative flex flex-col self-end mb-2">
                          {!watch(`proof_upload.${index}.file_url`) ? (
                            <>
                              <input
                                type="file"
                                className="sr-only"
                                {...register(
                                  `proof_upload.${index}.file_upload`,
                                  {
                                    onChange: (e) =>
                                      onFileInputChange(e, index),
                                  }
                                )}
                                accept=".png, .jpeg, .jpg,.gif,.bmp"
                              />

                              <UploadDocumentIcon className="w-5 h-5 lg:w-6 lg:h-6 text-brand group-hover:cursor-pointer group-hover:text-white" />
                            </>
                          ) : (
                            <DustbinBrandIcon
                              className="w-5 h-5 lg:w-6 lg:h-6 text-brand group-hover:cursor-pointer group-hover:text-white"
                              onClick={() => {
                                remove(index);
                              }}
                            />
                          )}
                        </label>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          );
        })}
        <section className="bg-white p-5 lg:p-0">
          <span className="font-normal text-sm lg:text-base text-lightGray">
            Note: The allowed image file formats ( GIF, JPG | JPEG, PNG, BMP ).
            Recommended file size should not be more than 500 KB.
          </span>
          <p className="flex justify-start items-start gap-3 mt-3">
            <ArrowDownCircleBrandFillIcon className="text-brand w-4 h-4 flex-shrink-0" />
            <span className="text-lightGray font-normal text-sm lg:text-base">
              The PAN proof MUST be SELF ATTESTED by respective PAN holder
            </span>
          </p>
          <p className="flex justify-start items-start gap-3 mt-5">
            <ArrowDownCircleBrandFillIcon className="text-brand w-4 h-4 flex-shrink-0" />
            <span className="text-lightGray font-normal text-sm lg:text-base">
              Bank document proof for each of the bank added :
              <ol>
                <li className="text-lightGray font-normal text-sm lg:text-base">
                  a. Bank statement must be latest (of the last 3 months) with
                  Bank A/C type, MICR, IFSC Code & Bank Account number (without
                  masking) OR
                </li>
                <li className="text-lightGray font-normal text-sm lg:text-base">
                  b. Cheque image should have CAN Primary holder/MINOR name
                  printed on it along with above details OR
                </li>
                <li className="text-lightGray font-normal text-sm lg:text-base">
                  c. Bank letter with all the above details
                </li>
              </ol>
            </span>
          </p>
        </section>
        <section className="flex items-center gap-5 lg:gap-6 mt-5 lg:mt-6">
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
            Submit
            {isLoading && (
              <SpinnerIcon className="w-6 h-6 text-white animate-spin fill-brand inline-flex ml-2" />
            )}
          </button>
        </section>
      </div>
    </form>
  );
};
