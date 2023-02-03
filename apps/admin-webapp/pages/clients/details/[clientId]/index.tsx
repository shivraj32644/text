import { useGetClientProfileDetails } from '@corpcare/shared/api';
import { BrandPlusAddIcon } from '@corpcare/web/ui';
import { Tab } from '@headlessui/react';
import AssignRmModal from '../../../../components/AssignRmModal';
import { AuthenticatedDashboardLayout } from '../../../../components/AuthenticatedDashboardLayout';
import ClientQueryDetailsModal from '../../../../components/ClientQueryDetailsModal';
import { DashboardHead } from '../../../../components/DashboardHead';
import classNames from 'classnames';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { ReactElement, useState } from 'react';

export const ClientBasicDetailsForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rmType, setRMType] = useState<'Service' | 'Sales' | undefined>(
    undefined
  );
  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm<RelationshipManagerUpdateFields>({
  //   resolver: yupResolver(relationshipManagerFormSchema),
  // });

  // // useEffect(() => {
  // //   reset({
  // //     ...profile,
  // //     mobile: profile?.mobile?.split('+91 ')[1],
  // //   });
  // // }, [reset, profile]);

  // const handleFormSubmit = (data: IRelationshipManager) => {
  //   console.log(data);
  // };

  return (
    <>
      <div className="Card overflow-hidden lg:p-8 mt-8 flex relative">
        <div
          className={classNames(
            'bg-white flex  lg:flex-row flex-col w-full gap-5 lg:gap-10'
          )}
        >
          <div className="Card border bg-white border-brandLight w-full lg:w-1/2  items-center justify-center flex-col gap-3 lg:gap-0 flex !p-0">
            <div className="bg-lighter py-4 px-8 border-b w-full">
              <p className="text-base lg:text-xl font-medium text-lightGray capitalize">
                KYC Document
              </p>
            </div>
            <img
              src="/DocumentNotFound.png"
              alt="Can Not Available"
              className="p-5 lg:w-auto w-40"
            />
            <p className="text-xl lg:text-2xl font-medium text-lightGray capitalize p-5">
              No Documents Found
            </p>
          </div>
          <div className="Card border bg-white border-brandLight w-full lg:w-1/2  items-center justify-center flex-col gap-3 lg:gap-0 flex !p-0">
            <div className="bg-lighter py-4 px-8 border-b w-full">
              <p className="text-base lg:text-xl font-medium text-lightGray capitalize">
                CAN - Not Available
              </p>
            </div>
            <img
              src="/CANNotAvailable.png"
              alt="Can Not Available"
              className="p-5 lg:w-auto w-40"
            />
            <p className="text-xl lg:text-2xl font-medium text-lightGray capitalize p-5">
              Not Connected
            </p>
          </div>
        </div>
      </div>
      <div className="Card overflow-hidden lg:p-8 mt-8 flex  relative ">
        <div
          className={classNames(
            'bg-white flex  lg:flex-row flex-col w-full gap-5 lg:gap-10'
          )}
        >
          <div
            className="Card border bg-lighter border-brandLight w-full lg:w-1/2  items-center justify-center flex-col gap-3 flex h-60 hover:shadow-md cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setRMType('Service');
            }}
          >
            <BrandPlusAddIcon className="hover:cursor-pointer text-white h-12 w-12 bg-brand rounded p-2" />
            <p className="text-xl lg:text-2xl font-medium text-lightGray capitalize">
              Assign Primary RM
            </p>
          </div>
          <div
            onClick={() => {
              setIsOpen(true);
              setRMType('Sales');
            }}
            className="Card border bg-lighter border-brandLight w-full lg:w-1/2  items-center justify-center flex-col gap-3 flex h-60 hover:shadow-md cursor-pointer"
          >
            <BrandPlusAddIcon className="hover:cursor-pointer text-white h-12 w-12 bg-brand rounded p-2" />
            <p className="text-xl lg:text-2xl font-medium text-lightGray capitalize">
              Assign Secondary RM
            </p>
          </div>
        </div>
      </div>
      {rmType && (
        <AssignRmModal setIsOpen={setIsOpen} isOpen={isOpen} rmType={rmType} />
      )}
    </>
  );
};
export const ClientActivity = () => {
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
            <td className="border-x-0">
              <h3 className="text-left font-medium text-sm lg:text-base text-lightGray">
                No Account Activity Found.
              </h3>
            </td>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const ClientQueries = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Tab.Group>
        <div className="mt-8 flex mb-5">
          <div className="flex-grow">
            <h3 className="font-medium text-2xl text-lightGray">Queries</h3>
          </div>

          <Tab.List className="bg-white items-center justify-between relative z-0 inline-flex shadow-sm border brand-brandLight rounded-md">
            <Tab
              className={({ selected }) =>
                classNames(
                  selected ? 'text-brand' : 'text-gray-500',
                  'rounded-md  relative inline-flex items-center px-4 py-2 bg-white text-base  uppercase font-medium  hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand w-full h-full'
                )
              }
            >
              active
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  selected ? 'text-brand' : 'text-gray-500',
                  ' rounded-md relative inline-flex items-center px-4 py-2 bg-white text-base uppercase font-medium  hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand w-full h-full'
                )
              }
            >
              InActive
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <Tab.Panel className="space-y-6">
            <h3 className="text-left font-medium text-sm lg:text-base text-lightGray">
              No Active Queries Found.
            </h3>
          </Tab.Panel>
          <Tab.Panel className="space-y-6">
            <h3 className="text-left font-medium text-sm lg:text-base text-lightGray">
              No Inactive Queries Found.
            </h3>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <ClientQueryDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
