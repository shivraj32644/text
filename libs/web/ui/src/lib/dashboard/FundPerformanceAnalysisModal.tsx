import { BlackCrossCircle } from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export function FundPerformanceAnalysisModal({
  isOpen,
  setIsOpen,
  message,
  buttonLabel,
}) {
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
                <Dialog.Panel className="w-full max-w-lg  transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-end border-y border-brandLight bg-lighter px-5 py-3 lg:px-10 lg:py-4 ">
                    <BlackCrossCircle
                      className="h-6 w-6 hover:cursor-pointer text-white"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  <section className="flex flex-col p-5 lg:p-8 mx-5 lg:mx-8 my-5 lg:my-8 items-center border border-brandLight bg-lighter  gap-4 text-center">
                    <p className="text-2xl lg:text-3xl font-medium text-lightGray">
                      Corpcare
                    </p>
                    <section className="text-sm lg:text-base font-medium text-darkGray flex items-center flex-col">
                      <p>{message || ''}</p>
                    </section>

                    <button
                      className="Button uppercase max-w-xs w-full lg:text-base text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {buttonLabel || 'ok'}
                    </button>
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
