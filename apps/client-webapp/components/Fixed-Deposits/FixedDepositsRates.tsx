import { PdfIcon } from '@corpcare/web/ui';

const tableColumns = [
  { name: 'name' as const, label: 'Fixed Deposits' },
  { name: 'rating' as const, label: 'Rating' },
  { name: '1Yr' as const, label: '1 Yr' },
  { name: '2Yrs' as const, label: '2 Yrs' },
  { name: '3Yrs' as const, label: '3 Yrs' },
  { name: '4Yrs' as const, label: '4 Yrs' },
  { name: '5Yrs' as const, label: '5 Yrs' },
  { name: 'seniorCitizen' as const, label: 'Sr.Citizen' },
];

export function FixedDepositsRates() {
  // const { data } = useGetFixedDepositsRates();
  const data = [
    'Mahindra Finance',
    'Bajaj Finance Limited',
    'ICICI Home Finance',
    'Shriram City Union Finance',
    'HDFC Limited',
    'PNB Housing Finance Ltd',
  ].map((name, i) => ({
    id: 'fd-' + i,
    name,
    rating: 'AA/MAA',
    '1Yr': '6.50%',
    '2Yrs': '6.80%',
    '3Yrs': '7.30%',
    '4Yrs': '7.50%',
    '5Yrs': '7.75%',
    seniorCitizen: '0.30%',
    downloadLink: '/fixed-deposits/fdId/download/pdf',
  }));

  return (
    <>
      <h3 className="flex-grow font-medium text-2xl text-lightGray mb-4">
        Corporate Fixed Deposit Interest Rates
      </h3>

      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="border-hidden">
          <thead>
            <tr className="text-white bg-brand">
              {tableColumns.map((col) => (
                <th className="py-4 font-normal border-x-0" key={col.name}>
                  {col.label}
                </th>
              ))}
              <th className="border-x-0"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-lighterGray">
                {tableColumns.map((col) => (
                  <td className="border-x-0 py-3" key={col.name}>
                    {item[col.name]}
                  </td>
                ))}

                <td className="border-x-0 py-3">
                  <a
                    className="OutlineButton inline-block p-2"
                    href={item.downloadLink}
                  >
                    <PdfIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
