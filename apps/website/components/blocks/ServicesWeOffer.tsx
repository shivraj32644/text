import { IServicesWeOffer } from '../../types/block';
import { Grid, Keyboard, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ServiceCard } from '../shared/ServiceCard';
import classNames from 'classnames';
import { normalizeCmsImage } from '@corpcare/shared/api';

export function ServicesWeOffer({ data }: { data: IServicesWeOffer }) {
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
      <div className="mx-auto container  lg:p-10 p-5">
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
            1024: {
              slidesPerView: 3.25,
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
          spaceBetween={30}
          className="!pb-12"
        >
          {data?.services?.map((service, index) => (
            <SwiperSlide key={index} className="cursor-grab ">
              <ServiceCard service={service} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
