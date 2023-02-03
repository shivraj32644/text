import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { useState } from 'react';
import { Grid, Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ITheWayItWorks } from '../../types/block';

export function TheWayItWorks({ data }: { data: ITheWayItWorks }) {
  const [reachedEnd, setReachedEnd] = useState(false);
  const [reachedStart, setReachedStart] = useState(true);
  return (
    <div
      className={classNames(
        'relative',
        data?.theme === 'white' && 'bg-white',
        data?.theme === 'black' && 'bg-[#191919]'
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
      <div className="container mx-auto lg:p-10 p-5">
        <h2
          className="font-medium text-lg lg:text-xl  tracking-[0.02em] text-brand uppercase overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
        >
          {data?.heading}
        </h2>
        <h1 className="lg:w-[35rem] font-medium text-2xl lg:text-[2.25rem] leading-[3.5rem] tracking-[0.02em] text-white mb-10">
          {data?.subheading}
        </h1>

        <div className="hidden lg:block relative">
          <Swiper
            slidesPerView={2.5}
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
          >
            {data?.items?.map((item, index) => {
              const cardImage = normalizeCmsImage(item?.cardImage);
              return (
                <SwiperSlide
                  key={index}
                  className="flex flex-col justify-between items-center h-auto gap-5"
                >
                  <div className="max-w-[350px] h-full min-h-[18.75rem] bg-white p-5 lg:p-10 rounded-lg cursor-grab">
                    <img
                      src={cardImage?.url}
                      alt={cardImage?.alternativeText}
                      className="w-20 h-20 object-scale-down mb-5"
                    />
                    <p className="text-2xl mb-2 font-semibold">
                      {item.cardHeading}
                    </p>
                    <p className="text-lg max-h-[200px] overflow-y-auto">
                      {item.cardDescription}
                    </p>
                  </div>

                  <div className="w-full flex items-center">
                    <span className="border-brand border-b-[6px] w-full"></span>
                    <div className="w-10 h-10 p-5  text-white bg-brand flex justify-center items-center rounded-md">
                      {index + 1}
                    </div>
                    <span className="border-brand border-b-[6px] w-full"></span>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <section className="flex justify-between absolute w-full bottom-1 z-10">
            <div
              className={`prev bg-white p-2 border-brand border-2 rounded-md ${
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
                  fill="#C5A265"
                />
              </svg>
            </div>

            <div
              className={`next bg-white p-2 border-brand border-2 rounded-md  ${
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
                  fill="#C5A265"
                />
              </svg>
            </div>
          </section>
        </div>

        <div className="lg:hidden flex items-center h-full gap-x-5">
          <div className="flex flex-col items-center flex-[2] ">
            {data?.items?.map((item, index) => {
              const cardImage = normalizeCmsImage(item?.cardImage);
              return (
                <div key={index} className="flex w-full justify-around gap-10">
                  <div className="flex flex-col items-center z-10">
                    <span
                      className={classNames(
                        'border-l-[6px] h-full',
                        index !== 0 ? 'border-brand ' : 'border-transparent'
                      )}
                    ></span>

                    <div className="w-10 h-10 p-2 text-white bg-brand flex justify-center items-center rounded-md">
                      {index + 1}
                    </div>
                    <span
                      className={classNames(
                        'border-l-[6px] h-full',
                        index !== data?.items?.length - 1
                          ? 'border-brand '
                          : 'border-transparent'
                      )}
                    ></span>
                  </div>
                  <div className="lg:max-w-[240px] w-full h-[15rem] bg-white p-5 rounded-lg my-3">
                    <img
                      src={cardImage?.url}
                      alt={cardImage?.alternativeText}
                      className="max-w[56px] w-auto h-14 object-scale-down mb-5"
                    />
                    <p className="text-xl mb-2 font-semibold">
                      {item.cardHeading}
                    </p>
                    <p className="text-md h-[100px] overflow-y-auto">
                      {item.cardDescription}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
