import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import classNames from 'classnames';
import { useState } from 'react';

function FaqItem({ question, answer }: { question: string; answer: string }) {
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

export function MutualFundsFaqs() {
  // const {data} = useGetFixedDepositsFaqs();
  const data = [
    {
      question: 'Do Mutual Funds invest only in stocks?',
      answer:
        'You can invest in Mutual Funds through regular periodic investments and/or lump sum investments. Mutual funds carry a perception that they invest only in stocks and hence are risky. ',
    },
    {
      question: 'What are the indicators of risk in a Mutual Fund Scheme',
      answer:
        'You can invest in Mutual Funds through regular periodic investments and/or lump sum investments. Mutual funds carry a perception that they invest only in stocks and hence are risky. ',
    },
    {
      question: 'How do Mutual Funds help manage risk?',
      answer:
        'You can invest in Mutual Funds through regular periodic investments and/or lump sum investments. Mutual funds carry a perception that they invest only in stocks and hence are risky. ',
    },
    {
      question: 'Are Mutual Funds offered by Banks?',
      answer:
        'You can invest in Mutual Funds through regular periodic investments and/or lump sum investments. Mutual funds carry a perception that they invest only in stocks and hence are risky. ',
    },
    {
      question: 'What is the benefit of staying invested in the long term?',
      answer:
        'You can invest in Mutual Funds through regular periodic investments and/or lump sum investments. Mutual funds carry a perception that they invest only in stocks and hence are risky. ',
    },
    {
      question: 'How do I get my returns in Mutual Funds?',
      answer:
        'You can invest in Mutual Funds through regular periodic investments and/or lump sum investments. Mutual funds carry a perception that they invest only in stocks and hence are risky. ',
    },
  ];

  return (
    <>
      <h3 className="flex-grow font-medium text-lg lg:text-2xl text-lightGray mb-4">
        Faqs about Mutual Funds
      </h3>

      <div className="border rounded-lg bg-white">
        {data.map((item) => (
          <FaqItem
            question={item.question}
            answer={item.answer}
            key={item.question}
          />
        ))}
      </div>
    </>
  );
}
