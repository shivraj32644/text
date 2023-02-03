import { normalizeCmsImage } from '@corpcare/shared/api';
import { IWebinarCard } from '../../types/block';
import { NextRouter, useRouter } from 'next/router';

export const UpcomingWebinarsCard = ({ data }: { data?: IWebinarCard }) => {
  const image = normalizeCmsImage(data?.image);
  const speakerImage = normalizeCmsImage(
    data?.speaker?.data?.attributes?.image
  );

  const router = useRouter() as NextRouter;
  return (
    <figure
      className="border rounded-lg bg-white flex flex-col w-full min-w-[340px] divide-y hover:shadow-md cursor-pointer"
      onClick={() => router.push(`/webinar/${data?.slug}`)}
    >
      <img
        src={image?.url}
        alt={image?.alternativeText}
        className="h-40 object-cover w-auto"
      />
      <h1 className="text-[#191919] tracking-[0.02em] font-normal text-lg lg:text-xl lg:!leading-[26px] px-5 pt-5 pb-5 lg:pb-7">
        {data?.title}
      </h1>
      <div className="flex items-center gap-2 p-5">
        <img
          src={speakerImage?.url}
          alt={speakerImage?.alternativeText}
          className="object-cover w-11 h-11 rounded-[4px]"
        />
        <div className="flex flex-col">
          <h2 className="text-[#191919] tracking-[0.02em] font-normal text-sm lg:text-base">
            {data?.speaker?.data?.attributes?.name}
          </h2>
          <h3 className="text-lightGray tracking-[0.02em] font-normal text-sm">
            {data?.speaker?.data?.attributes?.designation}
          </h3>
        </div>
      </div>
      <div
        suppressHydrationWarning
        className="text-lighterGray tracking-[0.02em] font-normal text-sm lg:text-base py-3 lg:py-5 px-5 bg-lighter"
      >
        {new Date(data?.Date as string).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })}
      </div>
    </figure>
  );
};
