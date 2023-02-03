/* eslint-disable react/no-children-prop */
import { normalizeCmsImage } from '@corpcare/shared/api';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { IAboutHero } from '../../types/block';

export function AboutHero({ data }: { data: IAboutHero }) {
  const imageBig = normalizeCmsImage(data?.imageBig);
  const imageSmall = normalizeCmsImage(data?.imageSmall);
  return (
    <div className="bg-white">
      <div className="2xl:container 2xl:mx-auto  flex flex-col-reverse lg:flex-row items-end lg:items-center lg:p-10 p-5 gap-y-10">
        <div className="lg:flex-1 flex flex-col  justify-center">
          <h2
            className="font-medium text-[1.125rem] lg:text-xl lg:leading-8 tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px]
           before:bg-brand before:inline-block before:relative before:align-middle
           before:w-6 before:right-2 lg:p-4"
          >
            {data?.heading}
          </h2>
          <h1 className="max-w-[518px] font-medium text-[1.75rem] lg:text-[2.25rem] tracking-[0.02em]  text-left lg:leading-[48px] mb-5 lg:mb-10">
            {data?.subheading}
          </h1>

          <div className="markdown-body !bg-white">
            <ReactMarkdown
              className="text-lg lg:text-[1.25rem] text-[#555555] max-w-[518px]"
              children={data?.description as string}
              remarkPlugins={[remarkGfm]}
              linkTarget="_blank"
            />
          </div>
        </div>
        <div className="max-w-full w-[22rem] lg:w-[40rem] flex justify-end relative pt-7 lg:pt-10">
          <img
            src={imageBig?.url}
            alt={imageBig?.alternativeText}
            className="w-[16.5rem] lg:w-[30rem] h-[15.375rem] lg:h-[27.875rem]"
          />

          <img
            src={imageSmall?.url}
            alt={imageSmall?.alternativeText}
            className="w-[9.625rem] lg:w-[17.5rem] h-[9.625rem] lg:h-[17.5rem] absolute top-0 left-0"
          />
        </div>
      </div>
    </div>
  );
}
