import { useWindowDimensions } from '@corpcare/web/ui';
import { useGetAllGetCategories, useGetInsights } from '@corpcare/shared/api';
import Link from 'next/link';
import { useEffect, useState, type ReactElement } from 'react';
import {
  AuthenticatedDashboardLayout,
  DashboardHead,
  InsightCard,
} from '../../components/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Grid } from 'swiper';
import { useRouter } from 'next/router';

function InsightsBanner() {
  return (
    <div className="relative">
      <img
        className="w-full min-h-[180px] max-h-64 object-cover rounded-lg"
        src="/insights-banner.png"
        alt="CorpCare - Fixed Deposits"
      />
      <h1 className="absolute bottom-8 left-8 text-white text-3xl max-w-sm">
        Latest news from the top global sites.
      </h1>
    </div>
  );
}

function InsightsTrending() {
  const [slidesToShowCount, setSlidesToShowCount] = useState(3.8);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 640) setSlidesToShowCount(1.2);
    else setSlidesToShowCount(3.8);
  }, [width]);

  const data = new Array(8).fill(null).map((_, i) => ({
    id: 'inisght-' + i,
    image: '/recent-in-news-card.svg',
    content:
      'Banks see uptick in credit growth asset quickly likely to improve',
  }));

  return (
    <div>
      <div className="flex mb-4">
        <h3 className="flex-grow font-medium text-xl text-lightGray">
          Trending in news
        </h3>
      </div>

      <div className="h-[680px] w-full">
        <Swiper
          spaceBetween={30}
          slidesPerView={slidesToShowCount}
          modules={[Pagination, Grid, FreeMode]}
          grid={{ fill: 'column', rows: 2 }}
          className="h-full"
          freeMode
          setWrapperSize
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className="h-fit">
              <div
                key={item.id}
                className="flex flex-col items-center justify-center h-80 overflow-hidden"
              >
                <img
                  className="rounded-lg h-44 xl:h-52 2xl:h-60 object-cover"
                  src={item.image}
                  alt={item.id}
                />
                <p className="mt-4 lg:text-lg overflow-auto">{item.content}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function InsightsCategories() {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetAllGetCategories();
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div>
      <h3 className="mb-4 font-medium text-xl text-lightGray">
        Explore Categories
      </h3>

      {isLoading && (
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
      )}

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        modules={[Pagination, FreeMode]}
        className="!pb-10"
        autoHeight
        freeMode
        breakpoints={{
          1280: {
            slidesPerView: 3.5,
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
        {data?.map((item) => {
          return (
            <SwiperSlide key={item?.id}>
              <div
                key={`categories_${item?.id}`}
                className="bg-white flex flex-col justify-center items-center py-12 cursor-pointer border border-brandLight rounded-lg min-w-[240px]"
                onClick={() =>
                  router.push(`/insights-and-news/category/${item?.title}`)
                }
              >
                <img
                  className="h-[60px] w-[60px] object-cover"
                  src={item?.image?.url}
                  alt={item?.image?.alternativeText}
                />
                <p className="mt-4 lg:text-lg text-base tracking-[0.02em] text-lightGray font-medium">
                  {item?.title}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

function InsightsArticlesList() {
  const { data, isLoading, refetch } = useGetInsights(undefined, 8);

  const topSwiper = data?.data?.slice(0, 4);
  const bottomSwiper = data?.data?.slice(4, 8);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div>
      <div className="flex mb-4 flex-wrap gap-4">
        <h3 className="flex-grow font-medium text-xl text-lightGray">
          Corp Care Vault
        </h3>

        <Link href="/insights-and-news/all">
          <a className="font-semibold text-lightGray uppercase group hover:text-black bottom">
            <span className="Button px-2 py-1 font-normal text-white mr-3 group-hover:bg-brandDark">
              &#10230;
            </span>
            Explore ALL
          </a>
        </Link>
      </div>

      {isLoading && (
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
      )}

      {!!topSwiper?.length && (
        <Swiper
          spaceBetween={30}
          modules={[Pagination, FreeMode, Pagination]}
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
          pagination={{ clickable: true }}
        >
          {topSwiper?.map((item) => (
            <SwiperSlide key={item?.id} className="h-auto">
              <InsightCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {!!bottomSwiper?.length && (
        <Swiper
          spaceBetween={30}
          modules={[Pagination, FreeMode, Pagination]}
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
          pagination={{ clickable: true }}
        >
          {bottomSwiper?.map((item) => (
            <SwiperSlide key={item?.id} className="h-auto">
              <InsightCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default function InsightsPage() {
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Insights &amp; News</h2>
        <div className="text-xs text-lightGray flex gap-1">
          <a>Insights &amp; News</a>
        </div>
      </DashboardHead>

      <div className="flex-grow overflow-y-auto p-4 lg:p-8 pb-5 lg:pb-16">
        <InsightsBanner />

        {/* <div className="mt-8">
          <InsightsTrending />
        </div> */}

        <div className="mt-4 lg:mt-8">
          <InsightsCategories />
        </div>

        <div className="mt-4 lg:mt-8">
          <InsightsArticlesList />
        </div>
      </div>
    </div>
  );
}

InsightsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
