import { BlackCrossCircle } from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export function RemoveCANProfile({ isOpen, setIsOpen }) {
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
                <Dialog.Panel className="w-full max-w-3xl  transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-between border border-brandLight bg-lighter px-10 py-4 items-center">
                    <p className="font-medium text-base lg:text-xl text-lightGray uppercase">
                      remove can
                    </p>
                    <BlackCrossCircle
                      className="w-5 h-5 lg:h-6 lg:w-6 hover:cursor-pointer text-white"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  <section className="flex flex-col p-5 lg:p-10 m-5 lg:m-8 items-center border border-brandLight bg-lighter">
                    <p className="text-xl lg:text-3xl font-medium text-lightGray">
                      Are you sure you want to remove this CAN?
                    </p>
                    <section className="flex items-center justify-between gap-4 mt-6 max-w-xs w-full">
                      <button className="Button uppercase w-full text-sm lg:text-base">
                        remove
                      </button>
                      <button
                        className="OutlineButton uppercase w-full text-sm lg:text-base"
                        onClick={() => setIsOpen(false)}
                      >
                        cancel
                      </button>
                    </section>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
