import { Tab } from '@headlessui/react';
import { useState } from 'react';
import ClientQueryDetailsModal from './ClientQueryDetailsModal';

export const ClientQueries = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Tab.Group>
        <div className="mt-8 flex mb-5">
          <div className="flex-grow">
            <h3 className="font-medium text-2xl text-lightGray">Queries</h3>
          </div>
          <Tab.List className="Tabs TabsOutlined grid grid-cols-2 lg:text-base text-sm rounded-t-none border-x border-b p-0">
            <Tab className="uppercase text-xs">active</Tab>
            <Tab className="uppercase text-xs">inactive</Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <Tab.Panel className="space-y-6">
            <h3 className="text-left font-medium text-sm lg:text-base text-lightGray">
              No Queries Found
            </h3>
          </Tab.Panel>
          <Tab.Panel className="space-y-6">No Queries Found</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <ClientQueryDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
