import {
  Edit,
  Lock,
  MoreVertical,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import StatusBadge from "../StatusBadge";

export default function UserTable({
  users,
  total,
  selectedId,
  onSelect,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-2">
        <h3 className="text-[12px] font-semibold text-gray-800">
          Users List ({total})
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Header */}
          <thead className="sticky top-0 bg-gray-50">
            <tr className="text-left text-[9px] font-bold Capitalize tracking-wide text-black-500">
              <th className="w-8 px-3 py-0.5">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-gray-300"
                />
              </th>

              {[
                "Emp Code",
                "Employee Name",
                "Email",
                "Department",
                "Role",
                "Status",
                "Last Login",
              ].map((h) => (
                <th
                  key={h}
                  className="px-3 py-0.5"
                >
                  <span className="inline-flex items-center gap-1">
                    {h}
                    <ArrowUpDown className="h-3 w-3 opacity-40" />
                  </span>
                </th>
              ))}

              <th className="px-3 py-0.5">
                Action
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr
                key={u.id}
                onClick={() => onSelect(u)}
                className={`cursor-pointer transition-colors ${
                  selectedId === u.id
                    ? "bg-blue-50/60"
                    : "hover:bg-gray-50"
                }`}
              >
                <td
                  className="px-3 py-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-gray-300"
                  />
                </td>

                <td className="px-3 py-0 text-[10px] font-medium text-gray-700">
                  {u.code}
                </td>

                <td className="px-3 py-0 text-[10px] text-gray-800">
                  {u.name}
                </td>

                <td className="px-3 py-0 text-[10px] text-gray-600">
                  {u.email}
                </td>

                <td className="px-3 py-0 text-[10px] text-gray-600">
                  {u.department}
                </td>

                <td className="px-3 py-0 text-[10px] text-gray-600">
                  {u.role}
                </td>

                <td className="px-3 py-0">
                  <StatusBadge
                    label={u.status}
                    tone={u.status === "Active" ? "green" : "gray"}
                    className="px-2 py-0 text-[8px]"
                  />
                </td>

                <td className="whitespace-nowrap px-3 py-0 text-[10px] text-gray-600">
                  {u.lastLogin}
                </td>

                <td
                  className="px-3 py-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-0.5">
                    <button className="rounded p-1 hover:bg-gray-100 hover:text-blue-600">
                      <Edit className="h-3.5 w-3.5" />
                    </button>

                    <button className="rounded p-1 hover:bg-gray-100 hover:text-gray-700">
                      <Lock className="h-3.5 w-3.5" />
                    </button>

                    <button className="rounded p-1 hover:bg-gray-100 hover:text-gray-700">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 bg-gray-50/40 px-4 py-2">
        <p className="text-[9px] text-gray-500">
          Showing 1 to {users.length} of {total} users
        </p>

        <div className="flex items-center gap-1">
          <button className="rounded p-1 text-gray-500 hover:bg-gray-100">
            <ChevronsLeft className="h-3.5 w-3.5" />
          </button>

          <button className="rounded p-1 text-gray-500 hover:bg-gray-100">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`h-6 w-6 rounded text-[9px] font-medium ${
                n === 1
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {n}
            </button>
          ))}

          <button className="rounded p-1 text-gray-500 hover:bg-gray-100">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          <button className="rounded p-1 text-gray-500 hover:bg-gray-100">
            <ChevronsRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <select className="h-7 rounded-md border border-gray-200 bg-white px-2 text-[9px] text-gray-600">
          <option>10 / page</option>
          <option>25 / page</option>
          <option>50 / page</option>
        </select>
      </div>
    </div>
  );
}