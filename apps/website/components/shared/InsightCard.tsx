import { normalizeCmsImage } from '@corpcare/shared/api';
import { CalendarBrandIcon } from '@corpcare/web/ui';
import { IInsightCard } from '../../types/shared';
import Link from 'next/link';

export default function InsightCard({ data }: { data?: IInsightCard }) {
  const icon = normalizeCmsImage(data?.category?.data?.attributes?.image);
  const image = normalizeCmsImage(data?.image);
  return (
    <div
      className="hover:shadow-md cursor-pointer w-full lg:min-w-[350px] border-brandLight border rounded"
      onClick={() => window.open(data?.slug || '', '_blank')}
    >
      <img
        src={image?.url}
        alt={image?.alternativeText}
        className="h-[224px] lg:h-[235px] object-cover w-full"
      />
      <div className="flex items-center gap-x-3 lg:gap-x-5 my-[0.875rem] px-2 lg:px-5 ">
        <div className="flex items-center gap-[6px]">
          <CalendarBrandIcon className="w-5 h-5 text-brand" />
          <div
            suppressHydrationWarning
            className="text-lightGray tracking-[0.02em] text-sm lg:text-base font-normal"
          >
            {new Date(data?.createdAt as string).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })}
          </div>
        </div>
        <div className="flex items-center gap-[6px]">
          <img
            src={icon?.url}
            alt={icon?.alternativeText}
            className="h-5 w-5"
          />
          <p className="text-lightGray tracking-[0.02em] text-sm lg:text-base font-normal">
            {data?.category?.data?.attributes?.title}
          </p>
        </div>
      </div>
      <p className="text-[1.35rem] lg:text-2xl mb-3 lg:mb-4 px-2 lg:px-5 border-t border-brandLight pt-3 lg:pt-4">
        {data?.title}
      </p>
      <div className="text-brand text-[0.875rem] lg:text-base px-2 lg:px-5 py-2">
        <button onClick={() => window.open(data?.slug || '', '_blank')}>
          READ MORE
        </button>
      </div>
    </div>
  );
}
