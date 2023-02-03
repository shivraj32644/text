import Link from 'next/link';
import { type ReactElement } from 'react';
import {
  BalanceIcon,
  FilterIcon,
  FixedDepositCard,
  PdfIcon,
  WatchListIcon,
} from '@corpcare/web/ui';
import {
  AuthenticatedDashboardLayout,
  DashboardHead,
} from '../../components/index';

export default function FixedDepositsAllPage() {
  // const { data } = useGetAllFixedDeposits();
  const data = Array(5)
    .fill(null)
    .map(() => ({
      id: 'icicibankfd',
      logo: '/favicon.png',
      name: 'ICICI Bank FD',
      details: {
        interestRates: '2.90-5.40%',
        tenure: '1 yr - 10 yrs',
        lockIn: '12 months',
        minDeposit: '₹ 10,000',
        maxDeposit: '₹ 1 Crore',
        rating: 'AAA',
      },
      pdfDownloadUrl: '/fixed-deposits/fdId/download/pdf',
    }));

  return (
    <div className="overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Fixed Deposits</h2>
        <div className="text-xs text-lightGray">
          <Link href="/fixed-deposits/about">
            <a> Fixed Deposits </a>
          </Link>
          &gt;
          <Link href="/fixed-deposits/all">
            <a> All FDs </a>
          </Link>
        </div>
      </DashboardHead>

      <div className="p-8 pb-16 overflow-y-auto flex-grow">
        <div className="flex mb-4">
          <h3 className="flex-grow font-medium text-2xl text-lightGray">
            All Fixed Deposits
          </h3>

          <div className="flex-shrink-0 flex gap-4">
            <select className="Input border-brand text-lightGray">
              <option disabled selected>
                SORT BY
              </option>
              <option>Preferred</option>
              <option>High Returns</option>
            </select>

            <button className="OutlineButton font-normal text-lightGray py-1 inline-flex gap-2 items-center">
              FILTERS <FilterIcon />
            </button>
          </div>
        </div>

        {data.map((fd) => (
          <div key={fd.id} className="mb-8">
            <FixedDepositCard
              link={`/fixed-deposits/details/${fd.id}`}
              name={fd.name}
              details={fd.details}
              logo={fd.logo}
              actions={
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="OutlineButton uppercase font-normal py-[6px]"
                  >
                    Invest Now
                  </button>

                  <a className="OutlineButton p-2" href={fd.pdfDownloadUrl}>
                    <PdfIcon />
                  </a>

                  <a
                    title="Watchlist"
                    className="OutlineButton p-2"
                    href="/watchlist"
                  >
                    <WatchListIcon />
                  </a>

                  <a
                    title="Compare"
                    className="OutlineButton p-2"
                    href="/compare"
                  >
                    <BalanceIcon />
                  </a>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

FixedDepositsAllPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
