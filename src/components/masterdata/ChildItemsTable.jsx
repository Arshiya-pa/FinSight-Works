import StatusBadge from "../StatusBadge";

export default function ChildItemsTable({
    title,
    items = [],
    total,
    columns = [],
    onViewAll,
    emptyMessage = "No records found",
}) {

    const count = total ?? items.length;

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-2 py-1">

                <h3 className="text-[11px] font-semibold text-gray-900">
                    {title} ({count})
                </h3>

                {onViewAll && (
                    <button
                        type="button"
                        onClick={onViewAll}
                        className="text-[9px] font-medium text-blue-600 hover:underline"
                    >
                        View All
                    </button>
                )}

            </div>

            {/* Table */}
            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>
                        <tr className="bg-gray-50">

                            {columns.map(col => (

                                <th
                                    key={col.key}
                                    className="px-2 py-0.5 text-left text-[10px] font-semibold text-gray-800"
                                >
                                    {col.label}
                                </th>

                            ))}

                            <th className="px-2 py-0.5 text-left text-[10px] font-semibold text-gray-800">
                                Status
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {items.length === 0 ? (

                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="py-6 text-center text-[10px] text-gray-500"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>

                        ) : (

                            items.map((item, index) => (

                                <tr
                                    key={item.id ?? index}
                                    className="hover:bg-gray-50"
                                >

                                    {columns.map(col => (

                                        <td
                                            key={col.key}
                                            className="px-2 py-0.5 text-[9px] leading-none text-gray-800"
                                        >
                                            {item[col.key]}
                                        </td>

                                    ))}

                                    <td className="px-2 py-0.5">

                                        <StatusBadge
                                            label={item.status}
                                            tone={
                                                item.status === "Inactive"
                                                    ? "red"
                                                    : "green"
                                            }
                                        />

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-white px-2 py-1">

                <p className="text-[8px] text-gray-500">
                    Showing {items.length} of {count}
                </p>

            </div>

        </div>
    );
}