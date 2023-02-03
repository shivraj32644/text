/* eslint-disable react/no-children-prop */
import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { IBeThePartOfCorpCareTeam } from '../../types/block';

export function BeThePartOfCorpCareTeam({
  data,
}: {
  data: IBeThePartOfCorpCareTeam;
}) {
  const router = useRouter() as NextRouter;
  const image = normalizeCmsImage(data?.beThePartOfCorpCareData?.image);
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
      <div className="flex flex-col lg:flex-row gap-x-20 gap-y-8 2xl:container mx-auto 2xl:p-10">
        <img
          src={image.url}
          alt={image.alternativeText}
          className="lg:w-[41.25rem] lg:h-[33.75rem] mr-5 lg:mr-0 w-full"
        />
        <div
          className="flex flex-col justify-center 
                        gap-y-5 lg:gap-y-8 
                        lg:w-[34.375rem]
                        px-5"
        >
          <h2 className="text-[1.75rem] lg:text-4xl tracking-[0.02em]">
            {data?.beThePartOfCorpCareData?.heading}
          </h2>

          <div className="markdown-body !bg-white">
            <ReactMarkdown
              className="text-lg lg:text-[1.25rem] text-[#555555]"
              children={
                (data?.beThePartOfCorpCareData?.content as string) || ''
              }
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
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-x-10 gap-y-8 container mx-auto lg:p-10 p-5 my-[1.25rem] lg:my-[2.5rem]">
        {data?.items?.map((item, index) => {
          const cardImage = normalizeCmsImage(item?.cardImage);
          return (
            <div
              key={index}
              className="lg:max-w-full w-full max-w-[21.25rem] lg:min-w-[21.25rem] min-h-[21.25rem] rounded-md 
              flex flex-col justify-end items-center
              gap-y-2
              p-6"
              style={{
                background: `linear-gradient(180deg, rgba(42, 36, 25, 0.3), rgba(0, 0, 0, 0.6)), url(${cardImage.url}) no-repeat`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            >
              <h2 className="text-white font-medium text-2xl lg:text-2xl text-center">
                {item?.cardHeading}
              </h2>
              <h2 className="text-white text-base lg:text-lg text-left">
                {item?.cardDescription}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
