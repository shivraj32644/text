import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { type ReactElement, Fragment } from 'react';
import { PdfIcon } from '@corpcare/web/ui';
import { DashboardHead } from '../../components/DashboardHead';
import { AuthenticatedDashboardLayout } from '../../components/AuthenticatedDashboardLayout';
import classNames from 'classnames';

export default function ApprovalDetailsPage() {
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
        name: 'Payment Details',
        data: [
          { name: 'Payment Transfer Via', value: 'Direct-To-AMC' },
          { name: 'Amount', value: '1,00,000.00' },
          { name: 'Amount in Words', value: 'Rupees One Lakh only' },
        ],
      },
      {
        name: 'Scheme Details',
        data: [
          { name: 'Scheme Name.', value: 'AXIS ESG Fund Direct Growth' },
          { name: 'Folio No.', value: '485646' },
          { name: 'Div. Option', value: 'Not-Applicable' },
          { name: 'Txn. Vol. Type', value: 'Specific Amount' },
          { name: 'Txn. Vol', value: '1,00,000.00' },
          { name: 'New Folio', value: 'Yes' },
          { name: 'Order Status', value: 'Pending' },
          { name: 'Payment Type', value: 'NEFT' },
          { name: 'UTR Ref. No.', value: '' },
          { name: 'Payment Date', value: '23-06-2021' },
          {
            name: 'Source Amount',
            value: 'Punjab National Bank-0228100225817',
          },
          { name: 'Target Amount', value: 'ICICI Bank Ltd.- 3523432423432' },
        ],
      },
      {
        name: 'Other Details',
        data: [
          { name: 'Red.Txn.Vol.Type', value: '' },
          { name: 'Red.Txn.Vol', value: '' },
          { name: 'Bank Name', value: '' },
          { name: 'Amount No.', value: '------------' },
          { name: 'MICR Code', value: '------------' },
          { name: 'IFSC', value: '------------' },
        ],
      },
    ],
  };
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium text-sm">Approval Book</h2>
        <div className="text-xs text-lightGray flex gap-1">
          <Link href="/approval">
            <a>Approval</a>
          </Link>
          &gt;
          <a>#{router.query.approvalId}</a>
        </div>
      </DashboardHead>

      <div className="flex-grow overflow-y-auto p-4 lg:p-8 pb-5 lg:pb-16">
        <div className="Card flex items-center gap-4 mb-4 lg:mb-8">
          <Link href="/approval">
            <a className="OutlineButton px-2 py-1 font-bold group-hover:bg-brandDark">
              &#10229; {/* left arrow */}
            </a>
          </Link>

          <h2 className="text-xl text-lightGray flex-grow font-medium">
            #{router.query.approvalId}
          </h2>

          <a className="OutlineButton px-2" href={data.pdfDownloadUrl}>
            <PdfIcon />
          </a>

          <button className="OutlineButton uppercase">Reject Order</button>
          <button className="Button uppercase">Approve Order</button>
        </div>

        <div className="Card p-0 overflow-hidden grid grid-cols-3 bg-brandLight">
          {data.details.map((detail) => (
            <Fragment key={detail.name}>
              <h4
                className={classNames(
                  'h4 col-span-3 bg-lighter px-5 lg:px-14 py-3',
                  detail.name === 'CAN Details' ? '' : ''
                )}
              >
                {detail.name}
              </h4>
              {detail.data.map((item, idx) => (
                <div
                  className={classNames(
                    'px-5 lg:px-14 py-5 text-sm bg-white lg:col-span-1 col-span-3 border-t'
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
          <>
            <h4
              className={classNames(
                'h4 col-span-3 bg-lighter px-5 lg:px-14 py-3 lg:border-t-0 border-t'
              )}
            >
              Remarks
            </h4>
            {[
              {
                name: 'Auto-populated Remarks',
                value: '',
              },
              {
                name: 'Remarks to RTA',
                value: '',
              },
              {
                name: 'Internal Remarks',
                value: '',
              },
            ].map((item) => (
              <div
                className={classNames(
                  'px-5 lg:px-14 py-5 text-sm bg-white lg:col-span-1 col-span-3 border-t lg:border-y'
                )}
                key={item.name}
              >
                <div className="flex justify-between items-start flex-col gap-4">
                  <div className="text-black mb-1 text-base font-medium">
                    {item.name}
                  </div>
                  <textarea className="border border-brandLight max-w-xs w-full h-16" />
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}

ApprovalDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
