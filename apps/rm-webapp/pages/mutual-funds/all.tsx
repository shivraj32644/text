import Link from 'next/link';
import { Fragment, useEffect, useState, type ReactElement } from 'react';

import { DashboardHead } from '../../components/DashboardHead';
import { AuthenticatedDashboardLayout } from '../../components/AuthenticatedDashboardLayout';
import {
  BalanceIcon,
  BrandPlusAddIcon,
  ChevronCircleArrowIcon,
  FilterIcon,
  GridSquareIcon,
  ListIcon,
  MutualFundCard,
  SearchIcon,
  WatchListIcon,
  BlackCrossCircle,
  AddToCartModal,
} from '@corpcare/web/ui';
import { Disclosure, Tab, Dialog, Transition } from '@headlessui/react';
import {
  AvailabletoInvestOptions,
  CategoryOptions,
  FundSizeOptions,
  OptionsProps,
  PlanDividendOptions,
  useGetClientDetailsData,
  useGetMutualFundAmcList,
  useGetMutualSchema,
} from '@corpcare/shared/api';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';
import { Controller, useController, useForm } from 'react-hook-form';
import ChooseClientModal from '../../components/ChooseClientModal';
import { useRouter } from 'next/router';

const tableColumns = [
  { name: 'plan_name' as const, label: 'Plan Name' },
  { name: 'year_1' as const, label: '1 Yr' },
  { name: 'year_3' as const, label: '3 Yrs' },
  { name: 'year_5' as const, label: '5 Yrs' },
  { name: 'actions' as const, label: 'Actions' },
];
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

