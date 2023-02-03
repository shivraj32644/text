import { AuthenticatedDashboardLayout } from '../../../../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../../../../components/DashboardHead';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { Disclosure, Tab } from '@headlessui/react';
import {
  ChevronCircleArrowIcon,
  CircularEclipse,
  LandScapeSmallIcon,
  SearchIcon,
} from '@corpcare/web/ui';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import {
  IOptions,
  IRelationshipManager,
  IRoleType,
  relationshipManagerFormSchema,
  RelationshipManagerUpdateFields,
  roleTypeOptions,
  sortingOptionsList,
  useGetAllAccountsListData,
  useGetRelationshipManagerDetails,
} from '@corpcare/shared/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import ReactPaginate from 'react-paginate';

export const RMBasicDetailsForm = ({
  profile,
}: {
  profile: IRelationshipManager | undefined;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors },
  } = useForm<RelationshipManagerUpdateFields>({
    resolver: yupResolver(relationshipManagerFormSchema),
  });

  useEffect(() => {
    reset({
      ...profile,
      mobile: profile?.mobile?.split('+91 ')[1],
    });
  }, [reset, profile]);

  const handleFormSubmit = (data: IRelationshipManager) => {
    // console.log(data);
  };

  return (
    <div className="border border-light w-full bg-white">
      <section className="text-lightGray font-normal text-lg lg:text-sm border-b border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
        Basic Details
      </section>
      <form className="mx-auto p-5 lg:p-7">
        <div
          className="grid grid-cols-2 gap-6"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">First Name</span>
            <input
              {...register('first_name')}
              disabled
              placeholder="Enter your first Name"
              className={classNames(
                'Input cursor-not-allowed',
                errors.first_name && 'border-brandError'
              )}
            />

            <span className="FieldError">{errors.first_name?.message}</span>
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Last Name</span>
            <input
              {...register('last_name')}
              disabled
              placeholder="Enter your Name"
              className={classNames(
                'Input cursor-not-allowed',
                errors.last_name && 'border-brandError'
              )}
            />

            <span className="FieldError">{errors.last_name?.message}</span>
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Email-id</span>
            <input
              {...register('email')}
              disabled
              placeholder="Enter your Email-id"
              className={classNames(
                'Input cursor-not-allowed',
                errors.email && 'border-brandError'
              )}
            />

            <span className="FieldError">{errors.email?.message}</span>
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Mobile Number</span>
            <input
              {...register('mobile')}
              disabled
              placeholder="Enter your Mobile Number"
              className={classNames(
                'Input cursor-not-allowed',
                errors.mobile && 'border-brandError'
              )}
            />

            <span className="FieldError">{errors.mobile?.message}</span>
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Role</span>
            <Controller
              control={control}
              name="role_type"
              render={({ field: { value, onChange, name, ref } }) => {
                return (
                  <ReactSelect
                    placeholder={
                      <div className="text-sm text-lighterGray">
                        Select your Role
                      </div>
                    }
                    options={roleTypeOptions}
                    value={roleTypeOptions.find((c) => c.value === value)}
                    onChange={(e: IRoleType) => {
                      onChange(e.value);
                    }}
                    name={name}
                    isSearchable={false}
                    isDisabled={true}
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
                          : errors.role_type
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
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">EUIN/RIA</span>
            <input
              {...register('euin_ria')}
              disabled
              placeholder="Enter your EUIN/RIA"
              className={classNames(
                'Input cursor-not-allowed',
                errors.euin_ria && 'border-brandError'
              )}
            />

            <span className="FieldError">{errors.euin_ria?.message}</span>
          </label>
          <div
            className={classNames(
              'col-span-2 grid grid-cols-4 border-brandLight border rounded-lg py-6 px-8'
            )}
          >
            <LandScapeSmallIcon className="w-9 h-6 text-brand lg:w-12 lg:h-12 min-w-[36px]" />
            <p className="text-xs font-normal text-lightGray self-center">
              {profile?.amfi_certificate_url
                ? profile?.amfi_certificate_url
                    ?.split('rm-documents/')[1]
                    ?.split(/-(.+)/)[1]
                : 'Certificate'}
            </p>
            <p className="text-xs font-normal text-lightGray self-center">
              Expires on {profile?.euin_ria_expiry}
            </p>
            <a
              className={classNames(
                'lg:py-2 lg:px-4 p-2 text-sm border border-brand rounded  w-28 self-center ml-auto',
                profile?.amfi_certificate_url
                  ? 'bg-brand text-white hover:bg-white hover:text-lighterGray'
                  : 'bg-white text-lighterGray hover:bg-brand hover:text-white '
              )}
              href={profile?.amfi_certificate_url}
            >
              DOWNLOAD
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export const RMCLientsList = () => {
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'can_number', name: 'CAN' },
    { key: 'name', name: 'Name' },
    { key: 'account_type', name: 'Category' },
    { key: 'rm', name: 'Assigned RM' },
  ];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [sortingTerm, setSortingTerm] = useState<string | undefined>();
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      search: undefined,
      sorting: undefined,
    },
  });
  const { data, isLoading } = useGetAllAccountsListData(
    currentPage,
    undefined,
    searchTerm,
    sortingTerm
  );
  const handleFormSubmit = () => {
    //
  };
  useEffect(() => {
    const values = getValues();
    setCurrentPage(1);
    setSearchTerm(values?.search);
    setSortingTerm(values?.sorting);
    reset(values);
  }, [isDirty, getValues, reset]);

  return (
    <div className="mt-8 overflow-y-auto ">
      <form
        className="mb-4 flex gap-4 lg:gap-0 items-center justify-between"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex-grow flex">
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
                    placeholder="Search Clients"
                    onChange={(event) => {
                      onChange(
                        event?.target?.value ? event?.target?.value : undefined
                      );
                    }}
                  />
                  <SearchIcon className="absolute top-3 right-2 flex items-center lg:w-6 w-4 lg:h-6 h-4 text-lightGray lg:pr-2" />
                </div>
              );
            }}
          />
        </div>

        <label>
          <Controller
            control={control}
            name="sorting"
            render={({ field: { value, onChange, name, ref } }) => {
              return (
                <ReactSelect
                  placeholder={
                    <div className="text-sm text-lighterGray w-28">Sort BY</div>
                  }
                  options={sortingOptionsList}
                  value={sortingOptionsList.find((c) => c.value === value)}
                  onChange={(e: IOptions) => {
                    onChange(e?.value);
                  }}
                  isSearchable={false}
                  isClearable
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
        </label>
      </form>

      <div className="bg-white rounded-lg border overflow-x-auto hidden lg:block">
        <table className="border-hidden">
          <thead>
            <tr className="bg-brand text-white">
              {columns.map((column) => (
                <th className="border-x-0 font-normal" key={column.key}>
                  {column.name}
                </th>
              ))}

              <th className="border-x-0 font-normal">Action</th>
              <th className="border-x-0"></th>
            </tr>
          </thead>

          <tbody className="bg-white text-lightGray">
            {data?.items?.length === 0 ? (
              <tr>
                <td className="border-x-0">
                  <h3 className="text-left font-medium text-lg lg:text-xl text-lightGray">
                    No Clients Found
                  </h3>
                </td>
              </tr>
            ) : (
              data?.items?.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => {
                    if (column.key === 'account_type') {
                      return (
                        <td className="border-x-0 capitalize" key={column.key}>
                          {row?.account_type === 'individual'
                            ? 'Individual'
                            : 'Non Individual'}
                        </td>
                      );
                    }
                    return (
                      <td
                        className={classNames(
                          'border-x-0',
                          column.key !== 'id' && ' capitalize'
                        )}
                        key={column.key}
                      >
                        {row[column.key] === null
                          ? 'Not Available'
                          : row[column.key]}
                      </td>
                    );
                  })}

                  <td className="border-x-0 py-2">
                    <Link href={`/clients/details/${row.id}`}>
                      <a className="OutlineButton py-1 uppercase font-normal">
                        View
                      </a>
                    </Link>
                  </td>
                  <td className="border-x-0 py-2">
                    {/* {row.account_status === 'active' && ( */}
                    <CircularEclipse className="text-brand" />
                    {/* )} */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {!isLoading && !!data?.count && (
          <ReactPaginate
            forcePage={currentPage - 1}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            pageCount={Math.ceil(data?.count / 10)}
            containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-end justify-between border-t px-4 pt-2"
            previousClassName={classNames(
              'px-4 py-2 bg-white rounded-md text-black',
              data?.previous === null
                ? 'bg-brandLight cursor-not-allowed'
                : 'hover:bg-brand cursor-pointer hover:text-white'
            )}
            nextClassName={classNames(
              'px-4 py-2 bg-white rounded-md text-black',
              data?.next === null
                ? 'bg-brandLight cursor-not-allowed'
                : 'hover:bg-brand cursor-pointer hover:text-white'
            )}
            previousLabel="previous"
            nextLabel="next"
            previousLinkClassName={classNames(
              data?.previous === null
                ? 'hover:text-black cursor-not-allowed'
                : 'hover:text-white'
            )}
            nextLinkClassName={classNames(
              data?.next === null
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
        {data?.items?.length !== 0 ? (
          <>
            {data?.items?.map((row, idx) => (
              <div
                key={idx}
                className={classNames('bg-white rounded-lg divide-y mb-4')}
              >
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="py-3 px-5 flex justify-between items-center w-full">
                        <section className="flex flex-col items-start">
                          <p className="text-sm font-normal  text-left capitalize">
                            {row?.name}
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
                        {columns?.map((col, index) => (
                          <section
                            className="flex justify-between items-center py-3 px-5 text-sm gap-4"
                            key={index}
                          >
                            <p>{col.name}</p>
                            {col?.key !== 'account_type' ? (
                              <p
                                className={classNames(
                                  'truncate',
                                  col.key !== 'id' && 'capitalize'
                                )}
                              >
                                {row[col.key] === null
                                  ? 'Not Available'
                                  : row[col.key]}
                              </p>
                            ) : (
                              <p>
                                {row[col.key] === 'individual'
                                  ? 'Individual'
                                  : 'Non Individual'}
                              </p>
                            )}
                          </section>
                        ))}
                        <section className="py-3 px-5 cursor-pointer text-right text-sm">
                          <Link href={`/clients/details/${row.id}`}>
                            <a className="OutlineButton py-1 uppercase font-normal text-sm">
                              View
                            </a>
                          </Link>
                        </section>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
            {!isLoading && !!data?.count && (
              <ReactPaginate
                forcePage={currentPage - 1}
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                pageCount={Math.ceil(data?.count / 10)}
                containerClassName="flex items-center my-4 gap-4 text-base lg:text-lg capitalize col-span-1 lg:col-span-2 lg:justify-center justify-between"
                previousClassName={classNames(
                  'px-4 py-2 bg-white rounded-md text-black',
                  data?.previous === null
                    ? 'bg-brandLight cursor-not-allowed'
                    : 'hover:bg-brand cursor-pointer hover:text-white'
                )}
                nextClassName={classNames(
                  'px-4 py-2 bg-white rounded-md text-black',
                  data?.next === null
                    ? 'bg-brandLight cursor-not-allowed'
                    : 'hover:bg-brand cursor-pointer hover:text-white'
                )}
                previousLabel="previous"
                nextLabel="next"
                previousLinkClassName={classNames(
                  data?.previous === null
                    ? 'hover:text-black cursor-not-allowed'
                    : 'hover:text-white'
                )}
                nextLinkClassName={classNames(
                  data?.next === null
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
            No Clients Found
          </h3>
        )}
      </section>
    </div>
  );
};

export const RMOrderRequests = () => {
  const tableColumns = [
    { name: 'can' as const, label: 'CAN' },
    { name: 'productDetails' as const, label: 'Product Details' },
    { name: 'category' as const, label: 'Category' },
    { name: 'date' as const, label: 'Date' },
    { name: 'status' as const, label: 'Status' },
  ];

  const data = [
    'Bajaj Finance Fixed Deposit',
    'Aditya Birla Real Estate Fund',
    'Motilal Focused Midcap Strategy',
    'India Bulls',
    'Mahindra Finance Fixed Deposit',
    'Aditya Birla Real Estate Fund',
  ].map((name, i) => ({
    id: 'fd-' + i,
    can: '516515615104',
    productDetails: name,
    category: 'Fixed Deposit',
    date: '12/02/2022',
    status: 'Approved',
  }));

  return (
    <>
      <div className="mt-8 flex mb-5">
        <div className="flex-grow">
          <h3 className="font-medium text-2xl text-lightGray">
            Order Requests
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="border-hidden">
          <thead>
            <tr className="text-white bg-brand">
              {tableColumns.map((col) => (
                <th className="py-5 px-8 font-normal border-x-0" key={col.name}>
                  {col.label}
                </th>
              ))}
              <th className="border-x-0"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border-x-0">
                <h3 className="text-left font-medium text-sm lg:text-base text-lightGray">
                  No Order Requests Found
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const RMActivity = () => {
  const tableColumns = [
    { name: 'ip' as const, label: 'IP Address' },
    { name: 'loginDate' as const, label: 'LoginDate' },
    { name: 'duration' as const, label: 'Duration' },
    { name: 'clientBrowser' as const, label: 'Client Browser' },
  ];

  const data = ['49.37.255.161', '10.51.242.164', '42.36.255.161'].map(
    (name, i) => ({
      id: 'fd-' + i,
      ip: name,
      loginDate: '12/02/2022',
      duration: '03:47:13',
      clientBrowser: 'Chrome',
    })
  );
  return (
    <>
      <div className="mt-8 flex mb-5">
        <h3 className="font-medium text-2xl text-lightGray">
          Account Activity
        </h3>
      </div>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="border-hidden">
          <thead>
            <tr className="text-white bg-brand">
              {tableColumns.map((col) => (
                <th className="py-5 px-8 font-normal border-x-0" key={col.name}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border-x-0">
                <h3 className="text-left font-medium text-sm lg:text-base text-lightGray">
                  No Account Activity Found.
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default function RMDetails() {
  const router = useRouter() as NextRouter;
  const { data } = useGetRelationshipManagerDetails(
    router?.query?.rmId as string
  );
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Relationship Managers</h2>
        <Link href="/">
          <a className="text-xs text-lightGray">
            Relationship Managers &gt;&nbsp;
            {data?.name}
          </a>
        </Link>
      </DashboardHead>
      <div className="flex-grow overflow-y-auto p-4 lg:p-8 pb-5 lg:pb-16 ">
        <Tab.Group>
          <section className="Card flex flex-wrap items-center justify-between bg-lighter rounded-b-none lg:gap-0 gap-4">
            <div className="flex items-center gap-4 ">
              <Link href="/relationship-managers">
                <a className="OutlineButton px-2 py-1 font-bold group-hover:bg-brandDark">
                  &#10229; {/* left arrow */}
                </a>
              </Link>

              <h2 className="text-lg lg:text-xl text-lightGray font-medium tracking-wide">
                {data?.name}
              </h2>
              <button className="border border-brandLight rounded uppercase font-normal text-sm text-lightGray py-1 px-4">
                {data?.role_type === 'sales' ? 'Sales RM' : 'Service RM'}
              </button>
            </div>
            <button
              className="OutlineButton uppercase lg:text-base text-sm "
              onClick={() =>
                router.push(
                  `/relationship-managers/details/${router?.query?.rmId}/edit-profile`
                )
              }
            >
              EDIT PROFILE
            </button>
          </section>
          <Tab.List className="Tabs TabsOutlined grid grid-cols-2 lg:grid-cols-4 lg:text-base text-sm rounded-t-none border-x border-b p-0">
            <Tab className="capitalize">rm details</Tab>
            <Tab className="capitalize">client</Tab>
            <Tab className="capitalize">requests</Tab>
            <Tab className="capitalize">activity</Tab>
          </Tab.List>

          <Tab.Panels className="h-full">
            <Tab.Panel>
              <div className="lg:Card overflow-hidden lg:p-8 mt-4 lg:mt-8 flex">
                <RMBasicDetailsForm profile={data} />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <RMCLientsList />
            </Tab.Panel>
            <Tab.Panel>
              <RMOrderRequests />
            </Tab.Panel>
            <Tab.Panel>
              <RMActivity />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

RMDetails.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
