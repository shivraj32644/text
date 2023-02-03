import { IMutualFundSchema } from '@corpcare/shared/api';
import {
  ArrowDownCircleBrandFillIcon,
  formatIfNumberIsNotValid,
  compactNumberTwoDecimalFormatter,
} from '@corpcare/web/ui';

export function MutualFundOverview({ data }: { data?: IMutualFundSchema }) {
  const metrics = [
    {
      title: 'Asset Class',
      value:
        data?.category === '1'
          ? 'Equity'
          : data?.category === '2'
          ? 'DEBT'
          : data?.category === '3'
          ? 'Cash/Liquid/Money/Market'
          : data?.category === '4'
          ? 'Hybrid'
          : '----',
    },
    {
      title: 'Category',
      value:
        data?.sub_category === '1'
          ? 'Equity'
          : data?.sub_category === '2'
          ? 'DEBT'
          : data?.sub_category === '3'
          ? 'Cash/Liquid/Money/Market'
          : data?.sub_category === '4'
          ? 'Hybrid'
          : '----',
    },
    {
      title: 'Fund Type',
      value:
        data?.scheme_type === 'OE'
          ? 'Open Ended'
          : data?.scheme_type === 'CE'
          ? 'Closed Ended'
          : data?.scheme_type === 'IN'
          ? 'Interval Schemes'
          : '----',
    },
    {
      title: 'Plan',
      value:
        data?.plan_type === 'DIR'
          ? 'Direct Plan'
          : data?.plan_type === 'REG'
          ? 'Regular Plan'
          : data?.plan_type === 'RET'
          ? 'Retail Plan'
          : data?.plan_type === 'INST'
          ? 'Institutional Plan'
          : data?.plan_type === 'SINST'
          ? 'Super Institutional Plan'
          : '----',
    },
    {
      title: 'Option',
      value:
        isNaN(data?.dividend_reinvestment_option as any) ||
        data?.dividend_reinvestment_option === null ||
        data?.dividend_reinvestment_option === ''
          ? '----'
          : data?.dividend_reinvestment_option,
    },
    // { title: 'Minimum SIP', value: '2000' },
    // { title: 'Minimum Lumpsum', value: '50000' },
    { title: 'Benchmark name', value: data?.benchmark_index?.name || '----' },
    { title: 'Fund Manager', value: data?.fund_manager?.name || '----' },
    {
      title: 'Manager (Since)',
      value: data?.fund_manager?.from_date || '----',
    },
    {
      title: 'NAV',
      value:
        data?.plan_dividend_option === 'GR'
          ? 'Growth'
          : data?.plan_dividend_option === 'DIV'
          ? 'Dividend'
          : data?.plan_dividend_option === 'BO'
          ? 'Bonus'
          : data?.plan_dividend_option === 'DVID'
          ? 'Daily Dividend'
          : data?.plan_dividend_option === 'WDIV'
          ? 'Monthly Dividend'
          : data?.plan_dividend_option === 'FDIV'
          ? 'Fortnightly Dividend'
          : data?.plan_dividend_option === 'QDIV'
          ? 'Quarterly Dividend'
          : data?.plan_dividend_option === 'HDIV'
          ? 'Half Yearly Dividend'
          : data?.plan_dividend_option === 'ADIV'
          ? 'Annual Dividend'
          : '----',
    },
    { title: `NAV as on ${data?.nav?.date}`, value: data?.nav?.nav || '----' },
    { title: 'Inception Date', value: data?.nfo_start_date || '----' },
    { title: 'AUM(Crs)', value: data?.scheme_detail?.corpus || '----' },
    { title: 'AUM as on', value: data?.scheme_detail?.corpus_date || '----' },
    { title: 'Exit Load', value: data?.exit_load || '----' },
  ];
  return (
    <div className="Card p-0 rounded-lg overflow-hidden text-lightGray">
      <h3 className="text-xl font-medium px-8 py-5 border-b bg-lighter">
        About {data?.plan_name}
      </h3>

      <div className="px-5 lg:px-8 py-4 lg:py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 my-8">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="border rounded bg-lighter p-3 lg:p-4"
            >
              <h5 className="text-xs lg:text-sm text-lightGray">
                {metric.title}
              </h5>
              <p className="truncate text-sm lg:text-base text-black">
                {metric?.value as any}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg lg:text-xl font-medium">
            Expense Ratio, Exit load &amp; Tax
          </h3>

          <ul>
            <li className="flex items-center gap-2 my-3 text-sm lg:text-base">
              <ArrowDownCircleBrandFillIcon className="text-brand" />
              Expense ratio :&nbsp;
              {formatIfNumberIsNotValid(data?.scheme_detail?.expense_ratio) !==
              undefined
                ? formatIfNumberIsNotValid(data?.scheme_detail?.expense_ratio)
                : compactNumberTwoDecimalFormatter.format(
                    data?.scheme_detail?.expense_ratio as any
                  )}
              % (Inclusive of GST)
            </li>
            <li className="flex items-center gap-2 my-3 text-sm lg:text-base">
              <ArrowDownCircleBrandFillIcon className="text-brand" />
              Exit Load of&nbsp;
              {formatIfNumberIsNotValid(data?.exit_load) !== undefined
                ? formatIfNumberIsNotValid(data?.exit_load)
                : compactNumberTwoDecimalFormatter.format(
                    data?.exit_load as any
                  )}
              % if redeemed within 1 year.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
