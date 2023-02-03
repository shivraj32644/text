import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import { Disclosure, Tab } from '@headlessui/react';
import classNames from 'classnames';
import { IColTabs } from '../../types/block';
import { CmsImage, normalizeCmsImage } from '@corpcare/shared/api';

function TabPanelCard({
  data,
}: {
  data: {
    panelImage?: CmsImage;
  };
}) {
  const panelImage = normalizeCmsImage(data?.panelImage);
  return (
    <div className="p-5 lg:p-8 bg-white rounded-lg border flex items-center justify-center">
      <div className="bg-light rounded-lg border h-auto w-full">
        <img
          src={panelImage?.url}
          alt={panelImage?.alternativeText}
          className="p-5 h-full w-full"
        />
      </div>
    </div>
  );
}

export function ColTabs({ data }: { data: IColTabs }) {
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
        <h1 className="font-medium text-2xl lg:text-4xl tracking-[0.02em] text-[#191919] text-left lg:leading-[48px] mb-5 lg:mb-10 max-w-md lg:max-w-2xl">
          {data?.subHeading}
        </h1>
        <section className="hidden lg:block">
          <Tab.Group>
            <div className="flex gap-10 items-center">
              <Tab.List
                className={classNames(`flex flex-col order-2 gap-5 w-[40%]`)}
              >
                {data?.tabs?.map((panel, index) => {
                  const panelIcon = normalizeCmsImage(panel?.panelIcon);
                  return (
                    <Tab
                      className="bg-white rounded-lg border bored-brand py-5 px-6 flex flex-col gap-4"
                      key={index}
                    >
                      {({ selected }) => (
                        <>
                          <div className="flex gap-4 items-center">
                            <img
                              src={panelIcon?.url}
                              alt={panelIcon?.alternativeText}
                              className="w-8 h-8 flex-shrink-0"
                            />
                            <p className="text-black font-medium text-xl tracking-[0.02em] text-left">
                              {panel?.panelHeading}
                            </p>
                          </div>
                          {selected && (
                            <p className="text-lightGray font-normal text-lg tracking-[0.02em] text-left">
                              {panel?.panelDescription}
                            </p>
                          )}
                        </>
                      )}
                    </Tab>
                  );
                })}
              </Tab.List>

              <Tab.Panels className="w-3/4">
                {data?.tabs?.map((panel, index) => (
                  <Tab.Panel key={index}>
                    <TabPanelCard data={panel} />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
        </section>
        <section className="flex flex-col gap-5 lg:hidden">
          {data?.tabs?.map((panel, index) => {
            const panelIcon = normalizeCmsImage(panel?.panelIcon);
            const panelImage = normalizeCmsImage(panel?.panelImage);
            return (
              <Disclosure key={index}>
                {({ open }) => (
                  <section className="border rounded-xl px-5 py-3 flex flex-col gap-4">
                    <Disclosure.Button className="flex justify-between items-center w-full ">
                      <section className="flex items-center gap-4">
                        <img
                          src={panelIcon?.url}
                          alt={panelIcon?.alternativeText}
                          className="w-8 h-8 flex-shrink-0"
                        />
                        <p className="text-black font-medium text-lg tracking-[0.02em] text-left">
                          {panel?.panelHeading}
                        </p>
                      </section>
                      <span
                        className={classNames(
                          'px-2 rounded-full  transition-transform',
                          open ? '-rotate-180' : ''
                        )}
                      >
                        <ChevronCircleArrowIcon className="w-5 h-5" />
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col gap-5">
                      <p className="text-lightGray font-normal text-base tracking-[0.02em] text-left">
                        {panel?.panelDescription}
                      </p>
                      <div className="bg-light rounded-lg border h-auto w-full">
                        <img
                          src={panelImage?.url}
                          alt={panelImage?.alternativeText}
                          className="p-4 h-full w-full"
                        />
                      </div>
                    </Disclosure.Panel>
                  </section>
                )}
              </Disclosure>
            );
          })}
        </section>
      </div>
    </div>
  );
}
