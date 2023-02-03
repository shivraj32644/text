import { normalizeCmsImage } from '@corpcare/shared/api';
import { ArrowDownCircleBrandFillIcon } from '@corpcare/web/ui';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import { IOurProducts, IProductPanel } from '../../types/block';

export function PanelCard({ data }: { data: IProductPanel }) {
  const router = useRouter() as NextRouter;
  const {
    tabPanelImage,
    productFeatures,
    tabPanelCardHeading,
    buttonTheme,
    productButton,
  } = data;
  const image = normalizeCmsImage(tabPanelImage);
  return (
    <div className="mt-5 lg:mt-10 p-5 lg:p-10 bg-white flex lg:flex-row flex-col item-center justify-between gap-8 lg:gap-16 rounded-lg border">
      <div className="bg-light rounded-lg border max-w-md lg:max-w-xl h-auto">
        <img
          src={image?.url}
          alt={image?.alternativeText}
          className="p-5 h-full w-auto"
        />
      </div>
      <div>
        <h1 className="font-medium text-lg lg:text-[28px] tracking-[0.02em] text-[#191919] lg:leading-[42px] lg:my-0 my-4">
          {tabPanelCardHeading}
        </h1>
        <div className="flex flex-col gap-4 mb-4 lg:mb-8">
          {productFeatures?.split('\n').map((product, index) => (
            <div key={index} className="flex items-center">
              <ArrowDownCircleBrandFillIcon className="text-brand h-4 w-auto mr-3 flex-shrink-0" />
              <span className="text-[#555555] text-base lg:text-xl font-normal tracking-[0.02em] lg:leading-6">
                {product}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push(`${productButton?.href}`)}
          className={classNames(
            buttonTheme === 'primary' && 'Button',
            buttonTheme === 'secondary' && 'OutlineButton',
            'uppercase'
          )}
        >
          {productButton?.label}
        </button>
      </div>
    </div>
  );
}

export function OurProducts({ data }: { data: IOurProducts }) {
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
          className="font-medium text-be lg:text-xl lg:leading-8 tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px]
     before:bg-brand before:inline-block before:relative before:align-middle 
     before:w-6 before:right-2 p-4 "
        >
          {data?.heading}
        </h2>
        <h1 className="lg:w-[38rem] font-medium text-2xl lg:text-4xl tracking-[0.02em] text-left lg:leading-[48px] mb-5 lg:mb-10 max-w-md lg:max-w-2xl">
          {data?.subHeadingInParts?.map((item, idx) => {
            return (
              <span key={idx} className={classNames(`text-${item.color}`)}>
                {item.text}
              </span>
            );
          })}
        </h1>

        <Tab.Group>
          <Tab.List
            className={classNames(
              `Tabs TabsFillOutlined mb-6  text-center border !p-0 grid`,
              data?.productPanel?.length === 4 && `lg:grid-cols-4 grid-cols-1`,
              data?.productPanel?.length === 3 && `lg:grid-cols-3  grid-cols-1`,
              data?.productPanel?.length === 2 && `lg:grid-cols-2  grid-cols-1`,
              data?.productPanel?.length === 1 && `lg:grid-cols-1`
            )}
          >
            {data?.productPanel?.map((product, index) => (
              <Tab className="uppercase" key={index}>
                {product?.tabPanelHeading}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {data?.productPanel?.map((product, index) => (
              <Tab.Panel key={index}>
                <PanelCard data={product} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
