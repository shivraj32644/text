import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import { IOtherServices } from '../../types/block';

export function OtherServices({ data }: { data: IOtherServices }) {
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
      <div className="container mx-auto lg:p-10 p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-5 items-center place-items-center">
          {data?.card?.map((item, index) => {
            const image = normalizeCmsImage(item?.image);
            return (
              <div className="flex flex-col gap-8" key={index}>
                <figure
                  className="p-5 lg:p-6 flex flex-col space-y-3 h-[250px] lg:h-[420px] justify-end w-full max-w-xs lg:max-w-none"
                  style={{
                    backgroundImage: `url(${image?.url})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                >
                  <blockquote className="text-white tracking-[0.02em] text-xl lg:text-2xl font-medium lg:leading-9">
                    {item?.heading}
                  </blockquote>
                  <figcaption className="text-base lg:text-lg font-normal tracking-[0.02em] text-white">
                    {item?.description}
                  </figcaption>
                  <button
                    className={classNames(
                      'text-base lg:text-lg w-48 uppercase hidden lg:block',
                      item?.button?.theme === 'primary' && 'Button',
                      item?.button?.theme === 'secondary' && 'OutlineButton'
                    )}
                    onClick={() => router?.push(`${item?.button?.href}`)}
                  >
                    {item?.button?.label}
                  </button>
                </figure>
                <button
                  className={classNames(
                    'text-base lg:text-lg w-48 uppercase lg:hidden',
                    item?.button?.theme === 'primary' && 'Button',
                    item?.button?.theme === 'secondary' && 'OutlineButton'
                  )}
                  onClick={() => router?.push(`${item?.button?.href}`)}
                >
                  {item?.button?.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
