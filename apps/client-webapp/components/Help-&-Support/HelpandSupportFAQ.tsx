import { IHelpingTopic } from '@corpcare/shared/api';
import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import classNames from 'classnames';
import { useState } from 'react';

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

      {isExpanded && <p className="p-2 text-sm lg:text-base">{answer}</p>}
    </div>
  );
}

export function HelpandSupportFAQ({ data }: { data: IHelpingTopic }) {
  return (
    <>
      <h1 className="font-medium text-xl tracking-[0.02em] text-lightGray mb-3 text-left">
        {data?.helpTopicHeading}
      </h1>
      <div className="border rounded-lg bg-white mx-auto">
        {data?.helpTopicFAQ?.map((item, index) => (
          <FaqItem
            key={index}
            question={item?.disclosureHeading}
            answer={item?.disclosureDescription}
          />
        ))}
      </div>
    </>
  );
}
