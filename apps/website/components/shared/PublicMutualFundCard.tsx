import { formatIfNumberIsNotValid } from '@corpcare/web/ui';

interface MutualFundCardProps {
  logo?: string;
  heading?: string;
  category?: '1' | '2' | '3' | '4';
  subCategory?: '1' | '2' | '3' | '4';
  data?: {
    month_1?: string | null | number;
    month_3?: string | null | number;
    month_6?: string | null | number;
    year_1?: string | null | number;
    year_3?: string | null | number;
    year_5?: string | null | number;
    year_10?: string | null | number;
  } | null;
  onAddToCart?: () => void;
  alternativeText?: string;
}
const compactNumberFormatter = new Intl.NumberFormat('en-IN', {
  style: 'decimal',
  notation: 'compact',
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 3,
});
export function PublicMutualFundCard({
  logo,
  heading,
  category,
  subCategory,
  data,
  onAddToCart,
  alternativeText,
}: MutualFundCardProps) {
  return (
    <div className="Card bg-lighter p-0 overflow-hidden">
      <div className="p-5 lg:p-6 pt-8 lg:pt-7 relative flex">
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
            {category === '1'
              ? 'Equity'
              : category === '2'
              ? 'DEBT'
              : category === '3'
              ? 'Cash/Liquid/Money/Market'
              : category === '4'
              ? 'Hybrid'
              : ''}
          </small>
        </div>
      </div>

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
        >
          Invest Now
        </button>
      </div>
    </div>
  );
}
