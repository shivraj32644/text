/* eslint-disable react/no-children-prop */
import { normalizeMultipleCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IPartnerWithUsHero } from '../../types/block';

export function PartnerWithUsHero({ data }: { data: IPartnerWithUsHero }) {
  const router = useRouter() as NextRouter;
  return (
    <div className="flex flex-col-reverse lg:flex-row container mx-auto lg:gap-x-16 gap-y-8 justify-center p-5 lg:p-10">
      <div className="w-full lg:min-w-[32.1875rem] flex flex-col justify-center gap-y-5 ">
        <h2 className="text-[1.75rem] lg:text-[2rem] tracking-[0.02em]">
          {data?.heading}
        </h2>

        <div className="markdown-body !bg-white">
          <ReactMarkdown
            className="text-lg lg:text-[1.25rem] text-[#555555] tracking-[0.02em] "
            children={data?.content as string}
            remarkPlugins={[remarkGfm]}
            linkTarget="_blank"
          />
        </div>
        <button
          className={classNames(
            'w-44',
            data?.ctaLink?.theme === 'primary' && 'Button',
            data?.ctaLink?.theme === 'secondary' && 'OutlineButton'
          )}
          onClick={() => router?.push(`${data?.ctaLink?.href}`)}
        >
          {data?.ctaLink?.label}
        </button>
      </div>
      <div
        className="w-full lg:min-w-[35rem]
                    grid grid-cols-2 lg:grid-cols-3 grid-rows-2 justify-start items-start 
                    lg:gap-y-10 lg:gap-x-10
                    gap-y-4 gap-x-4
                    "
      >
        {data?.partnerImages?.data?.map((item, index) => {
          const _image = normalizeMultipleCmsImage(item);
          return (
            <div
              key={index}
              className="lg:min-w-[10rem] lg:h-[10rem]  w-full
                        min-w-[6.25rem] h-[6.25rem]
                        border border-brandLight rounded-md 
                        flex justify-center items-center
                        p-2"
            >
              <img
                src={_image?.url}
                alt={_image?.alternativeText}
                className="self-center object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
