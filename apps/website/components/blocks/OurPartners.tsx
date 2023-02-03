import {
  normalizeCmsImage,
  normalizeMultipleCmsImage,
} from '@corpcare/shared/api';
import classNames from 'classnames';
import { Grid, Keyboard, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IOurPartners } from '../../types/block';

export function OurPartners({ data }: { data: IOurPartners }) {
  return (
    <div
      className={classNames(
        data?.Theme === 'White' && 'bg-white',
        data?.Theme === 'Main Page Background' && 'bg-[#F1ECE5]',
        'relative'
      )}
    >
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
      <div className="container mx-auto lg:px-10 px-5 lg:py-10 py-5">
        <h2
          className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-center overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
        >
          {data?.Heading}
        </h2>
        <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] mb-4 lg:mb-8 text-center">
          {data?.SubHeading}
        </h1>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={24}
          breakpoints={{
            1024: {
              slidesPerView: 5.5,
              spaceBetween: 42,
            },
          }}
          grid={{
            rows: 1,
          }}
          keyboard={{
            enabled: true,
          }}
          modules={[Keyboard, Grid, Pagination]}
          className="mySwiper h-28"
        >
          {data?.PartnerImages?.data?.map((item, index) => {
            const _image = normalizeMultipleCmsImage(item);
            return (
              <SwiperSlide
                key={index}
                className="bg-white rounded-2xl border border-brandLight px-4 py-6 flex justify-center items-center"
              >
                <img
                  src={_image?.url}
                  alt={_image?.alternativeText}
                  className="self-center object-cover"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
