import { DashboardHead } from '../../components/index';
import { ChangeEvent, Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  CustomToast,
  EditIcon,
  LogoutIcon,
  LogoutModal,
  RoundSuccessCircleIcon,
  useAuth,
} from '@corpcare/web/ui';

import { useRouter } from 'next/router';
import {
  useGetAccountInfoData,
  useUploadProfilePicture,
} from '@corpcare/shared/api';
import toast from 'react-hot-toast';
import classNames from 'classnames';
import Link from 'next/link';

const individualTabs = [
  {
    title: 'my profile',
    href: '/profile',
  },
  {
    title: 'kyc-verification',
    href: '/profile/kyc-verification',
  },
  {
    title: "my can's",
    href: '/profile/cans',
  },
  {
    title: 'epayeezz',
    href: '/profile/epayeezz-registration',
  },
  {
    title: 'settings',
    href: '/profile/settings',
  },
];

const nonIndividualTabs = [
  {
    title: 'my profile',
    href: '/profile',
  },

  {
    title: "my can's",
    href: '/profile/cans',
  },
  {
    title: 'kyc-verification',
    href: '/profile/kyc-verification',
  },
  {
    title: 'settings',
    href: '/profile/settings',
  },
];
export const ProfileTabsLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { profile, refetch } = useAuth();
  const { data: accountInfo } = useGetAccountInfoData();
  const { mutate, isLoading } = useUploadProfilePicture();

  const handleFileUpload = async (file: File | '') => {
    try {
      mutate(
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
        <section className="rounded-t-lg  bg-white flex justify-between px-5 py-8 lg:p-12 border-b border-brandLight w-full gap-[10px]">
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
                className="w-24 h-full object-cover rounded-full max-h-24"
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
                          <label className="cursor-pointer text-brand text-sm lg:text-base font-normal hover:text-white bg-white hover:bg-brand px-4 py-3 rounded-md block">
                            <input
                              type="file"
                              className="sr-only cursor-pointer"
                              onChange={(
                                event: ChangeEvent<HTMLInputElement>
                              ) => onFileInputChange(event)}
                              disabled={isLoading}
                              accept=".png, .jpeg, .jpg,.gif,.bmp"
                            />
                            Upload Photo
                          </label>
                          {profile?.avatar_url !== '' && (
                            <label
                              onClick={() => handleFileUpload('')}
                              className="cursor-pointer text-brand text-sm lg:text-base font-normal hover:text-white bg-white hover:bg-brand px-4 py-3 rounded-md block"
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
              <button
                type="button"
                className="truncate max-w-max flex flex-wrap capitalize items-center px-2 lg:px-5 py-1 lg:py-2.5 text-xs lg:text-base font-medium text-center text-lightGray bg-white rounded-lg border border-brand cursor-default"
              >
                KYC {accountInfo?.kyc_status}
                {accountInfo?.kyc_status === 'pending' ||
                accountInfo?.kyc_status === 'rejected' ? (
                  <RoundSuccessCircleIcon className="text-red-600 w-4 h-4 lg:w-6 lg:h-6 ml-2 lg:ml-4 flex-shrink-0" />
                ) : null}
                {accountInfo?.kyc_status === 'submitted' ||
                accountInfo?.kyc_status === 'verified' ? (
                  <RoundSuccessCircleIcon className="text-green-600 w-4 h-4 lg:w-6 lg:h-6 ml-2 lg:ml-4 flex-shrink-0" />
                ) : null}
              </button>
            </div>
          </div>
          <button onClick={() => setIsOpen(true)}>
            <LogoutIcon className="hover:cursor-pointer lg:h-12 lg:w-12 w-7 h-7 text-lightGray" />
          </button>
        </section>
        {accountInfo?.account_type === 'individual' && (
          <>
            <div className="Tabs TabsOutlined grid grid-cols-2 lg:grid-cols-5 p-0 lg:p-1 lg:text-xl text-sm rounded-none">
              {individualTabs?.map((item, index) => {
                return (
                  <button
                    key={item?.title}
                    className={classNames(
                      router?.asPath === item?.href && 'bg-white !text-brand',
                      'uppercase',
                      index + 1 === individualTabs?.length &&
                        'lg:col-span-1 col-span-2'
                    )}
                    onClick={() => router.push(`${item?.href}`)}
                  >
                    {item?.title}
                  </button>
                );
              })}
            </div>
          </>
        )}
        {accountInfo?.account_type === 'non_individual' && (
          <>
            <div className="Tabs TabsOutlined grid grid-cols-2 lg:grid-cols-4 p-0 lg:p-1 lg:text-xl text-sm rounded-none">
              {nonIndividualTabs?.map((item, index) => (
                <button
                  key={item?.title}
                  className={classNames(
                    'uppercase',
                    index + 1 === individualTabs?.length &&
                      'lg:col-span-1 col-span-2'
                  )}
                  onClick={() => router.push(`${item?.href}`)}
                >
                  {item?.title}
                </button>
              ))}
            </div>
            {/* {children} */}
          </>
        )}
        {children}
      </div>
      <LogoutModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};
