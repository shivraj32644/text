import Link from 'next/link';
import {
  BalanceIcon,
  formatIfNumberIsNotValid,
  WatchListIcon,
} from '@corpcare/web/ui';
import { IMutualFundSchema } from '@corpcare/shared/api';

interface MutualFundCardProps {
  logo?: string;
  heading?: string;
  subHeading?: '1' | '2' | '3' | '4';
  is_recommended_allowed?: boolean;
  data?: {
    month_1?: number | null | string;
    month_3?: number | null | string;
    month_6?: number | null | string;
    year_1?: number | null | string;
    year_3?: number | null | string;
    year_5?: number | null | string;
    year_7?: number | null | string;
    year_10?: number | null | string;
    inception?: number | null | string;
  } | null;
  link: string;
  onAddToCart?: () => void;
  onAddToWatchlist?: () => void;
  onAddToCompare?: () => void;
  alternativeText?: string;
  metaData: IMutualFundSchema;
}
const compactNumberFormatter = new Intl.NumberFormat('en-IN', {
  style: 'decimal',
  notation: 'compact',
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 3,
});

export function MutualFundCard({
  logo,
  heading,
  subHeading,
  is_recommended_allowed,
  data,
  link,
  onAddToCart,
  onAddToWatchlist,
  onAddToCompare,
  alternativeText,
  metaData,
}: MutualFundCardProps) {
  const TransactionTypeOptions = () => {
    const reference = [
      metaData?.is_purchase_allowed
        ? { value: 'PURCHASE', label: 'Purchase' }
        : undefined,
      // data?.is_sip_allowed ? { value: 'SIP', label: 'SIP' } : undefined,
    ];
    return reference.filter((item) => item !== undefined);
  };
  return (
    <div className="Card bg-lighter p-0 overflow-hidden">
      <Link href={link}>
        <a className="p-5 lg:p-6 pt-8 lg:pt-7 relative flex">
          <div className="w-auto max-h-12 p-2 rounded-lg bg-white mr-4 border">
            <img
              className="w-8 h-8 object-scale-down truncate"
              src={logo}
              alt={alternativeText}
            />
          </div>

          <div>
            <h3 className="text-sm font-normal">{heading}</h3>
            <small className="text-lightGray">
              {subHeading === '1'
                ? 'Equity'
                : subHeading === '2'
                ? 'DEBT'
                : subHeading === '3'
                ? 'Cash/Liquid/Money/Market'
                : subHeading === '4'
                ? 'Hybrid'
                : ''}
            </small>
          </div>

          {is_recommended_allowed && (
            <span className="bg-brand text-sm text-white rounded-bl-lg absolute right-0 top-0 py-1 px-3">
              Recommended
            </span>
          )}
        </a>
      </Link>

      <div className="flex border-y  bg-brandLight">
        <div className="flex-1 text-center p-2 lg:p-4 bg-white last:border-r-0 border-r ">
          <div className="text-base text-lightGray font-normal tracking-[0.02em] leading-6">
            {formatIfNumberIsNotValid(data?.year_1) !== undefined
              ? formatIfNumberIsNotValid(data?.year_1)
              : compactNumberFormatter.format(data?.year_1 as number)}
            %
          </div>
          <p className="text-sm font-normal tracking-[0.02em] text-lighterGray">
            1Y
          </p>
        </div>
        <div className="flex-1 text-center p-2 lg:p-4 bg-white last:border-r-0 border-r">
          <div className="text-base text-lightGray font-normal tracking-[0.02em] leading-6">
            {formatIfNumberIsNotValid(data?.year_3) !== undefined
              ? formatIfNumberIsNotValid(data?.year_3)
              : compactNumberFormatter.format(data?.year_3 as number)}
            %
          </div>
          <p className="text-sm font-normal tracking-[0.02em] text-lighterGray ">
            3Y
          </p>
        </div>
        <div className="flex-1 text-center p-2 lg:p-4 bg-white last:border-r-0 border-r">
          <div className="text-base text-lightGray font-normal tracking-[0.02em] leading-6">
            {formatIfNumberIsNotValid(data?.year_5) !== undefined
              ? formatIfNumberIsNotValid(data?.year_5)
              : compactNumberFormatter.format(data?.year_5 as number)}
            %
          </div>
          <p className="text-sm font-normal text-lighterGray tracking-[0.02em] ">
            5Y
          </p>
        </div>
      </div>

      <div className="p-5 lg:p-6 flex gap-5">
        <button
          className="Button uppercase text-center flex-grow text-sm"
          onClick={onAddToCart}
          disabled={
            TransactionTypeOptions() && TransactionTypeOptions()?.length === 0
          }
        >
          Add to cart
        </button>

        <button
          title="Add to watchlist"
          className="OutlineButton p-2 opacity-25 pointer-events-none"
          onClick={onAddToWatchlist}
        >
          <WatchListIcon />
        </button>

        <button
          title="Add to compare"
          className="OutlineButton p-2 opacity-25 pointer-events-none"
          onClick={onAddToCompare}
        >
          <BalanceIcon />
        </button>
      </div>
    </div>
  );
}
