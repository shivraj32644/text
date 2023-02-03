import Link from 'next/link';
import { type ReactNode } from 'react';
import {
  PercentIcon,
  HourglassIcon,
  LockIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  ReviewIcon,
} from '../icons';

const fdDetailCards = [
  { name: 'interestRates', label: 'Interest Rates', icon: PercentIcon },
  { name: 'tenure', label: 'Tenure', icon: HourglassIcon },
  { name: 'lockIn', label: 'Lock-in', icon: LockIcon },
  { name: 'minDeposit', label: 'Minimum Deposit', icon: ArrowDownCircleIcon },
  { name: 'maxDeposit', label: 'Maximum Deposit', icon: ArrowUpCircleIcon },
  { name: 'rating', label: 'Rating', icon: ReviewIcon },
] as const;

interface FdDetails {
  interestRates: string;
  tenure: string;
  lockIn: string;
  minDeposit: string;
  maxDeposit: string;
  rating: string;
}

export function FixedDepositCard({
  link,
  logo,
  name,
  actions,
  details,
}: {
  link: string;
  logo: string;
  name: string;
  actions: ReactNode;
  details: FdDetails;
}) {
  return (
    <div className="Card p-0 overflow-hidden">
      <div className="px-10 py-5 bg-lighter border-b flex items-center">
        <Link href={link}>
          <a className="flex-grow flex items-center text-2xl text-lightGray">
            <img
              src={logo}
              alt={name}
              className="mr-5 border h-12 w-12 object-contain p-1 rounded-lg bg-white"
            />
            {name}
          </a>
        </Link>

        <div>{actions}</div>
      </div>

      <div className="px-10 py-8 overflow-x-auto whitespace-nowrap">
        {fdDetailCards.map(({ name, label, icon: Icon }) => (
          <div
            className="w-40 inline-block mr-4 last:mr-0 border rounded-lg p-3"
            key={name}
          >
            <Icon className="w-5 h-5 block mb-3 text-brand" />
            <div className="text-lighterGray text-sm">{label}</div>
            <div className="text-darkGray text-sm">{details[name]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
