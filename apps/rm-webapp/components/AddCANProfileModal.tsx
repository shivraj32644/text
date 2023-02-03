import { BlackCrossCircle } from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

export function AddCANProfileModal({ isOpen, setIsOpen }) {
  const router = useRouter();
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
                <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-between border-y border-brandLight bg-lighter px-10 py-4">
                    <p className="font-medium text-lg text-lightGray uppercase tracking-wide">
                      add can
                    </p>
                    <BlackCrossCircle
                      className="h-6 w-6 hover:cursor-pointer text-white"
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  <section className="flex justify-center items-center gap-6 p-10">
                    <section className="flex flex-col p-6 items-center border border-brandLight bg-lighter gap-4 w-full max-w-[200px] hover:cursor-pointer">
                      <img
                        src="/images/valid-tick-document.png"
                        alt="validate_can"
                      />
                      <p
                        className="text-sm text-black font-normal hover:cursor-pointer"
                        onClick={() => router.push('/clients/can-validation')}
                      >
                        Validate Existing CAN
                      </p>
                    </section>
                    <section className="flex flex-col p-6 items-center border border-brandLight bg-lighter gap-4  w-full max-w-[200px] hover:cursor-pointer">
                      <img
                        src="/images/edit-document.png"
                        alt="apply_for_new_can"
                      />
                      <p className="text-sm text-black font-normal hover:cursor-pointer">
                        Apply for New eCAN
                      </p>
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
