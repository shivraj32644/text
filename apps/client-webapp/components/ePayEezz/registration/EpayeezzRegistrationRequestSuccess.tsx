import { BlackCrossCircle } from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import { NextRouter, useRouter } from 'next/router';
import { Fragment } from 'react';

export default function EpayeezzRegistrationRequestSuccess({
  isOpen,
  setIsOpen,
  mmrn_number,
}) {
  const router = useRouter() as NextRouter;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
            router.push('/profile');
          }}
        >
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
                  <Dialog.Title className="flex justify-between border-b border-brandLight bg-lighter px-5 py-3 lg:px-10 lg:py-4">
                    <p className="font-medium text-lg lg:text-xl text-lightGray">
                      EPAYEEZZ REQUEST SUCCESS
                    </p>
                    <BlackCrossCircle
                      className="h-6 w-6 hover:cursor-pointer text-white"
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/profile');
                      }}
                    />
                  </Dialog.Title>
                  <section className="flex flex-col p-5 lg:p-8 mx-5 mb-5 lg:mx-8 lg:mb-8 items-center border-[1px] border-brandLight bg-lighter mt-5 lg:mt-7">
                    <p className="text-xl lg:text-2xl font-medium text-lightGray mt-3 lg:mt-6">
                      Thank You!
                    </p>
                    <p className="text-sm lg:text-base font-medium text-lightGray mt-2 lg:mt-[6px]">
                      EPAYEEZZ request is submitted. Your MMRN No is&nbsp;
                      {mmrn_number}
                    </p>
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
