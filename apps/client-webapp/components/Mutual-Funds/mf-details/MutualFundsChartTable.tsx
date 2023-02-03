import { IMutualFundSchema } from '@corpcare/shared/api';
import {
  formatIfNumberIsNotValid,
  compactNumberTwoDecimalFormatter,
} from '@corpcare/web/ui';
import classnames from 'classnames';
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
    key: 'inception',
    label: 'From inception',
  },
];

export const MutualFundsChartTable = ({
  data,
}: {
  data?: IMutualFundSchema;
}) => {
  const table = [
    {
      parentKey: 'p2p_return',
      parentTitle: data?.plan_name,
    },
    {
      parentKey: 'category_average',
      parentTitle: 'Category Average',
    },
  ];

  return (
    <table className="border rounded-lg border-separate overflow-auto ">
      <thead>
        {table?.map((_table, idx) => (
          <tr key={idx} className="grid grid-cols-12">
            <th
              className={classnames(
                'bg-lighter text-black text-base font-normal col-span-12 lg:col-span-2 p-4 flex items-center justify-start lg:justify-center border-x-0 border-y-0 lg:border-r',
                table.length !== idx + 1 ? 'border-b' : 'lg:border-b-0 border-b'
              )}
            >
              {_table?.parentTitle}
            </th>
            <td
              className={classnames(
                'bg-white col-span-12 lg:col-span-10 grid text-sm text-black font-normal p-4 border-x-0 border-y-0 overflow-x-auto gap-10',
                table.length !== idx + 1 ? 'border-b' : ''
              )}
              style={{
                gridTemplateColumns: 'repeat(14, minmax(0, 1fr))',
              }}
            >
              {columns?.map((column, idx) => {
                return (
                  <tr className="flex flex-col col-span-2" key={idx}>
                    <td className="p-2 border-hidden">{column?.label}</td>
                    <td className="p-2 border-hidden text-brand">
                      {!data
                        ? 0
                        : formatIfNumberIsNotValid(
                            data[_table.parentKey][column.key]
                          ) !== undefined
                        ? formatIfNumberIsNotValid(
                            data[_table?.parentKey][column?.key]
                          )
                        : compactNumberTwoDecimalFormatter.format(
                            data[_table.parentKey][column.key] as any
                          )}
                      &nbsp;%
                    </td>
                  </tr>
                );
              })}
            </td>
          </tr>
        ))}
      </thead>
    </table>
  );
};
