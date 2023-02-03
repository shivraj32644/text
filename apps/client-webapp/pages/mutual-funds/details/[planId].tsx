import { useRouter } from 'next/router';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { Listbox, Tab, Transition } from '@headlessui/react';

import { ChevronCircleArrowIcon, AddToCartModal } from '@corpcare/web/ui';

import {
  AuthenticatedDashboardLayout,
  MutualFundOverview,
  MutualFundPerformance,
  MutualFundFacts,
  MutualFundsChart,
  DashboardHead,
  MutualFundsChartTable,
} from '../../../components/index';
import classNames from 'classnames';
import { useGetMutualFundSchemeDetails } from '@corpcare/shared/api';

export default function MutualFundDetailsPage() {
  const router = useRouter();
  const { planId } = router.query as { planId: string };

  const tabsSection = [
    { id: 0, name: 'OverView' },
    { id: 1, name: 'Facts and Ratios' },
    { id: 2, name: 'Fund Holdings' },
    { id: 3, name: 'Performance' },
  ];
  const [selectedTabOption, setSelectedTabOption] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { data: scheme } = useGetMutualFundSchemeDetails(planId as string);
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium sm:w-full w-28 truncate">
          {scheme?.plan_name}
        </h2>
        <div className="text-xs text-lightGray flex gap-1">
          <Link href="/mutual-funds/all">
            <a className="sm:whitespace-pre">Mutual Funds</a>
          </Link>
          &gt;
          <a className="sm:w-full w-16 truncate">{scheme?.plan_name}</a>
        </div>
      </DashboardHead>

      <div className="grid grid-cols-12 flex-grow overflow-y-auto lg:overflow-hidden p-4 lg:p-0">
        <div className="lg:p-8 pb-10 lg:pb-16 col-span-12 lg:col-span-9 lg:overflow-y-auto h-full">
          <div className="Card flex-col items-center min-h-[250px] !px-0 !py-0">
            <section className="border-b-[1px] border-brandLight bg-lighter p-5 relative lg:rounded-none rounded-t-lg">
              <section className="flex items-center gap-4 ">
                <Link href="/mutual-funds/all">
                  <a className="OutlineButton px-2 py-1 font-bold group-hover:bg-brandDark lg:block  hidden">
                    &#10229; {/* left arrow */}
                  </a>
                </Link>

                <div className="w-auto max-h-14 p-2 rounded-lg bg-white mr-1 border">
                  <img
                    className="w-10 h-10 object-scale-down truncate"
                    src={scheme?.amc?.logo_url}
                    alt={scheme?.amc?.name}
                  />
                </div>
                <section>
                  <h2 className="text-xl text-lightGray flex-grow lg:mt-0 mt-1">
                    {scheme?.plan_name}
                  </h2>
                  <small className="text-lightGray lg:hidden">
                    {scheme?.category === '1'
                      ? 'Equity'
                      : scheme?.category === '2'
                      ? 'DEBT'
                      : scheme?.category === '3'
                      ? 'Cash/Liquid/Money/Market'
                      : scheme?.category === '4'
                      ? 'Hybrid'
                      : ''}
                  </small>
                </section>
                {scheme?.is_recommended && (
                  <>
                    <span className="px-2 py-1 bg-brand text-white text-sm font-normal lg:hidden absolute top-0 right-0 rounded-tr-lg rounded-bl-lg">
                      Recommended
                    </span>
                    <span className="px-2 py-1 bg-brand text-white text-sm font-normal rounded-lg lg:inline-flex hidden ml-auto">
                      Recommended
                    </span>
                  </>
                )}
              </section>
              <section className="w-fit max-w-40 text-xs font-normal text-lightGray border border-brandLight divide-x-2 mt-4 lg:block hidden">
                <div className="px-3 py-2 whitespace-nowrap">
                  {scheme?.category === '1'
                    ? 'Equity'
                    : scheme?.category === '2'
                    ? 'DEBT'
                    : scheme?.category === '3'
                    ? 'Cash/Liquid/Money/Market'
                    : scheme?.category === '4'
                    ? 'Hybrid'
                    : ''}
                </div>
              </section>
            </section>
            <section className="w-full h-96 p-5">
              <section className="flex items-center justify-center max-w-xs text-xs font-normal text-lightGray border mb-5 ">
                {['1M', '3M', '6M', '1Y', '3Y', '5Y'].map((item, idx) => (
                  <span
                    className={classNames(
                      'px-2 py-1 lg:px-4 lg:py-2 text-sm',
                      idx === 5 ? '' : 'border-r-[1px] border-brandLight'
                    )}
                    key={idx}
                  >
                    {item}
                  </span>
                ))}
              </section>
              <MutualFundsChart
                chartData={scheme?.p2p_return}
                categoryAverage={scheme?.return_average}
              />
            </section>
            <section className="mt-10 p-5 lg:p-6 ">
              <MutualFundsChartTable data={scheme} />
            </section>
          </div>
          <section className="hidden lg:block">
            <Tab.Group>
              <Tab.List className="Tabs grid grid-cols-4 text-center mt-8 mb-5">
                {tabsSection.map((_tab, idx) => (
                  <Tab key={idx} className="uppercase  text-sm font-medium">
                    {_tab.name}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <MutualFundOverview data={scheme} />
                </Tab.Panel>
                <Tab.Panel>
                  <MutualFundFacts data={scheme} />
                </Tab.Panel>
                <Tab.Panel>
                  {/* <MutualFundHoldings {...data.fundHoldings} /> */}
                </Tab.Panel>
                <Tab.Panel>
                  <MutualFundPerformance data={scheme} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </section>

          <section className="lg:hidden Tabs mt-10 w-full !p-0">
            <Listbox value={selectedTabOption} onChange={setSelectedTabOption}>
              {({ open }) => (
                <>
                  <Listbox.Button className="!py-3 !px-4 flex justify-between items-center w-full">
                    <span className="Button text-sm font-medium bg-brand uppercase flex-grow focus:ring-0">
                      {tabsSection[selectedTabOption].name}
                    </span>
                    <span
                      className={classNames(
                        'px-2 rounded-full  transition-transform',
                        open ? '' : '-rotate-180'
                      )}
                    >
                      <ChevronCircleArrowIcon className="text-brand w-6 h-6" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Listbox.Options className="focus:ring-0 text-center">
                      {tabsSection.map((_tab) => (
                        <Listbox.Option
                          className="bg-white text-black hover:text-white hover:bg-brand Button w-full hover:cursor-pointer"
                          value={_tab.id}
                          key={_tab.id}
                        >
                          <span className="uppercase  text-sm font-medium">
                            {_tab.name}
                          </span>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>
            <section className="h-full">
              {selectedTabOption === 0 && <MutualFundOverview data={scheme} />}
              {selectedTabOption === 1 && <MutualFundFacts data={scheme} />}
              {
                selectedTabOption === 2 && null
                // <MutualFundHoldings {...data.fundHoldings} />
              }
              {selectedTabOption === 3 && (
                <MutualFundPerformance data={scheme} />
              )}
            </section>
          </section>
        </div>
        <div className="col-span-12 lg:col-span-3 border-l lg:overflow-y-auto bg-white h-full flex flex-col flex-shrink-0">
          <section className="flex-grow">
            <section className="p-5 lg:px-8 lg:mt-10 mb-5 flex items-center justify-center">
              <img src="/e-can-banner.png" alt="e-can" />
            </section>
            <section className="border-y-[1px] border-brandLight p-5 lg:p-8 flex items-center justify-center">
              <section className="relative">
                <img src="/e-can-banner.png" alt="e-can" />
                <span className="absolute top-0 text-white text-2xl font-bold w-48 mx-4 mt-4 mb-6">
                  Get Your personal eCAN in 10 minutes.
                </span>
              </section>
            </section>
          </section>
          <div className="p-5 lg:p-8 flex gap-5 flex-col lg:border-t-[1px] lg:border-brandLight">
            <button
              className="Button uppercase text-center flex-grow"
              onClick={() => setIsOpen(true)}
            >
              Add to cart
            </button>

            <button className="OutlineButton uppercase text-center flex-grow pointer-events-none opacity-40">
              Add to Compare
            </button>
            <button className="OutlineButton uppercase text-center flex-grow pointer-events-none opacity-40">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      <AddToCartModal setIsOpen={setIsOpen} isOpen={isOpen} data={scheme} />
    </div>
  );
}

MutualFundDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
