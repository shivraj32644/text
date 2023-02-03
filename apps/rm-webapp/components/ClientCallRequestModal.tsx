import { BlackCrossCircle } from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';

export default function ClientCallRequestModal({ isOpen, setIsOpen }) {
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
                <Dialog.Panel className="w-full max-w-xs lg:max-w-[600px] transform overflow-hidden  bg-white text-left align-middle shadow-xl transition-all rounded-lg">
                  <Dialog.Title className="flex justify-between border-y border-brandLight bg-lighter px-5 lg:px-8 py-3 lg:py-4">
                    <p className="font-medium text-lg lg:text-xl text-lightGray capitalize">
                      Call Request
                    </p>
                    <BlackCrossCircle
                      className="w-6 h-6 lg:h-8 lg:w-8 hover:cursor-pointer text-white"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  <div className="mx-10 my-8 border border-brandLight bg-lighter rounded-lg">
                    <section className="grid grid-cols-2">
                      {[
                        {
                          title: 'Request Date',
                          subtitle: '01-02-2022',
                        },
                        {
                          title: 'Product Category',
                          subtitle: 'Fixed Deposit',
                        },
                        {
                          title: 'Product For',
                          subtitle: 'Call Back',
                        },
                        {
                          title: 'Product Name',
                          subtitle: 'ICICI Bank FD ',
                        },
                      ].map((_singularItem, idx) => (
                        <div
                          key={idx + _singularItem.title}
                          className={classNames(
                            'flex flex-col gap-2 items-start justify-center p-5 lg:p-8 ',
                            _singularItem.title === 'Product Name' ||
                              _singularItem.title === 'Product For'
                              ? ''
                              : 'border-b'
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
                    </section>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mx-10 my-8">
                    <label className="col-span-2">
                      <span className="Label">Update Status</span>
                      <select
                        name="UpdateStatus"
                        placeholder="Opened"
                        className="Input"
                      >
                        <option>Opened</option>
                      </select>
                    </label>
                    <label className="col-span-2 flex flex-col">
                      <span className="Label">Add Note</span>
                      <textarea
                        className="border border-brandLight w-full h-24 placeholder:py-1 px-2"
                        placeholder="Type your reason here..."
                      />
                    </label>
                  </div>
                  <div className="px-10 py-6 bg-lighter border-t flex items-center gap-6">
                    <button className="OutlineButton uppercase w-full lg:text-base text-sm">
                      UPDATE DETAILS
                    </button>
                    <button className="Button uppercase w-full lg:text-base text-sm">
                      +91 8075 485 458
                    </button>
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
