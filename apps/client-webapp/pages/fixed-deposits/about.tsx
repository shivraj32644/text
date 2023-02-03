import Link from 'next/link';
import { type ReactElement } from 'react';

import {
  AuthenticatedDashboardLayout,
  DashboardHead,
  FixedDepositsSpotlight,
  FixedDepositsFaqs,
  FixedDepositsRates,
} from '../../components/index';

export default function FixedDepositsPage() {
  return (
    <div className="overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Fixed Deposits</h2>
        <div className="text-xs text-lightGray">
          <Link href="/fixed-deposits/about">
            <a>Fixed Deposits</a>
          </Link>
        </div>
      </DashboardHead>

      <div className="p-8 pb-16 overflow-y-auto flex-grow">
        <img
          className="w-full max-h-48 object-cover rounded-lg"
          src="/fixed-deposits-banner.png"
          alt="CorpCare - Fixed Deposits"
        />

        <div className="my-10">
          <FixedDepositsSpotlight />
        </div>

        <div className="my-10">
          <FixedDepositsRates />
        </div>

        <div className="my-10">
          <FixedDepositsFaqs />
        </div>
      </div>
    </div>
  );
}

FixedDepositsPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
