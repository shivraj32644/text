import classnames from 'classnames';

export const DashboardTopSectors = ({ topSectors }) => {
  return (
    <>
      <section className="px-5">
        <h4 className="font-medium">Top Sectors</h4>
        <section className="flex justify-between items-center mt-2">
          <div className="font-normal text-sm ">
            <p className="text-lightGray">Current Value</p>
            <p className="text-black mt-1">
              Rs. {Math.round(topSectors.currentValue)}
            </p>
          </div>
          <div className="font-normal text-sm ">
            <p className="text-lightGray">Exposure</p>
            <p className="text-black mt-1">
              Rs. {Math.round(topSectors.exposure)}
            </p>
          </div>
        </section>
      </section>
      <section className="overflow-auto">
        <table className="mt-4 w-full">
          <thead>
            <tr>
              {[
                { name: 'No.', label: 'id' },
                { name: 'Sector', label: 'sectName' },
                { name: 'Current Value', label: 'currentValue' },
                { name: 'Exposure', label: 'exposure' },
              ].map((_, idx) => (
                <th
                  className="border-x-0 font-normal text-sm text-lightGray border-[1px] border-brandLight bg-lighter px-5"
                  key={idx}
                >
                  {_.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {topSectors.companySectorlist.slice(0, 5).map((row, idx) => (
              <tr key={idx}>
                {[
                  { name: 'No.', label: 'id' },
                  { name: 'Sector', label: 'sectName' },
                  { name: 'Current Value', label: 'currentValue' },
                  { name: 'Exposure', label: 'exposure' },
                ].map((column, id) => (
                  <td
                    className={classnames(
                      'border-x-0  text-black font-normal text-sm px-5',
                      row.id + 1 === 4 ? 'border-b-0' : ''
                    )}
                    key={id}
                  >
                    {isNaN(row[column.label])
                      ? row[column.label]
                      : Math.round(row[column.label])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
