import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { Grid, Keyboard, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArticlesCard } from '../shared/ArticlesCard';

export default function RelatedArticles({ data }) {
  return (
    <div className="bg-white relative">
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
      <div className="container mx-auto lg:p-10 p-5">
        <h2
          className="font-medium text-lg lg:text-xl lg:leading-8 tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px]
             before:bg-brand before:inline-block before:relative before:align-middle 
             before:w-6 before:right-2 p-4 "
        >
          {data?.heading}
        </h2>
        <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] text-left lg:leading-[48px] mb-5 lg:mb-10 max-w-sm lg:max-w-2xl">
          {data?.subHeading}
        </h1>
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
          className="!pb-12"
        >
          {data?.articles?.data?.map(({ attributes }, index) => {
            return (
              <SwiperSlide key={index} className="h-auto">
                <ArticlesCard data={attributes} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
