import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import router from 'next/router';
import { IHowWeAreDifferent } from '../../types/block';

export function HowWeAreDifferent({ data }: { data: IHowWeAreDifferent }) {
  const backgroundImage = normalizeCmsImage(data?.backgroundImage);
  return (
    <div className="lg:h-[55.625rem] relative lg:my-24 2xl:container 2xl:mx-auto lg:flex">
      <div className="lg:w-[960px] lg:max-h-full max-h-[316px] z-20 ml-auto">
        <img
          src={backgroundImage?.url}
          alt={backgroundImage?.alternativeText}
          className="w-full h-auto object-cover"
        />
      </div>
      <div
        className="flex flex-col justify-center 
                    lg:w-[960px]  lg:h-[50.625rem]
                    lg:p-10 p-5 
                    z-20 bg-[#191919]  
                    relative lg:absolute lg:bottom-0 left-0
                    overflow-visible"
      >
        <h2
          className="font-medium text-xl leading-8 tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px]
           before:bg-brand before:inline-block before:relative before:align-middle
           before:w-6 before:right-2"
        >
          {data?.heading}
        </h2>
        <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-white text-left leading-[48px] mb-10 max-w-2xl">
          {data?.subheading}
        </h1>
        <section className="flex-col lg:flex-row flex divide-x lg:w-[71.25rem]">
          {data?.items?.map((product, index) => {
            const cardImage = normalizeCmsImage(product?.cardImage);
            return (
              <figure
                className="p-5 lg:p-10 space-y-5 bg-white lg:w-[23rem]"
                key={index}
              >
                <img
                  src={cardImage?.url}
                  alt={cardImage?.alternativeText}
                  className="w-[3.75rem] h-[3.75rem]"
                />
                <blockquote className=" font-semibold text-xl tracking-[0.02em] leading-8">
                  {product?.cardHeading}
                </blockquote>
                <figcaption className=" font-normal text-base tracking-[0.02em] leading-6">
                  {product?.cardDescription}
                </figcaption>
              </figure>
            );
          })}
        </section>
        <section className="mt-[2.5rem]">
          <button
            className={classNames(
              'w-44',
              data?.button?.theme === 'primary' && 'Button',
              data?.button?.theme === 'secondary' && 'OutlineButton'
            )}
            onClick={() => router?.push(`${data?.button?.href}`)}
          >
            {data?.button?.label}
          </button>
        </section>
      </div>
    </div>
  );
}
