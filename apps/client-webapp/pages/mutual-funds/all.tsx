import Link from 'next/link';
import { Fragment, useEffect, useState, type ReactElement } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  AuthenticatedDashboardLayout,
  DashboardHead,
  MutualFundsFaqs,
} from '../../components/index';
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
  CustomToast,
  AddToCartModal,
  formatIfNumberIsNotValid,
  compactNumberFormatter,
} from '@corpcare/web/ui';
import { Disclosure, Tab, Dialog, Transition } from '@headlessui/react';

import {
  AvailabletoInvestOptions,
  CategoryOptions,
  FundSizeOptions,
  OptionsProps,
  PlanDividendOptions,
  useGetAccountInfoData,
  useGetMutualFundAmcList,
  useGetMutualSchema,
} from '@corpcare/shared/api';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';
import { Controller, useController, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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
  const { data: accountInfo } = useGetAccountInfoData();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cardData, setCardData] = useState<any>();
  const { data: recommendedMutualFunds } = useGetMutualSchema(
    1,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    true
  );
  const {
    data: schema,
    isLoading,
    isError,
    refetch,
    error: fetchingError,
  } = useGetMutualSchema(
    currentPage,
    searchTerm,
    options,
    amc,
    funds_size,
    category,
    sip,
    false
  );

  useEffect(() => {
    if (isError) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={
            (fetchingError as any)?.message ||
            'Something went wrong! Please try again.'
          }
          type="error"
        />
      ));
    }
  }, [isError, fetchingError]);

  useEffect(() => {
    refetch();
  }, [refetch]);

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
    if (!isDirty) return;
    const values = getValues();
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
          <img
            className="w-full h-40 lg:h-full lg:max-h-48 object-cover rounded-lg"
            src="/mutual-funds-banner.png"
            alt="CorpCare - Mutual Funds"
          />

          <div className="my-10">
            {accountInfo?.entity_type === 'advisory' && (
              <>
                <div className="flex mb-4">
                  <h3 className="flex-grow font-medium text-lg lg:text-xl text-lightGray">
                    Recommended
                  </h3>
                  {recommendedMutualFunds?.items?.length !== 0 && (
                    <Link href="/mutual-funds/recommended">
                      <a className="font-semibold text-lightGray uppercase group hover:text-black bottom">
                        <span className="Button px-1 lg:px-2 py-1 font-normal text-white mr-3 group-hover:bg-brandDark lg:rounded-none rounded">
                          &#10230;
                        </span>
                        <span className="text-sm text-lightGray">
                          Explore ALL
                        </span>
                      </a>
                    </Link>
                  )}
                </div>
                {recommendedMutualFunds?.items?.length === 0 ? (
                  <h3 className="text-center font-medium text-lg lg:text-xl text-lightGray">
                    No Recommended Mutual Funds Found
                  </h3>
                ) : (
                  <Swiper
                    spaceBetween={40}
                    modules={[Pagination]}
                    slidesPerView={1}
                    className="pb-10"
                    breakpoints={{
                      1024: {
                        slidesPerView: 2,
                      },
                    }}
                    pagination={{ clickable: true }}
                  >
                    {recommendedMutualFunds?.items?.map((mf) => {
                      return (
                        <SwiperSlide key={mf.id}>
                          <MutualFundCard
                            link={`/mutual-funds/details/${mf.id}`}
                            key={mf?.id}
                            heading={mf?.plan_name}
                            subHeading={mf?.category}
                            data={mf?.return_average}
                            logo={
                              !mf?.amc?.logo_url
                                ? '/favicon.png'
                                : mf?.amc?.logo_url
                            }
                            alternativeText={mf?.amc?.name}
                            onAddToCart={() => {
                              setIsOpen(true);
                              setCardData(mf);
                            }}
                            metaData={mf}
                            is_recommended_allowed={mf?.is_recommended}
                            onAddToCompare={() => null}
                            onAddToWatchlist={() => null}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              </>
            )}

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
                        {schema?.items?.length === 0 || isError ? (
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
                                            setIsOpen(true);
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
                                          ? '0'
                                          : formatIfNumberIsNotValid(
                                              item?.return_average[col.name]
                                            ) !== undefined
                                          ? formatIfNumberIsNotValid(
                                              item?.return_average[col.name]
                                            )
                                          : compactNumberFormatter.format(
                                              item?.return_average[
                                                col.name
                                              ] as any
                                            )
                                      }%`
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
                    {schema?.items?.length !== 0 && !isError ? (
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
                                        {!mf?.return_average ||
                                        mf?.return_average?.year_1 === null
                                          ? '0'
                                          : formatIfNumberIsNotValid(
                                              mf?.return_average?.year_1
                                            ) !== undefined
                                          ? formatIfNumberIsNotValid(
                                              mf?.return_average?.year_1
                                            )
                                          : compactNumberFormatter.format(
                                              mf?.return_average?.year_1 as any
                                            )}
                                        %
                                      </p>
                                    </section>
                                    <section className="flex justify-between items-center py-3 px-5 ">
                                      <p>3Y</p>
                                      <p>
                                        {!mf?.return_average ||
                                        mf?.return_average?.year_3 === null
                                          ? '0'
                                          : formatIfNumberIsNotValid(
                                              mf?.return_average?.year_3
                                            ) !== undefined
                                          ? formatIfNumberIsNotValid(
                                              mf?.return_average?.year_3
                                            )
                                          : compactNumberFormatter.format(
                                              mf?.return_average?.year_3 as any
                                            )}
                                        %
                                      </p>
                                    </section>
                                    <section className="flex justify-between items-center py-3 px-5 ">
                                      <p>5Y</p>
                                      <p>
                                        {!mf?.return_average ||
                                        mf?.return_average?.year_5 === null
                                          ? '0'
                                          : formatIfNumberIsNotValid(
                                              mf?.return_average?.year_5
                                            ) !== undefined
                                          ? formatIfNumberIsNotValid(
                                              mf?.return_average?.year_5
                                            )
                                          : compactNumberFormatter.format(
                                              mf?.return_average?.year_5 as any
                                            )}
                                        %
                                      </p>
                                    </section>
                                    <section className="flex gap-5 py-3 px-5 items-center justify-center cursor-pointer ">
                                      <a
                                        className="OutlineButton flex justify-between items-center gap-2 group"
                                        onClick={() => {
                                          setIsOpen(true);
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
                    {schema?.items?.length !== 0 && !isError ? (
                      <>
                        {schema?.items?.map((mf) => (
                          <MutualFundCard
                            link={`/mutual-funds/details/${mf.id}`}
                            key={mf?.id}
                            heading={mf?.plan_name}
                            subHeading={mf?.category}
                            data={mf?.return_average}
                            logo={
                              !mf?.amc?.logo_url
                                ? '/favicon.png'
                                : mf?.amc?.logo_url
                            }
                            alternativeText={mf?.amc?.name}
                            onAddToCart={() => {
                              setIsOpen(true);
                              setCardData(mf);
                            }}
                            metaData={mf}
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
          <MutualFundsFaqs />
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
      <AddToCartModal setIsOpen={setIsOpen} isOpen={isOpen} data={cardData} />
    </>
  );
}

AllMutualFundsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
