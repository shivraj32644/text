import { EditIcon, EyeIcon, FilterIcon, StarIcon } from '@corpcare/web/ui';
import { type ReactElement } from 'react';
import { AuthenticatedDashboardLayout } from '../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../components/DashboardHead';

const columns = [
  { key: 'fixedDeposit', name: 'Fixed Deposit' },
  { key: 'interestRates', name: 'Interest Rates' },
  { key: 'tenure', name: 'Tenure' },
  { key: 'minDeposit', name: 'Min Deposit' },
  { key: 'maxDeposit', name: 'Max Deposit' },
];

export default function FixedDepositsPage() {
  const data = [
    {
      id: 401344,
      fixedDeposit: 'Bajaj Finance Ltd FD',
      interestRates: '2.90% - 5.40%',
      tenure: '1Yr - 5Yr',
      minDeposit: '₹ 10,000',
      maxDeposit: '₹ 1 Crore',
    },
    {
      id: 401355,
      fixedDeposit: 'Bajaj Finance Ltd FD',
      interestRates: '2.90% - 5.40%',
      tenure: '1Yr - 5Yr',
      minDeposit: '₹ 10,000',
      maxDeposit: '₹ 1 Crore',
    },
    {
      id: 401634,
      fixedDeposit: 'Bajaj Finance Ltd FD',
      interestRates: '2.90% - 5.40%',
      tenure: '1Yr - 5Yr',
      minDeposit: '₹ 10,000',
      maxDeposit: '₹ 1 Crore',
    },
    {
      id: 401784,
      fixedDeposit: 'Bajaj Finance Ltd FD',
      interestRates: '2.90% - 5.40%',
      tenure: '1Yr - 5Yr',
      minDeposit: '₹ 10,000',
      maxDeposit: '₹ 1 Crore',
    },
    {
      id: 401834,
      fixedDeposit: 'Bajaj Finance Ltd FD',
      interestRates: '2.90% - 5.40%',
      tenure: '1Yr - 5Yr',
      minDeposit: '₹ 10,000',
      maxDeposit: '₹ 1 Crore',
    },
    {
      id: 401850,
      fixedDeposit: 'Bajaj Finance Ltd FD',
      interestRates: '2.90% - 5.40%',
      tenure: '1Yr - 5Yr',
      minDeposit: '₹ 10,000',
      maxDeposit: '₹ 1 Crore',
    },
    {
      id: 401895,
      fixedDeposit: 'Bajaj Finance Ltd FD',
      interestRates: '2.90% - 5.40%',
      tenure: '1Yr - 5Yr',
      minDeposit: '₹ 10,000',
      maxDeposit: '₹ 1 Crore',
    },
    {
      id: 401903,
      fixedDeposit: 'Bajaj Finance Ltd FD',
      interestRates: '2.90% - 5.40%',
      tenure: '1Yr - 5Yr',
      minDeposit: '₹ 10,000',
      maxDeposit: '₹ 1 Crore',
    },
  ];

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Fixed Deposits</h2>
        <div className="text-xs text-lightGray">
          <a>Products </a>
          &gt;
          <a> Fixed Deposits</a>
        </div>
      </DashboardHead>

      <div className="p-8 pb-16 overflow-y-auto">
        <div className="mb-4 flex">
          <h3 className="flex-grow font-medium text-2xl text-lightGray">
            All Fixed Deposits
          </h3>

          <div className="flex gap-4 flex-shrink-0 whitespace-nowrap">
            <select className="Input border-brand text-lightGray">
              <option disabled selected>
                SORT BY
              </option>
              <option>Popularity</option>
              <option>High Returns</option>
              <option>Top Rated</option>
              <option>Min. Deposit</option>
            </select>

            <button className="OutlineButton font-normal text-lightGray py-1 inline-flex gap-2 items-center">
              FILTERS <FilterIcon />
            </button>

            <button className="Button uppercase">Add new FD</button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border">
          <table className="border-hidden">
            <thead>
              <tr className="bg-brand text-white">
                {columns.map((column) => (
                  <th className="border-x-0 font-normal" key={column.key}>
                    {column.name}
                  </th>
                ))}

                <th className="border-x-0 font-normal">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white text-lightGray">
              {data.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td className="border-x-0" key={column.key}>
                      {row[column.key]}
                    </td>
                  ))}

                  <td className="border-x-0">
                    <div className="flex gap-2">
                      <button className="OutlineButton p-2">
                        <StarIcon />
                      </button>

                      <button className="OutlineButton p-2">
                        <EyeIcon />
                      </button>

                      <button className="OutlineButton p-2">
                        <EditIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

FixedDepositsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
