import { IMutualFundSchema } from '@corpcare/shared/api';
import {
  compactNumberTwoDecimalFormatter,
  formatIfNumberIsNotValid,
} from '@corpcare/web/ui';
import classNames from 'classnames';

export function MutualFundFacts({ data }: { data?: IMutualFundSchema }) {
  const facts = [
    {
      title: 'Total Stock',
      value:
        formatIfNumberIsNotValid(data?.scheme_detail?.total_stocks) !==
        undefined
          ? formatIfNumberIsNotValid(data?.scheme_detail?.total_stocks)
          : compactNumberTwoDecimalFormatter.format(
              data?.scheme_detail?.total_stocks as any
            ),
    },
    {
      title: 'Up capture Ratio',
      value:
        formatIfNumberIsNotValid(data?.risk_ratio?.upside_capture_ratio) !==
        undefined
          ? formatIfNumberIsNotValid(data?.risk_ratio?.upside_capture_ratio)
          : compactNumberTwoDecimalFormatter.format(
              data?.risk_ratio?.upside_capture_ratio as any
            ),
    },
    {
      title: 'Total Sectors',
      value:
        formatIfNumberIsNotValid(data?.scheme_detail?.total_sectors) !==
        undefined
          ? formatIfNumberIsNotValid(data?.scheme_detail?.total_sectors)
          : compactNumberTwoDecimalFormatter.format(
              data?.scheme_detail?.total_sectors as any
            ),
    },
    {
      title: 'Down capture Ratio',
      value:
        formatIfNumberIsNotValid(data?.risk_ratio?.downside_capture_ratio) !==
        undefined
          ? formatIfNumberIsNotValid(data?.risk_ratio?.downside_capture_ratio)
          : compactNumberTwoDecimalFormatter.format(
              data?.risk_ratio?.downside_capture_ratio as any
            ),
    },
    {
      title: 'Expense Ratio',
      value:
        formatIfNumberIsNotValid(data?.scheme_detail?.expense_ratio) !==
        undefined
          ? formatIfNumberIsNotValid(data?.scheme_detail?.expense_ratio)
          : compactNumberTwoDecimalFormatter.format(
              data?.scheme_detail?.expense_ratio as any
            ),
    },
    {
      title: 'Sharpe Ratio',
      value:
        formatIfNumberIsNotValid(data?.risk_ratio?.sharpe_ratio) !== undefined
          ? formatIfNumberIsNotValid(data?.risk_ratio?.sharpe_ratio)
          : compactNumberTwoDecimalFormatter.format(
              data?.risk_ratio?.sharpe_ratio as any
            ),
    },
    {
      title: 'Information Ratio',
      value:
        formatIfNumberIsNotValid(data?.risk_ratio?.information_ratio) !==
        undefined
          ? formatIfNumberIsNotValid(data?.risk_ratio?.information_ratio)
          : compactNumberTwoDecimalFormatter.format(
              data?.risk_ratio?.information_ratio as any
            ),
    },
    {
      title: 'Treynor Ratio',
      value:
        formatIfNumberIsNotValid(data?.risk_ratio?.treynor_ratio) !== undefined
          ? formatIfNumberIsNotValid(data?.risk_ratio?.treynor_ratio)
          : compactNumberTwoDecimalFormatter.format(
              data?.risk_ratio?.treynor_ratio as any
            ),
    },
    {
      title: 'Standard Deviation',
      value:
        formatIfNumberIsNotValid(data?.risk_ratio?.standard_deviation) !==
        undefined
          ? formatIfNumberIsNotValid(data?.risk_ratio?.standard_deviation)
          : compactNumberTwoDecimalFormatter.format(
              data?.risk_ratio?.standard_deviation as any
            ),
    },
    {
      title: `Beta`,
      value:
        formatIfNumberIsNotValid(data?.risk_ratio?.beta) !== undefined
          ? formatIfNumberIsNotValid(data?.risk_ratio?.beta)
          : compactNumberTwoDecimalFormatter.format(
              data?.risk_ratio?.beta as any
            ),
    },
  ];
  return (
    <div className="Card p-0 overflow-hidden text-lightGray">
      <h3 className="bg-lighter border-b px-8 py-5 text-xl font-medium">
        Facts &amp; Ratios
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {facts?.map((fact, index) => {
          console.log(fact?.value);
          return (
            <div
              key={fact?.title}
              className={classNames(
                'grid grid-cols-5 px-8 py-5 bg-white last:border-b-0 border-b even:border-l',
                index + 1 === facts?.length - 1 ? '!border-b-0' : ''
              )}
            >
              <div className="col-span-4 lg:col-span-3">{fact?.title}</div>
              <div className="col-span-1 lg:col-span-2">{fact?.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