export default function AllMutualFundsPage() {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [options, setOptions] = useState<string[] | undefined>(undefined);
  const [category, setCategory] = useState<string[] | undefined>(undefined);
  const [funds_size, setFundSize] = useState<string[] | undefined>(undefined);
  const [amc, setAmc] = useState<string[] | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [sip, setSip] = useState<string[] | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cardData, setCardData] = useState<any>();
  const router = useRouter();
  const { client_id } = router?.query as { client_id: string };

  useEffect(() => {
    if (!client_id) {
      setIsOpen(true);
    }
  }, [client_id]);
  const { data: profile, refetch: profileRefetch } = useGetClientDetailsData({
    clientId: client_id || '',
  });
  useEffect(() => {
    profileRefetch();
  }, [profileRefetch]);

  const { data: schema, isLoading } = useGetMutualSchema(
    currentPage,
    searchTerm,
    options,
    amc,
    funds_size,
    category,
    sip,
    false,
    client_id
  );
  const { data: amcData } = useGetMutualFundAmcList();

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
    getValues,
  } = useForm({
    defaultValues: {
      funds_size: [],
      category: [],
      options: [],
      sip: [],
      search: undefined,
      amc: [],
    },
  });

  const handleFormSubmit = (data) => {
    // console.log(data);
  };

  useEffect(() => {
    const values = getValues();
    if (!isDirty) return;
    setOptions(
      getValues('options')
        ?.filter((item) => item)
        ?.map((v) => {
          return `div_option=${v}`;
        })
    );
    setCategory(
      getValues('category')
        ?.filter((item) => item)
        ?.map((v) => {
          return `category=${v}`;
        })
    );
    setFundSize(
      getValues('funds_size')
        ?.filter((item) => item)
        ?.map((v) => {
          return `fund_size=${v}`;
        })
    );
    setAmc(
      getValues('amc')
        ?.filter((item) => item)
        ?.map((v) => {
          return `amc_id=${v}`;
        })
    );
    setSip(
      getValues('sip')
        ?.filter((item) => item)
        ?.map((v) => {
          return `sip=${v}`;
        })
    );

    setCurrentPage(1);
    setSearchTerm(values?.search);
    reset(values);
  }, [
    isDirty,
    getValues,
    reset,
    setAmc,
    setCurrentPage,
    setSip,
    setSearchTerm,
    setFundSize,
    setCategory,
    setOptions,
  ]);

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
          pathName="/mutual-funds/all"
        />
      </>
    );
  }
  return (
    <>
      <form
        className={classNames(
          'xl:overflow-hidden h-full flex flex-col',
          isLoading ? 'animate-pulse pointer-events-none' : ''
        )}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <DashboardHead>
          <h2 className="font-medium">Mutual Funds</h2>
          <div className="text-xs text-lightGray">
            <Link href="/mutual-funds/all">
              <a>Mutual Funds</a>
            </Link>
          </div>
        </DashboardHead>

        <div className="p-4 lg:p-8 pb-16 overflow-y-auto">
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

          <div className="my-10">
            <Tab.Group defaultIndex={1}>
              <div className="mb-8 flex lg:flex-row flex-col gap-4 items-center my-10">
                <div className="lg:flex-grow flex justify-between gap-5 lg:order-1 order-2">
                  <Controller
                    control={control}
                    name="search"
                    render={({ field: { value, onChange, name } }) => {
                      // A third party component that requires Controller
                      return (
                        <div className="relative">
                          <input
                            value={value}
                            name={name}
                            className="Input max-w-xs border-brand mr-4 pr-10"
                            placeholder="Search Mutual Funds"
                            onChange={(event) => {
                              onChange(
                                event?.target?.value
                                  ? event?.target?.value
                                  : undefined
                              );
                            }}
                          />
                          <SearchIcon className="absolute top-3 right-2 flex items-center lg:w-6 w-4 lg:h-6 h-4 text-lightGray lg:pr-2" />
                        </div>
                      );
                    }}
                  />
                  <Tab.List className="bg-white items-center justify-between relative z-0 inline-flex shadow-sm border brand-brandLight rounded-md">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected ? 'text-brand' : 'text-gray-500',
                          'rounded-md  relative inline-flex items-center px-2 py-2 bg-white text-sm font-medium  hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand w-full h-full'
                        )
                      }
                    >
                      <ListIcon className="w-5 h-5 " />
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected ? 'text-brand' : 'text-gray-500',
                          ' rounded-md relative inline-flex items-center px-2 py-2 bg-white text-sm font-medium  hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand w-full h-full'
                        )
                      }
                    >
                      <GridSquareIcon className="w-5 h-5" />
                    </Tab>
                  </Tab.List>
                </div>
                <div className="flex-shrink-0 flex gap-4 lg:order-2 order-1">
                  <select className="Input border-brand text-lightGray">
                    <option disabled>SORT BY</option>
                    <option>Preferred</option>
                    <option>High Returns</option>
                  </select>

                  <span
                    className="OutlineButton font-normal text-lightGray py-1 inline-flex gap-2 items-center cursor-pointer"
                    onClick={() => setFiltersOpen(true)}
                  >
                    FILTERS <FilterIcon />
                  </span>
                </div>
              </div>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="bg-white rounded-lg border overflow-x-auto hidden lg:block">
                    <table className="border-hidden">
                      <thead>
                        <tr className="text-white bg-brand">
                          {tableColumns.map((col) => (
                            <th
                              className="py-4 font-normal border-x-0"
                              key={col.name}
                            >
                              {col.label}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {schema?.items?.length === 0 ? (
                          <tr>
                            <td className="border-x-0">
                              No Mutual Funds Found
                            </td>
                          </tr>
                        ) : (
                          schema?.items?.map((item) => (
                            <tr key={item.id} className="text-lighterGray">
                              {tableColumns.map((col) => {
                                return (
                                  <td
                                    className="border-x-0 py-1 lg:py-3"
                                    key={col.name}
                                  >
                                    {col?.name === 'plan_name' ? (
                                      `${item[col.name]}`
                                    ) : col?.name === 'actions' ? (
                                      <div className="flex flex-shrink-0">
                                        <a
                                          className="OutlineButton inline-block p-2 group cursor-pointer"
                                          onClick={() => {
                                            setIsCartOpen(true);
                                            setCardData(item);
                                          }}
                                        >
                                          <BrandPlusAddIcon />
                                        </a>
                                        <a className="OutlineButton inline-block p-2 ml-5 opacity-25 pointer-events-none">
                                          <WatchListIcon />
                                        </a>
                                        <a className="OutlineButton inline-block p-2 ml-5 opacity-25 pointer-events-none">
                                          <BalanceIcon />
                                        </a>
                                      </div>
                                    ) : (
                                      `${
                                        !item?.return_average ||
                                        item?.return_average[col.name] === null
                                          ? '0%'
                                          : item?.return_average[col.name]
                                      }`
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                    {!isLoading && !!schema?.count && (
                      <ReactPaginate
                        forcePage={currentPage - 1}
                        onPageChange={({ selected }) =>
                          setCurrentPage(selected + 1)
                        }
                        pageCount={Math.ceil(schema?.count / 10)}
                        containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-end justify-between border-t px-4 pt-2"
                        previousClassName={classNames(
                          'px-4 py-2 bg-white rounded-md text-black',
                          schema?.previous === null
                            ? 'bg-brandLight cursor-not-allowed'
                            : 'hover:bg-brand cursor-pointer hover:text-white'
                        )}
                        nextClassName={classNames(
                          'px-4 py-2 bg-white rounded-md text-black',
                          schema?.next === null
                            ? 'bg-brandLight cursor-not-allowed'
                            : 'hover:bg-brand cursor-pointer hover:text-white'
                        )}
                        previousLabel="previous"
                        nextLabel="next"
                        previousLinkClassName={classNames(
                          schema?.previous === null
                            ? 'hover:text-black cursor-not-allowed'
                            : 'hover:text-white'
                        )}
                        nextLinkClassName={classNames(
                          schema?.next === null
                            ? 'hover:text-black cursor-not-allowed'
                            : 'hover:text-white'
                        )}
                        pageClassName="lg:block hidden"
                        breakLinkClassName="lg:block hidden"
                        pageLinkClassName="bg-white rounded-md py-2 px-4 hover:bg-brand text-black hover:text-white lg:block hidden"
                        activeLinkClassName="!bg-brand hover:!bg-white !text-white hover:!text-black"
                      />
                    )}
                  </div>
                  <section className="lg:hidden">
                    {schema?.items?.length !== 0 ? (
                      <>
                        {schema?.items?.map((mf, idx) => (
                          <div
                            key={idx}
                            className={classNames(
                              'bg-white rounded-lg divide-y mb-4'
                            )}
                          >
                            <Disclosure>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className="py-3 px-5 flex justify-between items-center w-full">
                                    <section className="flex flex-col items-start">
                                      <p className="text-sm font-normal  text-left">
                                        {mf?.plan_name}
                                      </p>

                                      <p className="text-lighterGray text-xs">
                                        {mf?.category === '1'
                                          ? 'Equity'
                                          : mf?.category === '2'
                                          ? 'DEBT'
                                          : mf?.category === '3'
                                          ? 'Cash/Liquid/Money/Market'
                                          : mf?.category === '4'
                                          ? 'Hybrid'
                                          : ''}
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
                                  <Disclosure.Panel className="flex flex-col divide-y">
                                    <section className="flex justify-between items-center py-3 px-5 ">
                                      <p>1Y</p>
                                      <p>
                                        {mf?.return_average?.year_1 === null
                                          ? '0%'
                                          : mf?.return_average?.year_1}
                                      </p>
                                    </section>
                                    <section className="flex justify-between items-center py-3 px-5 ">
                                      <p>3Y</p>
                                      <p>
                                        {mf?.return_average?.year_3 === null
                                          ? '0%'
                                          : mf?.return_average?.year_3}
                                      </p>
                                    </section>
                                    <section className="flex justify-between items-center py-3 px-5 ">
                                      <p>5Y</p>
                                      <p>
                                        {mf?.return_average?.year_5 === null
                                          ? '0%'
                                          : mf?.return_average?.year_5}
                                      </p>
                                    </section>
                                    <section className="flex gap-5 py-3 px-5 items-center justify-center cursor-pointer ">
                                      <a
                                        className="OutlineButton flex justify-between items-center gap-2 group"
                                        onClick={() => {
                                          setIsCartOpen(true);
                                          setCardData(mf);
                                        }}
                                      >
                                        <BrandPlusAddIcon className="w-4 h-4" />
                                        <span className="text-sm font-normal text-lightGray group-hover:text-white">
                                          Add
                                        </span>
                                      </a>
                                      <a className="OutlineButton flex justify-between items-center gap-2 opacity-25 pointer-events-none">
                                        <WatchListIcon className="w-4 h-4" />
                                        <span className="text-sm font-normal text-lightGray">
                                          Save
                                        </span>
                                      </a>
                                      <a className="OutlineButton flex justify-between items-center gap-2 opacity-25 pointer-events-none">
                                        <BalanceIcon className="w-4 h-4" />
                                        <span className="text-sm font-normal text-lightGray">
                                          Compare
                                        </span>
                                      </a>
                                    </section>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          </div>
                        ))}
                        {!isLoading && !!schema?.count && (
                          <ReactPaginate
                            forcePage={currentPage - 1}
                            onPageChange={({ selected }) =>
                              setCurrentPage(selected + 1)
                            }
                            pageCount={Math.ceil(schema?.count / 10)}
                            containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-center justify-between"
                            previousClassName={classNames(
                              'px-4 py-2 bg-white rounded-md text-black',
                              schema?.previous === null
                                ? 'bg-brandLight cursor-not-allowed'
                                : 'hover:bg-brand cursor-pointer hover:text-white'
                            )}
                            nextClassName={classNames(
                              'px-4 py-2 bg-white rounded-md text-black',
                              schema?.next === null
                                ? 'bg-brandLight cursor-not-allowed'
                                : 'hover:bg-brand cursor-pointer hover:text-white'
                            )}
                            previousLabel="previous"
                            nextLabel="next"
                            previousLinkClassName={classNames(
                              schema?.previous === null
                                ? 'hover:text-black cursor-not-allowed'
                                : 'hover:text-white'
                            )}
                            nextLinkClassName={classNames(
                              schema?.next === null
                                ? 'hover:text-black cursor-not-allowed'
                                : 'hover:text-white'
                            )}
                            pageClassName="lg:block hidden"
                            breakLinkClassName="lg:block hidden"
                            pageLinkClassName="bg-white rounded-md py-2 px-4 hover:bg-brand text-black hover:text-white lg:block hidden"
                            activeLinkClassName="!bg-brand hover:!bg-white !text-white hover:!text-black"
                          />
                        )}
                      </>
                    ) : (
                      <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray col-span-1 lg:col-span-2">
                        No Mutual Funds Found
                      </h3>
                    )}
                  </section>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {schema?.items?.length !== 0 ? (
                      <>
                        {schema?.items?.map((mf) => (
                          <MutualFundCard
                            link={`/mutual-funds/details/${mf.id}`}
                            key={mf?.id}
                            heading={mf?.plan_name}
                            subHeading={mf?.category}
                            data={mf?.return_average}
                            onAddToCart={() => {
                              setIsCartOpen(true);
                              setCardData(mf);
                            }}
                            logo={
                              !mf?.amc?.logo_url
                                ? '/favicon.png'
                                : mf?.amc?.logo_url
                            }
                            metaData={mf}
                            alternativeText={mf?.amc?.name}
                            is_recommended_allowed={mf?.is_recommended}
                            onAddToCompare={() => null}
                            onAddToWatchlist={() => null}
                          />
                        ))}
                        {!isLoading && !!schema?.count && (
                          <ReactPaginate
                            forcePage={currentPage - 1}
                            onPageChange={({ selected }) =>
                              setCurrentPage(selected + 1)
                            }
                            pageCount={Math.ceil(schema?.count / 10)}
                            containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-center justify-between"
                            previousClassName={classNames(
                              'px-4 py-2 bg-white rounded-md text-black',
                              schema?.previous === null
                                ? 'bg-brandLight cursor-not-allowed'
                                : 'hover:bg-brand cursor-pointer hover:text-white'
                            )}
                            nextClassName={classNames(
                              'px-4 py-2 bg-white rounded-md text-black',
                              schema?.next === null
                                ? 'bg-brandLight cursor-not-allowed'
                                : 'hover:bg-brand cursor-pointer hover:text-white'
                            )}
                            previousLabel="previous"
                            nextLabel="next"
                            previousLinkClassName={classNames(
                              schema?.previous === null
                                ? 'hover:text-black cursor-not-allowed'
                                : 'hover:text-white'
                            )}
                            nextLinkClassName={classNames(
                              schema?.next === null
                                ? 'hover:text-black cursor-not-allowed'
                                : 'hover:text-white'
                            )}
                            pageClassName="lg:block hidden"
                            breakLinkClassName="lg:block hidden"
                            pageLinkClassName="bg-white rounded-md py-2 px-4 hover:bg-brand text-black hover:text-white lg:block hidden"
                            activeLinkClassName="!bg-brand hover:!bg-white !text-white hover:!text-black"
                          />
                        )}
                      </>
                    ) : (
                      <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray col-span-1 lg:col-span-2">
                        No Mutual Funds Found
                      </h3>
                    )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          {/* <MutualFundsFaqs /> */}
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
                                AMC
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
                              options={
                                amcData?.map((option) => {
                                  return {
                                    value: `${option?.id}`,
                                    label: option?.name,
                                  };
                                }) as OptionsProps[]
                              }
                              control={control}
                              name="amc"
                              multiSelect={true}
                            />
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure
                      as="div"
                      className={classNames('px-4 py-6 border-brandlight')}
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-lightGray text-base">
                                Category
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
                              options={CategoryOptions}
                              control={control}
                              name="category"
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
                                Fund Size
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
                              options={FundSizeOptions}
                              control={control}
                              name="funds_size"
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
                                Options
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
                              options={PlanDividendOptions}
                              control={control}
                              name="options"
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
                                Available to Invest
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
                              options={AvailabletoInvestOptions}
                              control={control}
                              name="sip"
                            />
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                  <span
                    className="Button uppercase w-full rounded-none sticky px-20 py-5 cursor-pointer"
                    onClick={() => {
                      setOptions(undefined);
                      setCategory(undefined);
                      setSip(undefined);
                      setFundSize(undefined);
                      setAmc(undefined);
                      reset(
                        {
                          funds_size: undefined,
                          category: undefined,
                          options: undefined,
                          sip: undefined,
                          search: undefined,
                          amc: undefined,
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
      </form>
      <ChooseClientModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        pathName="/mutual-funds/all"
      />
      <AddToCartModal
        setIsOpen={setIsCartOpen}
        isOpen={isCartOpen}
        data={cardData}
      />
    </>
  );
}

AllMutualFundsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
