import Link from 'next/link';
import { type ReactElement, useState } from 'react';
import { DashboardHead } from '../../components/DashboardHead';
import { AuthenticatedDashboardLayout } from '../../components/AuthenticatedDashboardLayout';
// import { MutualFundsFilters } from '../../../components/MutualFundsFilters';
import { FilterIcon } from '@corpcare/web/ui';

const getMockedOrderData = (type = 'Purchase', size = 6) =>
  new Array(size).fill(null).map((_, i) => ({
    name: 'U21086BA001000' + i,
    data: [
      { name: 'CAN No.', value: '21086BA00' + i },
      { name: 'CAN Holder', value: 'Shah Enterprise Ltd' },
      { name: 'Txn.Type', value: type },
      { name: 'Order Mode', value: 'Online' },
      { name: 'Request Date', value: '01-02-2022' },
      { name: 'Time Stamp', value: '24-06-2021, 12.45 pm' },
    ],
  }));

export default function MutualFundsOrdersPage() {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const data = getMockedOrderData('Purchase');

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Approval Book</h2>
        <div className="text-xs text-lightGray flex gap-1">
          <Link href="/approval">
            <a>Approval</a>
          </Link>
        </div>
      </DashboardHead>

      <div className="p-4 lg:p-8 pb-5 lg:pb-16 overflow-y-auto">
        <div className="mb-4 lg:mb-8 flex gap-4 lg:items-center lg:flex-row flex-col items-start">
          <h3 className="text-lg lg:text-2xl flex-grow text-lightGray">
            Order Approval Book
          </h3>

          <div className="flex-shrink-0 flex gap-4">
            <select className="Input border-brand text-lightGray">
              <option disabled selected>
                SORT BY
              </option>
              <option>Preferred</option>
              <option>High Returns</option>
            </select>

            <button
              className="OutlineButton font-normal text-lightGray py-1 inline-flex gap-2 items-center"
              onClick={() => setFiltersOpen(true)}
            >
              FILTERS <FilterIcon />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
          {/* {data.map((order) => (
            <MutualFundOrderCard
              detailsLink={`/approval/${order.name}`}
              key={order.name}
              {...order}
            />
          ))} */}
        </div>
      </div>
      {/* <MutualFundsFilters
        setFiltersOpen={setFiltersOpen}
        filtersOpen={filtersOpen}
      /> */}
    </div>
  );
}

MutualFundsOrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
