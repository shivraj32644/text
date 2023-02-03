import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { IWhoWeAre } from '../../types/block';

export function WhoWeAre({ data }: { data: IWhoWeAre }) {
  return (
    <div className="bg-[#F1ECE5] relative">
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
        <div className="mx-5 mb-10">
          <h2
            className="font-medium text-center text-xl tracking-[0.02em] text-brand uppercase  overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2"
          >
            {data?.heading}
          </h2>
          <h1 className="text-[1.75rem] lg:text-[2.25rem] font-medium leading-7 text-center py-2">
            {data?.subheading}
          </h1>
        </div>
        <div className="grid grid-cols-2 lg:flex justify-center justify-items-center gap-x-5 lg:gap-x-16 gap-y-5">
          {data?.items?.map((item, index) => {
            const cardImage = normalizeCmsImage(item?.cardImage);
            return (
              <div
                key={index}
                className="bg-white 
              w-full h-[11.6875rem] lg:h-[15rem] lg:min-w-[15rem] 
              lg:p-11 p-5
              border-brand border rounded-lg
              flex flex-col items-center justify-center
              text-center"
              >
                <img
                  src={cardImage?.url}
                  alt={cardImage?.alternativeText}
                  className="w-10 h-10 lg:w-[3.75rem] lg:h-[3.75rem]  mb-5"
                />
                <h2 className="text-[1.75rem] lg:text-[2.25rem] font-semibold text-brand mb-1">
                  {item.cardHeading}
                </h2>
                <h3 className="text-lg lg:text-xl">{item.cardDescription}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
