import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { IWhyCorpcareIsDifferent } from '../../types/block';

export function WhyCorpcareIsDifferent({
  data,
}: {
  data: IWhyCorpcareIsDifferent;
}) {
  const backgroundImage = normalizeCmsImage(data?.backgroundImage);

  return (
    <div className="relative lg:h-[56.25rem] 2xl:container 2xl:mx-auto lg:flex-row flex-col flex lg:my-24">
      <div className="lg:w-[960px] lg:z-20 w-full  lg:max-w-5xl lg:max-h-full max-h-[316px] ">
        <img
          src={backgroundImage?.url}
          alt={backgroundImage?.alternativeText}
          className="w-full h-auto object-cover max-h-[820px]"
        />
      </div>
      <div className="lg:w-[960px] lg:h-[51.25rem] lg:z-20 bg-[#191919] px-5 lg:px-14 py-5 lg:absolute lg:bottom-0 lg:right-0">
        <h2
          className="font-medium text-lg lg:text-xl leading-8 tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px]
           before:bg-brand before:inline-block  before:relative before:align-middle
           before:w-6 before:right-2 p-4 "
        >
          {data?.heading}
        </h2>
        <h1 className="font-medium text-[1.75rem] lg:text-4xl tracking-[0.02em] text-white text-left lg:leading-[48px] mb-8 lg:mb-10">
          {data?.subHeading}
        </h1>
        <section className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x-[0.06px] lg:divide-y-[0.06px] divide-brandLight divide-opacity-60 lg:gap-0 gap-10">
          {data?.whyCorpcareCard?.map((product, index) => {
            const cardImage = normalizeCmsImage(product?.cardImage);
            return (
              <figure
                className={classNames(
                  'lg:p-10 space-y-3',
                  index === 2 && '!border-l-0',
                  index === 1 && '!border-t-0'
                )}
                key={index}
              >
                <img
                  src={cardImage?.url}
                  alt={cardImage?.alternativeText}
                  className="w-auto h-20 object-scale-down"
                />
                <blockquote className="text-white font-medium text-lg lg:text-xl tracking-[0.02em] leading-8">
                  {product?.cardHeading}
                </blockquote>
                <figcaption className="text-white font-normal text-sm lg:text-base tracking-[0.02em] leading-6">
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
