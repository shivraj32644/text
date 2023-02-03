import { EditIcon, EyeIcon, FilterIcon, StarIcon } from '@corpcare/web/ui';
import { type ReactElement } from 'react';
import { AuthenticatedDashboardLayout } from '../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../components/DashboardHead';

const columns = [
  { key: 'bonds', name: 'Bonds' },
  { key: 'cr', name: 'CR' },
  { key: 'faceValue', name: 'Face Value' },
  { key: 'maturityDate', name: 'Mautrity Date' },
  { key: 'category', name: 'Category' },
  { key: 'yield', name: 'Yield' },
];

export default function BondsPage() {
  const data = [
    {
      id: 401344,
      bonds: 'India Bulls Housing',
      cr: 'AAA',
      faceValue: '1000000',
      maturityDate: '24-Jan-2025',
      category: 'Corporate',
      yield: '5.68%',
    },
    {
      id: 401355,
      bonds: 'India Bulls Housing',
      cr: 'AAA',
      faceValue: '1000000',
      maturityDate: '24-Jan-2025',
      category: 'Corporate',
      yield: '5.68%',
    },
    {
      id: 401634,
      bonds: 'India Bulls Housing',
      cr: 'AAA',
      faceValue: '1000000',
      maturityDate: '24-Jan-2025',
      category: 'Corporate',
      yield: '5.68%',
    },
    {
      id: 401784,
      bonds: 'India Bulls Housing',
      cr: 'AAA',
      faceValue: '1000000',
      maturityDate: '24-Jan-2025',
      category: 'Corporate',
      yield: '5.68%',
    },
    {
      id: 401834,
      bonds: 'India Bulls Housing',
      cr: 'AAA',
      faceValue: '1000000',
      maturityDate: '24-Jan-2025',
      category: 'Corporate',
      yield: '5.68%',
    },
    {
      id: 401850,
      bonds: 'India Bulls Housing',
      cr: 'AAA',
      faceValue: '1000000',
      maturityDate: '24-Jan-2025',
      category: 'Corporate',
      yield: '5.68%',
    },
    {
      id: 401895,
      bonds: 'India Bulls Housing',
      cr: 'AAA',
      faceValue: '1000000',
      maturityDate: '24-Jan-2025',
      category: 'Corporate',
      yield: '5.68%',
    },
    {
      id: 401903,
      bonds: 'India Bulls Housing',
      cr: 'AAA',
      faceValue: '1000000',
      maturityDate: '24-Jan-2025',
      category: 'Corporate',
      yield: '5.68%',
    },
  ];

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Bonds</h2>
        <div className="text-xs text-lightGray">
          <a>Products </a>
          &gt;
          <a> Bonds</a>
        </div>
      </DashboardHead>

      <div className="p-8 pb-16 overflow-y-auto">
        <div className="mb-4 flex">
          <h3 className="flex-grow font-medium text-2xl text-lightGray">
            All Bonds
          </h3>

          <div className="flex gap-4 flex-shrink-0 whitespace-nowrap">
            <select className="Input border-brand text-lightGray">
              <option disabled selected>
                SORT BY
              </option>
              <option>Rating</option>
              <option>Yield - High to Low</option>
              <option>Yield - Low to High</option>
              <option>Tenure - High to Low</option>
              <option>Tenure - Low to High</option>
            </select>

            <button className="OutlineButton font-normal text-lightGray py-1 inline-flex gap-2 items-center">
              FILTERS <FilterIcon />
            </button>

            <button className="OutlineButton uppercase">Requests</button>

            <button className="Button uppercase">Add new Bond</button>
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

BondsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
