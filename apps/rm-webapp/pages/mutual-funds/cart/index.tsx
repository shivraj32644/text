import { useEffect, useState, type ReactElement } from 'react';
import { Listbox, Tab, Transition } from '@headlessui/react';
import { AuthenticatedDashboardLayout } from '../../../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../../../components/DashboardHead';
import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import classNames from 'classnames';
import Link from 'next/link';
import {
  useGetCartMfItems,
  useGetClientDetailsData,
} from '@corpcare/shared/api';
import ChooseClientModal from '../../../components/ChooseClientModal';
import { useRouter } from 'next/router';

const cartMenuItemsIndividual = [
  { id: 0, name: 'Purchase', value: 'PURCHASE' },
  { id: 1, name: 'Switch', value: 'SWITCH' },
  { id: 2, name: 'Redeem', value: 'REDEMPTION' },
  { id: 3, name: 'SIP', value: 'SIP' },
  { id: 4, name: 'STP', value: 'STP' },
  { id: 5, name: 'SWP', value: 'SWP' },
];
const cartMenuItemsNonIndividual = [
  { id: 0, name: 'Purchase', value: 'PURCHASE' },
  { id: 1, name: 'Switch', value: 'SWITCH' },
  { id: 2, name: 'Redeem', value: 'REDEMPTION' },
];
export default function CartPage() {
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(0);
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

  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useGetCartMfItems(
    profile?.account_type === 'individual'
      ? cartMenuItemsIndividual[selectedMenuItemIndex]?.value
      : cartMenuItemsNonIndividual[selectedMenuItemIndex]?.value,
    undefined,
    client_id
  );

  useEffect(() => {
    refetch();
    profileRefetch();
  }, [refetch, profileRefetch]);

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
          pathName="/mutual-funds/cart"
        />
      </>
    );
  }
  return (
    <>
      <div className="xl:overflow-hidden h-full flex flex-col">
        <DashboardHead>
          <h2 className="font-medium">My Cart</h2>
          <div className="text-xs text-lightGray flex gap-1">
            <Link href="/mutual-funds/cart">
              <a>My Cart</a>
            </Link>
          </div>
        </DashboardHead>
        <div className="flex-grow overflow-y-auto p-4 pb-8 lg:p-8 lg:pb-16 hidden lg:block space-y-6">
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
          {profile?.account_type === 'individual' ? (
            <Tab.Group
              selectedIndex={selectedMenuItemIndex}
              onChange={setSelectedMenuItemIndex}
            >
              <Tab.List className="Tabs mb-6 grid grid-cols-6 text-center">
                {cartMenuItemsIndividual.map((item, index) => (
                  <Tab key={item.id} className="uppercase">
                    {item.name}
                  </Tab>
                ))}
              </Tab.List>

              {/* <Tab.Panels className="h-full">
                <Tab.Panel className="h-full">
                  <PurchaseCartSection
                    data={cartItems && cartItems[0]}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <SwitchCartSection
                    data={cartItems && cartItems[0]}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <RedeemSectionCart
                    data={cartItems && cartItems[0]}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <SIPCartSection
                    data={cartItems && cartItems[0]}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <STPCartSection
                    data={cartItems && cartItems[0]}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <SWPCartSection
                    data={cartItems && cartItems[0]}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
              </Tab.Panels> */}
            </Tab.Group>
          ) : (
            <Tab.Group
              selectedIndex={selectedMenuItemIndex}
              onChange={setSelectedMenuItemIndex}
            >
              <Tab.List className="Tabs mb-6 grid grid-cols-3 text-center">
                {cartMenuItemsNonIndividual.map((item, index) => (
                  <Tab key={item.id} className="uppercase">
                    {item.name}
                  </Tab>
                ))}
              </Tab.List>

              {/* <Tab.Panels className="h-full">
                <Tab.Panel className="h-full">
                  <PurchaseCartSection
                    data={cartItems && cartItems[0]}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <SwitchCartSection
                    data={cartItems && cartItems[0]}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <RedeemSectionCart
                    data={cartItems && cartItems[0]}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
              </Tab.Panels> */}
            </Tab.Group>
          )}
        </div>
        <div className="flex-grow overflow-y-auto p-4 pb-12 lg:hidden">
          <section className="lg:hidden Tabs w-full !p-0 mb-6">
            {profile?.account_type === 'individual' ? (
              <Listbox
                value={selectedMenuItemIndex}
                onChange={setSelectedMenuItemIndex}
              >
                {({ open }) => (
                  <>
                    <Listbox.Button className="!py-3 !px-4 flex justify-between items-center w-full">
                      <span className="Button text-sm font-medium bg-brand uppercase flex-grow focus:ring-0">
                        {cartMenuItemsIndividual[selectedMenuItemIndex].name}
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
                        {cartMenuItemsIndividual.map((_tab) => (
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
            ) : (
              <Listbox
                value={selectedMenuItemIndex}
                onChange={setSelectedMenuItemIndex}
              >
                {({ open }) => (
                  <>
                    <Listbox.Button className="!py-3 !px-4 flex justify-between items-center w-full">
                      <span className="Button text-sm font-medium bg-brand uppercase flex-grow focus:ring-0">
                        {cartMenuItemsNonIndividual[selectedMenuItemIndex].name}
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
                        {cartMenuItemsNonIndividual.map((_tab) => (
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
            )}
          </section>
          {/* <section className="h-full">
            {selectedMenuItemIndex === 1 ? (
              <SwitchCartSection
                data={cartItems && cartItems[0]}
                isLoading={isLoading}
              />
            ) : selectedMenuItemIndex === 2 ? (
              <RedeemSectionCart
                data={cartItems && cartItems[0]}
                isLoading={isLoading}
              />
            ) : selectedMenuItemIndex === 3 ? (
              <SIPCartSection
                data={cartItems && cartItems[0]}
                isLoading={isLoading}
              />
            ) : selectedMenuItemIndex === 4 ? (
              <STPCartSection
                data={cartItems && cartItems[0]}
                isLoading={isLoading}
              />
            ) : selectedMenuItemIndex === 5 ? (
              <SWPCartSection
                data={cartItems && cartItems[0]}
                isLoading={isLoading}
              />
            ) : (
              <PurchaseCartSection
                data={cartItems && cartItems[0]}
                isLoading={isLoading}
              />
            )}
          </section> */}
        </div>
      </div>
      <ChooseClientModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        pathName="/mutual-funds/cart"
      />
    </>
  );
}

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
