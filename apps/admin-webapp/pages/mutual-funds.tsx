import { EditIcon, EyeIcon, FilterIcon, StarIcon } from '@corpcare/web/ui';
import { type ReactElement } from 'react';
import { AuthenticatedDashboardLayout } from '../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../components/DashboardHead';

const columns = [
  { key: '1m', name: '1 Month' },
  { key: '6m', name: '6 Months' },
  { key: '1y', name: '1 Year' },
  { key: '3y', name: '3 Years' },
];

export default function MutualFundsPage() {
  const data = [
    {
      id: 401344,
      name: 'Axis Small Cap Growth Direct Plan',
      description: 'Equity | Small Cap Fund',
      '1m': '2.82%',
      '6m': '2.82%',
      '1y': '21.82%',
      '3y': '24.82%',
    },
    {
      id: 401355,
      name: 'Axis Small Cap Growth Direct Plan',
      description: 'Equity | Small Cap Fund',
      '1m': '2.82%',
      '6m': '2.82%',
      '1y': '21.82%',
      '3y': '24.82%',
    },
    {
      id: 401634,
      name: 'Axis Small Cap Growth Direct Plan',
      description: 'Equity | Small Cap Fund',
      '1m': '2.82%',
      '6m': '2.82%',
      '1y': '21.82%',
      '3y': '24.82%',
    },
    {
      id: 401784,
      name: 'Axis Small Cap Growth Direct Plan',
      description: 'Equity | Small Cap Fund',
      '1m': '2.82%',
      '6m': '2.82%',
      '1y': '21.82%',
      '3y': '24.82%',
    },
    {
      id: 401834,
      name: 'Axis Small Cap Growth Direct Plan',
      description: 'Equity | Small Cap Fund',
      '1m': '2.82%',
      '6m': '2.82%',
      '1y': '21.82%',
      '3y': '24.82%',
    },
    {
      id: 401850,
      name: 'Axis Small Cap Growth Direct Plan',
      description: 'Equity | Small Cap Fund',
      '1m': '2.82%',
      '6m': '2.82%',
      '1y': '21.82%',
      '3y': '24.82%',
    },
    {
      id: 401895,
      name: 'Axis Small Cap Growth Direct Plan',
      description: 'Equity | Small Cap Fund',
      '1m': '2.82%',
      '6m': '2.82%',
      '1y': '21.82%',
      '3y': '24.82%',
    },
    {
      id: 401903,
      name: 'Axis Small Cap Growth Direct Plan',
      description: 'Equity | Small Cap Fund',
      '1m': '2.82%',
      '6m': '2.82%',
      '1y': '21.82%',
      '3y': '24.82%',
    },
  ];

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Mutual Funds</h2>
        <div className="text-xs text-lightGray">
          <a>Products </a>
          &gt;
          <a> Mutual Funds</a>
        </div>
      </DashboardHead>

      <div className="p-8 pb-16 overflow-y-auto">
        <div className="mb-4 flex">
          <div className="flex-grow">
            <input
              placeholder="Search Mutual Funds"
              className="Input max-w-xs border-brand"
              type="search"
            />
          </div>

          <div className="flex gap-4 flex-shrink-0 whitespace-nowrap">
            <select className="Input border-brand text-lightGray">
              <option disabled selected>
                SORT BY
              </option>
              <option>Preferred</option>
              <option>High Returns</option>
            </select>

            <button className="OutlineButton font-normal text-lightGray py-1 inline-flex gap-2 items-center">
              FILTERS <FilterIcon />
            </button>

            <button className="Button uppercase">Add new fund</button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border">
          <table className="border-hidden">
            <thead>
              <tr className="bg-brand text-white">
                <th className="border-x-0 font-normal">Fund Name</th>

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
                  <td className="border-x-0 font-medium">
                    {row.name}
                    <small className="text-xs block font-light text-lighterGray">
                      {row.description}
                    </small>
                  </td>

                  {columns.map((column) => (
                    <td className="border-x-0" key={column.key}>
                      {row[column.key]}
                    </td>
                  ))}

                  <td className="border-x-0 py-2">
                    <div className="flex gap-2">
                      <button className="OutlineButton p-2">
                        <StarIcon />
                      </button>

                      <button className="OutlineButton p-2">
                        <EyeIcon />
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

MutualFundsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
