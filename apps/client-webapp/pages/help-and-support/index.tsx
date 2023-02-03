import {
  normalizeCmsImage,
  useGetFetchBrowseHelpandTopicsComponent,
} from '@corpcare/shared/api';
import {
  AuthenticatedDashboardLayout,
  DashboardHead,
} from '../../components/index';
import Link from 'next/link';
import { ReactElement } from 'react';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

export default function HelpandSupportPage() {
  const { data, refetch, isLoading } =
    useGetFetchBrowseHelpandTopicsComponent();
  useEffect(() => {
    refetch();
  }, [refetch]);
  function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
    for (let i = 0; i < arr?.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }
  const resultArray = [...chunks(data?.help_topics?.data as any[], 3)];
  const router = useRouter() as NextRouter;

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Help & Support</h2>
        <div className="text-xs text-lightGray flex gap-1">
          <Link href="/help-and-support">
            <a>Help & Support</a>
          </Link>
        </div>
      </DashboardHead>
      {isLoading ? (
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
      ) : (
        <div className="flex-grow overflow-y-auto p-4 pb-5 lg:p-8 lg:pb-16 flex flex-col items-center">
          {/* <div className="w-full mb-8">
          <h4 className="text-2xl font-medium tracking-[0.02em] text-lightGray !leading-[36px] mb-4">
            Relationship Managers
          </h4>
          <section className="rounded-lg bg-white flex justify-between px-10 py-[38px] border-b border-brandLight">
            <div className="flex gap-4 justify-center items-center">
              <div className="border border-[#DDDDDD] rounded-full w-28 h-28 flex items-center justify-center relative">
                <img
                  src="profile-demo-pic.png"
                  alt="relationship_manager"
                  className="w-24 h-auto object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col lg:max-w-sm max-w-[100px]">
                <span className="text-sm lg:text-xl font-normal text-lightGray truncate tracking-[0.02em]">
                  SAYEED AFZAL
                </span>
                <span className="text-sm font-normal text-lightGray truncate tracking-[0.02em]">
                  Relationship Manager
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <button className="OutlineButton uppercase w-[170px]">
                drop mail
              </button>
              <button className="Button uppercase w-[170px]">
                get call back
              </button>
            </div>
          </section>
        </div> */}
          <div className="w-full">
            <h4 className="text-2xl font-medium tracking-[0.02em] text-lightGray !leading-[36px] mb-4">
              Help & Support
            </h4>
            <div className="flex flex-col gap-10 lg:gap-20">
              {resultArray?.map((item, idx) => (
                <div
                  key={idx}
                  className={`lg:rounded-lg lg:divide-x grid grid-cols-1 lg:grid-cols-${item?.length} lg:gap-0 gap-10 lg:bg-white`}
                >
                  {item?.map(({ attributes }, index) => (
                    <div key={index}>
                      <h1 className="rounded-t-lg text-lightGray font-medium text-lg lg:text-xl !leading-[25px] lg:!leading-[20px] tracking-[0.02em] bg-lighter py-[14px] lg:py-[21px] px-5 lg:px-[50px] border-b">
                        {attributes?.heading}
                      </h1>
                      <section className="divide-y lg:bg-inherit bg-white lg:rounded-none rounded-b-lg">
                        {attributes?.helpingTopic?.map((topic, index) => {
                          const helpTopicImage =
                            topic?.helpTopicImage?.data !== null
                              ? normalizeCmsImage(topic?.helpTopicImage)
                              : null;
                          return (
                            <div
                              key={index}
                              className={classNames(
                                'py-[17.5px] lg:py-5 px-5 lg:px-[50px] flex hover:bg-brandLight cursor-pointer',
                                attributes?.helpingTopic?.length === 1 &&
                                  'lg:border-b-0 border-b'
                              )}
                              onClick={() =>
                                router.push(
                                  `/help-and-support/${attributes?.slug}`
                                )
                              }
                            >
                              {helpTopicImage && (
                                <img
                                  className="w-6 h-6 mr-3 flex-shrink-0"
                                  src={helpTopicImage?.url}
                                  alt={helpTopicImage?.alternativeText}
                                />
                              )}
                              <p className="text-lightGray font-normal text-base !leading-[24px] tracking-[0.02em] capitalize">
                                {topic?.helpTopicHeading}
                              </p>
                            </div>
                          );
                        })}
                      </section>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

HelpandSupportPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
