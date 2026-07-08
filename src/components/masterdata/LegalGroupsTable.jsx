import {
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { legalGroups } from "../../data/masterData";

export default function LegalGroupsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalRows = legalGroups.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentRows = legalGroups.slice(startIndex, endIndex);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          {/* Header */}
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              {[
                "Code",
                "Legal Group Name",
                "Description",
                "Status",
                "No. of Legal Entities",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-2 py-1.5 text-left text-[9px] font-bold capitalize tracking-wide text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>


          {/* Body */}
          <tbody>
            {currentRows.map((group) => (
              <tr
                key={group.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >

                <td className="px-2 py-1 text-[10px] font-medium leading-tight text-gray-800">
                  {group.code}
                </td>

                <td className="px-2 py-1 text-[10px] font-medium leading-tight text-gray-800">
                  {group.name}
                </td>

                <td className="px-2 py-1 text-[10px] leading-tight text-gray-500">
                  {group.description}
                </td>

                <td className="px-2 py-1 text-center">
                  <span
                    className={`inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-medium leading-tight ${
                      group.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {group.status}
                  </span>
                </td>

                <td className="px-2 py-1 text-center text-[10px] font-medium text-gray-700">
                  {group.legalEntities}
                </td>

                <td className="px-2 py-1">
                  <div className="flex justify-center gap-1">

                    <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100">
                      <Pencil size={11} className="text-gray-500" />
                    </button>

                    <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100">
                      <MoreVertical size={11} className="text-gray-500" />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>


      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 px-2 py-1.5">

        <div className="flex items-center gap-1 text-[10px] text-gray-600">
          <span>Rows</span>

          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="h-6 rounded border border-gray-300 px-1 text-[10px]"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>


        <div className="text-[10px] text-gray-600">
          {startIndex + 1}-{Math.min(endIndex, totalRows)} of {totalRows}
        </div>


        <div className="flex items-center gap-1">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="flex h-6 w-6 items-center justify-center rounded border hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronLeft size={11} />
          </button>

          <span className="text-[10px] font-medium">
            {currentPage}/{totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex h-6 w-6 items-center justify-center rounded border hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronRight size={11} />
          </button>

        </div>

      </div>

    </div>
  );
}