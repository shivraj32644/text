import { IServiceCard } from '../../types/block';
import React, { useState } from 'react';
import { normalizeCmsImage } from '@corpcare/shared/api';
import { NextRouter, useRouter } from 'next/router';

export const ServiceCard = ({ service }: { service: IServiceCard }) => {
  const [showmore, setShowmore] = useState(false);
  const backgroundImage = normalizeCmsImage(service?.backgroundImage);
  const router = useRouter() as NextRouter;
  return (
    <figure
      style={{
        backgroundImage: `url(${backgroundImage.url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      onClick={(event: any) => {
        if (event?.target?.accessKey === 'no-routing') return;
        router?.push(`${service?.href}`);
      }}
      className={`saturate-100 hover:saturate-150 flex flex-col justify-end border border-brandLight px-[1.375rem] pb-[1.25rem] space-y-2 lg:space-y-2 h-[26.25rem] w-full `}
    >
      <blockquote className="text-white font-medium text-xl lg:text-2xl tracking-[0.02em] lg:leading-9">
        {service?.heading}
      </blockquote>
      <figcaption
        style={{
          transition: 'max-height 0.15s ',
          transitionTimingFunction: 'ease-in-out',
          maxHeight: showmore ? '100%' : '3.35rem',
        }}
        className={`transition-all overflow-hidden text-white font-normal text-base lg:text-lg tracking-[0.02em] lg:leading-7`}
      >
        {service?.subheading}
      </figcaption>

      <div
        className="flex space-x-3 w-fit justify-start cursor-pointer"
        onClick={() => setShowmore((p) => !p)}
      >
        <p className="text-brand " accessKey="no-routing">
          {showmore ? 'HIDE' : 'READ MORE'}
        </p>
        {!showmore && (
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={1}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        )}
      </div>
    </figure>
  );
};
