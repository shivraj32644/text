/* eslint-disable react/no-children-prop */
import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

export default function RenderMarkdown({ data }: { data }) {
  return (
    <div className="bg-white relative">
      {data?.miscellaneousFigure?.map((item, index) => {
        const figure = normalizeCmsImage(item?.figure);

        return (
          <div
            key={index}
            className={classNames(
              'absolute',
              item?.alignment === 'Top-Left' && 'top-0 left-0',
              item?.alignment === 'Top-Right' && 'top-0 right-0',
              item?.alignment === 'Bottom-Left' && 'bottom-0 left-0',
              item?.alignment === 'Bottom-Right' && 'bottom-0 right-0',
              item?.alignment === 'Center-Left' && 'bottom-1/2 left-0',
              item?.alignment === 'Center-Right' && 'bottom-1/2 right-0'
            )}
          >
            <img
              src={figure?.url}
              alt={figure?.alternativeText}
              className="object-cover w-auto h-auto"
            />
          </div>
        );
      })}
      <div className="mx-auto container p-5 lg:p-10">
        <div className="markdown-body !bg-white">
          <ReactMarkdown
            className="text-lg lg:text-[1.25rem] text-[#555555] tracking-[0.02em] "
            children={data?.content as string}
            remarkPlugins={[remarkGfm]}
            linkTarget="_blank"
          />
        </div>
      </div>
    </div>
  );
}
