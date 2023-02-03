import Link from 'next/link';
import { type ReactElement, useState, useEffect } from 'react';
import { Listbox, Tab, Transition } from '@headlessui/react';
import { DashboardHead } from '../../../components/DashboardHead';
import { AuthenticatedDashboardLayout } from '../../../components/AuthenticatedDashboardLayout';
// import { MutualFundsFilters } from '../../../components/MutualFundsFilters';
import classNames from 'classnames';
import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import { useGetClientDetailsData } from '@corpcare/shared/api';
import { useRouter } from 'next/router';
import ChooseClientModal from 'apps/rm-webapp/components/ChooseClientModal';

const ordersTabsIndividual = [
  { id: 0, name: 'Normal' },
  { id: 1, name: 'Systematic' },
  { id: 2, name: 'Scheduled' },
];
const ordersTabsNonIndividual = [
  { id: 0, name: 'Normal' },
  { id: 1, name: 'Approval' },
];

export default function MutualFundsOrdersPage() {
  const [currentTabIndex, setCurrentTab] = useState(0);
  // const { data } = useGetMutualFundsOrders();
  const router = useRouter();
  const { client_id } = router?.query as { client_id: string };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: profile, refetch: profileRefetch } = useGetClientDetailsData({
    clientId: client_id || '',
  });
  useEffect(() => {
    if (!client_id) {
      setIsOpen(true);
    }
  }, [client_id]);

  useEffect(() => {
    profileRefetch();
  }, [profileRefetch]);

  if (!client_id) {
    return (
      <>
        <div className="flex items-center justify-center h-full flex-col gap-2">
          <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
          <h1 className="text-center text-base lg:text-lg">
            Please Select Client
          </h1>
          <button
            className="OutlineButton uppercase lg:text-base text-sm"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Change client
          </button>
        </div>
        <ChooseClientModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          pathName="/mutual-funds/orders"
        />
      </>
    );
  }
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Order Book</h2>
        <div className="text-xs text-lightGray flex gap-1">
          <Link href="/mutual-funds/all">
            <a>Mutual Funds</a>
          </Link>
          &gt;
          {profile?.account_type === 'individual' ? (
            <a>{ordersTabsIndividual[currentTabIndex].name}</a>
          ) : (
            <a>{ordersTabsNonIndividual[currentTabIndex].name}</a>
          )}
        </div>
      </DashboardHead>

      <div className="p-4 lg:p-8 pb-5 lg:pb-16 overflow-y-auto space-y-6">
        <section className="Card flex items-center justify-between bg-lighter flex-wrap lg:gap-0 gap-4 ">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-lg lg:text-xl text-lightGray font-medium tracking-wide">
              {profile?.name}
            </h2>
            <button className="border border-brandLight rounded uppercase w-28 font-normal text-sm text-lightGray py-1 px-4">
              {profile?.account_type}
            </button>
          </div>
          <button
            className="OutlineButton uppercase lg:text-base text-sm"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Change client
          </button>
        </section>
        <section className="lg:block hidden">
          {profile?.account_type === 'individual' ? (
            <Tab.Group onChange={setCurrentTab}>
              <Tab.List className="Tabs mb-6 grid grid-cols-3 text-center">
                <Tab className="uppercase">Normal</Tab>
                <Tab className="uppercase">Systematic</Tab>
                <Tab className="uppercase">Scheduled</Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  {/* <MutualFundsOrderBook
                    title="Normal Order Book"
                    orders={data.normal}
                    setFiltersOpen={setFiltersOpen}
                  /> */}
                  <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                    No Normal Orders Found
                  </h3>
                </Tab.Panel>
                <Tab.Panel>
                  {/* <MutualFundsOrderBook
                    title="Normal Order Book"
                    orders={data.normal}
                    setFiltersOpen={setFiltersOpen}
                  /> */}
                  <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                    No Systematic Orders Found
                  </h3>
                </Tab.Panel>
                <Tab.Panel>
                  {/* <MutualFundsOrderBook
                    title="Scheduled Order Book"
                    orders={data.scheduled}
                    setFiltersOpen={setFiltersOpen}
                  /> */}
                  <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                    No Scheduled Orders Found
                  </h3>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          ) : (
            <Tab.Group onChange={setCurrentTab}>
              <Tab.List className="Tabs mb-6 grid grid-cols-2 text-center">
                <Tab className="uppercase">Normal</Tab>
                <Tab className="uppercase">Approval</Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  {/* <MutualFundsOrderBook
                    title="Normal Order Book"
                    orders={data.normal}
                    setFiltersOpen={setFiltersOpen}
                  /> */}
                  <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                    No Normal Orders Found
                  </h3>
                </Tab.Panel>
                <Tab.Panel>
                  {/* <MutualFundsOrderBook
                    title="Approval Order Book"
                    orders={data.normal}
                    setFiltersOpen={setFiltersOpen}
                  /> */}
                  <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                    No Approval Orders Found
                  </h3>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          )}
        </section>
        <section className="lg:hidden Tabs w-full !p-0">
          <Listbox value={currentTabIndex} onChange={setCurrentTab}>
            {({ open }) => (
              <>
                <Listbox.Button className="!py-3 !px-4 flex justify-between items-center w-full">
                  <span className="Button text-sm font-medium bg-brand uppercase flex-grow focus:ring-0">
                    {profile?.account_type === 'individual'
                      ? ordersTabsIndividual[currentTabIndex].name
                      : ordersTabsNonIndividual[currentTabIndex].name}
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
                    {profile?.account_type === 'individual'
                      ? ordersTabsIndividual.map((_tab) => (
                          <Listbox.Option
                            className="bg-white text-black hover:text-white hover:bg-brand Button w-full hover:cursor-pointer"
                            value={_tab.id}
                            key={_tab.id}
                          >
                            <span className="uppercase  text-sm font-medium">
                              {_tab.name}
                            </span>
                          </Listbox.Option>
                        ))
                      : ordersTabsNonIndividual.map((_tab) => (
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
        </section>
        {profile?.account_type === 'individual' ? (
          <section className="mt-5 lg:hidden">
            {currentTabIndex === 1 ? (
              <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                No Systematic Orders Found
              </h3>
            ) : currentTabIndex === 2 ? (
              <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                No Scheduled Orders Found
              </h3>
            ) : (
              <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                No Normal Orders Found
              </h3>
            )}
          </section>
        ) : (
          <section className="mt-5 lg:hidden">
            {currentTabIndex === 0 ? (
              <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                No Normal Orders Found
              </h3>
            ) : (
              <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                No Approval Orders Found
              </h3>
            )}
          </section>
        )}
      </div>
      <ChooseClientModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        pathName="mutual-funds/orders"
      />
    </div>
  );
}

MutualFundsOrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
