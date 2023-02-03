export const StocksTable = ({ marketAction }) => {
  return (
    <table className="border-hidden mt-4">
      <thead>
        <tr>
          {marketAction.tableData.column.map((column) => (
            <th
              className="border-x-0 font-normal border-y-0 p-1 text-sm text-lightGray"
              key={column.key}
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-white">
        {marketAction.tableData.data.map((row, idx) => (
          <tr key={idx}>
            {marketAction.tableData.column.map((column) => (
              <td
                className="border-x-0 border-y-0 px-1 text-black font-normal text-sm py-2"
                key={column.key}
              >
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
