import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { Grid, Keyboard, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IProductFeatures } from '../../types/block';

export function ProductFeatures({ data }: { data: IProductFeatures }) {
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
        <h1 className="font-medium text-2xl lg:text-[2.25rem] tracking-[0.02em] text-left lg:leading-[48px]  max-w-sm lg:max-w-2xl mb-[2.5rem]">
          {data?.subHeadingParts?.map((item, idx) => {
            return (
              <span key={idx} className={classNames(`text-${item.color}`)}>
                {item.text}
              </span>
            );
          })}
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
          {data?.productCard?.map((product, index) => {
            const cardImage = normalizeCmsImage(product?.cardImage);
            return (
              <SwiperSlide key={index} className="h-auto">
                <figure
                  className="border border-brandLight bg-white p-5 lg:p-10 space-y-2 lg:space-y-5 h-full"
                  key={index}
                >
                  <img
                    src={cardImage?.url}
                    alt={cardImage?.alternativeText}
                    className="w-auto h-10 lg:h-20 object-scale-down"
                  />
                  <blockquote className="text-[#191919] font-medium text-xl lg:text-2xl tracking-[0.02em] lg:leading-9">
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
