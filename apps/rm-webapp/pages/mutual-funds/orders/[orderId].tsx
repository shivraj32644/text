import { useRouter } from 'next/router';
import Link from 'next/link';
import { type ReactElement, Fragment } from 'react';
import { PdfIcon } from '@corpcare/web/ui';
import { DashboardHead } from '../../../components/DashboardHead';
import { AuthenticatedDashboardLayout } from '../../../components/AuthenticatedDashboardLayout';
import classNames from 'classnames';

export default function OrderDetailsPage() {
  const router = useRouter();
  const { orderId } = router.query as { orderId: string };
  // const { data } = useGetMutualFundOrderDetails(orderId);

  const data = {
    id: orderId,
    pdfDownloadUrl: '/orders/orderId/download/pdf',
    description:
      'The Purchase Order No is CCPR158244, You can transact by clicking on the PAY NOW button.\nYou will recieve the confirmation email on successful processing of your payment.',
    details: [
      {
        name: 'CAN Details',
        data: [
          { name: 'CAN No.', value: '21086BA001' },
          { name: 'CAN Status', value: 'Active' },
          { name: 'Transaction Type', value: 'Purchase' },
        ],
      },
      {
        name: 'Purchase Details',
        data: [
          { name: 'Scheme Name.', value: 'AXIS ESG Fund Direct Growth' },
          { name: 'Folio No.', value: '485646' },
          { name: 'Div. Option', value: 'Not-Applicable' },
          { name: 'Txn. Vol. Type', value: 'Specific Amount' },
          { name: 'Txn. Vol', value: '1,00,000.00' },
          { name: 'New Folio', value: 'Yes' },
          { name: 'Order Status', value: 'Pending' },
          { name: 'Amount', value: 'Rs 10 Lacs' },
          { name: 'Amount', value: '10 Lacs Rupees Only' },
        ],
      },
    ],
  };

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
          <a>#{data.id}</a>
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
            #{data.id}
          </h2>

          <a className="OutlineButton px-2" href={data.pdfDownloadUrl}>
            <PdfIcon />
          </a>

          <button className="Button uppercase lg:inline-block hidden ">
            Generate payment link
          </button>
        </div>

        <button className="Button uppercase lg:hidden w-full mb-4">
          Generate payment link
        </button>

        <div className="Card overflow-hidden p-0 mb-8">
          <h3 className="bg-lighter border-b px-5 lg:px-14 py-4 lg:py-5 text-base lg:text-lg">
            Purchase Details
          </h3>
          <p className="whitespace-pre-wrap  px-5 lg:px-14 py-4 lg:py-5 text-lg">
            {data.description}
          </p>
        </div>

        <div className="Card p-0 overflow-hidden grid grid-cols-3 bg-brandLight">
          {data.details.map((detail) => (
            <Fragment key={detail.name}>
              <h4
                className={classNames(
                  'h4 col-span-3 bg-lighter px-5 lg:px-14 py-3',
                  detail.name === 'CAN Details' ? '' : 'lg:border-t-0 border-t'
                )}
              >
                {detail.name}
              </h4>
              {detail.data.map((item, idx) => (
                <div
                  className={classNames(
                    'px-5 lg:px-14 py-5 text-sm bg-white lg:col-span-1 col-span-3',
                    detail.name === 'CAN Details'
                      ? 'border-t lg:border-y'
                      : 'border-t'
                  )}
                  key={item.name}
                >
                  <div className="lg:block flex justify-between items-center">
                    <div className="text-lighterGray mb-1">{item.name}</div>
                    <div className="text-darkGray">{item.value}</div>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

OrderDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