export const ClientOrderRequests = () => {
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
        <div>
          <select className="Input border-brand text-lightGray">
            <option disabled selected>
              SORT BY
            </option>
            <option>CAN Unavailable</option>
            <option>RM Not Assigned</option>
          </select>
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
                  No Order Request Found.
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default function ClientsDetails() {
  const router = useRouter() as NextRouter;
  const client_id = router?.query?.clientId as string;
  const { data: profile } = useGetClientProfileDetails(client_id || '');
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Clients</h2>
        <Link href="/clients">
          <a className="text-xs text-lightGray">
            Clients &gt;&nbsp;
            {profile?.name}
          </a>
        </Link>
      </DashboardHead>
      <div className="flex-grow overflow-y-auto p-4 lg:p-8 pb-5 lg:pb-16 ">
        <Tab.Group>
          <section className="Card flex items-center justify-between bg-lighter rounded-b-none flex-wrap lg:gap-0 gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/clients">
                <a className="OutlineButton px-2 py-1 font-bold group-hover:bg-brandDark">
                  &#10229; {/* left arrow */}
                </a>
              </Link>

              <h2 className="text-xl text-lightGray font-medium tracking-wide">
                {profile?.name}
              </h2>
            </div>
            <div className="flex gap-5">
              <button
                className="OutlineButton uppercase lg:text-base text-sm"
                onClick={() =>
                  router.push(
                    `/clients/details/${router?.query?.rmId}/edit-profile`
                  )
                }
              >
                EDIT PROFILE
              </button>
              <button
                className="Button uppercase tracking-[0.02em] lg:text-base text-sm"
                onClick={() => router.push(`/`)}
              >
                VIEW DASHBOARD
              </button>
            </div>
          </section>
          <Tab.List className="Tabs TabsOutlined grid grid-cols-2 lg:grid-cols-4 lg:text-base text-sm rounded-t-none border-x border-b p-0">
            <Tab className="capitalize">client details</Tab>
            <Tab className="capitalize">order requests</Tab>
            <Tab className="capitalize">queries</Tab>
            <Tab className="capitalize">activity</Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <ClientBasicDetailsForm />
            </Tab.Panel>
            <Tab.Panel>
              <ClientOrderRequests />
            </Tab.Panel>
            <Tab.Panel>
              <ClientQueries />
            </Tab.Panel>

            <Tab.Panel>
              <ClientActivity />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

ClientsDetails.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
