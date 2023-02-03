import { useLogoutClient } from '@corpcare/shared/api';
import { BlackCrossCircle } from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export function LogoutModal({ isOpen, setIsOpen }) {
  const handleLogout = useLogoutClient();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
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
                <Dialog.Panel className="w-full max-w-3xl  transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex justify-between border-b border-brandLight bg-lighter px-5 py-3 lg:px-10 lg:py-4">
                    <p className="font-medium text-base lg:text-xl text-lightGray uppercase">
                      Please confirm
                    </p>
                    <BlackCrossCircle
                      className="h-5 w-5 lg:h-6 lg:w-6 hover:cursor-pointer text-white flex-shrink-0"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    />
                  </Dialog.Title>
                  <section className="flex flex-col p-5 lg:p-8 mx-5 mb-5 lg:mx-8 lg:mb-8 items-center border border-brandLight bg-lighter mt-5 lg:mt-7 lg:space-y-4 space-y-2">
                    <p className="text-lg lg:text-2xl font-medium text-lightGray mt-3 lg:mt-6">
                      Are you sure you want to logout?
                    </p>
                    <div className="flex items-center gap-4">
                      <button
                        className="Button bg-green-600 text-white border border-green-600 font-bold hover:bg-green-800"
                        onClick={handleLogout}
                      >
                        Yes, Log Out
                      </button>
                      <button
                        className="Button bg-brandError text-white border border-brandError font-bold hover:bg-red-700"
                        onClick={() => setIsOpen(false)}
                      >
                        No, Cancel
                      </button>
                    </div>
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
