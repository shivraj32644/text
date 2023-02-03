import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { IWorkLifeAtCorpCare } from '../../types/block';

export function WorkLifeAtCorpCare({ data }: { data: IWorkLifeAtCorpCare }) {
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
      <div className="container lg:p-10 p-5 mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col lg:flex-row lg:divide-x-2 divide-brand">
          <span className="flex-1 flex flex-col justify-center pb-5 lg:pb-0">
            <h2
              className="font-medium text-lg lg:text-xl leading-8 tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px]
           before:bg-brand before:inline-block before:relative before:align-middle
           before:w-6 before:right-2"
            >
              {data?.workLifeAtCorpCareData?.heading}
            </h2>
            <h2 className="font-medium text-[1.75rem] lg:text-4xl tracking-[0.02em]  ">
              {data?.workLifeAtCorpCareData?.subheading}
            </h2>
          </span>
          <span className="lg:hidden w-[5.625rem] border-t-2 border-brand"></span>
          <span className="flex-1  flex justify-center items-center pt-5 lg:pt-0">
            <p className="lg:w-[31.4375rem] text-lg lg:text-xl">
              {data?.workLifeAtCorpCareData?.content}
            </p>
          </span>
        </div>
        <section
          className=" w-fit
                    grid grid-cols-1 lg:grid-cols-3 
                    gap-10   
                    justify-center items-center 
                    my-[3.125rem]"
        >
          {data?.items?.map((product, index) => {
            const cardImage = normalizeCmsImage(product?.cardImage);
            return (
              <figure
                className="lg:min-w-[21.875rem] min-h-[13.75rem] lg:min-h-[19.0625rem] p-6 lg:p-10 border rounded-lg lg:rounded-md"
                key={index}
              >
                <img
                  src={cardImage?.url}
                  alt={cardImage?.alternativeText}
                  className="w-10 h-10 lg:w-20 lg:h-[4.95rem] mb-5 lg:mb-10  object-scale-down"
                />

                <blockquote className="  font-medium text-[1.3125rem] lg:text-xl tracking-[0.02em] leading-8 lg:mb-2 mb-1">
                  {product?.cardHeading}
                </blockquote>
                <figcaption className="  font-normal text-base tracking-[0.02em] leading-6">
                  {product?.cardDescription}
                </figcaption>
              </figure>
            );
          })}
        </section>
      </div>
    </div>
  );
}
