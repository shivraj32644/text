import Link from 'next/link';
import { type ReactElement, useState, useEffect, Fragment } from 'react';
import {
  Dialog,
  Disclosure,
  Listbox,
  Tab,
  Transition,
} from '@headlessui/react';
import {
  AuthenticatedDashboardLayout,
  DashboardHead,
  MutualFundsOrderBook,
} from '../../../components/index';
import classNames from 'classnames';
import {
  BlackCrossCircle,
  ChevronCircleArrowIcon,
  CustomToast,
} from '@corpcare/web/ui';
import {
  IOptions,
  OptionsProps,
  OrderStatusOptions,
  OrderTxnTypeOptions,
  status,
  txn_type,
  type,
  useGetAccountCANsList,
  useGetAccountInfoData,
  useGetListAllAccountsOrder,
} from '@corpcare/shared/api';
import { NextRouter, useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactSelect from 'react-select';
import { Controller, useController, useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';

const orderSchema = yup.object({
  can_number: yup.string().required().label('CAN ID'),
});

const Checkboxes = ({
  options,
  control,
  name,
  multiSelect = true,
}: {
  options: OptionsProps[];
  name: string;
  control: any;
  multiSelect?: boolean;
}) => {
  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = useState(field.value || []);
  return (
    <div className="space-y-6">
      {options?.map((option, index) => {
        return (
          <div key={index} className="flex items-center">
            <input
              onChange={(e) => {
                const valueCopy = multiSelect ? [...value] : [];

                // update checkbox value
                valueCopy[index] = e.target.checked
                  ? e.target.value
                  : undefined;
                // send data to react hook form
                field.onChange(valueCopy);
                // update local state
                setValue(valueCopy);
              }}
              key={option.value}
              type="checkbox"
              checked={value.includes(option.value)}
              value={option.value}
              className="h-4 w-4 border-brand rounded text-brand focus:ring-brand"
            />
            <span className="ml-3 min-w-0 flex-1 text-lightGray text-sm">
              {option.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export type OrderFields = yup.InferType<typeof orderSchema>;

const ordersTabsIndividual = [
  { id: 0, name: 'Normal', value: 'NORMAL' },
  { id: 1, name: 'Systematic', value: 'SYSTEMATIC' },
  { id: 2, name: 'Scheduled', value: 'SCHEDULED' },
];
const ordersTabsNonIndividual = [
  { id: 0, name: 'Normal', value: 'NORMAL' },
  { id: 1, name: 'Approval', value: 'APPROVAL' },
];

const RenderWhenCanNumberIsProvided = ({
  cansList,
  control,
  errors,
  can_number,
  reset,
}) => {
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState<number>(0);
  const { data: accountInfo } = useGetAccountInfoData();

  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [txn_type, setTxn_type] = useState<txn_type[] | undefined>(undefined);
  const [status, setStatus] = useState<status[] | undefined>(undefined);

  const router = useRouter() as NextRouter;
  const { data, refetch, isLoading, isError, error } =
    useGetListAllAccountsOrder(
      accountInfo?.account_type === 'individual'
        ? (ordersTabsIndividual[selectedMenuItemIndex]?.value as type)
        : (ordersTabsNonIndividual[selectedMenuItemIndex]?.value as type),
      can_number,
      status,
      txn_type
    );

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

  useEffect(() => {
    if (isError) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={
            (error as any)?.message || 'Something went wrong! Please try again.'
          }
          type="error"
        />
      ));
    }
  }, [isError, error]);
  useEffect(() => {
    refetch();
  }, [refetch]);

  const {
    reset: resetValues,
    control: formControl,
    formState: { isDirty },
    getValues,
  } = useForm({
    defaultValues: {
      txn_type: [],
      status: [],
    },
  });
  const handleFormSubmit = (data) => {
    // console.log(data);
  };
  useEffect(() => {
    if (!isDirty) return;
    const values = getValues();
    setStatus(
      getValues('status')
        ?.filter((item) => item)
        ?.map((v) => {
          return `${v}`;
        }) as any
    );
    setTxn_type(
      getValues('txn_type')
        ?.filter((item) => item)
        ?.map((v) => {
          return `${v}`;
        }) as any
    );

    resetValues(values);
  }, [isDirty, getValues, resetValues, setStatus, setTxn_type]);

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Order Book</h2>
        <div className="text-xs text-lightGray flex gap-1">
          <Link href="/mutual-funds/all">
            <a>Mutual Funds</a>
          </Link>
          &gt;
          {accountInfo?.account_type === 'individual' ? (
            <a>{ordersTabsIndividual[selectedMenuItemIndex].name}</a>
          ) : (
            <a>{ordersTabsNonIndividual[selectedMenuItemIndex].name}</a>
          )}
        </div>
      </DashboardHead>

      <div className="p-4 lg:p-8 pb-5 lg:pb-16 overflow-y-auto h-full">
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
                        pathname: '/mutual-funds/orders',
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
        <section className="lg:block hidden">
          {accountInfo?.account_type === 'individual' ? (
            <Tab.Group
              selectedIndex={selectedMenuItemIndex}
              onChange={setSelectedMenuItemIndex}
            >
              <Tab.List className="Tabs mb-6 grid grid-cols-3 text-center">
                {ordersTabsIndividual?.map((item, index) => (
                  <Tab key={item?.id} className="uppercase">
                    {item?.name}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <MutualFundsOrderBook
                    title="Normal"
                    orders={data?.items}
                    setFiltersOpen={setFiltersOpen}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <MutualFundsOrderBook
                    title="Systematic"
                    orders={data?.items}
                    setFiltersOpen={setFiltersOpen}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <MutualFundsOrderBook
                    title="Scheduled"
                    orders={data?.items}
                    setFiltersOpen={setFiltersOpen}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          ) : (
            <Tab.Group
              selectedIndex={selectedMenuItemIndex}
              onChange={setSelectedMenuItemIndex}
            >
              <Tab.List className="Tabs mb-6 grid grid-cols-2 text-center">
                {ordersTabsNonIndividual?.map((item, index) => (
                  <Tab key={item?.id} className="uppercase">
                    {item?.name}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <MutualFundsOrderBook
                    title="Normal"
                    orders={data?.items}
                    setFiltersOpen={setFiltersOpen}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <MutualFundsOrderBook
                    title="Approval"
                    orders={data?.items}
                    setFiltersOpen={setFiltersOpen}
                    isLoading={isLoading}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          )}
        </section>
        <section className="lg:hidden Tabs w-full !p-0">
          <Listbox
            value={selectedMenuItemIndex}
            onChange={setSelectedMenuItemIndex}
          >
            {({ open }) => (
              <>
                <Listbox.Button className="!py-3 !px-4 flex justify-between items-center w-full">
                  <span className="Button text-sm font-medium bg-brand uppercase flex-grow focus:ring-0">
                    {accountInfo?.account_type === 'individual'
                      ? ordersTabsIndividual[selectedMenuItemIndex]?.value
                      : ordersTabsNonIndividual[selectedMenuItemIndex]?.value}
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
                    {accountInfo?.account_type === 'individual'
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
        {accountInfo?.account_type === 'individual' ? (
          <section className="mt-5 lg:hidden">
            {selectedMenuItemIndex === 0 && (
              <MutualFundsOrderBook
                title="Normal"
                orders={data?.items}
                setFiltersOpen={setFiltersOpen}
                isLoading={isLoading}
              />
            )}
            {selectedMenuItemIndex === 1 && (
              <MutualFundsOrderBook
                title="Systematic"
                orders={data?.items}
                setFiltersOpen={setFiltersOpen}
                isLoading={isLoading}
              />
            )}
            {selectedMenuItemIndex === 2 && (
              <MutualFundsOrderBook
                title="Scheduled"
                orders={data?.items}
                setFiltersOpen={setFiltersOpen}
                isLoading={isLoading}
              />
            )}
          </section>
        ) : (
          <section className="mt-5 lg:hidden">
            {selectedMenuItemIndex === 0 && (
              <MutualFundsOrderBook
                title="Normal"
                orders={data?.items}
                setFiltersOpen={setFiltersOpen}
                isLoading={isLoading}
              />
            )}
            {selectedMenuItemIndex === 1 && (
              <MutualFundsOrderBook
                title="Approval"
                orders={data?.items}
                setFiltersOpen={setFiltersOpen}
                isLoading={isLoading}
              />
            )}
          </section>
        )}
      </div>
      <Transition.Root show={filtersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 "
          onClose={() => setFiltersOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl flex flex-col">
                <div className="px-6 py-4 flex items-center justify-between bg-lighter border-b border-brandLight">
                  <h2 className="text-xl font-medium text-lightGray">
                    Filters
                  </h2>

                  <BlackCrossCircle
                    className="h-8 w-8 hover:cursor-pointer text-white"
                    onClick={() => setFiltersOpen(false)}
                  />
                </div>

                <div className="flex-grow overflow-y-auto">
                  <Disclosure as="div" className={classNames('px-4 py-6')}>
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-lightGray text-base">
                              Txn. Type
                            </span>
                            <span
                              className={classNames(
                                'ml-6 flex items-center rounded-full  transition-transform',
                                open ? '-rotate-180' : ''
                              )}
                            >
                              <ChevronCircleArrowIcon className="w-5 h-5" />
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <Checkboxes
                            options={OrderTxnTypeOptions}
                            control={formControl}
                            name="txn_type"
                            multiSelect={false}
                          />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure
                    as="div"
                    className={classNames(
                      'px-4 py-6',
                      'border-t border-brandLight'
                    )}
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-lightGray text-base">
                              Status
                            </span>
                            <span
                              className={classNames(
                                'ml-6 flex items-center rounded-full  transition-transform',
                                open ? '-rotate-180' : ''
                              )}
                            >
                              <ChevronCircleArrowIcon className="w-5 h-5" />
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <Checkboxes
                            options={OrderStatusOptions}
                            control={formControl}
                            name="status"
                            multiSelect={false}
                          />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
                <span
                  className="Button uppercase w-full rounded-none sticky px-20 py-5 cursor-pointer"
                  onClick={() => {
                    setStatus(undefined);
                    setTxn_type(undefined);

                    resetValues(
                      {
                        status: undefined,
                        txn_type: undefined,
                      },
                      { keepDirty: true, keepDirtyValues: true }
                    );
                    setFiltersOpen(false);
                  }}
                >
                  Clear all filters
                </span>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
export default function MutualFundsOrdersPage() {
  const router = useRouter() as NextRouter;
  const { data: cansList, isLoading } = useGetAccountCANsList();

  const { can_number } = router?.query as { can_number: string };

  const {
    reset,
    control,
    formState: { errors },
  } = useForm<OrderFields>({
    resolver: yupResolver(orderSchema),
  });

  useEffect(() => {
    if (!can_number && !!cansList?.items && cansList?.items?.length !== 0) {
      const canListRef = cansList?.items?.filter(
        (item) => item?.status === 'APPROVED'
      );
      if (!!canListRef && canListRef?.length !== 0) {
        router?.replace({
          pathname: '/mutual-funds/orders',
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
    <>
      {!!cansList?.items && cansList?.items?.length === 0 && !isLoading ? (
        <div className="xl:overflow-hidden h-full flex flex-col">
          <DashboardHead>
            <h2 className="font-medium">Orders</h2>
            <div className="text-xs text-lightGray flex gap-1">
              <Link href="/mutual-funds/orders">
                <a>Orders</a>
              </Link>
            </div>
          </DashboardHead>
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
        </div>
      ) : !!cansList?.items &&
        cansList?.items?.filter(
          (item) =>
            item?.status === 'APPROVED' && item?.can_number === can_number
        )?.length === 0 &&
        !isLoading ? (
        <div className="xl:overflow-hidden h-full flex flex-col">
          <DashboardHead>
            <h2 className="font-medium">Orders</h2>
            <div className="text-xs text-lightGray flex gap-1">
              <Link href="/mutual-funds/orders">
                <a>Orders</a>
              </Link>
            </div>
          </DashboardHead>
          <div className="flex-grow overflow-y-auto lg:p-8 lg:pb-16 relative">
            <div className="absolute inset-0 overflow-y-auto ">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div className="w-full max-w-md  transform overflow-hidden rounded-lg bg-white text-center align-middle shadow-xl transition-all">
                  <section className="flex flex-col py-6 px-20 gap-4 items-center">
                    <section className="text-2xl font-medium text-darkGray flex items-center flex-col">
                      Please Wait for the approval of {can_number} CAN to
                      proceed further
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
    </>
  );
}

MutualFundsOrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
