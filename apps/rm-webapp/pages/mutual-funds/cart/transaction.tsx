import classnames from 'classnames';
import { Fragment, ReactElement, useState } from 'react';
import { DashboardHead } from '../../../components/DashboardHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BlackCrossCircle, HamburgerMenuIcon } from '@corpcare/web/ui';
import { Dialog, Transition } from '@headlessui/react';
import { AuthenticatedDashboardLayout } from '../../../components/AuthenticatedDashboardLayout';
// import { TransactionDetails } from '../../../components/TransactionDetails';
import OrderSuccessfulModal from '../../../components/OrderSuccessfulModal';

const purchaseTransaction = [
  {
    title: 'Transaction Details',
  },
];
export const PurchaseTransactionOptions = ({
  isOptionBarOpen,
  closeOptionBar,
  currentTabIndex,
  setCurrentTabIndex,
}) => {
  const router = useRouter();
  return (
    <>
      <Transition.Root show={isOptionBarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={closeOptionBar}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="flex-1 flex flex-col max-w-xs w-full ">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="relative flex justify-between items-center px-4 py-3 bg-white max-w-[284px] border-b-[1px] border-brandLight">
                  <p className="uppercase text-sm text-lightGray font-normal">
                    CLOSE MENU
                  </p>

                  <BlackCrossCircle
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                    onClick={closeOptionBar}
                  />
                </div>
              </Transition.Child>
              <section className="max-w-[284px] w-full bg-white h-full px-4 pt-4 pb-16 overflow-y-auto flex-col flex">
                <ol className="overflow-hidden mt-6 flex-grow">
                  {purchaseTransaction.map(
                    (_purchaseTransaction, _purchaseTransactionIdx) => (
                      <li
                        key={_purchaseTransaction.title}
                        className={classnames(
                          _purchaseTransactionIdx !==
                            purchaseTransaction.length - 1
                            ? 'pb-10'
                            : '',
                          'relative'
                        )}
                      >
                        {_purchaseTransactionIdx !==
                        purchaseTransaction.length - 1 ? (
                          <div
                            className={classnames(
                              `-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full`,
                              _purchaseTransactionIdx + 1 === currentTabIndex
                                ? 'bg-brand'
                                : 'bg-brandLight'
                            )}
                          />
                        ) : null}
                        <div className="relative flex items-start group">
                          <span className="h-9 flex items-center">
                            <span
                              className={classnames(
                                `relative z-10 w-8 h-8 flex items-center justify-center rounded text-white`,
                                _purchaseTransactionIdx + 1 === currentTabIndex
                                  ? 'bg-brand'
                                  : 'bg-brandLight'
                              )}
                            >
                              {_purchaseTransactionIdx + 1}
                            </span>
                          </span>
                          <span className="text-base font-medium tracking-wide text-lightGray ml-4 self-center">
                            {_purchaseTransaction.title}
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ol>
                <button
                  className="uppercase OutlineButton w-full mt-6 text-sm"
                  onClick={() => router.push('/mutual-funds/cart/')}
                >
                  back to cart
                </button>
              </section>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default function PurchaseTransaction() {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(1);
  const [isOptionBarOpen, setIsOptionBarOpen] = useState<boolean>(false);

  const router = useRouter();

  const closeOptionBar = () => {
    setIsOptionBarOpen(false);
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">CAN Transaction</h2>
        <div className="text-xs text-lightGray">
          <Link href="/mutual-funds/all">
            <a>Mutual Funds </a>
          </Link>
          &gt;&nbsp;
          <Link href="/mutual-funds/cart">
            <a>Cart</a>
          </Link>
        </div>
      </DashboardHead>
      <div className="DashboardHead mt-5 h-12 lg:hidden">
        <div className="flex-grow flex gap-3 items-center justify-between">
          <section className="flex gap-2 items-center">
            <HamburgerMenuIcon
              className="lg:hidden block w-6 h-6 text-brand"
              onClick={() => setIsOptionBarOpen(true)}
            />
            <span className="text-sm font-normal text-lightGray">
              Transaction Details
            </span>
          </section>
          <div className="flex flex-col relative w-16">
            <div className="absolute top-0 right-4 w-0.5 h-full bg-brand rotate-90" />
            <span className="relative z-10 w-8 h-8 flex items-center justify-center rounded text-white bg-brand">
              {currentTabIndex}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden">
        <section className="w-[200px] 2xl:w-[280px] bg-white h-full p-5 2xl:p-8 overflow-y-auto lg:flex flex-shrink-0 flex-col hidden">
          <ol className="overflow-hidden mt-2 flex-grow">
            {purchaseTransaction.map(
              (_purchaseTransaction, _purchaseTransactionIdx) => (
                <li
                  key={_purchaseTransaction.title}
                  className={classnames(
                    _purchaseTransactionIdx !== purchaseTransaction.length - 1
                      ? 'pb-10'
                      : '',
                    'relative'
                  )}
                >
                  {_purchaseTransactionIdx !==
                  purchaseTransaction.length - 1 ? (
                    <div
                      className={classnames(
                        `-ml-px absolute mt-0.5 top-4 left-3 2xl:left-4 w-0.5 h-full`,
                        _purchaseTransactionIdx + 1 === currentTabIndex
                          ? 'bg-brand'
                          : 'bg-brandLight'
                      )}
                    />
                  ) : null}
                  <div className="relative flex items-start group">
                    <span className="h-9 flex items-center">
                      <span
                        className={classnames(
                          `relative z-10 w-6 h-6 2xl:w-8 2xl:h-8 flex items-center justify-center rounded text-white`,
                          _purchaseTransactionIdx + 1 === currentTabIndex
                            ? 'bg-brand'
                            : 'bg-brandLight'
                        )}
                      >
                        {_purchaseTransactionIdx + 1}
                      </span>
                    </span>
                    <span className="text-sm 2xl:text-base font-medium tracking-wide text-lightGray ml-4 self-center">
                      {_purchaseTransaction.title}
                    </span>
                  </div>
                </li>
              )
            )}
          </ol>
          <button
            className="uppercase OutlineButton w-full 2xl:text-base text-sm"
            onClick={() => router.push('/mutual-funds/cart/')}
          >
            back to cart
          </button>
        </section>
        <div className="overflow-y-auto w-full">
          <div className="mx-3 lg:mx-8 mb-8 lg:mb-10">
            {/* {currentTabIndex === 1 && (
              // <TransactionDetails setIsOpen={setIsOpen} />
            )} */}
          </div>
        </div>
      </div>
      <PurchaseTransactionOptions
        setCurrentTabIndex={setCurrentTabIndex}
        isOptionBarOpen={isOptionBarOpen}
        currentTabIndex={currentTabIndex}
        closeOptionBar={closeOptionBar}
      />
      <OrderSuccessfulModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}

PurchaseTransaction.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
