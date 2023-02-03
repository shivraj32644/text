import { useState } from 'react';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="py-4 px-5 border-b last:border-b-0">
      <p
        className="flex group lg:p-2 cursor-pointer text-lightGray items-center hover:text-brand transition"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="flex-grow text-lg">{question}</span>
        <span className="rotate-90 rounded-full border border-lightGray px-2 inline-block group-hover:border-brand transition">
          &#10095;
        </span>
      </p>

      {isExpanded && <p className="p-2">{answer}</p>}
    </div>
  );
}

export function FixedDepositsFaqs() {
  // const {data} = useGetFixedDepositsFaqs();
  const data = [
    /**
     * Are there any charges or mandates post adding bank account? My money got deducted, but my investments do not reflect in my Portfolio. What's the issue? How to Add a Bank Account? Can I use different bank accounts for investing? Which Bank is used for Redemption when I sell the Investments? How to Add a Bank Account?
     */
    {
      question: 'Are there any charges or mandates post adding bank account?',
      answer:
        'If you have just one-mandate it will become the default mode of making SIP investments. To acid another bank account, you need to register a fresh mandate and it can be set as default once approved.',
    },
    {
      question:
        'My money got deducted, but my investments do not reflect in my Portfolio. What’s the issue?',
      answer:
        'We are working on a solution to this issue. We will notify you once we have it.',
    },
    {
      question: 'How to Add a Bank Account?',
      answer:
        'We are working on a solution to this issue. We will notify you once we have it.',
    },
    {
      question: 'Can I use different bank accounts for investing?',
      answer:
        'If you have just one-mandate it will become the default mode of making SIP investments. To acid another bank account, you need to register a fresh mandate and it can be set as default once approved.',
    },
    {
      question:
        'Which Bank is used for Redemption when I sell the Investments?',
      answer:
        'We are working on a solution to this issue. We will notify you once we have it.',
    },
  ];

  return (
    <>
      <h3 className="flex-grow font-medium text-2xl text-lightGray mb-4">
        Faqs about Fixed Deposits
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
