import { BlackCrossCircle, ChevronCircleArrowIcon } from '@corpcare/web/ui';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
const tableColumns = [
  { name: 'SNo' as const, label: 'S.NO' },
  { name: 'BlockName' as const, label: 'Block Name' },
  { name: 'SubBlockName' as const, label: 'Sub Block Name' },
  { name: 'SeqNo' as const, label: 'Seq No' },
  { name: 'ErrMessage' as const, label: 'Err.Message' },
];
export function EcanRegistrationStatusModal({ isOpen, setIsOpen }) {
  const data = [
    {
      blockName: 'Bank Detail',
      SubBlockName: '2nd Bank Detail ',
      SeqNo: 3,
      ErrMessage: 'Wrong IIFC',
    },
    {
      blockName: 'PAN Detail',
      SubBlockName: 'PAN',
      SeqNo: 2,
      ErrMessage: 'Wrong PAN',
    },
    {
      blockName: 'Account',
      SubBlockName: 'Acc.No',
      SeqNo: 1,
      ErrMessage: 'Account',
    },
    {
      blockName: 'Email',
      SubBlockName: 'Verification',
      SeqNo: 4,
      ErrMessage: 'Verify Mail',
    },
  ].map((_data, i) => ({
    id: 'mf-' + i,
    SNo: `${i + 1}`,
    BlockName: _data.blockName,
    SubBlockName: _data.SubBlockName,
    SeqNo: _data.SeqNo,
    ErrMessage: _data.ErrMessage,
  }));

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs lg:max-w-4xl transform overflow-hidden  bg-white text-left align-middle shadow-xl transition-all rounded-lg">
                  <Dialog.Title className="flex justify-between border-y border-brandLight bg-lighter px-5 lg:px-8 py-3 lg:py-4">
                    <p className="font-medium text-lg lg:text-xl text-lightGray">
                      eCAN Status
                    </p>
                    <BlackCrossCircle
                      className="w-6 h-6 lg:h-8 lg:w-8 hover:cursor-pointer text-white"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  <div className="mx-4 lg:mx-10 mt-5 lg:mt-10 mb-8 border border-brandLight bg-lighter rounded-lg">
                    <section className="grid grid-cols-2 lg:grid-cols-3 divide-x">
                      {[
                        {
                          title: 'CAN',
                          subtitle: '22035ZZ01Ks',
                        },
                        {
                          title: 'CAN Status',
                          subtitle: ' On Hold',
                        },
                        {
                          title: 'Data Submission Status',
                          subtitle: 'Data Partially Inserted',
                        },
                      ].map((_singularItem, idx) => (
                        <div
                          key={idx + _singularItem.title}
                          className={classNames(
                            'flex flex-col gap-2 items-start justify-center p-5 lg:p-8 border-b',
                            _singularItem.title === 'Data Submission Status'
                              ? 'lg:col-span-1 col-span-2'
                              : 'col-span-1'
                          )}
                        >
                          <p className="text-lighterGray text-sm font-normal">
                            {_singularItem.title}
                          </p>
                          <p className="text-darkGray text-sm lg:text-base font-medium">
                            {_singularItem.subtitle}
                          </p>
                        </div>
                      ))}
                      <button className="Button uppercase col-span-2 lg:col-span-3 max-w-[280px] m-5 lg:m-8 lg:text-base text-sm">
                        UPLOAD MISSING DOCUMENTS
                      </button>
                    </section>
                  </div>
                  <div className="bg-white rounded-lg lg:border overflow-x-auto mx-4 lg:mx-10 mb-8 lg:mb-10">
                    <table className="border-hidden lg:table hidden">
                      <thead>
                        <tr className="text-white bg-brand">
                          {tableColumns.map((col) => (
                            <th
                              className="py-4 font-normal border-x-0"
                              key={col.name}
                            >
                              {col.label}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((item) => (
                          <tr key={item.id} className="text-lighterGray">
                            {tableColumns.map((col) => {
                              return (
                                <td
                                  className="border-x-0 py-1 lg:py-3"
                                  key={col.name}
                                >
                                  {item[col.name]}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {data.map((_data, idx) => (
                      <section key={idx + _data.id} className="mb-3 lg:hidden">
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={classNames(
                                  'py-3 px-4 flex justify-between items-center w-full  bg-lighter border border-brandLight',
                                  open ? 'rounded-t-lg' : 'rounded-lg'
                                )}
                              >
                                <section className="flex flex-col items-start">
                                  <p className="text-sm font-normal text-left text-lightGray">
                                    {_data.BlockName}
                                  </p>
                                </section>
                                <span
                                  className={classNames(
                                    'px-2 rounded-full  transition-transform',
                                    open ? '-rotate-180' : ''
                                  )}
                                >
                                  <ChevronCircleArrowIcon className="w-5 h-5" />
                                </span>
                              </Disclosure.Button>
                              <Disclosure.Panel className="flex flex-col bg-white rounded-b-lg border border-brandLight border-t-0">
                                {tableColumns.map((_tableCol, idx) => (
                                  <section
                                    key={_tableCol.name + idx}
                                    className={classNames(
                                      idx + 1 === tableColumns.length
                                        ? ''
                                        : 'border-b border-brandLight'
                                    )}
                                  >
                                    <div className="flex items-center justify-between px-5 py-3 ">
                                      <p className="text-sm font-normal text-lightGray">
                                        {[_tableCol.label]}
                                      </p>
                                      <p className="text-sm font-normal text-lightGray">
                                        {_data[_tableCol.name]}
                                      </p>
                                    </div>
                                  </section>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </section>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
