import Link from 'next/link';
import {
  AuthenticatedDashboardLayout,
  DashboardHead,
} from '../components/index';
import {
  MarketAction,
  DashboardMetricsLists,
  useAuth,
  DashboardInvestmentGrowth,
  DashboardFundPerformanceAnalysis,
} from '@corpcare/web/ui';

import { useGetMarkeActionList } from '@corpcare/shared/api';

import { ReactElement } from 'react';

import { Banner } from '../components/common/Banner';
import { NextRouter, useRouter } from 'next/router';

export default function Dashboard() {
  const { profile } = useAuth();
  const router = useRouter() as NextRouter;
  const { data: marketAction, isLoading } = useGetMarkeActionList();
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">
          Hi {profile.first_name} {profile.last_name}, Welcome Back
        </h2>
        <Link href="/dashboard">
          <a className="text-xs text-lightGray">Dashboard</a>
        </Link>
      </DashboardHead>

      <div className="p-4 lg:p-8 lg:grid grid-cols-12 gap-8 flex-grow overflow-y-auto mb-4 scrollbar">
        {!profile?.birth_date ||
        !profile?.designation ||
        !profile?.email ||
        !profile?.first_name ||
        !profile?.last_name ||
        !profile?.gender ||
        !profile?.last_name ||
        !profile?.marital_status ||
        !profile?.mobile ? (
          <div className="lg:col-span-12 mb-4 lg:mb-0">
            <Banner
              bannerText="Your Profile is incomplete, Please complete it."
              bannerType="error"
              buttonText="Edit Profile"
              buttonFxn={() => router.push('/profile')}
            />
          </div>
        ) : null}
        <div className="col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-[10px] pb-8 content-start">
          <div className="lg:col-span-2">
            <DashboardMetricsLists />
          </div>
          <div className="lg:col-span-2">
            <DashboardInvestmentGrowth />
          </div>
          <div className="lg:col-span-2">
            <DashboardFundPerformanceAnalysis />
          </div>
        </div>

        <div className="col-span-4 max-h-full relative">
          <div className="Card min-w-xs p-5 lg:p-6 overflow-auto">
            <p className="text-black text-sm lg:text-base font-medium uppercase mb-2">
              Market Action
            </p>
            {isLoading || !marketAction ? (
              <div className="SkeletonCard h-96" />
            ) : (
              <MarketAction marketAction={marketAction} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
