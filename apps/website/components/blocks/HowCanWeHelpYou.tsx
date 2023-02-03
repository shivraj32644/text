import { IHowCanWeHelpYou } from '../../types/block';
import { useState } from 'react';
import { Grid, Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';

export function HowCanWeHelpYou({ data }: { data: IHowCanWeHelpYou }) {
  const [reachedEnd, setReachedEnd] = useState(false);
  const [reachedStart, setReachedStart] = useState(true);
  return (
    <div className="bg-split-white-light-bottom lg:bg-split-white-light-left-40relative">
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
      <div className="container mx-auto  p-5 lg:p-10">
        <h2
          className="font-medium text-lg lg:text-xl  tracking-[0.02em] text-brand uppercase overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
        >
          {data?.heading}
        </h2>
        <h1 className="font-medium text-2xl lg:text-[2.25rem] lg:leading-[3.5rem] tracking-[0.02em] text-[#191919] mb-10 lg:max-w-xl">
          {data?.subHeading}
        </h1>

        <div className="relative mb-10 lg:mb-20">
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
            navigation={{
              prevEl: '.prev',
              nextEl: '.next',
            }}
            onSlideChange={({ isBeginning, isEnd }) => {
              setReachedStart(isBeginning);
              setReachedEnd(isEnd);
            }}
            modules={[Keyboard, Grid, Navigation, Pagination]}
            spaceBetween={45}
            className="w-full !pb-5"
          >
            {data?.card?.map((item, index) => {
              const image = normalizeCmsImage(item?.cardImage);
              return (
                <SwiperSlide key={index} className="h-auto w-full">
                  <div className="h-full lg:min-h-[31.875rem] bg-white flex flex-col justify-between items-center border-[0.5px] border-brand lg:min-w-[350px] mb-8 w-full">
                    <img
                      src={image?.url}
                      alt={image?.alternativeText}
                      className="w-full h-[18.125rem] lg:h-[19.0625rem] object-cover"
                    />
                    <div className="w-full h-full lg:min-h-[12.8125rem] p-5 lg:px-[30px] py-7 flex flex-col gap-2">
                      <p className="text-2xl tracking font-medium tracking-[0.02em] text-[#191919]">
                        {item?.cardHeading}
                      </p>
                      <p className="text-lg text-lightGray font-normal tracking-[0.02em]">
                        {item?.cardDescription}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <section className="flex items-center gap-5 absolute w-full -bottom-10 z-10">
            <div
              className={`prev bg-brand p-2  border-2 rounded-md ${
                reachedStart
                  ? 'bg-brandLight cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 9C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7L21 9ZM0.292892 7.2929C-0.0976315 7.68342 -0.0976314 8.31658 0.292893 8.70711L6.65686 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928933C7.68054 0.538409 7.04738 0.538409 6.65685 0.928933L0.292892 7.2929ZM21 7L1 7L1 9L21 9L21 7Z"
                  fill="#ffffff"
                />
              </svg>
            </div>

            <div
              className={`next bg-brand p-2  border-2 rounded-md ${
                reachedEnd
                  ? 'bg-brandLight cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9C0.447715 9 -4.82823e-08 8.55228 0 8C4.82823e-08 7.44772 0.447715 7 1 7L1 9ZM21.7071 7.2929C22.0976 7.68342 22.0976 8.31658 21.7071 8.70711L15.3431 15.0711C14.9526 15.4616 14.3195 15.4616 13.9289 15.0711C13.5384 14.6805 13.5384 14.0474 13.9289 13.6569L19.5858 8L13.9289 2.34315C13.5384 1.95262 13.5384 1.31946 13.9289 0.928933C14.3195 0.538409 14.9526 0.538409 15.3431 0.928933L21.7071 7.2929ZM1 7L21 7L21 9L1 9L1 7Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
