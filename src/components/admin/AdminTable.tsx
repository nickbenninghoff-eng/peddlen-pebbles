'use client';

type Column<T> = {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  keyField?: string;
};

export default function AdminTable<T extends Record<string, any>>({ columns, data, keyField = 'id' }: Props<T>) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e8dcc8] overflow-hidden overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-[#2c1810] text-[#faf6ef]">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-sm whitespace-nowrap" style={{ fontFamily: 'Cinzel, serif' }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e8dcc8]">
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-[#5a3825]">No items found</td></tr>
          ) : data.map((item) => (
            <tr key={item[keyField]} className="hover:bg-[#faf6ef]">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
