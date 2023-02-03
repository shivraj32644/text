import { normalizeCmsImage } from '@corpcare/shared/api';
import { IQuerySupport } from '../../types/block';
import { useState } from 'react';
import FormModal from '../shared/QueryFormModal';

export function QuerySupport({ data }: { data: IQuerySupport }) {
  const image = normalizeCmsImage(data?.image);

  const form = data?.queryForm?.data?.attributes;

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="w-full relative flex justify-center pb-32 px-5 lg:px-0">
      <div
        className="lg:w-[46.5625rem] 
                    px-5 lg:px-10 py-8
                    border border-brand rounded-md
                    flex flex-col lg:flex-row lg:items-center items-start gap-x-10 gap-y-5"
      >
        <img
          src={image.url}
          alt={image.alternativeText}
          className="w-16 h-16 lg:w-[6.25rem] lg:h-[6.25rem] "
        />
        <div className="flex flex-col gap-y-3">
          <p className="text-[1.75rem] tracking-[0.02em] lg:text-4xl">
            {data?.heading}
          </p>
          <span className="flex flex-col lg:flex-row gap-x-2 lg:items-center items-start gap-y-4">
            <p className="text-lg lg:text-xl">{data?.ctaText}</p>
            <span className="cursor-pointer" onClick={openModal}>
              <svg
                width="22"
                height="14"
                viewBox="0 0 22 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.5 6.99997C0.5 7.19888 0.579018 7.38965 0.71967 7.5303C0.860322 7.67095 1.05109 7.74997 1.25 7.74997L18.9395 7.74997L14.219 12.469C14.0782 12.6098 13.9991 12.8008 13.9991 13C13.9991 13.1991 14.0782 13.3901 14.219 13.531C14.3598 13.6718 14.5508 13.7509 14.75 13.7509C14.9492 13.7509 15.1402 13.6718 15.281 13.531L21.281 7.53097C21.3508 7.4613 21.4063 7.37854 21.4441 7.28742C21.4819 7.1963 21.5013 7.09862 21.5013 6.99997C21.5013 6.90132 21.4819 6.80364 21.4441 6.71252C21.4063 6.6214 21.3508 6.53864 21.281 6.46897L15.281 0.468971C15.1402 0.328141 14.9492 0.249023 14.75 0.249023C14.5508 0.249023 14.3598 0.328141 14.219 0.468971C14.0782 0.609801 13.9991 0.800807 13.9991 0.999971C13.9991 1.19913 14.0782 1.39014 14.219 1.53097L18.9395 6.24997L1.25 6.24997C1.05109 6.24997 0.860322 6.32899 0.71967 6.46964C0.579018 6.61029 0.5 6.80106 0.5 6.99997Z"
                  fill="#C5A265"
                />
              </svg>
            </span>
          </span>
        </div>
      </div>
      <FormModal form={form} isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}
