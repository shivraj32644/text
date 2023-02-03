import { useEffect, useState, type ReactElement } from 'react';
import { Listbox, Tab, Transition } from '@headlessui/react';
import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import classNames from 'classnames';
import {
  DashboardHead,
  AuthenticatedDashboardLayout,
  SWPCartSection,
  STPCartSection,
  SIPCartSection,
  RedeemSectionCart,
  PurchaseCartSection,
  SwitchCartSection,
} from '../../../components/index';

import Link from 'next/link';
import {
  useGetAccountInfoData,
  useGetCartMfItems,
  useGetAccountCANsList,
  IOptions,
} from '@corpcare/shared/api';
import { NextRouter, useRouter } from 'next/router';
import ReactSelect from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

const cartSchema = yup.object({
  can_number: yup.string().required().label('CAN ID'),
});

export type CartFields = yup.InferType<typeof cartSchema>;

const RenderWhenCanNumberIsProvided = ({
  cansList,
  control,
  errors,
  can_number,
  reset,
}) => {
  const { data: accountInfo } = useGetAccountInfoData();
  const router = useRouter() as NextRouter;

  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(0);
  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useGetCartMfItems(
    accountInfo?.account_type === 'individual'
      ? cartMenuItemsIndividual[selectedMenuItemIndex]?.value
      : cartMenuItemsNonIndividual[selectedMenuItemIndex]?.value,
    can_number
  );
  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (
      cansList?.items?.filter(
        (item) => item?.status === 'APPROVED' && item?.can_number === can_number
      )?.length !== 0
    ) {
      reset({
        can_number: can_number,
      });
      return;
    }
  }, [reset, can_number, cansList?.items]);
  return (
    <>
      <div className="flex-grow overflow-y-auto lg:p-8 lg:pb-16 hidden lg:block">
        <div className="grid grid-cols-2 gap-6 max-w-xs ml-auto">
          <label className="col-span-2">
            <span className="Label">CAN Number</span>
            <Controller
              control={control}
              name="can_number"
              render={({ field: { value, onChange, name, ref } }) => {
                return (
                  <ReactSelect
                    options={cansList?.items
                      ?.filter((item) => item?.status === 'APPROVED')
                      ?.map((item) => {
                        return {
                          value: item?.can_number,
                          label: item?.can_number,
                        };
                      })}
                    value={cansList?.items
                      ?.filter((item) => item?.status === 'APPROVED')
                      ?.map((item) => {
                        return {
                          value: item?.can_number,
                          label: item?.can_number,
                        };
                      })
                      .find((c) => c.value === value)}
                    onChange={(e: IOptions) => {
                      router.push({
                        pathname: '/mutual-funds/cart',
                        query: {
                          can_number: e?.value,
                        },
                      });
                    }}
                    defaultValue={{ label: can_number, value: can_number }}
                    isSearchable={false}
                    name={name}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        padding: '2px',
                        '@media only screen and (min-width: 1024px)': {
                          padding: '6px',
                        },
                        boxShadow: state.isFocused ? 'none' : 'none',
                        borderColor: state.isFocused
                          ? '#C5A265'
                          : errors.can_number
                          ? '#F56B63'
                          : base.borderColor,
                        borderRadius: '4px',
                        '&:hover': {
                          boxShadow: state.isFocused ? '#C5A265' : 'none',
                          borderColor: state.isFocused
                            ? '#C5A265'
                            : base.borderColor,
                        },
                      }),
                      singleValue: (base, state) => ({
                        ...base,
                        color: '#555',
                        fontSize: '0.875rem' /* 14px */,
                        lineHeight: '1.25rem' /* 20px */,
                        letterSpacing: '0.02em',
                      }),
                      option: (base, state) => ({
                        ...base,
                        fontSize: '16px',
                        backgroundColor: state.isSelected
                          ? '#C5A265'
                          : state.isFocused
                          ? '#EADDC7'
                          : '',
                        color: state.isSelected ? 'white' : '#555',
                        '&:hover': {
                          backgroundColor: state.isFocused ? '#EADDC7' : '',
                          color: '#555',
                        },
                      }),
                    }}
                  />
                );
              }}
            />
            <span className="FieldError">{errors.can_number?.message}</span>
          </label>
        </div>
        {accountInfo?.account_type === 'individual' ? (
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

            <Tab.Panels className="h-full">
              <Tab.Panel className="h-full">
                <PurchaseCartSection
                  data={cartItems && cartItems[0]}
                  isLoading={isLoading}
                  can_number={can_number}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <SwitchCartSection
                  data={cartItems && cartItems[0]}
                  isLoading={isLoading}
                  can_number={can_number}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <RedeemSectionCart
                  data={cartItems && cartItems[0]}
                  isLoading={isLoading}
                  can_number={can_number}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <SIPCartSection
                  data={cartItems && cartItems[0]}
                  isLoading={isLoading}
                  can_number={can_number}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <STPCartSection
                  data={cartItems && cartItems[0]}
                  isLoading={isLoading}
                  can_number={can_number}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <SWPCartSection
                  data={cartItems && cartItems[0]}
                  isLoading={isLoading}
                  can_number={can_number}
                />
              </Tab.Panel>
            </Tab.Panels>
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

            <Tab.Panels className="h-full">
              <Tab.Panel className="h-full">
                <PurchaseCartSection
                  data={cartItems && cartItems[0]}
                  isLoading={isLoading}
                  can_number={can_number}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <SwitchCartSection
                  data={cartItems && cartItems[0]}
                  isLoading={isLoading}
                  can_number={can_number}
                />
              </Tab.Panel>
              <Tab.Panel className="h-full">
                <RedeemSectionCart
                  data={cartItems && cartItems[0]}
                  isLoading={isLoading}
                  can_number={can_number}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        )}
      </div>
      <div className="flex-grow overflow-y-auto p-4 pb-12 lg:hidden">
        <div className="grid grid-cols-2 gap-6 max-w-xs ml-auto">
          <label className="col-span-2">
            <span className="Label">CAN Number</span>
            <Controller
              control={control}
              name="can_number"
              render={({ field: { value, onChange, name, ref } }) => {
                return (
                  <ReactSelect
                    options={cansList?.items?.map((item) => {
                      return {
                        value: item?.can_number,
                        label: item?.can_number,
                      };
                    })}
                    value={cansList?.items
                      ?.map((item) => {
                        return {
                          value: item?.can_number,
                          label: item?.can_number,
                        };
                      })
                      .find((c) => c.value === value)}
                    onChange={(e: IOptions) => {
                      router.push({
                        pathname: '/mutual-funds/cart',
                        query: {
                          can_number: e?.value,
                        },
                      });
                    }}
                    defaultValue={{ label: can_number, value: can_number }}
                    isSearchable={false}
                    name={name}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        padding: '2px',
                        '@media only screen and (min-width: 1024px)': {
                          padding: '6px',
                        },
                        boxShadow: state.isFocused ? 'none' : 'none',
                        borderColor: state.isFocused
                          ? '#C5A265'
                          : errors.can_number
                          ? '#F56B63'
                          : base.borderColor,
                        borderRadius: '4px',
                        '&:hover': {
                          boxShadow: state.isFocused ? '#C5A265' : 'none',
                          borderColor: state.isFocused
                            ? '#C5A265'
                            : base.borderColor,
                        },
                      }),
                      singleValue: (base, state) => ({
                        ...base,
                        color: '#555',
                        fontSize: '0.875rem' /* 14px */,
                        lineHeight: '1.25rem' /* 20px */,
                        letterSpacing: '0.02em',
                      }),
                      option: (base, state) => ({
                        ...base,
                        fontSize: '16px',
                        backgroundColor: state.isSelected
                          ? '#C5A265'
                          : state.isFocused
                          ? '#EADDC7'
                          : '',
                        color: state.isSelected ? 'white' : '#555',
                        '&:hover': {
                          backgroundColor: state.isFocused ? '#EADDC7' : '',
                          color: '#555',
                        },
                      }),
                    }}
                  />
                );
              }}
            />
            <span className="FieldError">{errors.can_number?.message}</span>
          </label>
        </div>
        <section className="lg:hidden Tabs w-full !p-0 mb-6">
          {accountInfo?.account_type === 'individual' ? (
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
        <section className="h-full">
          {selectedMenuItemIndex === 1 ? (
            <SwitchCartSection
              data={cartItems && cartItems[0]}
              isLoading={isLoading}
              can_number={can_number}
            />
          ) : selectedMenuItemIndex === 2 ? (
            <RedeemSectionCart
              data={cartItems && cartItems[0]}
              isLoading={isLoading}
              can_number={can_number}
            />
          ) : selectedMenuItemIndex === 3 ? (
            <SIPCartSection
              data={cartItems && cartItems[0]}
              isLoading={isLoading}
              can_number={can_number}
            />
          ) : selectedMenuItemIndex === 4 ? (
            <STPCartSection
              data={cartItems && cartItems[0]}
              isLoading={isLoading}
              can_number={can_number}
            />
          ) : selectedMenuItemIndex === 5 ? (
            <SWPCartSection
              data={cartItems && cartItems[0]}
              isLoading={isLoading}
              can_number={can_number}
            />
          ) : (
            <PurchaseCartSection
              data={cartItems && cartItems[0]}
              isLoading={isLoading}
              can_number={can_number}
            />
          )}
        </section>
      </div>
    </>
  );
};
export default function CartPage() {
  const router = useRouter() as NextRouter;

  const { data: cansList, isLoading } = useGetAccountCANsList();
  const { can_number } = router?.query as { can_number: string };

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<CartFields>({
    resolver: yupResolver(cartSchema),
  });
  useEffect(() => {
    if (!can_number && !!cansList?.items && cansList?.items?.length !== 0) {
      const canListRef = cansList?.items?.filter(
        (item) => item?.status === 'APPROVED'
      );
      if (!!canListRef && canListRef?.length !== 0) {
        router?.replace({
          pathname: '/mutual-funds/cart',
          query: {
            can_number: canListRef[0]?.can_number,
          },
        });
        return;
      }
    }
  }, [can_number, cansList, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center  items-center h-full">
        <div role="status" className="relative">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-white animate-spin  fill-brand"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">My Cart</h2>
        <div className="text-xs text-lightGray flex gap-1">
          <Link href="/mutual-funds/cart">
            <a>My Cart</a>
          </Link>
        </div>
      </DashboardHead>
      {!!cansList?.items && cansList?.items?.length === 0 && !isLoading ? (
        <div className="flex-grow overflow-y-auto lg:p-8 lg:pb-16 relative">
          <div className="absolute inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="w-full max-w-sm  transform overflow-hidden rounded-lg bg-white text-center align-middle shadow-xl transition-all">
                <section className="flex flex-col py-6 px-20 gap-4 items-center">
                  <section className="text-2xl font-medium text-darkGray flex items-center flex-col">
                    Please Register CAN to proceed further
                  </section>
                  <button
                    className="Button uppercase w-40 text-base font-semibold"
                    onClick={() => router.push('/profile/cans')}
                  >
                    Register CAN
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      ) : !!cansList?.items &&
        !isLoading &&
        cansList?.items?.filter(
          (item) =>
            item?.status === 'APPROVED' && item?.can_number === can_number
        )?.length === 0 ? (
        <div className="flex-grow overflow-y-auto lg:p-8 lg:pb-16 relative">
          <div className="absolute inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-center align-middle shadow-xl transition-all">
                <section className="flex flex-col py-6 px-20 gap-4 items-center">
                  <section className="text-2xl font-medium text-darkGray flex items-center flex-col">
                    Please Wait for the approval of {can_number} CAN to proceed
                    further
                  </section>
                  <button
                    className="Button uppercase w-40 text-base font-semibold"
                    onClick={() => router.push('/profile/cans')}
                  >
                    View CAN
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RenderWhenCanNumberIsProvided
          cansList={cansList}
          control={control}
          errors={errors}
          can_number={can_number}
          reset={reset}
        />
      )}
    </div>
  );
}

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
