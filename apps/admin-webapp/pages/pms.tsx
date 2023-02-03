import { EditIcon, EyeIcon, FilterIcon, StarIcon } from '@corpcare/web/ui';
import { type ReactElement } from 'react';
import { AuthenticatedDashboardLayout } from '../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../components/DashboardHead';

const columns = [
  { key: 'name', name: 'PMS' },
  { key: '1m', name: '1M' },
  { key: '6m', name: '6M' },
  { key: '1y', name: '1Y' },
  { key: '3y', name: '3Y' },
  { key: '5y', name: '5Y' },
];

export default function PMSPage() {
  const data = [
    {
      id: 401344,
      name: 'India Bulls Housing',
      '1m': '10.10%',
      '6m': '16.10%',
      '1y': '24.50%',
      '3y': '56.23%',
      '5y': '70.10%',
    },
    {
      id: 401355,
      name: 'India Bulls Housing',
      '1m': '10.10%',
      '6m': '16.10%',
      '1y': '24.50%',
      '3y': '56.23%',
      '5y': '70.10%',
    },
    {
      id: 401634,
      name: 'India Bulls Housing',
      '1m': '10.10%',
      '6m': '16.10%',
      '1y': '24.50%',
      '3y': '56.23%',
      '5y': '70.10%',
    },
    {
      id: 401784,
      name: 'India Bulls Housing',
      '1m': '10.10%',
      '6m': '16.10%',
      '1y': '24.50%',
      '3y': '56.23%',
      '5y': '70.10%',
    },
    {
      id: 401834,
      name: 'India Bulls Housing',
      '1m': '10.10%',
      '6m': '16.10%',
      '1y': '24.50%',
      '3y': '56.23%',
      '5y': '70.10%',
    },
    {
      id: 401850,
      name: 'India Bulls Housing',
      '1m': '10.10%',
      '6m': '16.10%',
      '1y': '24.50%',
      '3y': '56.23%',
      '5y': '70.10%',
    },
    {
      id: 401895,
      name: 'India Bulls Housing',
      '1m': '10.10%',
      '6m': '16.10%',
      '1y': '24.50%',
      '3y': '56.23%',
      '5y': '70.10%',
    },
    {
      id: 401903,
      name: 'India Bulls Housing',
      '1m': '10.10%',
      '6m': '16.10%',
      '1y': '24.50%',
      '3y': '56.23%',
      '5y': '70.10%',
    },
  ];

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">PMS</h2>
        <div className="text-xs text-lightGray">
          <a>Products </a>
          &gt;
          <a> PMS</a>
        </div>
      </DashboardHead>

      <div className="p-8 pb-16 overflow-y-auto">
        <div className="mb-4 flex">
          <h3 className="flex-grow font-medium text-2xl text-lightGray">
            All PMS
          </h3>

          <div className="flex gap-4 flex-shrink-0 whitespace-nowrap">
            <select className="Input border-brand text-lightGray">
              <option disabled selected>
                SORT BY
              </option>
              <option>Popularity</option>
              <option>High Returns</option>
              <option>Low Returns</option>
            </select>

            <button className="OutlineButton font-normal text-lightGray py-1 inline-flex gap-2 items-center">
              FILTERS <FilterIcon />
            </button>

            <button className="Button uppercase">Add new PMS</button>
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

PMSPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
