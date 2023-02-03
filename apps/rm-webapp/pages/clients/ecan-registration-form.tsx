import classnames from 'classnames';
import { Fragment, ReactElement, useEffect, useMemo, useState } from 'react';
import { AuthenticatedDashboardLayout } from '../../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../../components/DashboardHead';

import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  BlackCrossCircle,
  HamburgerMenuIcon,
  SECTION_ACCESS_DENIED_CONTENT,
  CustomToast,
  EcanRegistrationCANCriteria,
  EcanRegistrationPrimaryHolder,
  EcanRegistrationBankAccounts,
  EcanRegistrationProofUpload,
  EcanRegistrationNominess,
} from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';

import {
  CAN_CHECKLIST_ID,
  useCreateCANBySubmittingCANRequest,
  useGetAccountInfoData,
  useGetCANRegRequestData,
  useGetProfile,
  usePostCANCriteria,
  useUpdateCANRegChecklist,
} from '@corpcare/shared/api';
import toast from 'react-hot-toast';

const eCanRegistrationForm = [
  {
    title: 'CAN Criteria',
  },
  {
    title: 'Holder',
  },
  {
    title: 'Bank Accounts',
  },
  {
    title: 'Nominees',
  },
  {
    title: 'Proof Upload',
  },
];
export const ECanRegistrationFormOptions = ({
  isOptionBarOpen,
  closeOptionBar,
  currentTabIndex,
  setCurrentTabIndex,
}) => {
  const router = useRouter();

  return (
    <>
      <Transition.Root show={isOptionBarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={closeOptionBar}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="flex-1 flex flex-col max-w-xs w-full ">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="relative flex justify-between items-center px-4 py-3 bg-white max-w-[284px] border-b-[1px] border-brandLight">
                  <p className="uppercase text-sm text-lightGray font-normal">
                    CLOSE MENU
                  </p>

                  <BlackCrossCircle
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                    onClick={closeOptionBar}
                  />
                </div>
              </Transition.Child>
              <section className="max-w-[284px] w-full bg-white h-full px-4 pt-4 pb-16 overflow-y-auto flex-col flex">
                <ol className="overflow-hidden mt-6 flex-grow">
                  {eCanRegistrationForm.map(
                    (_eCanRegistrationForm, _eCanRegistrationFormIdx) => (
                      <li
                        key={_eCanRegistrationForm.title}
                        className={classnames(
                          _eCanRegistrationFormIdx !==
                            eCanRegistrationForm.length - 1
                            ? 'pb-10'
                            : '',
                          'relative'
                        )}
                      >
                        {_eCanRegistrationFormIdx !==
                        eCanRegistrationForm.length - 1 ? (
                          <div
                            className={classnames(
                              `-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full`,
                              _eCanRegistrationFormIdx + 1 <= currentTabIndex
                                ? 'bg-brand'
                                : 'bg-brandLight'
                            )}
                          />
                        ) : null}
                        <div className="relative flex items-start group">
                          <span className="h-9 flex items-center">
                            <span
                              className={classnames(
                                `relative z-10 w-8 h-8 flex items-center justify-center rounded text-white`,
                                _eCanRegistrationFormIdx + 1 <= currentTabIndex
                                  ? 'bg-brand'
                                  : 'bg-brandLight'
                              )}
                            >
                              {_eCanRegistrationFormIdx + 1}
                            </span>
                          </span>
                          <span className="text-base font-medium tracking-wide text-lightGray ml-4 self-center">
                            {_eCanRegistrationForm.title}
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ol>
                <button
                  className="uppercase OutlineButton w-full mt-6 text-sm"
                  onClick={() => router.push('/ecan-registration')}
                >
                  back to ecan
                </button>
              </section>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default function ECanRegistrationForm() {
  const [currentTabIndex, setCurrentTabIndex] = useState(1);
  const [isOptionBarOpen, setIsOptionBarOpen] = useState<boolean>(false);
  const [canRequestId, setCanRequestId] = useState<string>();

  const { data: profile } = useGetProfile();
  const {
    data,
    mutate: mutateRequestData,
    isLoading: mutateRequestDataLoading,
  } = useGetCANRegRequestData();
  const { mutate, isLoading: mutateLoading } = useUpdateCANRegChecklist();
  const { mutate: mutatePostCan, isLoading: mutatePostCanLoading } =
    usePostCANCriteria();
  const { mutate: createCAN, isLoading: createCANLoading } =
    useCreateCANBySubmittingCANRequest();
  const { data: accountInfo } = useGetAccountInfoData();

  const STEPS = useMemo(
    () => [
      CAN_CHECKLIST_ID.CAN_CRITERIA,
      CAN_CHECKLIST_ID.HOLDERS,
      CAN_CHECKLIST_ID.BANK_ACOUNTS,
      CAN_CHECKLIST_ID.NOMINEES,
      CAN_CHECKLIST_ID.PROOF_DOCUMENTS,
    ],
    []
  );

  const router = useRouter();
  const closeOptionBar = () => {
    setIsOptionBarOpen(false);
  };

  useEffect(() => {
    const { ecan_registration_id } = router.query as {
      ecan_registration_id?: string;
    };
    setCanRequestId(ecan_registration_id);
    if (ecan_registration_id && profile) {
      mutateRequestData({
        accountId: profile?.accounts?.[0]?.id || '',
        canRequestId: ecan_registration_id,
      });
    }
  }, [router, mutateRequestData, profile]);

  useEffect(() => {
    if (data) {
      if (data.checklist_completed.includes(CAN_CHECKLIST_ID.CAN_CRITERIA)) {
        if (data.checklist_completed.includes(CAN_CHECKLIST_ID.HOLDERS)) {
          if (
            data.checklist_completed.includes(CAN_CHECKLIST_ID.BANK_ACOUNTS)
          ) {
            if (data.checklist_completed.includes(CAN_CHECKLIST_ID.NOMINEES)) {
              if (
                data.checklist_completed.includes(
                  CAN_CHECKLIST_ID.PROOF_DOCUMENTS
                )
              ) {
                console.log('all done');
              } else {
                setCurrentTabIndex(
                  STEPS.findIndex(
                    (item) => item === CAN_CHECKLIST_ID.PROOF_DOCUMENTS
                  ) + 1
                );
              }
            } else {
              setCurrentTabIndex(
                STEPS.findIndex((item) => item === CAN_CHECKLIST_ID.NOMINEES) +
                  1
              );
            }
          } else {
            setCurrentTabIndex(
              STEPS.findIndex(
                (item) => item === CAN_CHECKLIST_ID.BANK_ACOUNTS
              ) + 1
            );
          }
        } else {
          setCurrentTabIndex(
            STEPS.findIndex((item) => item === CAN_CHECKLIST_ID.HOLDERS) + 1
          );
        }
      }
    }
  }, [data, STEPS]);

  function handleGoBack() {
    if (currentTabIndex > 0) {
      setCurrentTabIndex((prev) => prev - 1);
    }
  }

  if (accountInfo?.account_type === 'non_individual') {
    return (
      <div className="flex items-center justify-center h-full flex-col gap-2">
        <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
        <h1 className="text-center text-base lg:text-lg">
          {SECTION_ACCESS_DENIED_CONTENT}
        </h1>
      </div>
    );
  }
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">eCAN Registration</h2>
        <div className="text-xs text-lightGray">
          <Link href="/mutual-funds/all">
            <a>Mutual Funds </a>
          </Link>
          &gt;
          <Link href="/ecan-registration">
            <a className="lg:contents block truncate"> eCAN Registration</a>
          </Link>
        </div>
      </DashboardHead>
      <div className="DashboardHead mt-5 h-12 lg:hidden">
        <div className="flex-grow flex gap-3 items-center justify-between">
          <section className="flex gap-2 items-center">
            <HamburgerMenuIcon
              className="lg:hidden block w-6 h-6 text-brand"
              onClick={() => setIsOptionBarOpen(true)}
            />
            <span className="text-sm font-normal text-lightGray">
              OPEN MENU
            </span>
          </section>
          <div className="flex flex-col relative w-16">
            <div className="absolute top-0 right-4 w-0.5 h-full bg-brand rotate-90" />
            <span className="relative z-10 w-8 h-8 flex items-center justify-center rounded text-white bg-brand">
              {currentTabIndex}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-grow overflow-hidden">
        <section className="max-w-[284px] w-full bg-white h-full p-8 pb-16 overflow-y-auto lg:flex flex-shrink-0 flex-col hidden">
          <ol className="overflow-hidden mt-2 flex-grow">
            {eCanRegistrationForm.map(
              (_eCanRegistration, _eCanRegistrationIdx) => (
                <li
                  key={_eCanRegistration.title}
                  className={classnames(
                    _eCanRegistrationIdx !== eCanRegistrationForm.length - 1
                      ? 'pb-10'
                      : '',
                    'relative'
                  )}
                >
                  {_eCanRegistrationIdx !== eCanRegistrationForm.length - 1 ? (
                    <div
                      className={classnames(
                        `-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full`,
                        _eCanRegistrationIdx + 1 <= currentTabIndex
                          ? 'bg-brand'
                          : 'bg-brandLight'
                      )}
                    />
                  ) : null}
                  <div className="relative flex items-start group">
                    <span className="h-9 flex items-center">
                      <span
                        className={classnames(
                          `relative z-10 w-8 h-8 flex items-center justify-center rounded text-white`,
                          _eCanRegistrationIdx + 1 <= currentTabIndex
                            ? 'bg-brand'
                            : 'bg-brandLight'
                        )}
                      >
                        {_eCanRegistrationIdx + 1}
                      </span>
                    </span>
                    <span className="text-base font-medium tracking-wide text-lightGray ml-4 self-center">
                      {_eCanRegistration.title}
                    </span>
                  </div>
                </li>
              )
            )}
          </ol>
          <button
            className="uppercase OutlineButton w-full"
            onClick={() => router.push('/ecan-registration')}
          >
            back to ecan
          </button>
        </section>
        <div className="overflow-y-auto w-full">
          <div className="mx-3 lg:mx-8 mb-8 lg:mb-10">
            {currentTabIndex === 1 && (
              <EcanRegistrationCANCriteria
                isLoading={
                  mutatePostCanLoading ||
                  mutateRequestDataLoading ||
                  mutateLoading
                }
                data={data}
                onSubmit={async (data, isDirty) => {
                  if (!isDirty) {
                    setCurrentTabIndex((prev) => prev + 1);
                    return;
                  }
                  if (canRequestId) {
                    const dataRef = [data];
                    await mutate(
                      {
                        data: dataRef,
                        canChecklistId: CAN_CHECKLIST_ID.CAN_CRITERIA,
                        canRequestId,
                        accountId: profile?.accounts?.[0]?.id || '',
                      },
                      {
                        onSuccess: (res) => {
                          toast.custom((t) => (
                            <CustomToast
                              t={t}
                              message="SuccessFully updated CAN Criteria details"
                              type="success"
                            />
                          ));
                          mutateRequestData({
                            accountId: profile?.accounts?.[0]?.id || '',
                            canRequestId: canRequestId || '',
                          });
                          setCurrentTabIndex((prev) => prev + 1);
                        },
                        onError(error: any) {
                          toast.custom((t) => (
                            <CustomToast
                              t={t}
                              message={
                                error?.message ||
                                'Something went wrong! Please try again.'
                              }
                              type="error"
                            />
                          ));
                        },
                      }
                    );
                  } else {
                    mutatePostCan(
                      {
                        data: { can_criteria: data },
                        accountId: profile?.accounts?.[0]?.id,
                      },
                      {
                        onSuccess: async (data) => {
                          setCanRequestId(data.id);
                          router.push(
                            {
                              pathname: router.pathname,
                              query: { ecan_registration_id: data.id },
                            },
                            undefined,
                            { shallow: true }
                          );
                          toast.custom((t) => (
                            <CustomToast
                              t={t}
                              message="SuccessFully updated CAN Criteria details"
                              type="success"
                            />
                          ));
                          mutateRequestData({
                            accountId: profile?.accounts?.[0]?.id || '',
                            canRequestId: data.id,
                          });
                          setCurrentTabIndex((prev) => prev + 1);
                        },
                        onError(error: any) {
                          toast.custom((t) => (
                            <CustomToast
                              t={t}
                              message={
                                error?.message ||
                                'Something went wrong! Please try again.'
                              }
                              type="error"
                            />
                          ));
                        },
                      }
                    );
                  }
                }}
              />
            )}
            {currentTabIndex === 2 && (
              <EcanRegistrationPrimaryHolder
                goBack={handleGoBack}
                data={data}
                isLoading={mutateLoading || mutateRequestDataLoading}
                onSubmit={async (data, isDirty) => {
                  if (!isDirty) {
                    setCurrentTabIndex((prev) => prev + 1);
                    return;
                  }
                  const dataRef = data?.holder_form?.map(
                    ({ radio, re_pan, ...keepAttrs }) => keepAttrs
                  );
                  mutate(
                    {
                      data: dataRef,
                      canChecklistId: CAN_CHECKLIST_ID.HOLDERS,
                      canRequestId,
                      accountId: profile?.accounts?.[0]?.id || '',
                    },
                    {
                      onSuccess: (res) => {
                        toast.custom((t) => (
                          <CustomToast
                            t={t}
                            message="SuccessFully updated CAN Holder details"
                            type="success"
                          />
                        ));
                        mutateRequestData({
                          accountId: profile?.accounts?.[0]?.id || '',
                          canRequestId: canRequestId || '',
                        });
                        setCurrentTabIndex((prev) => prev + 1);
                      },
                      onError(error: any) {
                        toast.custom((t) => (
                          <CustomToast
                            t={t}
                            message={
                              error?.message ||
                              'Something went wrong! Please try again.'
                            }
                            type="error"
                          />
                        ));
                      },
                    }
                  );
                }}
              />
            )}
            {currentTabIndex === 3 && (
              <EcanRegistrationBankAccounts
                data={data}
                goBack={handleGoBack}
                isLoading={mutateLoading || mutateRequestDataLoading}
                onSubmit={async (data, isDirty) => {
                  if (!isDirty) {
                    setCurrentTabIndex((prev) => prev + 1);
                    return;
                  }
                  const dataRef = data?.bank_form?.map(
                    ({ re_account_number, ...keepAttrs }) => keepAttrs
                  );
                  mutate(
                    {
                      data: dataRef,
                      canChecklistId: CAN_CHECKLIST_ID.BANK_ACOUNTS,
                      canRequestId,
                      accountId: profile?.accounts?.[0]?.id || '',
                    },
                    {
                      onSuccess: (res) => {
                        toast.custom((t) => (
                          <CustomToast
                            t={t}
                            message="SuccessFully updated CAN Bank Details details"
                            type="success"
                          />
                        ));
                        mutateRequestData({
                          accountId: profile?.accounts?.[0]?.id || '',
                          canRequestId: canRequestId || '',
                        });
                        setCurrentTabIndex((prev) => prev + 1);
                      },
                      onError(error: any) {
                        toast.custom((t) => (
                          <CustomToast
                            t={t}
                            message={
                              error?.message ||
                              'Something went wrong! Please try again.'
                            }
                            type="error"
                          />
                        ));
                      },
                    }
                  );
                }}
              />
            )}
            {currentTabIndex === 4 && (
              <EcanRegistrationNominess
                data={data}
                isLoading={mutateLoading || mutateRequestDataLoading}
                goBack={handleGoBack}
                onSubmit={async (data, isDirty) => {
                  if (!isDirty) {
                    setCurrentTabIndex((prev) => prev + 1);
                    return;
                  }
                  mutate(
                    {
                      data: data.nominees,
                      canChecklistId: CAN_CHECKLIST_ID.NOMINEES,
                      canRequestId,
                      accountId: profile?.accounts?.[0]?.id || '',
                    },
                    {
                      onSuccess: (res) => {
                        toast.custom((t) => (
                          <CustomToast
                            t={t}
                            message="SuccessFully updated CAN Nominees details"
                            type="success"
                          />
                        ));
                        mutateRequestData({
                          accountId: profile?.accounts?.[0]?.id || '',
                          canRequestId: canRequestId || '',
                        });
                        setCurrentTabIndex((prev) => prev + 1);
                      },
                      onError(error: any) {
                        toast.custom((t) => (
                          <CustomToast
                            t={t}
                            message={
                              error?.message ||
                              'Something went wrong! Please try again.'
                            }
                            type="error"
                          />
                        ));
                      },
                    }
                  );
                }}
              />
            )}
            {currentTabIndex === 5 && (
              <EcanRegistrationProofUpload
                data={data}
                goBack={handleGoBack}
                isLoading={
                  createCANLoading || mutateLoading || mutateRequestDataLoading
                }
                onSubmit={async (data, isDirty) => {
                  if (!isDirty) {
                    createCAN(
                      {
                        can_request_id: canRequestId || '',
                        accountId: profile?.accounts?.[0]?.id,
                      },
                      {
                        onSuccess: () => {
                          router.push('/ecan-registration');
                        },
                        onError(error: any) {
                          toast.custom((t) => (
                            <CustomToast
                              t={t}
                              message={
                                error?.message ||
                                'Something went wrong! Please try again.'
                              }
                              type="error"
                            />
                          ));
                        },
                      }
                    );
                    return;
                  }
                  mutate(
                    {
                      data: data.proof_upload,
                      canChecklistId: CAN_CHECKLIST_ID.PROOF_DOCUMENTS,
                      canRequestId,
                      accountId: profile?.accounts?.[0]?.id || '',
                    },
                    {
                      onSuccess: (res) => {
                        mutateRequestData(
                          {
                            accountId: profile?.accounts?.[0]?.id || '',
                            canRequestId: canRequestId || '',
                          },
                          {
                            onSuccess: (finalData) => {
                              createCAN(
                                {
                                  can_request_id: canRequestId || '',
                                  accountId: profile?.accounts?.[0]?.id,
                                },
                                {
                                  onSuccess: () => {
                                    router.push('/ecan-registration');
                                  },
                                  onError(error: any) {
                                    toast.custom((t) => (
                                      <CustomToast
                                        t={t}
                                        message={
                                          error?.message ||
                                          'Something went wrong! Please try again.'
                                        }
                                        type="error"
                                      />
                                    ));
                                  },
                                }
                              );
                            },
                            onError: (e: any) => {
                              console.error(e);
                              toast.custom((t) => (
                                <CustomToast
                                  t={t}
                                  message={
                                    e?.message ||
                                    'Something went wrong! Please try again.'
                                  }
                                  type="error"
                                />
                              ));
                            },
                          }
                        );
                      },
                      onError(error: any) {
                        toast.custom((t) => (
                          <CustomToast
                            t={t}
                            message={
                              error?.message ||
                              'Something went wrong! Please try again.'
                            }
                            type="error"
                          />
                        ));
                      },
                    }
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
      <ECanRegistrationFormOptions
        setCurrentTabIndex={setCurrentTabIndex}
        isOptionBarOpen={isOptionBarOpen}
        currentTabIndex={currentTabIndex}
        closeOptionBar={closeOptionBar}
      />
    </div>
  );
}

ECanRegistrationForm.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
