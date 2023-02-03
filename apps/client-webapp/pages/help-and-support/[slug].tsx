import classnames from 'classnames';
import { Fragment, ReactElement, useEffect, useRef, useState } from 'react';
import {
  DashboardHead,
  AuthenticatedDashboardLayout,
} from '../../components/index';

import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { BlackCrossCircle, HamburgerMenuIcon } from '@corpcare/web/ui';
import { Dialog, Tab, Transition } from '@headlessui/react';
import {
  IHelpandTopics,
  useGetFetchHelpandTopicsContent,
} from '@corpcare/shared/api';
import { HelpandSupportFAQ } from '../../components/index';
const RenderIfTopicExists = ({
  data,
  topicId,
}: {
  data: IHelpandTopics;
  topicId: string;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isOptionBarOpen, setIsOptionBarOpen] = useState<boolean>(false);
  const firstRender = useRef(true);

  const closeOptionBar = () => {
    setIsOptionBarOpen(false);
  };
  const router = useRouter() as NextRouter;

  useEffect(() => {
    if (
      firstRender.current &&
      !!data?.helpingTopic &&
      router?.asPath.split('#')[1] !== undefined
    ) {
      const index = data?.helpingTopic?.findIndex(
        (item) =>
          item?.helpTopicHeading?.toLowerCase() ===
          router?.asPath.split('#')[1]?.replace(/-/g, ' ').toLowerCase()
      );
      if (index < 0) {
        setSelectedIndex(0);
        router?.replace({
          pathname: `/help-and-support/${topicId}`,
          hash: data?.helpingTopic[selectedIndex]?.helpTopicHeading
            ?.replace(/\s+/g, '-')
            .toLowerCase(),
        });
        firstRender.current = false;
      } else if (index >= 0) {
        firstRender.current = false;
        setSelectedIndex(index);
      }
    } else if (
      firstRender.current &&
      !!data?.helpingTopic &&
      router?.asPath.split('#')[1] === undefined
    ) {
      router?.replace({
        pathname: `/help-and-support/${topicId}`,
        hash: data?.helpingTopic[selectedIndex]?.helpTopicHeading
          ?.replace(/\s+/g, '-')
          .toLowerCase(),
      });
    } else if (!firstRender?.current && !!data?.helpingTopic) {
      router?.replace({
        pathname: `/help-and-support/${topicId}`,
        hash: data?.helpingTopic[selectedIndex]?.helpTopicHeading
          ?.replace(/\s+/g, '-')
          .toLowerCase(),
      });
    }
  }, [selectedIndex]);

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium truncate">
          {(data?.helpingTopic &&
            data?.helpingTopic[selectedIndex]?.helpTopicHeading) ||
            ' '}
        </h2>
        <div className="text-xs text-lightGray flex gap-1 truncate">
          <Link href="/help-and-support">
            <a>Help & Support</a>
          </Link>
          &gt;
          <a className="truncate capitalize"> {data?.slug}</a> &gt;
          <a className="truncate">
            {data?.helpingTopic &&
              data?.helpingTopic[selectedIndex]?.helpTopicHeading}
          </a>
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
              {data?.helpingTopic &&
                data?.helpingTopic[selectedIndex]?.helpTopicHeading}
            </span>
          </section>
          <div className="flex flex-col relative w-16">
            <div className="absolute top-0 right-4 w-0.5 h-full bg-brand rotate-90" />
            <span className="relative z-10 w-8 h-8 flex items-center justify-center rounded text-white bg-brand">
              {selectedIndex + 1}
            </span>
          </div>
        </div>
      </div>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className="hidden lg:flex flex-grow overflow-hidden">
          <Tab.List className="max-w-[284px] w-full bg-white h-full p-8 pb-16 overflow-y-auto lg:flex flex-shrink-0 flex-col hidden">
            <div className="overflow-hidden mt-2 flex-grow flex flex-col">
              {data?.helpingTopic?.map(
                (_help_and_support, _help_and_supportIdx) => (
                  <Tab
                    key={_help_and_support?.helpTopicHeading}
                    className={classnames(
                      data?.helpingTopic &&
                        _help_and_supportIdx !== data?.helpingTopic?.length - 1
                        ? 'pb-10'
                        : '',
                      'relative outline-none'
                    )}
                  >
                    {data?.helpingTopic &&
                    _help_and_supportIdx !== data?.helpingTopic?.length - 1 ? (
                      <div
                        className={classnames(
                          `-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full`,
                          _help_and_supportIdx <= selectedIndex
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
                            _help_and_supportIdx <= selectedIndex
                              ? 'bg-brand'
                              : 'bg-brandLight'
                          )}
                        >
                          {_help_and_supportIdx + 1}
                        </span>
                      </span>
                      <span className="text-base font-medium tracking-wide text-lightGray ml-4 self-center">
                        {_help_and_support?.helpTopicHeading}
                      </span>
                    </div>
                  </Tab>
                )
              )}
            </div>
            <button
              className="uppercase OutlineButton w-full"
              onClick={() => router.push('/help-and-support')}
            >
              go back
            </button>
          </Tab.List>

          <Tab.Panels className="overflow-y-auto w-full">
            <div className="p-4 lg:p-8">
              {data?.helpingTopic?.map((item, index) => {
                return (
                  <Tab.Panel key={index}>
                    <HelpandSupportFAQ data={item} />
                  </Tab.Panel>
                );
              })}
            </div>
          </Tab.Panels>
        </div>
      </Tab.Group>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className="lg:hidden">
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
                  <Tab.List className="max-w-[284px] w-full bg-white h-full px-4 pt-4 pb-16 overflow-y-auto flex-col flex">
                    <div className="overflow-hidden mt-6 flex-grow flex flex-col">
                      {data?.helpingTopic?.map(
                        (_help_and_support, _help_and_supportIdx) => (
                          <Tab
                            key={_help_and_support?.helpTopicHeading}
                            className={classnames(
                              data?.helpingTopic &&
                                _help_and_supportIdx !==
                                  data?.helpingTopic?.length - 1
                                ? 'pb-10'
                                : '',
                              'relative outline-none'
                            )}
                          >
                            {data?.helpingTopic &&
                            _help_and_supportIdx !==
                              data?.helpingTopic?.length - 1 ? (
                              <div
                                className={classnames(
                                  `-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full`,
                                  _help_and_supportIdx <= selectedIndex
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
                                    _help_and_supportIdx <= selectedIndex
                                      ? 'bg-brand'
                                      : 'bg-brandLight'
                                  )}
                                >
                                  {_help_and_supportIdx + 1}
                                </span>
                              </span>
                              <span className="text-base font-medium tracking-wide text-lightGray ml-4 self-center">
                                {_help_and_support?.helpTopicHeading}
                              </span>
                            </div>
                          </Tab>
                        )
                      )}
                    </div>
                    <button
                      className="uppercase OutlineButton w-full mt-6 text-sm"
                      onClick={() => router.push('/help-and-support')}
                    >
                      go back
                    </button>
                  </Tab.List>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>
          <div className="lg:flex flex-grow overflow-hidden">
            <Tab.Panels className="overflow-y-auto w-full">
              <div className="p-4 lg:p-8">
                {data?.helpingTopic?.map((item, index) => {
                  return (
                    <Tab.Panel key={index}>
                      <HelpandSupportFAQ data={item} />
                    </Tab.Panel>
                  );
                })}
              </div>
            </Tab.Panels>
          </div>
        </div>
      </Tab.Group>
    </div>
  );
};

export default function HelpandSupport() {
  const router = useRouter();

  const { slug } = router.query as {
    slug: string;
  };
  const { data, refetch, isLoading, isError } =
    useGetFetchHelpandTopicsContent(slug);

  useEffect(() => {
    if (isLoading) return;
    if (isError || !data) {
      router?.replace('/help-and-support');
    }
  }, [isError, router, data, isLoading]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
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
    </div>;
  }
  return (
    <>
      {isError || !data ? (
        <div className="flex items-center justify-center h-screen flex-col gap-2">
          <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
          <h1 className="text-center text-base lg:text-lg">Redirecting ....</h1>
        </div>
      ) : (
        <RenderIfTopicExists data={data} topicId={data?.slug} />
      )}
    </>
  );
}

HelpandSupport.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
