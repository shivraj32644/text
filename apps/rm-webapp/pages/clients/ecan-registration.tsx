import { ArrowDownCircleBrandFillIcon } from '@corpcare/web/ui';
import { AuthenticatedDashboardLayout } from '../../components/AuthenticatedDashboardLayout';
import { DashboardHead } from '../../components/DashboardHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export default function ECanRegistration() {
  const router = useRouter();

  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium">Hi , Welcome Back</h2>
        <Link href="/">
          <a className="text-xs text-lightGray">Dashboard</a>
        </Link>
      </DashboardHead>

      <div className="py-5 lg:py-[26px] px-4 lg:px-8 overflow-y-auto">
        <section className="relative">
          <img
            className="w-full h-40 lg:h-full lg:max-h-[291px] object-cover rounded-lg"
            src="/images/ecan-registration-banner.png"
            alt="CorpCare - E-CAN Registration"
          />
          <div className="absolute bottom-4 left-4 lg:bottom-10 lg:left-10">
            <p className="text-2xl lg:text-[28px] lg:leading-[42px] font-medium text-white">
              eCAN Registration
            </p>
            <p className="text-lg lg:text-xl font-normal text-white max-w-xs">
              Individual Investors can use this facility to open an eCAN (Common
              Account Number).
            </p>
          </div>
        </section>
        <div className="mt-8 border border-brandLight rounded-lg bg-white">
          <div className="border-b border-brandLight">
            <div className="border-b">
              <p className="text-lightGray font-medium text-lg lg:text-xl px-5 lg:px-8 py-4 lg:py-5">
                Get Started
              </p>
            </div>
            <section className="flex flex-col gap-5 p-5 lg:p-8">
              {[
                'To create a new record, please provide the Email ID / Mobile No and click on ‘NEW FORM’.',
                'To complete a partially saved record or to CLONE an existing record, please provide the Email ID / Mobile No’ as captured in the saved record and click on ‘LOOK UP’.',
              ].map((name, idx) => (
                <p key={idx} className="flex justify-start items-center gap-3">
                  <ArrowDownCircleBrandFillIcon className="text-brand w-4 h-4 flex-shrink-0" />
                  <span className="text-lightGray font-normal text-sm lg:text-base">
                    {name}
                  </span>
                </p>
              ))}
            </section>
          </div>
          <div className="p-5 lg:p-8">
            <section className="grid grid-cols-2 max-w-xs gap-5 mb-6">
              <label className="col-span-2">
                <span className="Label mb-2">Email ID / Mobile No</span>
                <input
                  name="email "
                  type="text"
                  placeholder="Enter Email"
                  className="Input"
                />
              </label>
              <button className="OutlineButton col-span-1 uppercase lg:text-base text-sm">
                LOOK UP
              </button>
              <button
                className="Button col-span-1 uppercase lg:text-base text-sm"
                onClick={() => router.push('/clients/ecan-registration-form')}
              >
                NEW FORM
              </button>
            </section>
            <span className="ltext-sm lg:text-base font-normal text-lightGray">
              To ensure privacy of the details a Verification Code has been sent
              to the email id and the Mobile number (if a valid Indian Mobile
              Number).
            </span>
            <br />
            <br />
            <span className="ltext-sm lg:text-base font-normal text-lightGray">
              Please check your email / mobile and enter the Verification Code
              here.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

ECanRegistration.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
