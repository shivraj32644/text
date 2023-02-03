export function MutualFundHoldings({
  holdings,
  topStocks,
  topSectors,
  equitySectorAllocation,
}: {
  holdings: {
    name: string;
    sectors: string;
    marketCap: string;
    instrument: string;
  }[];
  topStocks: { name: string; value: string }[];
  topSectors: { name: string; value: string }[];
  equitySectorAllocation: { name: string; value: string }[];
}) {
  return (
    <div className="text-lightGray">
      <div className="Card p-0 overflow-hidden mt-6">
        <h3 className="bg-lighter border-b px-5 py-4 lg:px-8 lg:py-5 text-xl font-medium">
          Holdings
        </h3>

        <table className="border-hidden hidden lg:table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sectors</th>
              <th>Market Cap (%)</th>
              <th>Instrument</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((holding) => (
              <tr key={holding.name}>
                <td>{holding.name}</td>
                <td>{holding.sectors}</td>
                <td>{holding.marketCap}</td>
                <td>{holding.instrument}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="border-hidden lg:hidden">
          <thead>
            <tr>
              <th className="lg:px-8 lg:py-5 py-4 px-5">Name</th>
              <th className="lg:px-8 lg:py-5 py-4 px-5">Sectors</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((holding) => (
              <tr key={holding.name}>
                <td className="lg:px-8 lg:py-5 py-4 px-5">{holding.name}</td>
                <td className="lg:px-8 lg:py-5 py-4 px-5">{holding.sectors}</td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr>
              <th className="lg:px-8 lg:py-5 py-4 px-5">Market Cap (%)</th>
              <th className="lg:px-8 lg:py-5 py-4 px-5">Instrument</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((holding) => (
              <tr key={holding.name}>
                <td className="lg:px-8 lg:py-5 py-4 px-5">
                  {holding.marketCap}
                </td>
                <td className="lg:px-8 lg:py-5 py-4 px-5">
                  {holding.instrument}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="Card p-0 overflow-hidden text-lightGray mt-6 grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:border-r flex flex-col">
          <h3 className="bg-lighter border-b px-5 py-4 lg:px-8 lg:py-5 text-xl font-medium flex-shrink">
            Top Stocks
          </h3>

          <div className="grid grid-rows-5 gap-px bg-brandLight flex-grow">
            {topStocks.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-6 lg:px-8 lg:py-5 py-4 px-5 bg-white"
              >
                <div className="col-span-4">{item.name} </div>
                <div className="col-span-2 text-darkGray">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t lg:border-t-0 flex flex-col">
          <h3 className="bg-lighter border-b lg:px-8 lg:py-5 py-4 px-5 text-xl font-medium flex-shrink">
            Top Sectors
          </h3>

          <div className="grid grid-rows-5 gap-px bg-brandLight flex-grow">
            {topSectors.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-6 lg:px-8 lg:py-5 py-4 px-5 bg-white"
              >
                <div className="col-span-4">{item.name}</div>
                <div className="col-span-2 text-darkGray">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Card p-0 overflow-hidden text-lightGray mt-6">
        <h3 className="bg-lighter border-b lg:px-8 lg:py-5 py-4 px-5 text-xl font-medium">
          Equity Sector Allocation
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-brandLight">
          {equitySectorAllocation.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-6 lg:px-8 lg:py-5 py-4 px-5 bg-white"
            >
              <div className="col-span-4">{item.name}</div>
              <div className="col-span-2 text-darkGray">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
