import Link from 'next/link';
import { type ReactElement } from 'react';
import { AuthenticatedDashboardLayout } from '../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../components/DashboardHead';

const columns = [
  { key: 'can', name: 'CAN' },
  { key: 'productDetails', name: 'Product Details' },
  { key: 'category', name: 'Category' },
  { key: 'date', name: 'Date' },
  { key: 'status', name: 'Status' },
];

export default function OrderRequestsPage() {
  const data = [
    {
      id: 1,
      can: '516510456104',
      productDetails: 'Bajaj Finance Fixed Deposit',
      category: 'Fixed Deposit',
      date: '12/02/2022',
      status: 'Approved',
    },
    {
      id: 2,
      can: '516510456105',
      productDetails: 'Aditya Birla Real Estate Fund',
      category: 'AIFs',
      date: '12/02/2022',
      status: 'Approved',
    },
    {
      id: 3,
      can: '516510456106',
      productDetails: 'Motilalal Focused Midcap Strategy',
      category: 'Bonds',
      date: '12/02/2022',
      status: 'Processing',
    },
    {
      id: 4,
      can: '516510456107',
      productDetails: 'Indian Bulls',
      category: 'AIFs',
      date: '12/02/2022',
      status: 'Rejected',
    },
    {
      id: 5,
      can: '516510456108',
      productDetails: 'Mahindra Finance Fixed Deposit',
      category: 'PMS',
      date: '12/02/2022',
      status: 'Processing',
    },
    {
      id: 6,
      can: '516510456109',
      productDetails: 'ICICI Prudential',
      category: 'Bonds',
      date: '12/02/2022',
      status: 'Approved',
    },
    {
      id: 7,
      can: '516510456110',
      productDetails: 'India Bulls',
      category: 'PMS',
      date: '12/02/2022',
      status: 'Approved',
    },
    {
      id: 8,
      can: '516510456111',
      productDetails: 'Mahindra Finance Fixed Deposit',
      category: 'Fixed Deposit',
      date: '12/02/2022',
      status: 'Approved',
    },
    {
      id: 9,
      can: '516510456112',
      productDetails: 'ICICI Prudential',
      category: 'AIFs',
      date: '12/02/2022',
      status: 'Approved',
    },
    {
      id: 10,
      can: '516510456113',
      productDetails: 'Aditya Birla Real Estate Fund',
      category: 'PMS',
      date: '12/02/2022',
      status: 'Approved',
    },
  ];

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Order Requests</h2>
        <Link href="/">
          <a className="text-xs text-lightGray">Order Requests</a>
        </Link>
      </DashboardHead>

      <div className="p-8 pb-16 overflow-y-auto">
        <div className="mb-4 flex">
          <div className="flex-grow">
            <input
              placeholder="Search by CAN"
              className="Input max-w-xs border-brand"
              type="search"
            />
          </div>

          <div>
            <select className="Input border-brand text-lightGray">
              <option disabled selected>
                SORT BY
              </option>
              <option>Recent</option>
              <option>Processing</option>
            </select>
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

                <th className="border-x-0 font-normal"></th>
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
                    <Link href={`/order-requests/details/${row.id}`}>
                      <a className="p-2 font-normal text-brand">Details</a>
                    </Link>
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

OrderRequestsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
