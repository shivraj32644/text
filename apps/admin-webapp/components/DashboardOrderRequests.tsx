import Link from 'next/link';

const columns = [
  { key: 'can', name: 'CAN' },
  { key: 'productDetails', name: 'Product Details' },
  { key: 'date', name: 'Date' },
];

export function DashboardOrderRequests() {
  const data = [];

  return (
    <div>
      <h3 className="font-medium text-xl lg:text-2xl text-lightGray mb-4">
        Order Requests
      </h3>

      <div className="bg-white rounded-lg border overflow-x-auto hidden lg:block">
        <table className="border-hidden">
          <thead>
            <tr className="text-white bg-brand">
              {columns.map((col) => (
                <th className="py-4 font-normal border-x-0" key={col.name}>
                  {col.name}
                </th>
              ))}
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
      <section className="lg:hidden">
        <h3 className="text-center font-medium text-sm lg:text-base text-lightGray">
          No Order Requests Found
        </h3>
      </section>
    </div>
  );
}
