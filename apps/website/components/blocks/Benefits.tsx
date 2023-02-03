import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { IBenefits } from '../../types/block';

export function Benefits({ data }: { data: IBenefits }) {
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
        <h2
          className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-center overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
        >
          {data?.heading}
        </h2>
        <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] mb-4 lg:mb-8 text-center">
          {data?.subHeading}
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-[60px] items-stretch justify-center">
          {data?.card?.map((item, index) => {
            const image = normalizeCmsImage(item?.cardImage);
            return (
              <figure
                key={index}
                className="bg-white px-1 lg:px-6 py-5 lg:py-14 border border-brand rounded-lg flex flex-col items-center gap-5 max-w-[240px] max-h-[240px] justify-center"
              >
                <img
                  src={image?.url}
                  alt={image?.alternativeText}
                  className="object-scale-down w-12 lg:w-[60px] h-[37px] lg:h-[60px]"
                />
                <figcaption className="text-lg lg:text-xl font-normal tracking-[0.02em] text-center text-[#191919]">
                  {item?.cardHeading}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
