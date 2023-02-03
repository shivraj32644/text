import { Tab } from '@headlessui/react';
import { useState } from 'react';
import ClientCallRequestModal from './ClientCallRequestModal';

const tableColumns = [
  { name: 'productDetails' as const, label: 'Product Details' },
  { name: 'category' as const, label: 'Category' },
  { name: 'date' as const, label: 'Date' },
  { name: 'status' as const, label: 'Status' },
];

export const ClientCallRequest = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Tab.Group>
        <div className="mt-8 flex mb-5">
          <div className="flex-grow">
            <h3 className="font-medium text-2xl text-lightGray">
              Call Requests
            </h3>
          </div>
          <Tab.List className="Tabs TabsOutlined grid grid-cols-2 text-sm rounded !p-0">
            <Tab className="uppercase">Opened</Tab>
            <Tab className="uppercase ">Closed</Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <Tab.Panel>
            <div className="bg-white rounded-lg border overflow-x-auto">
              <table className="border-hidden">
                <thead>
                  <tr className="text-white bg-brand">
                    {tableColumns.map((col) => (
                      <th
                        className="py-5 px-8 font-normal border-x-0"
                        key={col.name}
                      >
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
                        No Call Requests Found
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="bg-white rounded-lg border overflow-x-auto">
              <table className="border-hidden">
                <thead>
                  <tr className="text-white bg-brand">
                    {tableColumns.map((col) => (
                      <th
                        className="py-5 px-8 font-normal border-x-0"
                        key={col.name}
                      >
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
                        No Call Requests Found
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <ClientCallRequestModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
