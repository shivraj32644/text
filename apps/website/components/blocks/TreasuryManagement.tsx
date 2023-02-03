import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { ITreasuryManagements } from '../../types/block';

export function TreasuryManagements({ data }: { data: ITreasuryManagements }) {
  const leftImage = normalizeCmsImage(data?.leftSection?.image);
  const rightImage = normalizeCmsImage(data?.rightSection?.image);
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
      <div className="container mx-auto flex lg:flex-row flex-col-reverse justify-center gap-x-20 gap-y-5 lg:p-10 p-5">
        <div className="lg:min-w-[30rem] flex flex-col gap-y-5 lg:gap-y-8 w-full">
          <img
            src={leftImage.url}
            alt={leftImage.alternativeText}
            className="h-[16.6875rem] lg:h-[23.85rem] w-full object-cover"
          />
          <p className="lg:text-4xl text-brand text-lg tracking-[0.02em]">
            {data?.leftSection?.subheading}
          </p>
          <p className="text-lg lg:text-2xl tracking-[0.02em]">
            {data?.leftSection?.content}
          </p>
        </div>
        <div className="w-full lg:min-w-[30rem]">
          <h2
            className="lg:text-lg text-brand 
          uppercase overflow-hidden before:h-[2px] lg:after:h-[2px] lg:after:bg-brand 
           lg:after:inline-block lg:after:relative lg:after:align-middle lg:after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 lg:after:left-2 p-4"
          >
            {data?.rightSection?.heading}
          </h2>
          <h2 className="text-[1.75rem] lg:text-4xl mb-5">
            {data?.rightSection?.subheading}
          </h2>
          <img
            src={rightImage.url}
            alt={rightImage.alternativeText}
            className="h-[16.6875rem] lg:h-[23.85rem] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
