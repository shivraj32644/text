import { useState } from 'react';
import ClientOrderRequestModal from './ClientOrderRequestModal';

const tableColumns = [
  { name: 'productDetails' as const, label: 'Product Details' },
  { name: 'category' as const, label: 'Category' },
  { name: 'date' as const, label: 'Date' },
  { name: 'status' as const, label: 'Status' },
];

export const ClientOrderDetails = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="mt-8 flex mb-5">
        <div className="flex-grow">
          <h3 className="font-medium text-2xl text-lightGray">Order Details</h3>
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
                  No Order Details Found
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ClientOrderRequestModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
