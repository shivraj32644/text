import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { Grid, Keyboard, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ICorpcareTeam } from '../../types/block';

export function CorpcareTeam({ data }: { data: ICorpcareTeam }) {
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
        <h1 className="w-fit mx-auto font-medium text-2xl lg:text-[2.25rem] tracking-[0.02em] text-left lg:leading-[48px] mb-[2.5rem]">
          {data?.headingParts?.map((item, idx) => {
            return (
              <span key={idx} className={classNames(`text-${item.color}`)}>
                {item.text}
              </span>
            );
          })}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 bg-light border-brand border rounded-lg lg:divide-y-0 divide-y-2 lg:divide-x-2 divide-brand text-[#191919] font-normal text-lg lg:text-xl ">
          {data?.subHeadingParts?.map((part, idx) => {
            return (
              <span key={idx} className="py-2 lg:py-3 lg:px-3 px-6 text-center">
                {part?.text}
              </span>
            );
          })}
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
          spaceBetween={60}
          className="!pb-12"
        >
          {data?.teamCard?.map((product, index) => {
            const cardImage = normalizeCmsImage(product?.cardImage);
            return (
              <SwiperSlide key={index} className="h-auto">
                <figure
                  className="p-5 lg:p-10 h-full flex items-center flex-col"
                  key={index}
                >
                  <img
                    src={cardImage?.url}
                    alt={cardImage?.alternativeText}
                    className="w-auto h-[150px] lg:h-[300px] object-cover rounded-lg mb-5 "
                  />
                  <blockquote className="text-[#191919] font-medium text-xl lg:text-2xl tracking-[0.02em] lg:leading-9 capitalize mb-1">
                    {product?.cardHeading}
                  </blockquote>
                  <figcaption className="text-lightGray font-normal text-base lg:text-lg tracking-[0.02em] lg:leading-7">
                    {product?.cardDescription}
                  </figcaption>
                </figure>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
