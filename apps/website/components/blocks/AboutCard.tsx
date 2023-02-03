/* eslint-disable react/no-children-prop */
import { normalizeCmsImage } from '@corpcare/shared/api';
import { IAboutCard } from '../../types/block';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import remarkGfm from 'remark-gfm';
export function AboutCard({ data }: { data: IAboutCard }) {
  const image = normalizeCmsImage(data?.image);
  const router = useRouter() as NextRouter;
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
      <div className={classNames('container mx-auto lg:p-10 p-5')}>
        <div
          className={classNames(
            'grid grid-cols-1 lg:grid-cols-3 lg:gap-[66px] relative',
            data?.imagePosition === 'left' && 'justify-items-start',
            data?.imagePosition === 'right' && 'justify-items-end'
          )}
        >
          <div
            className={classNames(
              'lg:flex hidden relative',
              data?.imagePosition === 'left' && 'order-1',
              data?.imagePosition === 'right' && 'order-2'
            )}
          >
            <div className="relative max-w-md max-h-[544px] flex">
              <div className="absolute -top-10 -left-10 h-full w-full border border-brand max-w-md z-10" />
              <img
                src={image?.url}
                alt={image?.alternativeText}
                style={{ position: 'inherit' }}
                className="z-20"
              />
            </div>
          </div>
          <div
            className={classNames(
              'lg:col-span-2',
              data?.imagePosition === 'left' && 'order-2',
              data?.imagePosition === 'right' && 'order-1'
            )}
          >
            <h2
              className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
            >
              {data?.heading}
            </h2>
            <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] text-left lg:pb-0 pb-6">
              {data?.subHeading}
            </h1>
            <div className="flex place-content-center lg:hidden mt-6 relative">
              <div className="relative max-w-[250px] sm:max-w-[300px] max-h-[350px]">
                <div className="absolute -top-[25px] h-full -left-[25px] w-full border border-brand max-w-[300px] z-10" />
                <img
                  src={image?.url}
                  alt={image?.alternativeText}
                  style={{ position: 'inherit' }}
                  className="z-20"
                />
              </div>
            </div>
            <div className="markdown-body !bg-white">
              <ReactMarkdown
                className="text-lg lg:text-[1.25rem] text-[#555555] mt-5"
                children={data?.content as string}
                remarkPlugins={[remarkGfm]}
                linkTarget="_blank"
              />
            </div>

            <button
              className={classNames(
                'text-base lg:text-lg w-48 mt-5 lg:mt-10',
                data?.ctaButton?.theme === 'primary' && 'Button',
                data?.ctaButton?.theme === 'secondary' && 'OutlineButton'
              )}
              onClick={() => router?.push(`${data?.ctaButton?.href}`)}
            >
              {data?.ctaButton?.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
