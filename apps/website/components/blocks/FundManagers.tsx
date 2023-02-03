/* eslint-disable react/no-children-prop */
import { normalizeCmsImage } from '@corpcare/shared/api';
import { IFundManagers } from '../../types/block';
import { Grid, Keyboard, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ICard } from '../../types/shared';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import classNames from 'classnames';
import remarkGfm from 'remark-gfm';

export function FundManagers({ data }: { data: IFundManagers }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedManager, setSelectedManager] = useState<ICard | null>(null);
  const selectedManagerCardImage = normalizeCmsImage(
    selectedManager?.cardImage
  );
  return (
    <div className="bg-light relative">
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
      <div className="container mx-auto  lg:p-10 p-5">
        <h2
          className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
        >
          {data?.heading}
        </h2>
        <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] text-left mb-5 lg:mb-10">
          {data?.subHeading}
        </h1>
        <Swiper
          slidesPerView={1.5}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 62,
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
          className="!pb-16"
          spaceBetween={24}
        >
          {data?.card?.map((manager, index) => {
            const cardImage = normalizeCmsImage(manager?.cardImage);
            return (
              <SwiperSlide
                key={index}
                className="h-auto w-full cursor-pointer flex"
                onClick={() => {
                  setIsOpen(true);
                  setSelectedManager(manager);
                }}
              >
                <figure className="bg-white rounded-lg max-w-[330px] w-full">
                  <img
                    src={cardImage?.url}
                    alt={cardImage?.alternativeText}
                    className="object-cover w-full h-[350px] rounded-lg"
                  />
                  <figcaption className="px-5 py-4 flex flex-col gap-2 items-start">
                    <blockquote className="text-[#191919] tracking-[0.02em] font-normal text-base">
                      {manager?.cardHeading}
                    </blockquote>
                    <p className="text-lightGray tracking-[0.02em] font-normal text-sm">
                      {manager?.cardDescription}
                    </p>
                  </figcaption>
                </figure>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-h-[560px] max-w-[840px] transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-lg transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between text-lg lg:text-xl font-medium lg:leading-[30px] text-lightGray tracking-[0.02em] uppercase bg-light py-2 lg:py-4 px-3 lg:px-6"
                  >
                    {selectedManager?.cardHeading}
                    <svg
                      width="32"
                      height="32"
                      className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer"
                      onClick={() => setIsOpen(false)}
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="16"
                        cy="16"
                        r="15"
                        fill="white"
                        stroke="#C5A265"
                        strokeWidth="2"
                      />
                      <line
                        x1="1"
                        y1="-1"
                        x2="16.7881"
                        y2="-1"
                        transform="matrix(0.682563 0.730827 -0.682563 0.730827 10 10)"
                        stroke="#C5A265"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="1"
                        y1="-1"
                        x2="16.7881"
                        y2="-1"
                        transform="matrix(0.682563 -0.730827 0.682563 0.730827 10.8584 23)"
                        stroke="#C5A265"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Dialog.Title>
                  <div className="py-3 lg:py-5 px-5 lg:px-10 border-b">
                    <figure className="bg-white flex items-center gap-4">
                      <img
                        src={selectedManagerCardImage.url}
                        alt={selectedManagerCardImage?.alternativeText}
                        className="object-cover w-20 h-20 rounded-lg"
                      />
                      <figcaption className="px-3 lg:px-5 py-2 lg:py-4 flex flex-col gap-2 items-start">
                        <blockquote className="text-[#191919] tracking-[0.02em] font-normal text-base lg:text-xl lg:!leading-[30px]">
                          {selectedManager?.cardHeading}
                        </blockquote>
                        <p className="text-lightGray tracking-[0.02em] font-normal text-sm">
                          {selectedManager?.cardDescription}
                        </p>
                      </figcaption>
                    </figure>
                  </div>

                  <div className="px-5 lg:px-10 py-4 lg:py-8 overflow-y-auto max-h-[312px]">
                    <div className="markdown-body !bg-white">
                      <ReactMarkdown
                        className="text-sm lg:text-base tracking-[0.02em] text-[#555555] "
                        children={selectedManager?.cardContent as string}
                        remarkPlugins={[remarkGfm]}
                        linkTarget="_blank"
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
