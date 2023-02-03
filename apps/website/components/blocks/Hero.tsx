import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
// import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { IHero } from '../../types/block';
import RequestDemoModal from '../shared/RequestDemoModal';

export function Hero({ data }: { data: IHero }) {
  // const router = useRouter() as NextRouter;
  const backgroundImage = normalizeCmsImage(data?.backgroundImage);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage?.url})`, margin: 0 }}
      className="bg-cover bg-center bg-no-repeat bg-opacity-70 flex-1 max-h-[620px]"
    >
      <div className="h-[28.75rem] lg:h-[520px] flex flex-col justify-end lg:justify-center container mx-auto lg:px-10 px-5 space-y-8 py-8 lg:py-60">
        <p className="text-[2rem] lg:text-5xl tracking-[0.02em] leading-[42px] lg:leading-tight font-semibold text-white max-w-xs lg:max-w-[595px] mr-auto">
          {data?.Content}
        </p>
        <button
          className={classNames(
            'w-44',
            data?.Button?.theme === 'primary' && 'Button',
            data?.Button?.theme === 'secondary' && 'OutlineButton'
          )}
          onClick={() =>
            //  router?.push(`${data?.Button?.link?.href})`
            setIsOpen(true)
          }
        >
          {data?.Button?.link?.label}
        </button>
      </div>
      <RequestDemoModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
  );
}
