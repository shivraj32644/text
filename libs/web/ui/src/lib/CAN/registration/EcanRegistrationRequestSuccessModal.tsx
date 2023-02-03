import { BlackCrossCircle } from '@corpcare/web/ui';
import { ICreatedCANData } from '@corpcare/shared/api';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction } from 'react';
export function EcanRegistrationRequestSuccessModal({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data?: ICreatedCANData;
}) {
  const router = useRouter();
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
            router.push('/ecan-registration');
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-between border-y border-brandLight bg-lighter px-5 lg:px-8 py-3 lg:py-4">
                    <p className="font-medium text-lg lg:text-xl text-lightGray">
                      eCAN REQUEST ACCEPTED
                    </p>
                    <BlackCrossCircle
                      className="h-6 w-6 hover:cursor-pointer text-white"
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/ecan-registration');
                      }}
                    />
                  </Dialog.Title>
                  <section className="flex flex-col p-6 lg:p-8 m-5 lg:m-10 items-center border border-brandLight bg-lighter gap-4 rounded-lg">
                    <p className="text-2xl lg:text-[28px] lg:leading-[42px] font-medium text-[#191919]">
                      Thank You!
                    </p>
                    <section className="text-sm lg:text-base font-medium text-darkGray text-center">
                      For Opening Account with CorpCare. Your eCAN is{' '}
                      {data?.can_number || ''}. You will receive a confirmation
                      mail in 2 business days.
                    </section>
                    <button
                      className="Button uppercase max-w-[230px] lg:max-w-xs w-full font-semibold text-sm lg:text-base py-3 px-6 rounded"
                      onClick={() => router.push('/mutual-funds/all')}
                    >
                      EXPLORE MUTUAL FUNDS
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
