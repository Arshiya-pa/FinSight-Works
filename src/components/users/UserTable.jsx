import { useRef } from "react";

import {
  Edit,
  Lock,
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
    pageSize === 10
      ? "max-h-[420px] overflow-auto"
      : pageSize === 25
      ? "max-h-[650px] overflow-auto"
      : "max-h-[900px] overflow-auto";


  return (

    <div className="
      overflow-hidden
      rounded-xl
      border
      border-gray-200
      bg-white
      shadow-sm
    ">


      {/* HEADER */}

      <div className="
        border-b
        border-gray-200
        px-4
        py-2.5
      ">

        <h3 className="
          text-[12px]
          font-semibold
          text-gray-800
        ">
          Users List ({total})
        </h3>

      </div>



      {/* TABLE */}

      <div
        ref={tableRef}
        className={tableContainerClass}
      >

        <table className="min-w-full">

          {/* TABLE HEADER */}

          <thead className="
            sticky
            top-0
            z-10
            bg-gray-50
          ">
            <tr className="
              text-left
              text-[10px]
              font-bold
              tracking-wide
              text-black
            ">


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
              {[
                "Emp Code",
                "Employee Name",
                "Email",
                "Department",
                "Role",
                "Status",
                "Last Login",
              ].map((header)=>(

                <th
                  key={header}
                  className="px-3 py-1"
                >

                  <span className="
                    inline-flex
                    items-center
                    gap-1
                  ">

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



          {/* BODY */}


          <tbody className="
            divide-y
            divide-gray-100
          ">


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


            users.map((user)=>(
             <tr
               key={user.id}
               onClick={() => onSelect(user)}
               className={`cursor-pointer transition-colors ${
                 selectedId === user.id
                   ? "bg-blue-50"
                   : "hover:bg-gray-50"
               }`}
              >
          
                <td
                  className="px-3 py-1.25"
                 // onClick={(e)=>e.stopPropagation()}
                >

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



                <td className="
                  px-3
                  py-1.25
                  text-[10px]
                  font-medium
                  text-gray-800
                ">
                  {user.code}
                </td>


                <td className="
                  px-3
                  py-1.25
                  text-[10px]
                  text-gray-800
                ">
                  {user.name}
                </td>


                <td className="
                  px-3
                  py-1.25
                  text-[10px]
                  text-gray-800
                ">
                  {user.email}
                </td>


                <td className="
                  px-3
                  py-1.25
                  text-[10px]
                  text-gray-800
                ">
                  {user.department}
                </td>


                <td className="
                  px-3
                  py-1.25
                  text-[10px]
                  text-gray-800
                ">
                  {user.role}
                </td>


                <td className="px-3 py-1.25">

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


                <td className="
                  whitespace-nowrap
                  px-3
                  py-1.25
                  text-[10px]
                  text-gray-800
                ">
                  {user.lastLogin}
                </td>


                <td
                  className="px-3 py-1.25"
                  onClick={(e)=>e.stopPropagation()}
                >

                  <div className="
                    flex
                    items-center
                    gap-1
                  ">


                    <button className="
                      rounded
                      p-0.5
                      hover:bg-gray-100
                      hover:text-blue-700
                    ">
                      <Edit className="h-3.5 w-3.5"/>
                    </button>


                    <button className="
                      rounded
                      p-0.5
                      hover:bg-gray-100
                    ">
                      <Lock className="h-3.5 w-3.5"/>
                    </button>


                    <button className="
                      rounded
                      p-0.5
                      hover:bg-gray-100
                    ">
                      <MoreVertical className="h-3.5 w-3.5"/>
                    </button>


                  </div>


                </td>


              </tr>


            ))


          )}


          </tbody>


        </table>


      </div>
       {/* PAGINATION */}

      <div className="
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
      ">


        {/* RECORD INFO */}

        <p className="
          text-[9px]
          text-gray-700
        ">
          Showing {startItem} to {endItem} of {total} users
        </p>



        {/* PAGE BUTTONS */}

        <div className="
          flex
          items-center
          gap-1
        ">


          {/* FIRST */}

          <button
            onClick={onFirst}
            disabled={currentPage === 1}
            className="
              rounded
              p-1
              text-gray-500
              transition
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >

            <ChevronsLeft className="h-3.5 w-3.5"/>

          </button>



          {/* PREVIOUS */}

          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="
              rounded
              p-1
              text-gray-500
              transition
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >

            <ChevronLeft className="h-3.5 w-3.5"/>

          </button>




          {/* PAGE NUMBERS */}

          {Array.from(
            { length: totalPages },
            (_, index)=>{

              const page = index + 1;


              return (

                <button
                  key={page}
                  onClick={() => {

                    tableRef.current?.scrollTo({
                      top:0,
                      behavior:"smooth"
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
                    ${
                      currentPage === page
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



          {/* NEXT */}

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
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >

            <ChevronRight className="h-3.5 w-3.5"/>

          </button>



          {/* LAST */}

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
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >

            <ChevronsRight className="h-3.5 w-3.5"/>

          </button>


        </div>

        {/* PAGE SIZE */}

        {/* <div className="
          flex
          items-center
          gap-2
        ">
          <select

            value={pageSize}

            onChange={(e)=>{

              // reset table scroll position
              tableRef.current?.scrollTo({
                top:0,
                behavior:"smooth"
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

            <option value={10}>
              10 / page
            </option>

            <option value={25}>
              25 / page
            </option>

            <option value={50}>
              50 / page
            </option>


          </select>

        </div> */}

      </div>

    </div>

  );

}