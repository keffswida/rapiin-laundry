/** Tabel sederhana: wrap scroll + header + children sebagai baris. */
export default function TableSimple({ columns, children, minWidth = 'min-w-[640px]' }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse text-sm ${minWidth}`}>
        <thead>
          <tr className="border-b border-ink-100 text-left text-xs font-medium text-ink-400">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`px-3 py-2 ${col.align === 'right' ? 'text-right' : ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
