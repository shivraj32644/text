import { BlackCrossCircle } from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function ClientQueryDetailsModal({ isOpen, setIsOpen }) {
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
                      Query Details
                    </p>
                    <BlackCrossCircle
                      className="w-6 h-6 lg:h-8 lg:w-8 hover:cursor-pointer text-white"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  <div className="px-10 py-8 flex justify-between items-center">
                    <div className="flex flex-col items-start">
                      <p className="text-lightGray text-xl tracking-[0.02em] font-medium">
                        Unable to redeem my funds. No Support
                      </p>
                      <p className="text-lightGray text-base tracking-[0.02em] font-normal">
                        12/02/2022
                      </p>
                    </div>
                    <span className="inline-flex items-center p-2 rounded text-xs font-normal bg-white border border-brandLight justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1.5"
                      >
                        <circle cx="6" cy="6" r="6" fill="#C5A265" />
                      </svg>
                      ACTIVE
                    </span>
                  </div>
                  <div className="px-10 py-8 text-base font-normal text-lightGray tracking-[0.02em] border-t">
                    <ol className="space-y-5">
                      <p>Bank document proof for each of the bank added :</p>
                      <li>
                        a. Bank statement must be latest (of the last 3 months)
                        with Bank A/C type, MICR, IFSC Code & Bank Account
                        number (without masking) OR
                      </li>
                      <li>
                        b. Cheque image should have CAN Primary holder/MINOR
                        name printed on it along with above details OR
                      </li>
                      <li>c.Bank letter with all the above details</li>
                    </ol>
                  </div>
                  <div className="px-10 py-6 bg-lighter border-t flex items-center gap-6">
                    <button className="OutlineButton uppercase w-full lg:text-base text-sm">
                      MARK AS CLOSED
                    </button>
                    <button className="Button uppercase w-full lg:text-base text-sm">
                      OPEN TICKET IN CQf
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
