import {
  InterfaceKycDocumentsTypes,
  OptionsProps,
  useGetAccountInfoData,
  useGetKycDocumentsData,
  useGetKycDocumentsType,
  useGetProfile,
  useUploadKycDocuments,
} from '@corpcare/shared/api';
import {
  CustomToast,
  DustbinBrandIcon,
  LandScapeSmallIcon,
} from '@corpcare/web/ui';
import classNames from 'classnames';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactSelect from 'react-select';
import { NextRouter, useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const PersonalDocumentsFormSchema = yup.object({
  mandatory_document_form: yup.array().of(
    yup.object().shape({
      mandatory_document_type: yup.mixed().label('Mandatory Document Type'),
      mandatory_document_file: yup
        .mixed()
        .required()
        .label('Mandatory Document File'),
      mandatory_document: yup.mixed().required().label('Mandatory Document'),
    })
  ),
  proof_of_identity_type: yup.mixed().label('Proof of Identity Type'),
  proof_of_identity_file: yup.mixed().label('Proof of Identity File'),
  proof_of_identity: yup.mixed().label('Proof of Identity'),
  proof_of_address_type: yup.mixed().label('Proof of Address Type'),
  proof_of_address_file: yup.mixed().label('Proof of Address File'),
  proof_of_address: yup.mixed().label('Proof of Address'),
});

type PersonalDocumentsFormFields = yup.InferType<
  typeof PersonalDocumentsFormSchema
>;

export const KycVerificationPersonalDocuments = ({
  setCurrentTabIndex,
  currentTabIndex,
}: {
  setCurrentTabIndex: Dispatch<
    SetStateAction<
      'basic-details' | 'personal-documents' | 'registered-address'
    >
  >;
  currentTabIndex: 'personal-documents';
}) => {
  const router = useRouter() as NextRouter;
  const { data: kycDocumentsTypes } = useGetKycDocumentsType();
  const { data: uploadedDocuments, refetch } = useGetKycDocumentsData();
  const { mutate: uploadDocuments, isLoading: uploading } =
    useUploadKycDocuments();
  const { data: profile } = useGetProfile();
  const { data: accountInfo } = useGetAccountInfoData();
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    control,
    reset,
    setError,
    handleSubmit,
  } = useForm<PersonalDocumentsFormFields>({
    resolver: yupResolver(PersonalDocumentsFormSchema),
  });
  useEffect(() => {
    if (uploadedDocuments?.length === 0) return;
    const mandatoryReference = uploadedDocuments
      ?.filter(
        (item) =>
          item?.kyc_document ===
          kycDocumentsTypes?.filter((item) => item.category === 'mandatory')[0]
            ?.id
      )
      .map((_item) => {
        return {
          mandatory_document: _item,
          mandatory_document_file: _item?.url,
          mandatory_document_type: kycDocumentsTypes
            ?.filter(
              (_item) =>
                _item?.id ===
                uploadedDocuments?.filter(
                  (item) =>
                    item?.kyc_document ===
                    kycDocumentsTypes?.filter(
                      (item) => item.category === 'mandatory'
                    )[0]?.id
                )[0]?.kyc_document
            )
            ?.map((_documentType) => {
              return {
                value: _documentType?.id,
                label: _documentType?.type.replace(/_/g, ' ').toUpperCase(),
              };
            })[0],
        };
      });
    reset({
      proof_of_identity: uploadedDocuments?.filter(
        (item) =>
          item?.kyc_document ===
          kycDocumentsTypes?.filter(
            (item) => item.category === 'identity_proof'
          )[0]?.id
      )[0],
      proof_of_identity_type: kycDocumentsTypes
        ?.filter(
          (_item) =>
            _item?.id ===
            uploadedDocuments?.filter(
              (item) =>
                item?.kyc_document ===
                kycDocumentsTypes?.filter(
                  (item) => item.category === 'identity_proof'
                )[0]?.id
            )[0]?.kyc_document
        )
        ?.map((_documentType) => {
          return {
            value: _documentType?.id,
            label: _documentType?.type.replace(/_/g, ' ').toUpperCase(),
          };
        })[0],

      proof_of_address: uploadedDocuments?.filter(
        (item) =>
          item?.kyc_document ===
          kycDocumentsTypes?.filter(
            (item) => item.category === 'address_proof'
          )[0]?.id
      )[0],
      proof_of_address_type: kycDocumentsTypes
        ?.filter(
          (_item) =>
            _item?.id ===
            uploadedDocuments?.filter(
              (item) =>
                item?.kyc_document ===
                kycDocumentsTypes?.filter(
                  (item) => item.category === 'address_proof'
                )[0]?.id
            )[0]?.kyc_document
        )
        ?.map((_documentType) => {
          return {
            value: _documentType?.id,
            label: _documentType?.type.replace(/_/g, ' ').toUpperCase(),
          };
        })[0],
      mandatory_document_form: mandatoryReference as any,
    });
  }, [uploadedDocuments, kycDocumentsTypes, reset, watch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const KycDocumentsTypeMandatory = kycDocumentsTypes?.filter(
    (item) => item.category === 'mandatory'
  );
  const KycDocumentsTypeProofofIdentity = kycDocumentsTypes?.filter(
    (item) => item.category === 'identity_proof'
  );
  const KycDocumentsTypeProofofAddress = kycDocumentsTypes?.filter(
    (item) => item.category === 'address_proof'
  );
  const shouldBeDisabled =
    accountInfo?.kyc_status === 'submitted' ||
    accountInfo?.kyc_status === 'verified';

  const handleFileUpload = async (
    file: File,
    name: string,
    kycDocument: InterfaceKycDocumentsTypes
  ) => {
    const accountId = profile?.accounts?.[0]?.id || '';
    const { category, id: kyc_document_type_id } = kycDocument;
    if (shouldBeDisabled) return;
    try {
      uploadDocuments(
        { kyc_document_type_id, file, accountId },
        {
          onSuccess(response) {
            category === 'identity_proof' &&
              setValue('proof_of_identity', response);
            category === 'address_proof' &&
              setValue('proof_of_address', response);
            category === 'mandatory' &&
              setValue(
                `mandatory_document_form[${
                  name?.split('[')[1].split(']')[0]
                }].mandatory_document` as any,
                response
              );
            category === 'mandatory' &&
              setValue(
                `mandatory_document_form[${
                  name?.split('[')[1].split(']')[0]
                }].mandatory_document_file` as any,
                response
              );
          },
          onError(err: any) {
            console.error(err);
            toast.custom((t) => (
              <CustomToast
                t={t}
                message={
                  err?.message || 'Something went wrong! Please try again.'
                }
                type="error"
              />
            ));
            category === 'mandatory' &&
              setError(
                `mandatory_document_form[${
                  name?.split('[')[1].split(']')[0]
                }].mandatory_document_file` as any,
                {
                  type: 'custom',
                  message:
                    err?.message ||
                    'Failed to upload the document! Server Error',
                }
              );
            category === 'identity_proof' &&
              setError('proof_of_identity_file', {
                type: 'custom',
                message:
                  err?.message || 'Failed to upload the document! Server Error',
              });
            category === 'address_proof' &&
              setError('proof_of_address_file', {
                type: 'custom',
                message:
                  err?.message || 'Failed to upload the document! Server Error',
              });
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  };
  function onFileInputChange(
    event: ChangeEvent<HTMLInputElement>,
    kycDocument: InterfaceKycDocumentsTypes
  ) {
    const { files, name } = event.target;
    if (!files) return;
    const filesArr = Array.from(files);
    filesArr.forEach((file) => handleFileUpload(file, name, kycDocument));
  }
  return (
    <form
      onSubmit={handleSubmit(() => {
        setCurrentTabIndex('registered-address');
        router?.replace({
          pathname: '/profile/kyc-verification',
          hash: 'registered-address',
        });
      })}
    >
      <section className="text-lightGray text-xl font-medium mt-8 hidden lg:block">
        Personal Documents
      </section>

      <div className="lg:bg-white mt-3 mx-auto rounded-lg lg:p-8">
        <div className="border border-light  bg-white">
          <section className="text-lightGray font-normal text-lg lg:text-sm border-b border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
            Mandatory Document
          </section>
          <div className="mx-auto">
            <div className="grid grid-cols-2  p-5 lg:p-0">
              {KycDocumentsTypeMandatory?.map((item, idx) => {
                return (
                  <>
                    <div
                      className={classNames(
                        'col-span-2 flex justify-between xl:grid xl:grid-cols-4  items-center border-brandLight lg:p-7 py-2 w-full'
                      )}
                      key={idx}
                    >
                      <div
                        className="flex items-center gap-3 xl:col-span-2 flex-grow "
                        style={{
                          flex: '1 1 100%',
                          minWidth: 0,
                        }}
                      >
                        {watch(
                          `mandatory_document_form[${idx}].mandatory_document` as any
                        ) !== undefined ? (
                          <img
                            src={
                              watch(
                                `mandatory_document_form[${idx}].mandatory_document` as any
                              )?.url
                            }
                            alt={
                              watch(
                                `mandatory_document_form[${idx}].mandatory_document` as any
                              ) !== undefined
                                ? watch(
                                    `mandatory_document_form[${idx}].mandatory_document` as any
                                  )
                                    ?.url?.split('kyc-documents/')[1]
                                    ?.split(/-(.+)/)[1]
                                : 'File Name'
                            }
                            className="w-9 h-6 lg:w-12 lg:h-12 min-w-[36px]"
                          />
                        ) : (
                          <LandScapeSmallIcon className="w-9 h-6 text-brand lg:w-12 lg:h-12 min-w-[36px]" />
                        )}
                        <p className="text-sm font-normal text-lightGray self-center capitalize lg:uppercase truncate">
                          <span className="text-xs font-normal text-lightGray self-center lg:hidden">
                            {watch(
                              `mandatory_document_form[${idx}].mandatory_document` as any
                            ) !== undefined
                              ? watch(
                                  `mandatory_document_form[${idx}].mandatory_document` as any
                                )
                                  ?.url?.split('kyc-documents/')[1]
                                  ?.split(/-(.+)/)[1]
                              : 'File Name'}
                          </span>
                          <br className="lg:hidden" />
                          {!watch(
                            `mandatory_document_form[${0}].mandatory_document_type` as any
                          )?.label
                            ? KycDocumentsTypeMandatory[idx]?.type
                                ?.replace(/_/g, ' ')
                                .toUpperCase()
                            : watch(
                                `mandatory_document_form[${idx}].mandatory_document_type` as any
                              )?.label}
                          &nbsp;
                          <span className="font-bold text-red-600 text-xl">
                            *
                          </span>
                        </p>
                      </div>
                      <p className="truncate text-xs font-normal text-lightGray self-center hidden lg:block">
                        {watch(
                          `mandatory_document_form[${idx}].mandatory_document` as any
                        ) !== undefined
                          ? watch(
                              `mandatory_document_form[${idx}].mandatory_document` as any
                            )
                              ?.url?.split('kyc-documents/')[1]
                              ?.split(/-(.+)/)[1]
                          : 'File Name'}
                      </p>
                      <div className="flex items-center justify-end gap-2 sm:gap-5">
                        <label
                          className={classNames(
                            'Button lg:py-2 lg:px-4 p-2 text-sm text-lightGray  border border-brand rounded bg-white font-normal self-center cursor-pointer  justify-self-end text-center relative',
                            watch(
                              `mandatory_document_form[${idx}].mandatory_document` as any
                            ) !== undefined &&
                              'bg-[#D7FFE7] border-[#209E52] text-[#209E52] hover:bg-[#209E52] cursor-not-allowed'
                          )}
                        >
                          <input
                            type="file"
                            className="sr-only"
                            {...register(
                              `mandatory_document_form[${idx}].mandatory_document_file` as any
                            )}
                            onChange={(event) => {
                              if (!KycDocumentsTypeMandatory) return;
                              onFileInputChange(
                                event,
                                KycDocumentsTypeMandatory[0]
                              );
                            }}
                            accept=".png, .jpeg, .jpg,.pdf,.doc,.docx"
                            disabled={
                              watch(
                                `mandatory_document_form[${idx}].mandatory_document` as any
                              ) !== undefined
                            }
                          />
                          {watch(
                            `mandatory_document_form[${idx}].mandatory_document` as any
                          ) === undefined
                            ? 'Upload'
                            : 'Uploaded'}
                        </label>
                        {watch(
                          `mandatory_document_form[${idx}].mandatory_document` as any
                        ) !== undefined && (
                          <label
                            className={classNames(
                              'OutlineButton p-2 group relative cursor-pointer',
                              shouldBeDisabled &&
                                'bg-gray-300 cursor-not-allowed hover:bg-gray-300'
                            )}
                            onClick={() => {
                              if (shouldBeDisabled) return;
                              setValue(
                                `mandatory_document_form[${idx}].mandatory_document_file` as any,
                                undefined
                              );
                              setValue(
                                `mandatory_document_form[${idx}].mandatory_document` as any,
                                undefined
                              );
                            }}
                          >
                            <DustbinBrandIcon
                              className={classNames(
                                'w-5 h-5 lg:w-6 lg:h-6 text-brand group-hover:cursor-pointer group-hover:text-white',
                                shouldBeDisabled &&
                                  'group-hover:text-brand group-hover:cursor-not-allowed'
                              )}
                            />
                          </label>
                        )}
                      </div>
                      <div className="FieldError hidden lg:block col-span-2">
                        {!errors?.mandatory_document_form?.[idx]
                          ?.mandatory_document_file?.message
                          ? errors?.mandatory_document_form?.[idx]
                              ?.mandatory_document?.message
                          : errors?.mandatory_document_form?.[idx]
                              ?.mandatory_document_file?.message}
                      </div>
                    </div>
                    <div className="FieldError lg:hidden col-span-2">
                      {!errors?.mandatory_document_form?.[idx]
                        ?.mandatory_document_file?.message
                        ? errors?.mandatory_document_form?.[idx]
                            ?.mandatory_document?.message
                        : errors?.mandatory_document_form?.[idx]
                            ?.mandatory_document_file?.message}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        {accountInfo?.account_type === 'individual' && (
          <div className="border border-light mt-8 bg-white">
            <section className="text-lightGray font-normal text-lg lg:text-sm border-b border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
              Proof of Identity
            </section>
            <div className="mx-auto p-5 lg:p-7">
              <div className="grid grid-cols-2 gap-6">
                <label className="col-span-2">
                  <span className="Label">
                    Choose any one of the documents for Proof of Identity
                    Verification
                  </span>
                  <Controller
                    control={control}
                    name="proof_of_identity_type"
                    render={({ field: { value, onChange, name, ref } }) => {
                      return (
                        <ReactSelect
                          placeholder={
                            <div className="text-sm text-lighterGray">
                              Select ...
                            </div>
                          }
                          classNamePrefix={classNames('Input')}
                          options={KycDocumentsTypeProofofIdentity?.map(
                            (_documentType) => {
                              return {
                                value: _documentType?.id,
                                label: _documentType?.type
                                  .replace(/_/g, ' ')
                                  .toUpperCase(),
                              };
                            }
                          )}
                          onChange={(e: OptionsProps) => {
                            onChange(e);
                          }}
                          value={value}
                          isSearchable={false}
                          isDisabled={watch('proof_of_identity') !== undefined}
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
                                : errors.proof_of_identity_type
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
                </label>
                {watch('proof_of_identity_type') !== undefined && (
                  <div
                    className={classNames(
                      'col-span-2 flex justify-between  xl:grid xl:grid-cols-4 items-center border-brandLight w-full'
                    )}
                  >
                    <div
                      className="flex items-center gap-3 xl:col-span-2 flex-grow "
                      style={{
                        flex: '1 1 100%',
                        minWidth: 0,
                      }}
                    >
                      {watch('proof_of_identity') !== undefined ? (
                        <img
                          src={watch('proof_of_identity')?.url}
                          alt={
                            watch('proof_of_identity') !== undefined
                              ? watch('proof_of_identity')
                                  ?.url?.split('kyc-documents/')[1]
                                  ?.split(/-(.+)/)[1]
                              : 'File Name'
                          }
                          className="w-9 h-6 lg:w-12 lg:h-12 min-w-[36px]"
                        />
                      ) : (
                        <LandScapeSmallIcon className="w-9 h-6 text-brand lg:w-12 lg:h-12 min-w-[36px]" />
                      )}
                      <p className="text-sm font-normal text-lightGray self-center capitalize lg:uppercase truncate">
                        <span className="truncate text-xs font-normal text-lightGray self-center lg:hidden">
                          {watch('proof_of_identity') !== undefined
                            ? watch('proof_of_identity')
                                ?.url?.split('kyc-documents/')[1]
                                ?.split(/-(.+)/)[1]
                            : 'File Name'}
                        </span>
                        <br className="lg:hidden" />
                        {watch('proof_of_identity_type')?.label}
                      </p>
                    </div>
                    <p className="truncate text-xs font-normal text-lightGray self-center hidden lg:block">
                      {watch('proof_of_identity') !== undefined
                        ? watch('proof_of_identity')
                            ?.url?.split('kyc-documents/')[1]
                            ?.split(/-(.+)/)[1]
                        : 'File Name'}
                    </p>

                    <div className="flex items-center justify-end gap-2 sm:gap-5">
                      <label
                        className={classNames(
                          'Button lg:py-2 lg:px-4 p-2 text-sm text-lightGray  border border-brand rounded bg-white font-normal self-center cursor-pointer  justify-self-end text-center relative',
                          watch('proof_of_identity') !== undefined &&
                            'bg-[#D7FFE7] border-[#209E52] text-[#209E52] hover:bg-[#209E52] cursor-not-allowed'
                        )}
                      >
                        <input
                          type="file"
                          className="sr-only"
                          {...register('proof_of_identity_file')}
                          onChange={(event) => {
                            if (!KycDocumentsTypeProofofIdentity) return;
                            onFileInputChange(
                              event,
                              KycDocumentsTypeProofofIdentity[0]
                            );
                          }}
                          accept=".png, .jpeg, .jpg,.pdf,.doc,.docx"
                          disabled={watch('proof_of_identity') !== undefined}
                        />
                        {watch('proof_of_identity') === undefined
                          ? 'Upload'
                          : 'Uploaded'}
                      </label>
                      {watch('proof_of_identity') !== undefined && (
                        <label
                          className={classNames(
                            'OutlineButton p-2 group relative cursor-pointer',
                            shouldBeDisabled &&
                              'bg-gray-300 cursor-not-allowed hover:bg-gray-300'
                          )}
                          onClick={() => {
                            if (shouldBeDisabled) return;
                            setValue('proof_of_identity_file', undefined);
                            setValue('proof_of_identity', undefined);
                          }}
                        >
                          <DustbinBrandIcon
                            className={classNames(
                              'w-5 h-5 lg:w-6 lg:h-6 text-brand group-hover:cursor-pointer group-hover:text-white',
                              shouldBeDisabled &&
                                'group-hover:text-brand group-hover:cursor-not-allowed'
                            )}
                          />
                        </label>
                      )}
                    </div>
                    <div className="FieldError hidden lg:block col-span-2">
                      {errors?.proof_of_identity_file?.message}
                    </div>
                  </div>
                )}
                <div className="FieldError lg:hidden col-span-2">
                  {errors?.proof_of_identity_file?.message}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="border border-light mt-8 bg-white">
          <section className="text-lightGray font-normal text-lg lg:text-sm border-b border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
            Proof of Address
          </section>
          <div className="mx-auto p-5 lg:p-7">
            <div className="grid grid-cols-2 gap-6">
              <label className="col-span-2">
                <span className="Label">
                  Choose any one of the documents for Proof of Address
                  Verification
                </span>
                <Controller
                  control={control}
                  name="proof_of_address_type"
                  render={({ field: { value, onChange, name, ref } }) => {
                    return (
                      <ReactSelect
                        placeholder={
                          <div className="text-sm text-lighterGray">
                            Select ...
                          </div>
                        }
                        classNamePrefix={classNames('Input')}
                        options={KycDocumentsTypeProofofAddress?.map(
                          (_documentType) => {
                            return {
                              value: _documentType?.id,
                              label: _documentType?.type
                                .replace(/_/g, ' ')
                                .toUpperCase(),
                            };
                          }
                        )}
                        onChange={(e: OptionsProps) => {
                          onChange(e);
                        }}
                        isSearchable={false}
                        value={value}
                        isDisabled={watch('proof_of_address') !== undefined}
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
                              : errors.proof_of_address_type
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
              </label>
              {watch('proof_of_address_type') !== undefined && (
                <div
                  className={classNames(
                    'col-span-2 flex justify-between  xl:grid xl:grid-cols-4 items-center border-brandLight w-full'
                  )}
                >
                  <div
                    className="flex items-center gap-3 xl:col-span-2 flex-grow "
                    style={{
                      flex: '1 1 100%',
                      minWidth: 0,
                    }}
                  >
                    {watch('proof_of_address') !== undefined ? (
                      <img
                        src={watch('proof_of_address')?.url}
                        alt={
                          watch('proof_of_address') !== undefined
                            ? watch('proof_of_address')
                                ?.url?.split('kyc-documents/')[1]
                                ?.split(/-(.+)/)[1]
                            : 'File Name'
                        }
                        className="w-9 h-6 lg:w-12 lg:h-12 min-w-[36px]"
                      />
                    ) : (
                      <LandScapeSmallIcon className="w-9 h-6 text-brand lg:w-12 lg:h-12 min-w-[36px]" />
                    )}
                    <p className="text-sm font-normal text-lightGray self-center capitalize lg:uppercase  truncate">
                      <span className="truncate text-xs font-normal text-lightGray self-center lg:hidden">
                        {watch('proof_of_address') !== undefined
                          ? watch('proof_of_address')
                              ?.url?.split('kyc-documents/')[1]
                              ?.split(/-(.+)/)[1]
                          : 'File Name'}
                      </span>
                      <br className="lg:hidden" />
                      {watch('proof_of_address_type')?.label}
                    </p>
                  </div>
                  <p className="truncate text-xs font-normal text-lightGray self-center hidden lg:block">
                    {watch('proof_of_address') !== undefined
                      ? watch('proof_of_address')
                          ?.url?.split('kyc-documents/')[1]
                          ?.split(/-(.+)/)[1]
                      : 'File Name'}
                  </p>

                  <div className="flex items-center justify-end gap-2 sm:gap-5">
                    <label
                      className={classNames(
                        'Button lg:py-2 lg:px-4 p-2 text-sm text-lightGray  border border-brand rounded bg-white font-normal self-center cursor-pointer  justify-self-end text-center relative',
                        watch('proof_of_address') !== undefined &&
                          'bg-[#D7FFE7] border-[#209E52] text-[#209E52] hover:bg-[#209E52] cursor-not-allowed'
                      )}
                    >
                      <input
                        type="file"
                        className="sr-only"
                        {...register('proof_of_address_file')}
                        onChange={(event) => {
                          if (!KycDocumentsTypeProofofAddress) return;
                          onFileInputChange(
                            event,
                            KycDocumentsTypeProofofAddress[0]
                          );
                        }}
                        accept=".png, .jpeg, .jpg,.pdf,.doc,.docx"
                        disabled={watch('proof_of_address') !== undefined}
                      />
                      {watch('proof_of_address') === undefined
                        ? 'Upload'
                        : 'Uploaded'}
                    </label>
                    {watch('proof_of_address') !== undefined && (
                      <label
                        onClick={() => {
                          if (shouldBeDisabled) return;
                          setValue('proof_of_address_file', undefined);
                          setValue('proof_of_address', undefined);
                        }}
                        className={classNames(
                          'OutlineButton p-2 group relative cursor-pointer',
                          shouldBeDisabled &&
                            'bg-gray-300 cursor-not-allowed hover:bg-gray-300'
                        )}
                      >
                        <DustbinBrandIcon
                          className={classNames(
                            'w-5 h-5 lg:w-6 lg:h-6 text-brand group-hover:cursor-pointer group-hover:text-white',
                            shouldBeDisabled &&
                              'group-hover:text-brand group-hover:cursor-not-allowed'
                          )}
                        />
                      </label>
                    )}
                  </div>
                  <div className="FieldError hidden lg:block col-span-2">
                    {errors?.proof_of_address_file?.message}
                  </div>
                </div>
              )}
              <div className="FieldError lg:hidden col-span-2">
                {errors?.proof_of_address_file?.message}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="flex items-center">
        <button
          className="OutlineButton  uppercase max-w-[228px] w-full mt-6 justify-center"
          onClick={() => {
            setCurrentTabIndex('basic-details');
            router?.replace({
              pathname: '/profile/kyc-verification',
              hash: 'basic-details',
            });
          }}
        >
          Prev
        </button>
        <button
          className="Button uppercase max-w-[228px] w-full mt-6 ml-4  justify-center"
          type="submit"
        >
          Next
        </button>
      </section>
    </form>
  );
};
