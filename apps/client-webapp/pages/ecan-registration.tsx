import {
  ArrowDownCircleBrandFillIcon,
  ChevronCircleArrowIcon,
  EditIcon,
  InfoCircleIcon,
  EcanRegistrationStatusModal,
  useAuth,
  CorporateSteps,
} from '@corpcare/web/ui';
import {
  AuthenticatedDashboardLayout,
  DashboardHead,
} from '../components/index';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import {
  useGetAccountInfoData,
  useGetPendingCANRegistrationList,
} from '@corpcare/shared/api';
import ReactPaginate from 'react-paginate';

const tableColumns = [
  { name: 'id' as const, label: 'Registration Id' },
  { name: 'status' as const, label: 'Status' },
  { name: 'actions' as const, label: 'Actions' },
];

export default function ECanRegistration() {
  const { data: accountInfo, isLoading: accountInfoLoading } =
    useGetAccountInfoData();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { profile } = useAuth();
  const router = useRouter();
  const { data, refetch, isLoading } =
    useGetPendingCANRegistrationList(currentPage);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!accountInfo?.is_kyc_verified && !accountInfoLoading) {
    router?.replace({
      pathname: '/profile/cans',
    });
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-2">
        <img
          className="max-h-14"
          src="/corpcare-logo-black.png"
          alt="Corpcare"
        />
        <h1 className="text-center text-base lg:text-lg">Redirecting ....</h1>
      </div>
    );
  }

  if (accountInfo?.account_type === 'non_individual' && !accountInfoLoading) {
    return (
      <div className="xl:overflow-hidden h-full flex flex-col">
        <DashboardHead>
          <h2 className="font-medium">Corporate CAN Registrations</h2>
          <div className="text-xs text-lightGray">
            <Link href="/mutual-funds/all">
              <a>Mutual Funds</a>
            </Link>
            &nbsp;&gt;&nbsp;
            <Link href="/mutual-funds/corporate-can-registration">
              <a>Corporate CAN Registration</a>
            </Link>
          </div>
        </DashboardHead>

        <div className="py-5 lg:py-[26px] px-4 lg:px-8 overflow-y-auto">
          <section className="relative">
            <img
              className="w-full h-40 lg:h-full lg:max-h-[291px] object-cover rounded-lg"
              src="/corporate-can-registration-banner.png"
              alt="CorpCare -Corporate CAN Registration"
            />
            <div className="absolute bottom-4 left-4 lg:bottom-10 lg:left-10">
              <p className="text-[21px] leading-[29px] lg:text-[28px] lg:leading-[42px] font-medium text-white">
                CAN Registration
              </p>
              <p className="text-lg lg:text-xl font-normal text-white max-w-[340px]">
                Corporate Investors can use this facility to open an CAN (Common
                Account Number).
              </p>
            </div>
          </section>
          <div className="mt-8">
            <div className="border border-brandLight rounded-t-lg bg-white">
              <div className="border-b">
                <p className="text-lightGray font-medium text-xl px-5 py-4 lg:px-8 lg:py-5">
                  Corporate CAN Registration
                </p>
              </div>
              <section className="flex flex-col px-5 py-4 lg:p-8">
                <p className="text-sm lg:text-base font-normal text-lightGray">
                  Applicants are requested to submit necessary documentary
                  evidence as listed below (duly attested or certified true
                  copies) for the information provided in the respective
                  sections of the CAN registration form.
                </p>
                <p className="text-sm lg:text-base font-medium text-lightGray mt-4">
                  CAN Registration Non-Individual
                </p>
                <section className="flex flex-col gap-4 mt-3">
                  {[
                    'PAN proof',
                    'Proof of KYC',
                    'Board Resolution',
                    'Authorized Signatory List',
                    'Proof of Bank Account for Bank Mandates registered under the CAN',
                    'Proof of Depository Account for Depository accounts registered under the CAN',
                  ].map((name, idx) => (
                    <p
                      key={idx}
                      className="flex justify-start items-center gap-2"
                    >
                      <ArrowDownCircleBrandFillIcon className="text-brand w-4 h-4 flex-shrink-0" />
                      <span className="text-lightGray font-normal text-sm lg:text-base">
                        {name}
                      </span>
                    </p>
                  ))}
                </section>
              </section>
            </div>
            <div className="border border-t-0 border-brandLight bg-white rounded-b-lg">
              <p className="text-lightGray font-medium text-xl px-5 py-4 lg:px-8 lg:py-5 border-b bg-lighter">
                CAN Registration Form
              </p>
              <section className="flex flex-col px-5 py-6 lg:p-8 gap-6">
                <p className="text-sm lg:text-base font-normal text-lightGray">
                  Investors are required to fill up CAN Registration Form to
                  open a Common Account Number (CAN). Print Version - Print,
                  fill, sign and submit
                </p>
                <button className="Button uppercase max-w-xs font-semibold text-sm lg:text-base ">
                  DOWNLOAD Non-Individual Form
                </button>
              </section>
            </div>
            <CorporateSteps />
          </div>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center  items-center h-full">
        <div role="status" className="relative">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-white animate-spin  fill-brand"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (data?.data?.count === 0 || data?.data?.items?.length === 0) {
    router?.replace('/ecan-registration-form');
  }
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">eCAN Registration</h2>
        <Link href="/ecan-registration">
          <a className="text-xs text-lightGray">eCAN Registration</a>
        </Link>
      </DashboardHead>

      <div className="py-5 px-4 lg:py-[26px] lg:px-8 overflow-y-auto">
        <section className="relative">
          <img
            className="w-full h-40 lg:h-full lg:max-h-[291px] object-cover rounded-lg"
            src="/ecan-registration-banner.png"
            alt="CorpCare - E-CAN Registration"
          />
          <div className="absolute bottom-4 left-4 lg:bottom-10 lg:left-10">
            <p className="text-[21px] leading-[29px] lg:text-[28px] lg:leading-[42px] font-medium text-white">
              eCAN Registration
            </p>
            <p className="text-lg lg:text-xl font-normal text-white max-w-[340px]">
              Individual Investors can use this facility to open an eCAN (Common
              Account Number).
            </p>
          </div>
        </section>
        {data?.data?.items?.length !== 0 ? (
          <>
            <section className="flex justify-between items-center mt-8 mb-5 gap-4">
              <p className="text-lightGray font-medium text-base lg:text-xl">
                Welcome back, {profile?.first_name}
              </p>
              <button
                className="Button uppercase w-32 lg:w-40 text-base font-semibold"
                onClick={() => router.push('/ecan-registration-form')}
              >
                new form
              </button>
            </section>
            <div className="bg-white rounded-lg border overflow-x-auto lg:block hidden">
              <table className="border-hidden">
                <thead>
                  <tr className="text-lightGray bg-lighter">
                    {tableColumns.map((col) => (
                      <th
                        className="py-4 font-normal border-x-0"
                        key={col.name}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {data?.data?.items?.map((item) => (
                    <tr key={item.id} className="text-lighterGray">
                      {tableColumns.map((col) => {
                        return (
                          <td
                            className={classNames(
                              'border-x-0 py-3',
                              col.name === 'status' && 'capitalize'
                            )}
                            key={col.name}
                          >
                            {col.name !== 'actions' ? (
                              `${item[col.name]}`
                            ) : (
                              <div className="flex items-center gap-5">
                                {/* <a className="OutlineButton inline-block p-2">
                                  <InfoCircleIcon
                                    onClick={() => setIsOpen(true)}
                                  />
                                </a> */}
                                <a
                                  className="OutlineButton inline-block p-2"
                                  href={`/ecan-registration-form?ecan_registration_id=${item.id}`}
                                >
                                  <EditIcon />
                                </a>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {!isLoading && !!data?.data?.count && (
                <ReactPaginate
                  forcePage={currentPage - 1}
                  onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                  pageCount={Math.ceil(data?.data?.count / 10)}
                  containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-end justify-between border-t px-4 pt-2"
                  previousClassName={classNames(
                    'px-4 py-2 bg-white rounded-md text-black',
                    data?.data?.previous === null
                      ? 'bg-brandLight cursor-not-allowed'
                      : 'hover:bg-brand cursor-pointer hover:text-white'
                  )}
                  nextClassName={classNames(
                    'px-4 py-2 bg-white rounded-md text-black',
                    data?.data?.next === null
                      ? 'bg-brandLight cursor-not-allowed'
                      : 'hover:bg-brand cursor-pointer hover:text-white'
                  )}
                  previousLabel="previous"
                  nextLabel="next"
                  previousLinkClassName={classNames(
                    data?.data?.previous === null
                      ? 'hover:text-black cursor-not-allowed'
                      : 'hover:text-white'
                  )}
                  nextLinkClassName={classNames(
                    data?.data?.next === null
                      ? 'hover:text-black cursor-not-allowed'
                      : 'hover:text-white'
                  )}
                  pageClassName="lg:block hidden"
                  breakLinkClassName="lg:block hidden"
                  pageLinkClassName="bg-white rounded-md py-2 px-4 hover:bg-brand text-black hover:text-white lg:block hidden"
                  activeLinkClassName="bg-brand hover:bg-white !text-white hover:!text-black"
                />
              )}
            </div>
            <div className="lg:hidden">
              {data?.data?.items?.map((item, idx) => (
                <section key={idx + item.account_id} className="mb-3 lg:hidden">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={classNames(
                            'py-3 px-4 flex justify-between items-center w-full  bg-lighter border border-brandLight',
                            open ? 'rounded-t-lg' : 'rounded-lg'
                          )}
                        >
                          <section className="flex flex-col items-start">
                            <p className="text-sm font-normal text-left text-lightGray">
                              {item?.id}
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
                        <Disclosure.Panel className="flex flex-col bg-white rounded-b-lg border border-brandLight border-t-0">
                          {tableColumns.map((col, idx) => (
                            <section
                              key={col.name + idx}
                              className={classNames(
                                idx + 1 === tableColumns.length
                                  ? ''
                                  : 'border-b border-brandLight'
                              )}
                            >
                              <div className="flex items-center justify-between px-5 py-3 ">
                                <p className="text-sm font-normal text-lightGray uppercase">
                                  {col.label}
                                </p>
                                {col.name === 'actions' ? (
                                  <div className="flex items-center gap-6">
                                    {/* <a className="OutlineButton inline-flex p-2 group cursor-pointer">
                                      <InfoCircleIcon
                                        onClick={() => setIsOpen(true)}
                                      />
                                      <span className="text-sm font-normal text-lightGray ml-2 group-hover:text-white">
                                        Info
                                      </span>
                                    </a> */}
                                    <a
                                      className="OutlineButton inline-flex p-2"
                                      href={`/ecan-registration-form?ecan_registration_id=${item.id}`}
                                    >
                                      <EditIcon />
                                      <span className="text-sm font-normal text-lightGray ml-2 group-hover:text-white">
                                        Edit
                                      </span>
                                    </a>
                                  </div>
                                ) : (
                                  <p
                                    className={classNames(
                                      'text-sm font-normal text-lightGray',
                                      col.name === 'status' && 'capitalize'
                                    )}
                                  >
                                    {item[col.name]}
                                  </p>
                                )}
                              </div>
                            </section>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </section>
              ))}
              {!isLoading && !!data?.data?.count && (
                <ReactPaginate
                  forcePage={currentPage - 1}
                  onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                  pageCount={Math.ceil(data?.data?.count / 10)}
                  containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-end justify-between px-4 pt-2"
                  previousClassName={classNames(
                    'px-4 py-2 bg-white rounded-md text-black',
                    data?.data?.previous === null
                      ? 'bg-brandLight cursor-not-allowed'
                      : 'hover:bg-brand cursor-pointer hover:text-white'
                  )}
                  nextClassName={classNames(
                    'px-4 py-2 bg-white rounded-md text-black',
                    data?.data?.next === null
                      ? 'bg-brandLight cursor-not-allowed'
                      : 'hover:bg-brand cursor-pointer hover:text-white'
                  )}
                  previousLabel="previous"
                  nextLabel="next"
                  previousLinkClassName={classNames(
                    data?.data?.previous === null
                      ? 'hover:text-black cursor-not-allowed'
                      : 'hover:text-white'
                  )}
                  nextLinkClassName={classNames(
                    data?.data?.next === null
                      ? 'hover:text-black cursor-not-allowed'
                      : 'hover:text-white'
                  )}
                  pageClassName="lg:block hidden"
                  breakLinkClassName="lg:block hidden"
                  pageLinkClassName="bg-white rounded-md py-2 px-4 hover:bg-brand text-black hover:text-white lg:block hidden"
                  activeLinkClassName="bg-brand hover:bg-white !text-white hover:!text-black"
                />
              )}
            </div>
          </>
        ) : (
          <div className="mt-8 border border-brandLight rounded-lg bg-white">
            <div className="border-b border-brandLight">
              <div className="border-b">
                <p className="text-lightGray font-medium text-xl px-5 py-4 lg:px-8 lg:py-5">
                  Get Started
                </p>
              </div>
              <section className="flex flex-col gap-4 px-5 py-3 lg:px-8 lg:py-8">
                {[
                  'To create a new record, please provide the Email ID / Mobile No and click on ‘NEW FORM’.',
                  'To complete a partially saved record or to CLONE an existing record, please provide the Email ID / Mobile No’ as captured in the saved record and click on ‘LOOK UP’.',
                ].map((name, idx) => (
                  <p
                    key={idx}
                    className="flex justify-start items-center gap-3"
                  >
                    <ArrowDownCircleBrandFillIcon className="text-brand w-4 h-4 flex-shrink-0" />
                    <span className="text-lightGray font-normal text-sm lg:text-base">
                      {name}
                    </span>
                  </p>
                ))}
              </section>
            </div>
            <div className="p-5 lg:p-8">
              <section className="grid grid-cols-2 max-w-xs gap-5 mb-6">
                <label className="col-span-2">
                  <span className="Label mb-2">Email ID / Mobile No</span>
                  <input
                    name="email "
                    type="text"
                    placeholder="Enter Email"
                    className="Input"
                  />
                </label>
                <button
                  className="OutlineButton col-span-1 uppercase text-sm lg:text-base"
                  onClick={() => router.push('/ecan-registration-lookup')}
                >
                  LOOK UP
                </button>
                <button
                  className="Button col-span-1 uppercase text-sm lg:text-base"
                  onClick={() => router.push('/ecan-registration-form')}
                >
                  NEW FORM
                </button>
              </section>
              <span className="text-sm lg:text-base font-normal text-lightGray">
                To ensure privacy of the details a Verification Code has been
                sent to the email id and the Mobile number (if a valid Indian
                Mobile Number).
              </span>
              <br />
              <br />
              <span className="text-sm lg:text-base font-normal text-lightGray">
                Please check your email / mobile and enter the Verification Code
                here.
              </span>
            </div>
          </div>
        )}
      </div>
      {/* <EcanRegistrationStatusModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </div>
  );
}

ECanRegistration.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
