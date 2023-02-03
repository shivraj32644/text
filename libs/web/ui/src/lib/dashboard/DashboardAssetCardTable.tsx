export function DashboardAssetCardTable({
  columns,
  data,
}: {
  columns: { name: string; key: string }[];
  data: { id: string; [key: string]: string }[];
}) {
  return (
    <section className="overflow-auto max-h-96">
      <table className="w-full h-full border-hidden">
        <thead>
          <tr>
            {columns.map(({ key, name }) => (
              <th
                className="border-x-0 font-normal text-sm text-lightGray border-[1px] bg-lighter px-4 py-3"
                key={key}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td
                  className="border-x-0 text-lightGray text-xs p-4"
                  key={column.key}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
