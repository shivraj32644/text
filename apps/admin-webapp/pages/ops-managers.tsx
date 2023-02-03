import Link from 'next/link';
import { type ReactElement } from 'react';
import { AuthenticatedDashboardLayout } from '../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../components/DashboardHead';

const columns = [
  { key: 'name', name: 'Name' },
  { key: 'role', name: 'Role' },
];

export default function OpsManagersPage() {
  const data = [
    { id: 401344, name: 'Sayeed Afzal Khan', role: 'Manager' },
    { id: 401355, name: 'Ravindra Singh', role: 'Sub User' },
    { id: 401634, name: 'Ravindra Singh', role: 'Sub Ordinate User' },
    { id: 401784, name: 'Moin Shah Tinwale', role: 'Individual' },
    { id: 401834, name: 'Ravindra Singh', role: 'Manager' },
    { id: 401850, name: 'Sayeed Afzal Khan', role: 'Sub Ordinate User' },
    { id: 401895, name: 'Moin Shah Tinwale', role: 'Individual' },
    { id: 401903, name: 'Ravindra Singh', role: 'Sub User' },
  ];

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Ops Managers</h2>
        <div className="text-xs text-lightGray">
          <a>Internal Users </a>
          &gt;
          <a> Ops Managers</a>
        </div>
      </DashboardHead>

      <div className="p-8 pb-16 overflow-y-auto">
        <div className="mb-4 flex">
          <div className="flex-grow">
            <input
              placeholder="Search Ops"
              className="Input max-w-xs border-brand"
              type="search"
            />
          </div>

          <div className="flex gap-2 items-center">
            <Link href="/ops-managers/heirarchy">
              <a className="OutlineButton uppercase">Team Heirarchy</a>
            </Link>
            <button className="Button uppercase">Add new ops</button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border">
          <table className="border-hidden">
            <thead>
              <tr className="bg-brand text-white">
                <th className="border-x-0 font-normal">ID</th>

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
                  <td className="border-x-0">#{row.id}</td>

                  {columns.map((column) => (
                    <td className="border-x-0" key={column.key}>
                      {row[column.key]}
                    </td>
                  ))}

                  <td className="border-x-0 py-2">
                    <Link href={`/ops-managers/details/${row.id}`}>
                      <a className="OutlineButton py-1 uppercase font-normal">
                        View
                      </a>
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

OpsManagersPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
