
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Info } from "lucide-react";

import {
  Edit,
  MoreVertical,
  ArrowUpDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import StatusBadge from "../StatusBadge";

export default function UserTable({
  users,
  total,
  selectedId,
  onSelect,
  onEdit, onToggleStatus,

  currentPage,
  totalPages,
  pageSize,

  onPageChange,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  onPageSizeChange,
}) {
  const tableRef = useRef(null);
  const menuRef = useRef(null);

  const [openMenu, setOpenMenu] = useState(null);

  /* Close menu when clicking outside */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* Pagination */

  const startItem =
    total === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    total
  );

  /* Table Height */

  const tableContainerClass = pageSize === 10 ?
    "max-h-[420px] overflow-auto"
    : pageSize === 25 ? "max-h-[650px] overflow-auto"
      : "max-h-[900px] overflow-auto";
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
          border-b
          border-gray-200
          px-4
          py-2.5
        "
      >
        <h3
          className="
            text-[12px]
            font-semibold
            text-gray-800
          "
        >
          Users List ({total})
        </h3>
      </div>

      {/* Table */}

      <div
        ref={tableRef}
        className={`${tableContainerClass} overflow-hidden`}
      >
        <table className="min-w-full">

          {/* Header */}

          <thead
            className="
              sticky
              top-0
              z-10
              bg-gray-50
            "
          >
            <tr
              className="
                text-left
                text-[10px]
                font-bold
                tracking-wide
                text-black
              "
            >
              <th className="w-8 px-3 py-1">
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
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 py-1"
                >
                  <span className="inline-flex items-center gap-1">
                    {header}

                    <ArrowUpDown
                      className="
                        h-3
                        w-3
                        opacity-40
                      "
                    />
                  </span>
                </th>
              ))}

              <th className="px-3 py-1">
                Action
              </th>
            </tr>
          </thead>

          {/* Body */}

          <tbody
            className="
              divide-y
              divide-gray-100
            "
          >
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="
                    py-10
                    text-center
                    text-sm
                    text-gray-500
                  "
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => onSelect(user)}
                  className={`cursor-pointer transition-colors ${selectedId === user.id
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                    }`}
                >
                  {/* Checkbox */}

                  <td className="px-3 py-1">
                    <input
                      type="checkbox"
                      className="h-3 w-3 rounded border-gray-300"
                    />
                  </td>

                  {/* Employee Code */}

                  <td
                    className="
                      px-3
                      py-1
                      text-[10px]
                      font-medium
                      text-gray-800
                    "
                  >
                    {user.code}
                  </td>

                  {/* Name */}

                  <td
                    className="
                      px-3
                      py-1
                      text-[10px]
                      text-gray-800
                    "
                  >
                    {user.name}
                  </td>

                  {/* Email */}

                  <td
                    className="
                      px-3
                      py-1
                      text-[10px]
                      text-gray-800
                    "
                  >
                    {user.email}
                  </td>

                  {/* Department */}

                  <td
                    className="
                      px-3
                      py-1
                      text-[10px]
                      text-gray-800
                    "
                  >
                    {user.department}
                  </td>

                  {/* Role */}

                  <td
                    className="
                      px-3
                      py-1
                      text-[10px]
                      text-gray-800
                    "
                  >
                    {user.role}
                  </td>

                  {/* Status */}

                  <td className="px-3 py-1">
                    <StatusBadge
                      label={user.status}
                      tone={
                        user.status === "Active"
                          ? "green"
                          : "gray"
                      }
                      className="
                        px-2
                        py-0
                        text-[8px]
                      "
                    />
                  </td>

                  {/* Last Login */}

                  <td
                    className="
                      whitespace-nowrap
                      px-3
                      py-1
                      text-[10px]
                      text-gray-800
                    "
                  >
                    {user.lastLogin}
                  </td>

                  {/* ACTION COLUMN WILL BE IN PART 2 */}
                  {/* Action */}

                  <td
                    className="px-3 py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="relative flex items-center gap-1"
                      ref={
                        openMenu === user.id
                          ? menuRef
                          : null
                      }
                    >
                      {/* Edit */}

                      <button
                        onClick={() => onEdit(user)}
                        className="
                          rounded
                          p-0.5
                          hover:bg-gray-100
                          hover:text-blue-700
                        "
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>

                      {/* More */}

                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === user.id
                              ? null
                              : user.id
                          )
                        }
                        className="
                          rounded
                          p-0.5
                          hover:bg-gray-100
                        "
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>

                      {/* Dropdown */}

                      {openMenu === user.id && (
                        <div
                          className="
                            absolute
                            right-0
                            top-6
                            z-50
                            w-44
                            overflow-hidden
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            shadow-lg
                          "
                        >
                          {/* View Details */}

                          <button
                            onClick={() => {
                              onSelect(user);
                              setOpenMenu(null);
                            }}
                            className="
                              block
                              w-full
                              px-3
                              py-2
                              text-left
                              text-xs
                              hover:bg-gray-50
                            "
                          >
                            View Details
                          </button>

                          {/* Reset Password */}

                          <button
                            onClick={() => {
                              toast.custom(() => (
                                <div
                                  className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-lg
                                    border
                                    border-blue-200
                                    bg-blue-50
                                    px-4
                                    py-3
                                    shadow-lg
                                  "
                                >
                                  <Info className="h-5 w-5 text-blue-600" />

                                  <span
                                    className="
                                      text-sm
                                      font-medium
                                      text-blue-900
                                    "
                                  >
                                    Reset password will be available shortly.
                                  </span>
                                </div>
                              ));

                              setOpenMenu(null);
                            }}
                            className="
                              block
                              w-full
                              px-3
                              py-2
                              text-left
                              text-xs
                              hover:bg-gray-50
                            "
                          >
                            Reset Password
                          </button>

                          {/* Activate / Deactivate */}
                          <button
                            onClick={() => {

                              toast((t) => (

                                <div className="w-72">

                                  <p className="text-sm font-medium text-gray-800">

                                  {user.status === "Active"
                                      ? "Do you want to deactivate this user?"
                                      : "Do you want to activate this user?"}

                                  </p>

                                  <div className="mt-4 flex justify-end gap-2">

                                    <button
                                      onClick={() => toast.dismiss(t.id)}
                                      className="rounded border px-3 py-1 text-xs"
                                    >
                                      Cancel
                                    </button>

                                    <button
                                      onClick={async () => {

                                        await onToggleStatus(user);

                                        toast.dismiss(t.id);

                                        setOpenMenu(null);

                                      }}
                                      className="rounded bg-blue-600 px-3 py-1 text-xs text-white"
                                    >
                                      Yes
                                    </button>

                                  </div>

                                </div>

                              ));

                            }}
                            className="
                             block
                             w-full
                             px-3
                             py-2
                             text-left
                             text-xs
                             hover:bg-gray-50"
                          >
                            {user.active
                              ? "Deactivate"
                              : "Activate"}
                          </button>

                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-2
          border-t
          border-gray-200
          bg-gray-50/40
          px-4
          py-2
        "
      >
        {/* Record Info */}

        <p className="text-[9px] text-gray-700">
          Showing {startItem} to {endItem} of {total} users
        </p>

        {/* Pagination Buttons */}

        <div className="flex items-center gap-1">

          {/* First */}

          <button
            onClick={onFirst}
            disabled={currentPage === 1}
            className="
              rounded
              p-1
              text-gray-500
              transition
              hover:bg-gray-100
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <ChevronsLeft className="h-3.5 w-3.5" />
          </button>

          {/* Previous */}

          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="
              rounded
              p-1
              text-gray-500
              transition
              hover:bg-gray-100
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          {/* Page Numbers */}

          {Array.from(
            { length: totalPages },
            (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => {
                    tableRef.current?.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });

                    onPageChange(page);
                  }}
                  className={`
                    h-6
                    w-6
                    rounded
                    text-[9px]
                    font-medium
                    transition
                    ${currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  {page}
                </button>
              );
            }
          )}

          {/* Next */}

          <button
            onClick={onNext}
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            className="
              rounded
              p-1
              text-gray-500
              transition
              hover:bg-gray-100
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          {/* Last */}

          <button
            onClick={onLast}
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            className="
              rounded
              p-1
              text-gray-500
              transition
              hover:bg-gray-100
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <ChevronsRight className="h-3.5 w-3.5" />
          </button>

        </div>

        {/* Page Size */}

        {/* Uncomment if needed

        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => {
              tableRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
              });

              onPageSizeChange(e);
            }}
            className="
              h-7
              rounded-md
              border
              border-gray-200
              bg-white
              px-2
              text-[9px]
              text-gray-600
              outline-none
            "
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>

        */}

      </div>
    </div>
  );
}