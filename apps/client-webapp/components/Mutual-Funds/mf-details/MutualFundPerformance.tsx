import { IMutualFundSchema } from '@corpcare/shared/api';
import {
  formatIfNumberIsNotValid,
  compactNumberTwoDecimalFormatter,
} from '@corpcare/web/ui';
const columns = [
  {
    key: 'month_1',
    label: '1M',
  },
  {
    key: 'month_3',
    label: '3M',
  },
  {
    key: 'month_6',
    label: '6M',
  },
  {
    key: 'year_1',
    label: '1Y',
  },
  {
    key: 'year_3',
    label: '3Y',
  },
  {
    key: 'year_5',
    label: '5Y',
  },
  {
    key: 'year_10',
    label: '10Y',
  },
];
const table = [
  {
    parentKey: 'p2p_return',
    parentTitle: 'Fund Returns',
  },
  {
    parentKey: 'category_average',
    parentTitle: 'Category Average',
  },
];

export function MutualFundPerformance({ data }: { data?: IMutualFundSchema }) {
  return (
    <div className="text-lightGray">
      <div className="Card p-0 overflow-hidden mt-6">
        <h3 className="bg-lighter border-b px-5 py-4 lg:px-8 lg:py-5 text-lg lg:text-xl font-medium">
          Category: Equity Sectoral - Annualised Returns
        </h3>

        <section className="overflow-x-auto block">
          <table className="border-hidden">
            <thead>
              <tr>
                <th className="border-x-0 pr-2"> </th>
                {columns?.map((item) => (
                  <th
                    className="border-x-0 px-2 text-sm lg:text-base"
                    key={item?.key}
                  >
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {table?.map((item, index) => (
                <tr key={index}>
                  <td className="pr-2 border-x-0 text-sm lg:text-base">
                    {item?.parentTitle}
                  </td>
                  {columns?.map((duration, idx) => {
                    return (
                      <td
                        className="px-2 border-x-0 text-sm lg:text-base"
                        key={idx}
                      >
                        {!data
                          ? 0
                          : formatIfNumberIsNotValid(
                              data[item?.parentKey][duration?.key]
                            ) !== undefined
                          ? formatIfNumberIsNotValid(
                              data[item?.parentKey][duration?.key]
                            )
                          : compactNumberTwoDecimalFormatter.format(
                              data[item?.parentKey][duration?.key] as any
                            )}
                        &nbsp;%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
