import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import { IThankYou } from '../../types/block';

export function ThankYou({ data }: { data: IThankYou }) {
  const router = useRouter() as NextRouter;
  const backgroundImage = normalizeCmsImage(data?.backgroundImage);
  return (
    <div>
      <div className="container mx-auto lg:px-10 px-5 lg:py-10 py-5">
        <main
          className="max-h-[600px] bg-cover rounded-xl max-w-5xl mx-auto"
          style={{
            backgroundImage: `url(${backgroundImage?.url})`,
          }}
        >
          <div
            className="mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48 opacity-[0.72] rounded-xl flex flex-col"
            style={{
              backgroundColor: 'transparent',
              backgroundImage:
                'linear-gradient(180deg, #C5A265 0%, #000000 100%)',
            }}
          >
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
              {data?.title}
            </h1>
            <p className="mt-2 text-lg font-medium text-white">
              {data?.description}
            </p>
            <div className="mt-6">
              <button
                className={classNames(
                  'w-44 uppercase',
                  data?.button?.theme === 'primary' && 'Button',
                  data?.button?.theme === 'secondary' && 'OutlineButton'
                )}
                onClick={() => router?.push(`${data?.button?.href}`)}
              >
                {data?.button?.label}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
