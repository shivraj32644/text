import classNames from 'classnames';
import { TriangleDownIcon, TriangleUpIcon } from '../../icons/index';
import { compactInrFormatter } from '../utils/currency';
export const MarketAction = ({
  marketAction,
}: {
  [key: string]: {
    change_in_percentage?: string | undefined;
    change_in_points?: string | undefined;
    index_name?: string | undefined;
    last_traded_price?: string | undefined;
  };
}) => {
  const columns = [
    { key: 'index_name', name: 'Index' },
    { key: 'last_traded_price', name: 'Price' },
    { key: 'change_in_points', name: 'Change' },
    { key: 'change_in_percentage', name: '%Chg' },
  ];

  return (
    <>
      <div className="bg-white overflow-x-auto min-w-max">
        <table className="border-hidden mt-4">
          <thead>
            <tr>
              {columns?.map((column) => (
                <th
                  className="border-x-0 font-normal border-y-0 py-2 px-4 text-sm text-lightGray"
                  key={column.key}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {Object.entries(marketAction || {})?.map((object, idx) => (
              <tr key={idx}>
                {columns?.map((column) => {
                  if (object[1] === null || typeof object[1] === 'string')
                    return;
                  if (
                    column.key === 'change_in_points' ||
                    column.key === 'change_in_percentage'
                  ) {
                    return (
                      <td
                        className={classNames(
                          'border-x-0 border-y-0 px-4 py-2'
                        )}
                        key={column.key}
                      >
                        <div className="text-black font-normal text-sm grid grid-cols-2 gap-1">
                          {object[1][column.key]}
                          {(object[1][column.key] as any)?.split('+')?.length >
                            1 && (
                            <TriangleUpIcon className="w-4 h-4 flex-shrink-0 text-green-500" />
                          )}
                          {(object[1][column.key] as any)?.split('-')?.length >
                            1 && (
                            <TriangleDownIcon className="w-4 h-4 flex-shrink-0 text-red-500" />
                          )}
                        </div>
                      </td>
                    );
                  } else {
                    return (
                      <td
                        className="border-x-0 border-y-0 px-4 text-black font-normal text-sm py-2"
                        key={column.key}
                      >
                        {column.key === 'last_traded_price'
                          ? compactInrFormatter.format(
                              Number(
                                (object[1][column.key] as string).replace(
                                  ',',
                                  ''
                                )
                              )
                            )
                          : object[1][column.key]}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
