import {
  BrandPlusAddIcon,
  DownloadUnderLineIcon,
  RoundErrorCircleIcon,
  RoundSuccessCircleIcon,
} from '@corpcare/web/ui';
import { AddCANProfileModal } from '../../components/AddCANProfileModal';
import { AuthenticatedDashboardLayout } from '../../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../../components/DashboardHead';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { ClientOrderDetails } from '../../components/ClientOrderDetails';
import { ClientCallRequest } from '../../components/ClientCallRequest';
import { ClientQueries } from '../../components/ClientQueries';
import { useGetClientDetailsData } from '@corpcare/shared/api';

const data = [
  { name: 'CAN Validation', success: false },
  { name: 'Bank Validation', success: false },
  { name: 'PRN Validation', success: false },
  { name: 'CAN Folio Validation', success: false },
];

export const ClientBasicDetailsForm = () => {
  return (
    <div className="border border-light w-full">
      <section className="text-lightGray font-normal text-lg lg:text-sm border-b border-light rounded-t rounded-b-none px-7 py-3 bg-lighter">
        Basic Details
      </section>
      <form className="mx-auto p-5 lg:p-7">
        <div className="grid grid-cols-2 gap-6">
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">First Name</span>
            <input
              name="firstName"
              type="text"
              value="Karan Shah"
              className="Input"
              required
            />
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Entity Type</span>
            <input
              name="entityType"
              type="text"
              value="Advisory"
              className="Input"
              required
              disabled
            />
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Email-id</span>
            <input
              name="email"
              type="text"
              value="karan@gmail.com"
              className="Input"
              required
            />
          </label>
          <label className="lg:col-span-1 col-span-2">
            <span className="Label">Mobile Number</span>
            <input
              name="mobile"
              type="text"
              value="9722554422"
              className="Input"
              required
            />
          </label>
          <button className="Button col-span-2 uppercase" disabled>
            update details
          </button>
        </div>
      </form>
    </div>
  );
};
export default function ClientDetails() {
  const router = useRouter() as NextRouter;
  const [addCanIsOpen, setAddCanIsOpen] = useState<boolean>(false);
  const { clientId } = router?.query as { clientId: string };
  const { data: profile, refetch: profileRefetch } = useGetClientDetailsData({
    clientId: clientId || '',
  });
  useEffect(() => {
    profileRefetch();
  }, [profileRefetch]);
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">{profile?.name}</h2>
        <Link href="/">
          <a className="text-xs text-lightGray">Clients</a>
        </Link>
      </DashboardHead>
      <div className="flex-grow overflow-y-auto p-4 lg:p-8 pb-5 lg:pb-16 ">
        <Tab.Group>
          <section className="Card flex items-center justify-between bg-lighter rounded-b-none">
            <div className="flex items-center gap-4 ">
              <Link href="/clients">
                <a className="OutlineButton px-2 py-1 font-bold group-hover:bg-brandDark">
                  &#10229; {/* left arrow */}
                </a>
              </Link>

              <h2 className="text-xl text-lightGray font-medium tracking-wide">
                {profile?.name}
              </h2>
              <button className="border border-brandLight rounded uppercase w-28 font-normal text-sm text-lightGray py-1 px-4">
                {profile?.account_type}
              </button>
            </div>
            <div className="flex items-center gap-5">
              <button className="OutlineButton uppercase">CREATE ORDER</button>
              <button className="Button uppercase">VIEW DASHBOARD</button>
            </div>
          </section>
          <Tab.List className="Tabs TabsOutlined grid grid-cols-2 lg:grid-cols-4 lg:text-base text-sm rounded-t-none border-x border-b p-0">
            <Tab className="capitalize">client details</Tab>
            <Tab className="capitalize">order details</Tab>
            <Tab className="capitalize">call requests</Tab>
            <Tab className="capitalize">queries</Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="Card overflow-hidden p-8 mt-8 flex gap-10">
                <div className="Card p-0 overflow-hidden w-full lg:w-1/2">
                  <section className="flex justify-between items-center bg-lighter px-5 lg:px-10 py-3 border-b f">
                    <h4 className=" text-darkGray text-xl font-medium">
                      KYC Document
                    </h4>
                    <h4 className=" text-brand text-lg font-normal">
                      Edit KYC
                    </h4>
                  </section>
                  <div className="grid grid-cols-1 text-sm  bg-brandLight divide-y divide-brandLight">
                    {[
                      'Certificate Of Incorporation',
                      'Memorandum(MOA) Document',
                      'Registeration Certificate',
                      'Investment Policy',
                    ].map((item, idx) => (
                      <div
                        className="px-5 py-5 lg:px-10  bg-white flex justify-between items-center"
                        key={idx}
                      >
                        <div className="text-lightGray text-base font-medium">
                          {item}
                        </div>
                        <div className="OutlineButton inline-block p-2 cursor-pointer group ">
                          <DownloadUnderLineIcon className="text-brand group-hover:text-white w-6 h-6" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="Card p-0 overflow-hidden w-full lg:w-1/2">
                  <h4 className="bg-lighter px-5 lg:px-10 py-3 text-darkGray text-xl border-b font-medium">
                    CAN - 0552323242
                  </h4>
                  <div className="grid grid-cols-1 text-sm  bg-brandLight divide-y divide-brandLight">
                    {data.map((item) => (
                      <div
                        key={item.name}
                        className="px-5 py-5 lg:px-10  bg-white flex justify-between items-center"
                      >
                        <div className="text-lightGray text-base font-medium">
                          {item.name}
                        </div>
                        {item.success ? (
                          <RoundSuccessCircleIcon className="text-green-600 w-6 h-6" />
                        ) : (
                          <RoundErrorCircleIcon className="text-red-600 w-6 h-6" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="Card overflow-hidden p-8 mt-8 flex">
                <ClientBasicDetailsForm />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <ClientOrderDetails />
            </Tab.Panel>
            <Tab.Panel>
              <ClientCallRequest />
            </Tab.Panel>
            <Tab.Panel>
              <ClientQueries />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {false && (
          <>
            <div className="Card overflow-hidden p-8 mt-8 flex gap-10">
              <div className="Card border bg-lighter border-brandLight w-1/2 items-center justify-center flex-col gap-2 lg:flex hidden h-60">
                <BrandPlusAddIcon
                  onClick={() => router.push('/clients/ecan-registration')}
                  className="hover:cursor-pointer text-white h-12 w-12 bg-brand rounded p-2"
                />
                <p className="text-2xl font-medium text-lightGray uppercase">
                  ADD Kyc
                </p>
              </div>
              <div className="Card border bg-lighter border-brandLight w-1/2 items-center justify-center flex-col gap-2 lg:flex hidden h-60">
                <BrandPlusAddIcon
                  onClick={() => setAddCanIsOpen(true)}
                  className="hover:cursor-pointer text-white h-12 w-12 bg-brand rounded p-2"
                />
                <p className="text-2xl font-medium text-lightGray uppercase">
                  ADD CAN
                </p>
              </div>
            </div>
            <div className="Card overflow-hidden p-8 mt-8 flex">
              <ClientBasicDetailsForm />
            </div>
          </>
        )}
      </div>
      <AddCANProfileModal setIsOpen={setAddCanIsOpen} isOpen={addCanIsOpen} />
    </div>
  );
}

ClientDetails.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
