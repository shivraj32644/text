/* eslint-disable react/no-children-prop */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, type ReactElement } from 'react';
import {
  normalizeCmsImage,
  useGetInsightDetails,
  IInsightsData,
} from '@corpcare/shared/api';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { FreeMode, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  CustomToast,
  FacebookIcon,
  LeftArrowBoxIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@corpcare/web/ui';
import {
  AuthenticatedDashboardLayout,
  DashboardHead,
  InsightCard,
} from '../../../components/index';
import { Url } from 'url';
import { toast } from 'react-hot-toast';
import remarkGfm from 'remark-gfm';

function RenderIfInsightsDetailsPageExists({
  data,
  image,
}: {
  data?: IInsightsData;
  image?: {
    url?: string;
    alternativeText?: string;
    small?: string;
    thumbnail?: string;
  };
}) {
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium truncate">{data?.title || ' '}</h2>
        <div className="text-xs text-lightGray flex gap-1 truncate">
          <Link href="/insights-and-news">
            <a>Insights & News</a>
          </Link>
          &gt;
          <a className="truncate"> {data?.title || ' '}</a>
        </div>
      </DashboardHead>
      <div className="flex-grow overflow-y-auto p-4 lg:p-8 pb-5 lg:pb-16 ">
        <div className="Card p-0 overflow-hidden">
          <div className="px-5 lg:px-10 py-3 lg:py-6 bg-lighter border-b">
            <div className="flex gap-4 items-center">
              <Link href="/insights-and-news">
                <a>
                  <LeftArrowBoxIcon className="text-brand  hover:text-white hover:bg-brand" />
                </a>
              </Link>
              <span className="text-xl text-[#191919] font-medium tracking-[0.02em] lg:text-2xl">
                {data?.title}
              </span>
            </div>
          </div>
          <div className="px-5 lg:px-10 pt-3 lg:pt-6 pb-8 lg:pb-16">
            <img
              className="w-full mb-4 object-cover"
              src={image?.url}
              alt={image?.url}
            />

            <div className="markdown-body !bg-white">
              <ReactMarkdown
                className="text-base tracking-[0.02em] text-lightGray lg:text-lg leading-loose grid gap-8"
                children={data?.content as string}
                remarkPlugins={[remarkGfm]}
                linkTarget="_blank"
              />
            </div>

            <div className="rounded-[4px] border border-brandLight bg-lighter py-1.5 lg:py-3 px-3 lg:px-6 flex items-center max-w-xs mt-4 lg:mt-8 gap-5">
              <p className="text-xl tracking-[0.02em] text-[#191919]">
                Share Post
              </p>
              <div className="flex gap-5 items-center">
                {data?.social?.map((_social, index) => {
                  const type = _social?.socialNetwork || '';
                  return (
                    <Fragment key={type + index}>
                      {type === 'Facebook' && (
                        <Link href={_social?.url as Url} passHref>
                          <a target="_blank" rel="noopener noreferrer">
                            <FacebookIcon className="w-8 h-8 flex-shrink-0  cursor-pointer" />
                          </a>
                        </Link>
                      )}
                      {type === 'Twitter' && (
                        <Link href={_social?.url as Url} passHref>
                          <a target="_blank" rel="noopener noreferrer">
                            <TwitterIcon className="w-8 h-8 flex-shrink-0  cursor-pointer" />
                          </a>
                        </Link>
                      )}
                      {type === 'Linkedin' && (
                        <Link href={_social?.url as Url} passHref>
                          <a target="_blank" rel="noopener noreferrer">
                            <LinkedinIcon className="w-8 h-8 flex-shrink-0  cursor-pointer" />
                          </a>
                        </Link>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <h1 className="font-medium text-lg lg:text-xl tracking-[0.02em] text-lightGray lg:leading-[48px] mb-3 mt-4 lg:mt-8">
              Related articles
            </h1>
            <Swiper
              spaceBetween={30}
              modules={[Pagination, FreeMode]}
              className="!pb-10"
              autoHeight
              freeMode
              slidesPerView={1}
              breakpoints={{
                1280: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 2,
                },
              }}
              grid={{
                rows: 1,
              }}
              keyboard={{
                enabled: true,
              }}
            >
              {data?.related?.data?.map(({ id, attributes }) => {
                return (
                  <SwiperSlide key={id} className="h-auto">
                    <InsightCard data={attributes} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function InsightDetailsPage() {
  const router = useRouter();
  const insightId = router?.query?.insightId as string;

  const { data, isLoading, isError } = useGetInsightDetails(insightId);
  const image = normalizeCmsImage(data?.image);

  useEffect(() => {
    if (isError) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={'Something went wrong! Please try again.'}
          type="error"
        />
      ));
    }
  }, [isError]);
  useEffect(() => {
    if (isLoading) return;
    if (isError || !data) {
      router?.replace('/insights-and-news');
    }
  }, [isError, router, data, isLoading]);
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
  return (
    <>
      {isError || !data ? (
        <div className="flex items-center justify-center h-screen flex-col gap-2">
          <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
          <h1 className="text-center text-base lg:text-lg">Redirecting ....</h1>
        </div>
      ) : (
        <RenderIfInsightsDetailsPageExists data={data} image={image} />
      )}
    </>
  );
}

InsightDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
