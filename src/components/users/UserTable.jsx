

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

  onEdit,
  onToggleStatus,

  currentPage,
  totalPages,
  pageSize,

  onPageChange,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  onPageSizeChange,

  // NEW PROP
  compactAccess = false,

}) {

  const tableRef = useRef(null);
  const menuRef = useRef(null);

  const [openMenu, setOpenMenu] = useState(null);



  /* ---------------- CLOSE MENU OUTSIDE CLICK ---------------- */

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



  /* ---------------- TABLE COLUMNS ---------------- */


  const fullColumns = [
    "Emp Code",
    "Employee Name",
    "Email",
    "Department",
    "Role",
    "Status",
    "Last Login",
  ];


  const accessColumns = [
    "Emp Code",
    "Employee Name",
    "Role",
    "Status",
  ];


  const columns = compactAccess
    ? accessColumns
    : fullColumns;



  /* ---------------- PAGINATION INFO ---------------- */


  const startItem =
    total === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;


  const endItem = Math.min(
    currentPage * pageSize,
    total
  );



  /* ---------------- TABLE HEIGHT ---------------- */
  const tableContainerClass =
    `
flex-1
min-h-0
overflow-auto
`;

  return (
    <div
      className="
w-full
h-full
min-w-0
overflow-hidden
rounded-xl
border
border-gray-200
bg-white
shadow-sm
flex
flex-col
"
    >
      {/* ---------------- HEADER ---------------- */}


      <div
        className="shrink-0
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

      {/* ---------------- TABLE ---------------- */}
      <div
        ref={tableRef}
        className={tableContainerClass}
      >

        <table className="min-w-full table-fixed">

          {/* ---------------- TABLE HEADER ---------------- */}
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
                  className="
                    h-3
                    w-3
                    rounded
                    border-gray-300
                  "
                />

              </th>

              {
                columns.map((header) => (

                  <th
                    key={header}
                    className="px-3 py-1"
                  >

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                      "
                    >
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
                ))
              }

              <th className="px-3 py-1">
                Action
              </th>

            </tr>
          </thead>


          {/* ---------------- TABLE BODY ---------------- */}
          <tbody
            className="
              divide-y
              divide-gray-100
            "
          >
            {
              users.length === 0 ? (

                <tr>

                  <td
                    colSpan={compactAccess ? 6 : 9}
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
                    className={`
                    cursor-pointer
                    transition-colors
                    ${selectedId === user.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                      }
                  `}
                  >

                    {/* Checkbox */}
                    <td className="px-3 py-1">
                      <input
                        type="checkbox"
                        className="
                        h-3
                        w-3
                        rounded
                        border-gray-300
                      "
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

                    {/* Employee Name */}
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

                    {/* Email - ONLY USERS PAGE */}
                    {!compactAccess && (
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
                    )}

                    {/* Department - ONLY USERS PAGE */}
                    {!compactAccess && (

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

                    )}

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

                    {/* Last Login - ONLY USERS PAGE */}
                    {!compactAccess && (

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

                    )}

                    {/* ACTION COLUMN CONTINUES IN PART 2 */}

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
                        {/* Edit Button */}
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


                        {/* More Button */}
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

                        {/* Dropdown Menu */}
                        {
                          openMenu === user.id && (
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

                              {/* Reset Password
                                Only Users Page */}
                              {
                                !compactAccess && (
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
                                          <Info
                                            className="
                                            h-5
                                            w-5
                                            text-blue-600
                                          "
                                          />
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

                                )
                              }

                              {/* Activate / Deactivate */}

                              <button
                                onClick={() => {
                                  onToggleStatus(user);
                                  setOpenMenu(null);
                                }}
                                className="
                                block
                                w-full
                                px-3
                                py-2
                                text-left
                                text-xs
                                hover:bg-gray-50">
                                {user.active ? "Deactivate" : "Activate"}
                              </button>
                            </div>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>


      {/* Pagination */}
      <div
        className="
    shrink-0
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


        {/* Record Count */}


        <p
          className="
            text-[9px]
            text-gray-700
          "
        >

          Showing {startItem} to {endItem} of {total} users

        </p>





        {/* Buttons */}


        <div
          className="
            flex
            items-center
            gap-1
          "
        >


          <button

            onClick={onFirst}

            disabled={currentPage === 1}

            className="
              rounded
              p-1
              text-gray-500
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "

          >

            <ChevronsLeft className="h-3.5 w-3.5" />

          </button>




          <button

            onClick={onPrevious}

            disabled={currentPage === 1}

            className="
              rounded
              p-1
              text-gray-500
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "

          >

            <ChevronLeft className="h-3.5 w-3.5" />

          </button>





          {
            Array.from(
              { length: totalPages },
              (_, index) => {

                const page = index + 1;


                return (

                  <button

                    key={page}

                    onClick={() => {

                      tableRef.current?.scrollTo({
                        top: 0,
                        behavior: "smooth"
                      });

                      onPageChange(page);

                    }}

                    className={`
                      h-6
                      w-6
                      rounded
                      text-[9px]
                      font-medium
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
            )
          }





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
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "

          >

            <ChevronRight className="h-3.5 w-3.5" />

          </button>





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
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ChevronsRight className="h-3.5 w-3.5" />
          </button>

        </div>
      </div>
    </div>

  );

}