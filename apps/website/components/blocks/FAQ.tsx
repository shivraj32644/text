/* eslint-disable react/no-children-prop */
import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import { IFAQ } from '../../types/block';
import classNames from 'classnames';
import { useState } from 'react';
import { normalizeCmsImage } from '@corpcare/shared/api';
import remarkGfm from 'remark-gfm';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

function FaqItem({ question, answer }: { question?: string; answer?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="py-4 px-5 border-b last:border-b-0">
      <p
        className="flex group lg:p-2 cursor-pointer text-lightGray items-center hover:text-brand transition"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="flex-grow text-base lg:text-lg">{question}</span>
        <span
          className={classNames(
            'px-2 rounded-full  transition-transform',
            isExpanded ? '-rotate-180' : ''
          )}
        >
          <ChevronCircleArrowIcon className="lg:w-6 lg:h-6 w-5 h-5" />
        </span>
      </p>

      {isExpanded && (
        <div className="markdown-body !bg-white">
          <ReactMarkdown
            className="p-2 text-sm lg:text-base text-lightGray"
            children={answer as string}
            remarkPlugins={[remarkGfm]}
            linkTarget="_blank"
          />
        </div>
      )}
    </div>
  );
}

export function FAQ({ data }: { data: IFAQ }) {
  return (
    <div
      className={classNames(
        `bg-${
          !data?.theme || data?.theme === 'white' ? 'white' : '[#F1ECE5]'
        } relative`
      )}
    >
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
      <div
        className={classNames('container mx-auto lg:px-10 px-5 lg:py-12 py-8')}
      >
        <h2
          className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-center overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 p-4"
        >
          {data?.heading}
        </h2>
        <h1 className="font-medium text-[1.75rem] lg:text-4xl tracking-[0.02em] text-[#191919] mb-4 lg:mb-8 text-center">
          {data?.subHeading}
        </h1>
        <div className="border rounded-lg bg-white mx-auto">
          {data?.disclosure?.map((item, index) => (
            <FaqItem
              key={index}
              question={item?.disclosureHeading}
              answer={item?.disclosureDescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
