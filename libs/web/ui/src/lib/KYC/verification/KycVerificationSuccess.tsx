import { BlackCrossCircle } from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import { NextRouter, useRouter } from 'next/router';
import { Fragment } from 'react';

export default function KycVerificationSuccess({
  isOpen,
  setIsOpen,
  isSubmissionError,
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
                  <Dialog.Title className="flex justify-between border-t border-b border-brandLight bg-lighter px-10 py-4">
                    <p className="font-medium text-xl text-lightGray uppercase">
                      {isSubmissionError
                        ? 'KYC ALREADY SUBMITTED'
                        : 'KYC SUBMITTED'}
                    </p>
                    <BlackCrossCircle
                      className="h-6 w-6 hover:cursor-pointer text-white"
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/profile');
                      }}
                    />
                  </Dialog.Title>
                  <section className="flex flex-col p-8 mx-8 mb-8 items-center border-[1px] border-brandLight bg-lighter mt-7 gap-4">
                    <p className="text-3xl font-medium text-lightGray">
                      Thank You!
                    </p>
                    <section className="text-base font-medium text-darkGray flex items-center flex-col">
                      {isSubmissionError ? (
                        <p>
                          Your KYC documents were already submitted
                          successfully.
                        </p>
                      ) : (
                        <>
                          <p>Your KYC documents were submitted successfully.</p>
                          <p>
                            You will recieve the confirmation email of status to
                            the registered id.
                          </p>
                        </>
                      )}
                    </section>

                    <button
                      className="Button uppercase max-w-xs w-full"
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/profile');
                      }}
                    >
                      thank you
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
