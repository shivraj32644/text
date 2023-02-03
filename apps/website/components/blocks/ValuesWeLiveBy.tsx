import { normalizeCmsImage } from '@corpcare/shared/api';
import { IValuesWeLiveBy } from '../../types/block';

export function ValuesWeLiveBy({ data }: { data: IValuesWeLiveBy }) {
  return (
    <div className="bg-white h-[74rem] lg:h-[50rem]">
      <div className="container mx-auto lg:p-10 p-5 relative">
        <div className="lg:w-[32.5rem] mx-5 lg:mx-auto">
          <h2 className="text-[1.75rem] lg:text-[2.25rem]  leading-10  text-center py-2">
            {data?.heading}
          </h2>
          <h1 className="text-[1.125rem] lg:text-[1.25rem] leading-7 text-center py-2">
            {data?.subheading}
          </h1>
        </div>
        <div className="relative">
          <section className="flex flex-col w-full absolute top-20 lg:-top-16 left-0 z-0">
            <div className="bg-[#F1ECE5] self-end w-5 h-10 lg:w-[6.25rem] lg:h-[6.25rem]"></div>
            <div
              className="bg-[#F1ECE5] self-center border-white 
                            border-x-[1.25rem] lg:border-x-[6.25rem] 
                            w-full h-[40rem] lg:h-[28.125rem]"
            ></div>
            <div className="bg-[#F1ECE5] self-start w-5 h-10 lg:w-[6.25rem] lg:h-[6.25rem]"></div>
          </section>
          <div className="mx-auto z-10 absolute w-full flex flex-col gap-y-8 gap-x-10 items-center lg:flex-row lg:justify-center mt-10 lg:mt-28 ">
            {data?.items?.map((item, index) => {
              const cardImage = normalizeCmsImage(item?.cardImage);
              return (
                <div
                  key={index}
                  className="bg-white w-[16.375rem]  h-[17.2rem] lg:h-[18.75rem] lg:w-[21.875rem] py-6 lg:py-10 px-4 lg:px-8 border-brand border rounded-lg"
                >
                  <img
                    src={cardImage?.url}
                    alt={cardImage?.alternativeText}
                    className="w-1h-16 h-16 lg:w-20 lg:h-20  mb-5"
                  />
                  <h2 className="text-lg lg:text-2xl font-medium mb-1">
                    {item.cardHeading}
                  </h2>
                  <h3 className="text-[1rem]">{item.cardDescription}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
