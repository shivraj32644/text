import { normalizeCmsImage } from '@corpcare/shared/api';
import { IRecognization } from '../../types/block';
import classNames from 'classnames';

export function Recognization({ data }: { data: IRecognization }) {
  return (
    <div
      className={classNames(
        data?.theme === 'white' && 'bg-white',
        data?.theme === 'black' && 'bg-[#191919]',
        'relative !m-0'
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
      <div className="container mx-auto lg:px-10 px-5 lg:py-10 py-5">
        <h2
          className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px]
             before:bg-brand before:inline-block before:relative before:align-middle 
             before:w-6 before:right-2  p-4"
        >
          {data?.heading}
        </h2>
        <h1
          className={classNames(
            'font-medium text-2xl lg:text-4xl tracking-[0.02em]  mb-4 lg:mb-8 text-left',
            data?.theme === 'white' && 'text-[#191919]',
            data?.theme === 'black' && 'text-white'
          )}
        >
          {data?.subHeading}
        </h1>
        <div className="flex flex-wrap items-center lg:justify-between justify-center gap-8 lg:gap-16">
          {data?.card?.map((_card, idx) => {
            const image = normalizeCmsImage(_card?.image);
            return (
              <figure
                key={idx}
                className="max-w-[238px] flex flex-col items-center gap-5"
              >
                <img
                  src={image?.url}
                  alt={image?.alternativeText}
                  className="w-[200px] h-[200px] object-scale-down"
                />
                <p
                  className={classNames(
                    'font-medium tracking-[0.02em] text-center text-2xl !leading-[36px] text-white',
                    data?.theme === 'white' && 'text-[#191919]',
                    data?.theme === 'black' && 'text-white'
                  )}
                >
                  {_card?.description}
                </p>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
