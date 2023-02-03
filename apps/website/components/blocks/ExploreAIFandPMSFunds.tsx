import { normalizeCmsImage } from '@corpcare/shared/api';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import { FundTab, IExploreAIFandPMSFunds } from '../../types/block';

function CommonFundsCard({ data }: { data: FundTab }) {
  return (
    <>
      {data?.fundTabsCard?.map((item, idx) => {
        const referenceData = [
          {
            key: '1M',
            value: item?.one_month,
          },
          {
            key: '6M',
            value: item?.six_month,
          },
          {
            key: '1Y',
            value: item?.one_year,
          },
          {
            key: '3Y',
            value: item?.three_year,
          },
          {
            key: '5Y',
            value: item?.five_year,
          },
          {
            key: 'Since Inception',
            value: item?.since_inception,
          },
        ];
        const icon = normalizeCmsImage(item?.fundTabsIcon);
        return (
          <div className="Card p-0 overflow-hidden" key={idx}>
            <div className="px-5 lg:px-10 py-3 lg:py-5 bg-lighter border-b flex items-center">
              <div className="flex-grow flex items-center text-xl lg:text-2xl text-lightGray tracking-[0.02em]">
                <img
                  src={icon?.url}
                  alt={icon?.alternativeText}
                  className="mr-5 border h-12 w-12 object-contain p-1 rounded-lg bg-white"
                />
                {item?.fundTabsTitle}
              </div>
              <button
                type="button"
                className="OutlineButton uppercase py-1.5 lg:py-3 px-5 lg:px-10 text-sm lg:text-base font-semibold text-lightGray tracking-[0.02em]"
              >
                Invest Now
              </button>
            </div>
            <div className="rounded-lg overflow-auto">
              <table className="border-hidden">
                <tbody className="bg-white text-lightGray">
                  <tr>
                    {referenceData?.map((item, idx) => (
                      <td className="border-x-0" key={idx}>
                        {item?.key}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {referenceData?.map((item, idx) => (
                      <td className="border-x-0" key={idx}>
                        {item?.value}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </>
  );
}

export function ExploreAIFandPMSFunds({
  data,
}: {
  data: IExploreAIFandPMSFunds;
}) {
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
        <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] text-center">
          {data?.subHeading}
        </h1>
        <Tab.Group>
          <Tab.List className="Tabs grid lg:grid-cols-2 mb-[60px] max-w-[599px] mt-10 mx-auto border p-0">
            {data?.fundTabs?.map((item, idx) => (
              <Tab className="uppercase" key={idx}>
                {item?.title}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="h-full">
            {data?.fundTabs?.map((item, index) => {
              return (
                <Tab.Panel key={index} className="flex flex-col gap-10">
                  <CommonFundsCard data={item} />
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
