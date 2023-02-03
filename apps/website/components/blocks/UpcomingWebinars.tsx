import { IUpcomingWebinars } from '../../types/block';
import classNames from 'classnames';
import { Grid, Keyboard, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { UpcomingWebinarsCard } from '../shared/UpcomingWebinarsCard';
import Link from 'next/link';
import { normalizeCmsImage } from '@corpcare/shared/api';

export function UpcomingWebinars({ data }: { data: IUpcomingWebinars }) {
  return (
    <div className={classNames(' bg-white relative')}>
      {data?.miscellaneousFigure?.map((item, index) => {
        const figure = normalizeCmsImage(item?.figure);

        return (
          <div
            key={index}
            className={classNames(
              'absolute',
              item?.alignment === 'Top-Left' && 'top-0 left-0',
              item?.alignment === 'Top-Right' && 'top-0 right-0',
              item?.alignment === 'Bottom-Left' && 'bottom-0 left-0',
              item?.alignment === 'Bottom-Right' && 'bottom-0 right-0',
              item?.alignment === 'Center-Left' && 'bottom-1/2 left-0',
              item?.alignment === 'Center-Right' && 'bottom-1/2 right-0'
            )}
          >
            <img
              src={figure?.url}
              alt={figure?.alternativeText}
              className="object-cover w-auto h-auto"
            />
          </div>
        );
      })}
      <div className="container mx-auto  lg:p-10 p-5 relative">
        <h2
          className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
        >
          {data?.heading}
        </h2>

        <div className="flex justify-between items-center ">
          <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] mb-4 lg:mb-8 text-left">
            {data?.subHeading}
          </h1>

          <Link href="/webinar">
            <a
              className="absolute top-[2.55rem] right-5  lg:static 
                          uppercase group  bottom text-sm lg:text-base !leading-[16px] text-brand font-semibold hover:text-brandDark
                          flex items-center"
            >
              <span className="hidden lg:block Button px-2 py-1 font-normal text-white mr-3 group-hover:bg-brandDark">
                &#10230;
              </span>
              <span>Explore ALL</span>

              <span className="lg:hidden">&#10230;</span>
            </a>
          </Link>
        </div>
        <Swiper
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
          pagination={{
            clickable: true,
          }}
          modules={[Keyboard, Grid, Pagination]}
          spaceBetween={52}
          className="!pb-16"
        >
          {data?.upcoming_webinars?.data?.map(({ attributes }, index) => {
            return (
              <SwiperSlide key={index} className="h-auto">
                <UpcomingWebinarsCard data={attributes} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
