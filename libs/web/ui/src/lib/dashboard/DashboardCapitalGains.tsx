import classnames from 'classnames';

export const DashboardCapitalGains = ({ capitalGains }) => {
  return (
    <>
      <section className="px-5">
        <h4 className="font-medium">Capital Gain</h4>
        <section className="flex justify-between items-center mt-2">
          {capitalGains.realised.schemeList?.map((_scheme, idx) => (
            <div key={idx} className="font-normal text-sm ">
              <p className="text-lightGray">{_scheme.name}</p>
              <p className="text-black mt-1">Rs. {_scheme.value}</p>
            </div>
          ))}
        </section>
      </section>
      <section className="overflow-auto">
        <table className="mt-4 w-full h-full">
          <thead>
            <tr>
              {[
                { name: 'No.', label: 'id' },
                { name: 'Product', label: 'name' },
                { name: 'Long Term', label: 'stVal' },
                { name: 'Short Term', label: 'ltValue' },
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

          <tbody className="bg-white ">
            {capitalGains.realised.prodList?.map((row, idx) => (
              <tr key={idx}>
                {[
                  { name: 'No.', label: 'id' },
                  { name: 'Product', label: 'name' },
                  { name: 'Long Term', label: 'stVal' },
                  { name: 'Short Term', label: 'ltValue' },
                ].map((column, id) => (
                  <td
                    className={classnames(
                      'border-x-0  text-black font-normal text-sm px-5',
                      row.id === 4 ? 'border-b-0' : ''
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
