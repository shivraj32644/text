import { normalizeCmsImage } from '@corpcare/shared/api';
import { StarIcon } from '@corpcare/web/ui';
import classNames from 'classnames';
import { Grid, Keyboard, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IOurClients } from '../../types/block';

export function OurClients({ data }: { data: IOurClients }) {
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
          className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-center overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
        >
          {data?.Heading}
        </h2>
        <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] text-center">
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
          className="!pb-16"
        >
          {data?.Clients?.map((client, index) => {
            const authorImage = normalizeCmsImage(client?.authorImage);
            return (
              <SwiperSlide key={index}>
                <div className="relative before:absolute before:top-5 before:left-5 before:w-full before:h-full before:bg-light self-start">
                  <div
                    className="relative border border-brandLight bg-white p-5 lg:p-10 mt-8 lg:mt-16"
                    key={index}
                  >
                    <svg
                      width="60"
                      height="46"
                      viewBox="0 0 60 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute  fill-slate-100 -top-6 right-6"
                    >
                      <path
                        d="M22.5 0.5L0 23V45.5H22.5V0.5ZM60 0.5L37.5 23V45.5H60V0.5Z"
                        fill="#F1ECE5"
                      />
                    </svg>
                    <div className="relative flex justify-between items-start flex-col mb-4">
                      <p className="flex items-center gap-1">
                        {[0, 1, 2, 3, 4].map((_, index) => (
                          <StarIcon
                            key={index}
                            className={classNames(
                              'flex-shrink-0 h-4 w-4 ',
                              client?.rating && client?.rating >= index
                                ? 'text-brand'
                                : 'text-brandLight'
                            )}
                          />
                        ))}
                      </p>
                      <p className="text-base lg:text-lg font-normal tracking-[0.02em] lg:leading-7 text-lightGray mt-5">
                        {client?.comment}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src={authorImage?.url}
                        alt={authorImage?.alternativeText}
                        className="object-cover w-[60px] h-[60px]"
                      />
                      <div className="text-left">
                        <p className="text-base lg:text-lg font-normal lg:leading-7 tracking-[0.02em] text-[#191919] capitalize">
                          {client?.authorName}
                        </p>
                        <p className="text-xs lg:text-sm font-normal lg:leading-5 tracking-[0.02em] text-lightGray">
                          {client?.authorDesignation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
