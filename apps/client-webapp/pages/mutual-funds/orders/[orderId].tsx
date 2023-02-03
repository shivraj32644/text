import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import {
  type ReactElement,
  Fragment,
  useEffect,
  createRef,
  useMemo,
} from 'react';
import {
  ChevronCircleArrowIcon,
  CustomToast,
  compactInrFormatter,
} from '@corpcare/web/ui';
import {
  AuthenticatedDashboardLayout,
  DashboardHead,
} from '../../../components/index';
import classNames from 'classnames';
import {
  IOrderDetails,
  useGetMutualFundOrderDetails,
} from '@corpcare/shared/api';

import { Disclosure } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { Url } from 'url';
export const RenderIfOrderIDExists = ({ data }: { data: IOrderDetails }) => {
  const CANDetails = [
    { name: 'CAN No.', value: data?.can_number },
    { name: 'CAN Status', value: '------' },
    { name: 'CAN Holder Name', value: data?.can_holder_name },
    { name: 'Order Status', value: data?.status?.replace(/(_)+/g, ' ') },
    { name: 'Transaction Type', value: data?.txn_type },
  ];
  const columns = [
    {
      name: 'Scheme ID',
      title: 'mf_scheme_id',
    },
    {
      name: 'Scheme Name',
      title: 'mf_scheme_name',
    },
    {
      name: 'Amount',
      title: 'amount',
    },
    { name: 'Folio No.', title: '' },
    { name: 'Div. Option', title: 'Not-Applicable' },
    { name: 'Txn. Vol. Type', title: 'Specific Amount' },
    { name: 'Txn. Vol', title: '1,00,000.00' },
    { name: 'New Folio', title: 'Yes' },
    { name: 'Order Status', title: 'Pending' },
  ];

  const refs = useMemo(() => {
    return (
      data?.order_items?.map(() => {
        return createRef<HTMLButtonElement>();
      }) ?? []
    );
  }, [data]);

  function handleClosingOthers(id: string) {
    const otherRefs = refs.filter((ref) => {
      return ref.current?.getAttribute('data-id') !== id;
    });

    otherRefs.forEach((ref) => {
      const isOpen = ref.current?.getAttribute('data-open') === 'true';

      if (isOpen) {
        ref.current?.click();
      }
    });
  }
  const router = useRouter() as NextRouter;
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium text-sm">Normal Order Book</h2>
        <div className="text-xs text-lightGray flex gap-1">
          <Link href="/mutual-funds/all">
            <a>Mutual Funds</a>
          </Link>
          &gt;
          <Link href="/mutual-funds/orders">
            <a>Normal Order Book</a>
          </Link>
          &gt;
          <a>#{data?.order_number}</a>
        </div>
      </DashboardHead>

      <div className="flex-grow overflow-y-auto p-4 lg:p-8 pb-5 lg:pb-16">
        <div className="Card flex items-center gap-4 mb-4 lg:mb-8">
          <Link href="/mutual-funds/orders">
            <a className="OutlineButton px-2 py-1 font-bold group-hover:bg-brandDark lg:inline-block hidden">
              &#10229; {/* left arrow */}
            </a>
          </Link>

          <h2 className="text-xl text-lightGray flex-grow font-medium">
            #{data?.order_number}
          </h2>

          {/* <a className="OutlineButton px-2" href={data.pdfDownloadUrl}>
            <PdfIcon />
          </a> */}

          <button
            className="Button uppercase lg:inline-block hidden opacity-60 pointer-events-none"
            onClick={() =>
              router.push((data?.mfu_net_banking_url as Url) || '#')
            }
          >
            Generate payment link
          </button>
        </div>

        <button
          className="Button uppercase lg:hidden w-full mb-4 opacity-60 pointer-events-none"
          onClick={() => router.push((data?.mfu_net_banking_url as Url) || '#')}
        >
          Generate payment link
        </button>

        <div className="Card overflow-hidden p-0 mb-8">
          <h3 className="bg-lighter border-b px-5 lg:px-14 py-4 lg:py-5 text-base lg:text-lg">
            Purchase Details
          </h3>
          <p className="whitespace-pre-wrap  px-5 lg:px-14 py-4 lg:py-5 text-base lg:text-lg">
            {`The ${data?.txn_type} Order No is ${data?.order_number}, You can transact by clicking on the PAY NOW button.\nYou will recieve the confirmation email on successful processing of your payment.`}
          </p>
        </div>

        <div className="Card p-0 overflow-hidden grid grid-cols-3 bg-white mb-4 lg:mb-8">
          <h4
            className={classNames(
              'h4 col-span-3 bg-lighter px-5 lg:px-14 py-3  border-b capitalize'
            )}
          >
            {data?.txn_type} Order Details
          </h4>

          {CANDetails?.map((item, idx) => (
            <div
              className={classNames(
                'px-5 lg:px-14 py-5 text-sm bg-white lg:col-span-1 col-span-3'
              )}
              key={item.name}
            >
              <div className="lg:block flex justify-between items-center">
                <div className="text-lighterGray mb-1">{item?.name}</div>
                <div className="text-darkGray">{item?.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="Card p-0  overflow-auto grid grid-cols-3 bg-white">
          <h4
            className={classNames(
              'h4 col-span-3 bg-lighter px-5 lg:px-14 py-3  border-b'
            )}
          >
            {data?.txn_type} MF-Scheme Order Details
          </h4>

          <div className="bg-white overflow-x-auto col-span-3 min-w-max lg:table hidden">
            <table className="border-hidden">
              <thead>
                <tr className="bg-brand text-white">
                  {columns?.map((column) => (
                    <th className="border-x-0 font-normal" key={column?.title}>
                      {column?.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white text-lightGray">
                {data?.order_items?.map((item) => {
                  return (
                    <tr key={item?.id}>
                      {columns?.map((col) => {
                        if (col?.title === 'amount') {
                          return (
                            <td className="border-x-0" key={col?.title}>
                              {item[col?.title]
                                ? compactInrFormatter.format(
                                    item[col?.title] as any
                                  )
                                : '-------'}
                            </td>
                          );
                        }
                        return (
                          <td className="border-x-0" key={col?.title}>
                            {item[col?.title] ? item[col?.title] : '-------'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-span-3 lg:hidden">
            {data?.order_items?.map((item, index) => (
              <div
                key={item?.id}
                className={classNames('bg-white rounded-lg divide-y mb-4')}
              >
                <Disclosure key={item?.id}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className="py-3 px-5 flex justify-between items-center w-full"
                        ref={refs[index]}
                        data-id={item?.id}
                        data-open={open}
                        onClick={() => handleClosingOthers(item?.id as any)}
                      >
                        <section className="flex flex-col items-start">
                          <p className="text-sm font-normal  text-left capitalize">
                            {item?.mf_scheme_name}
                          </p>
                        </section>
                        <span
                          className={classNames(
                            'px-2 rounded-full  transition-transform flex',
                            open ? '-rotate-180' : ''
                          )}
                        >
                          <ChevronCircleArrowIcon className="w-6 h-6 flex-shrink-0" />
                        </span>
                      </Disclosure.Button>
                      <Disclosure.Panel className="flex flex-col divide-y">
                        {columns?.map((col, index) => (
                          <section
                            className="flex justify-between items-center py-3 px-5 text-sm gap-4"
                            key={index}
                          >
                            <p>{col?.name}</p>
                            {col?.title === 'amount' ? (
                              <p>
                                {item[col?.title]
                                  ? compactInrFormatter.format(
                                      item[col?.title] as any
                                    )
                                  : '-------'}
                              </p>
                            ) : (
                              <p>
                                {item[col?.title]
                                  ? item[col?.title]
                                  : '---------'}
                              </p>
                            )}
                          </section>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default function OrderDetailsPage() {
  const router = useRouter();
  const { orderId } = router.query as { orderId: string };
  const { data, isLoading, isError } = useGetMutualFundOrderDetails(orderId);

  useEffect(() => {
    if (isError) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={'Something went wrong! Please try again.'}
          type="error"
        />
      ));
    }
  }, [isError]);
  useEffect(() => {
    if (isLoading) return;
    if (isError || !data) {
      router?.replace('/mutual-funds/orders');
    }
  }, [isError, router, data, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center  items-center h-full">
        <div role="status" className="relative">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-white animate-spin  fill-brand"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <>
      {isError || !data ? (
        <div className="flex items-center justify-center h-screen flex-col gap-2">
          <img className="max-h-14" src="/corpcare-logo-black.png" alt="" />
          <h1 className="text-center text-base lg:text-lg">Redirecting ....</h1>
        </div>
      ) : (
        <RenderIfOrderIDExists data={data} />
      )}
    </>
  );
}

OrderDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
