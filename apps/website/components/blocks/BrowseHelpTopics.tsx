import { normalizeCmsImage } from '@corpcare/shared/api';
import { IHelpandSupport, IHelpTopicsData } from '../../types/block';
import { NextRouter, useRouter } from 'next/router';
import classNames from 'classnames';

export function BrowseHelpTopics({ data }: { data: IHelpandSupport }) {
  function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
    for (let i = 0; i < arr?.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }
  const resultArray = [
    ...chunks(data?.help_topics?.data as IHelpTopicsData[], 3),
  ];
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
      <div className="container mx-auto flex flex-col space-y-8 lg:space-y-10 lg:p-10 p-5">
        <h1 className="text-[#191919] font-medium text-[28px] lg:text-4xl leading-[39px] lg:!leading-[48px] tracking-[0.02em]">
          {data?.heading}
        </h1>
        <div className="flex flex-col gap-10 lg:gap-20">
          {resultArray?.map((item, idx) => (
            <div
              key={idx}
              className={`lg:border lg:rounded-lg lg:divide-y-0 lg:divide-x divide-y grid grid-cols-1 lg:grid-cols-${item?.length} lg:gap-0 gap-10`}
            >
              {item?.map(({ attributes }, index) => (
                <div
                  key={index}
                  className="flex-1 lg:border-0 border lg:rounded-none rounded-lg"
                >
                  <h1 className="text-lightGray font-medium text-lg lg:text-xl !leading-[25px] lg:!leading-[20px] tracking-[0.02em] bg-lighter py-[14px] lg:py-[21px] px-5 lg:px-[50px] border-b">
                    {attributes?.heading}
                  </h1>
                  <section className="divide-y">
                    {attributes?.helpingTopic?.map((topic, index) => {
                      const helpTopicImage =
                        topic?.helpTopicImage?.data !== null
                          ? normalizeCmsImage(topic?.helpTopicImage)
                          : null;
                      return (
                        <div
                          key={index}
                          className={classNames(
                            'py-[17.5px] lg:py-5 px-5 lg:px-[50px] flex  hover:bg-brandLight cursor-pointer',
                            attributes?.helpingTopic?.length === 1 &&
                              'lg:border-b-0 border-b'
                          )}
                          onClick={() =>
                            router.push(`/help-and-support/${attributes?.slug}`)
                          }
                        >
                          {helpTopicImage && (
                            <img
                              className="w-6 h-6 mr-3 flex-shrink-0"
                              src={helpTopicImage?.url}
                              alt={helpTopicImage?.alternativeText}
                            />
                          )}
                          <p className="text-lightGray font-normal text-base !leading-[24px] tracking-[0.02em] capitalize">
                            {topic?.helpTopicHeading}
                          </p>
                        </div>
                      );
                    })}
                  </section>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
