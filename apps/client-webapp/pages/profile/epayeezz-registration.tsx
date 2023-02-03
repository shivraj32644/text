import classnames from 'classnames';
import { Fragment, ReactElement, useState } from 'react';
import {
  EpayeezzRegistrationBasicDetails,
  AuthenticatedDashboardLayout,
  DashboardHead,
} from '../../components/index';

import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  BlackCrossCircle,
  HamburgerMenuIcon,
  SECTION_ACCESS_DENIED_CONTENT,
} from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import { useGetAccountInfoData } from '@corpcare/shared/api';

const epayeezzRegistrationData = [
  {
    title: 'ePayEeez Registration Details',
  },
];
const EpayeezzSideBarOptions = ({
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
                  {epayeezzRegistrationData.map((_kyc, _epayIdx) => (
                    <li
                      key={_kyc.title}
                      className={classnames(
                        _epayIdx !== epayeezzRegistrationData.length - 1
                          ? 'pb-10'
                          : '',
                        'relative'
                      )}
                    >
                      {_epayIdx !== epayeezzRegistrationData.length - 1 ? (
                        <div
                          className={classnames(
                            `-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full`,
                            _epayIdx + 1 === currentTabIndex
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
                              _epayIdx + 1 === currentTabIndex
                                ? 'bg-brand'
                                : 'bg-brandLight'
                            )}
                          >
                            {_epayIdx + 1}
                          </span>
                        </span>
                        <span className="text-base font-medium tracking-wide text-lightGray ml-4 self-center">
                          {_kyc.title}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
                <button
                  className="uppercase OutlineButton w-full mt-6 text-sm"
                  onClick={() => router.push('/profile')}
                >
                  back to profile
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
export default function EpayeezzRegistration() {
  const [currentTabIndex, setCurrentTabIndex] = useState(1);
  const [isOptionBarOpen, setIsOptionBarOpen] = useState<boolean>(false);

  const router = useRouter();
  const closeOptionBar = () => {
    setIsOptionBarOpen(false);
  };
  const { data: accountInfo } = useGetAccountInfoData();
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
        <h2 className="font-medium">ePayeezz Registration</h2>
        <div className="text-xs text-lightGray">
          <Link href="/profile">
            <a>My Profile </a>
          </Link>
          &gt;
          <Link href="/profile/epayeezz-registration">
            <a> ePayeezz Registration</a>
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
              {currentTabIndex === 1
                ? 'Choose Details'
                : currentTabIndex === 2
                ? 'Basic Details'
                : currentTabIndex === 3
                ? 'e-Mandate'
                : 'e-Sigin'}
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
            {epayeezzRegistrationData.map((_epay, _epayIdx) => (
              <li
                key={_epay.title}
                className={classnames(
                  _epayIdx !== epayeezzRegistrationData.length - 1
                    ? 'pb-10'
                    : '',
                  'relative'
                )}
              >
                {_epayIdx !== epayeezzRegistrationData.length - 1 ? (
                  <div
                    className={classnames(
                      `-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full`,
                      _epayIdx + 1 === currentTabIndex
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
                        _epayIdx + 1 === currentTabIndex
                          ? 'bg-brand'
                          : 'bg-brandLight'
                      )}
                    >
                      {_epayIdx + 1}
                    </span>
                  </span>
                  <span className="text-base font-medium tracking-wide text-lightGray ml-4 self-center">
                    {_epay.title}
                  </span>
                </div>
              </li>
            ))}
          </ol>
          <button
            className="uppercase OutlineButton w-full"
            onClick={() => router.push('/profile')}
          >
            back to profile
          </button>
        </section>
        <div className="overflow-y-auto w-full">
          <div className="mx-3 lg:mx-8 mb-8 lg:mb-10">
            {currentTabIndex === 1 && <EpayeezzRegistrationBasicDetails />}
          </div>
        </div>
      </div>
      <EpayeezzSideBarOptions
        setCurrentTabIndex={setCurrentTabIndex}
        isOptionBarOpen={isOptionBarOpen}
        currentTabIndex={currentTabIndex}
        closeOptionBar={closeOptionBar}
      />
    </div>
  );
}

EpayeezzRegistration.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
