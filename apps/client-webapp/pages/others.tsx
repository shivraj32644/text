import { useRouter } from 'next/router';
import Link from 'next/link';
import { type ReactElement } from 'react';

import {
  DashboardHead,
  AuthenticatedDashboardLayout,
} from '../components/index';
import {
  normalizeCmsImage,
  useGetFetchOtherServicesComponent,
} from '@corpcare/shared/api';
import classNames from 'classnames';

export default function OtherServicesPage() {
  const router = useRouter();
  const { data } = useGetFetchOtherServicesComponent();
  return (
    <div className="xl:overflow-hidden h-full flex flex-col">
      <DashboardHead>
        <h2 className="font-medium text-sm">Others</h2>
        <div className="text-xs text-lightGray flex gap-1">
          <Link href="/others">
            <a>Others</a>
          </Link>
        </div>
      </DashboardHead>

      <div className="flex-grow overflow-y-auto p-4 lg:p-8 pb-5 lg:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-5 items-center place-items-center container mx-auto">
          {data?.card?.map((item, index) => {
            const image = normalizeCmsImage(item?.image);
            return (
              <div className="flex flex-col gap-8" key={index}>
                <figure
                  className="p-5 lg:p-6 flex flex-col space-y-3 h-[250px] lg:h-[420px] justify-end w-full max-w-none rounded-lg"
                  style={{
                    backgroundImage: `url(${image?.url})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                >
                  <blockquote className="text-white tracking-[0.02em] text-xl lg:text-2xl font-medium lg:leading-9">
                    {item?.heading}
                  </blockquote>
                  <figcaption className="text-base lg:text-lg font-normal tracking-[0.02em] text-white">
                    {item?.description}
                  </figcaption>
                  <button
                    className={classNames(
                      'text-base lg:text-lg w-48 uppercase',
                      item?.button?.theme === 'primary' && 'Button',
                      item?.button?.theme === 'secondary' && 'OutlineButton'
                    )}
                    onClick={() => router?.push(`${item?.button?.href}`)}
                  >
                    {item?.button?.label}
                  </button>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

OtherServicesPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedDashboardLayout>{page}</AuthenticatedDashboardLayout>;
};
