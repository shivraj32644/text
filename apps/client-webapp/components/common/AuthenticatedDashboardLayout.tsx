import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, type ReactElement } from 'react';
import { QuestionMarkIcon, SidebarItems } from '@corpcare/web/ui';
import {
  useGetAccountInfoData,
  useGetProfile,
  useLogoutClient,
} from '@corpcare/shared/api';
import { sidebarItems } from '../../utils/sidebarItems';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useGlobalSideBarContext } from './useGlobalSideBarContext';
export function AuthenticatedDashboardLayout({
  children,
}: {
  children: ReactElement;
}) {
  const { data: profile, isLoading, error } = useGetProfile();
  const { data: profileDetails } = useGetAccountInfoData();
  const handleLogout = useLogoutClient();

  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!profile || error) {
      router.push('/signin');
      return;
    }

    if (!profile.email_verified || !profile.mobile_verified) {
      router.push('/account-verification');
      return;
    }
  }, [isLoading, profile, error, router]);

  if (!profile || !profile.email_verified || !profile.mobile_verified) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-2">
        <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
        <h1 className="text-center text-base lg:text-lg">Loading ....</h1>
      </div>
    );
  }
  if (profile?.accounts?.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-2">
        <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
        <h1 className="text-center text-base lg:text-lg">
          Access Denied : You don&apos;t have any active account. Please contact
          support to know more about the issue.
        </h1>
        <button
          className="OutlineButton uppercase lg:text-base text-sm"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <div className="DashboardLayout">
      <div className="Sidebar lg:flex hidden">
        <div className="grid grid-cols-3 w-full h-20 px-[18px] py-5 bg-[#2F2F2F] gap-[14px]">
          <img
            className="cursor-pointer object-contain object-left col-span-2"
            src="/corpcare-logo-white.png"
            alt="CorpCare"
            onClick={() => router.push('/dashboard')}
          />
          <span className="text-white capitalize tracking-[0.02em] font-normal lg:text-base text-sm self-end col-span-1">
            {profileDetails?.entity_type}
          </span>
        </div>

        <SidebarItems sidebarItems={sidebarItems} />
        <div className="SidebarFooter w-full">
          <div
            className="flex-grow flex items-center"
            style={{
              flex: '1 1 100%',
              minWidth: 0,
            }}
          >
            <Link href="/profile">
              <a className="bg-white py-2 px-3 rounded flex items-center truncate">
                <img
                  src={
                    profile?.avatar_url === ''
                      ? '/profile-demo-pic.png'
                      : profile?.avatar_url
                  }
                  alt={profile?.first_name}
                  className="h-6 w-6 object-cover rounded-full"
                />
                <span className="text-base font-normal text-lightGray pl-[10px] truncate">
                  {profile.first_name} {profile.last_name}
                </span>
              </a>
            </Link>
          </div>

          <Link href="/help-and-support">
            <a className="text-white py-1 px-3 rounded-full ">
              <QuestionMarkIcon className="text-white w-6 h-6" />
            </a>
          </Link>
        </div>
      </div>
      <HamburgerSideBar profile={profile} profileDetails={profileDetails} />

      <div className="DashboardContent h-full">{children}</div>
    </div>
  );
}

const HamburgerSideBar = ({ profile, profileDetails }) => {
  const { closeSidebar, isSidebarOpen } = useGlobalSideBarContext();
  const router = useRouter();
  return (
    <>
      <Transition.Root show={isSidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={closeSidebar}
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
            <div className="relative flex-1 flex flex-col max-w-[200px] w-full ">
              <div className="flex-1 h-0 overflow-y-auto  Sidebar">
                <div className="grid grid-cols-3 w-full h-20 px-[18px] py-5 bg-[#2F2F2F] gap-[14px]">
                  <img
                    className="cursor-pointer object-contain object-left col-span-2"
                    src="/corpcare-logo-white.png"
                    alt="CorpCare"
                    onClick={() => router.push('/dashboard')}
                  />
                  <span className="text-white capitalize tracking-[0.02em] font-normal lg:text-base text-sm self-end col-span-1">
                    {profileDetails?.entity_type}
                  </span>
                </div>

                <SidebarItems sidebarItems={sidebarItems} />
                <div className="SidebarFooter w-full">
                  <div
                    className="flex-grow flex items-center"
                    style={{
                      flex: '1 1 100%',
                      minWidth: 0,
                    }}
                  >
                    <Link href="/profile">
                      <a className="bg-white px-2 py-2 rounded inline-flex truncate">
                        <img
                          src={
                            profile?.avatar_url === ''
                              ? '/profile-demo-pic.png'
                              : profile?.avatar_url
                          }
                          alt={profile?.first_name}
                          className="w-5 h-5 object-cover rounded-full"
                        />
                        <span className="text-sm  font-normal text-lightGray pl-[10px] truncate">
                          {profile.first_name} {profile.last_name}
                        </span>
                      </a>
                    </Link>
                  </div>

                  <Link href="/help-and-support">
                    <a className="text-white py-1 px-2  rounded-full ">
                      <QuestionMarkIcon className="text-white w-5  h-6" />
                    </a>
                  </Link>
                </div>
              </div>
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
