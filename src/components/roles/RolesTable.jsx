// import {
//   Pencil,
//   MoreVertical,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// export default function RolesList({
//   roles = [],
//   selectedRole,
//   setSelectedRole,

//   currentPage = 1,
//   totalPages = 1,
//   pageSize = 20,

//   onPrevious,
//   onNext,
//   onPageSizeChange,
// }) {
//   return (
//     <div
//       className="
//         h-full
//         bg-white
//         rounded-xl
//         border
//         border-gray-200
//         shadow-sm
//         p-2
//         flex
//         flex-col
//       "

//     >
//       {/* Header */}

//       <div className="flex items-center justify-between">

//         <h2
//           className="
//             text-[12px]
//             font-semibold
//             text-gray-900
//           "
//         >
//           Roles List ({roles.length})
//         </h2>

//       </div>

//       {/* Table */}

//       <div
//         className="
//           mt-1
//           flex-1
//           overflow-x-auto
//         "
//       >

//         <table
//           className="
//             w-full
//             border-collapse
//             min-w-162.5
//           "
//         >

//           {/* Table Head */}

//           <thead className="bg-gray-50">

//             <tr className="h-6 border-b border-gray-200">

//               <th
//                 className="
//                   px-2
//                   py-0
//                   text-left
//                   text-[9px]
//                   font-semibold
//                   tracking-wide
//                   text-gray-700
//                 "
//               >
//                 Role Name
//               </th>

//               <th
//                 className="
//                   px-2
//                   py-0
//                   text-left
//                   text-[9px]
//                   font-semibold
//                   tracking-wide
//                   text-gray-700
//                 "
//               >
//                 Description
//               </th>

//               <th
//                 className="
//                   px-2
//                   py-0
//                   text-center
//                   text-[9px]
//                   font-semibold
//                   tracking-wide
//                   text-gray-700
//                 "
//               >
//                 Users
//               </th>

//               <th
//                 className="
//                   px-2
//                   py-0
//                   text-center
//                   text-[9px]
//                   font-semibold
//                   tracking-wide
//                   text-gray-700
//                 "
//               >
//                 Status
//               </th>

//               <th
//                 className="
//                   px-2
//                   py-0
//                   text-center
//                   text-[9px]
//                   font-semibold
//                   tracking-wide
//                   text-gray-700
//                 "
//               >
//                 Action
//               </th>

//             </tr>

//           </thead>

//           <tbody>
//             {roles.map((role) => (
//   <tr
//     key={role.id}
//     onClick={() => setSelectedRole(role)}
//     className={`
//       h-6
//       border-b
//       border-gray-100
//       cursor-pointer
//       transition-colors
//       hover:bg-gray-50
//       ${
//         selectedRole?.id === role.id
//           ? "bg-blue-50"
//           : ""
//       }
//     `}
//   >
//     {/* Role Name */}
//     <td
//       className="
//         px-2
//         py-0
//         whitespace-nowrap
//         text-[9px]
//         font-medium
//         text-gray-800
//       "
//     >
//       {role.name}
//     </td>

//     {/* Description */}
//     <td
//       className="
//         max-w-40
//         truncate
//         px-2
//         py-0
//         text-[9px]
//         text-gray-500
//       "
//     >
//       {role.description}
//     </td>

//     {/* Users */}
//     <td
//       className="
//         px-2
//         py-0
//         text-center
//         text-[9px]
//         font-medium
//         text-gray-700
//       "
//     >
//       {role.users}
//     </td>

//     {/* Status */}
//     <td
//       className="
//         px-2
//         py-0
//         text-center
//       "
//     >
//       <span
//         className={`
//           inline-flex
//           items-center
//           rounded-full
//           px-1
//           py-0
//           text-[8px]
//           font-medium
//           leading-none
//           ${
//             role.type === "System"
//               ? "bg-blue-100 text-blue-700"
//               : "bg-green-100 text-green-700"
//           }
//         `}
//       >
//         {role.type}
//       </span>
//     </td>

//     {/* Action */}
//     <td
//       className="
//         px-2
//         py-0
//       "
//     >
//       <div
//         className="
//           flex
//           justify-center
//           gap-0.5
//         "
//       >
//         <button
//           type="button"
//           onClick={(e) => e.stopPropagation()}
//           className="
//             flex
//             h-5
//             w-5
//             items-center
//             justify-center
//             rounded
//             hover:bg-gray-100
//           "
//         >
//           <Pencil
//             size={11}
//             className="text-gray-600"
//           />
//         </button>

//         <button
//           type="button"
//           onClick={(e) => e.stopPropagation()}
//           className="
//             flex
//             h-5
//             w-5
//             items-center
//             justify-center
//             rounded
//             hover:bg-gray-100
//           "
//         >
//           <MoreVertical
//             size={11}
//             className="text-gray-600"
//           />
//         </button>
//       </div>
//     </td>
//   </tr>
// ))}
//           </tbody>

//         </table>

//       </div>

//       {/* Footer */}
//       <div
//         className="
//           mt-1
//           pt-1
//           border-t
//           border-gray-200
//           flex
//           items-center
//           justify-between
//         "
//       >

//         {/* Left */}
//         <p
//           className="
//             text-[9px]
//             text-gray-500
//           "
//         >
//           Showing 1 to {roles.length} of {roles.length} roles
//         </p>

//         {/* Right */}
//         <div
//           className="
//             flex
//             items-center
//             gap-1
//           "
//         >

//           <button
//             onClick={onPrevious}
//             disabled={currentPage === 1}
//             className="
//               flex
//               h-5
//               w-5
//               items-center
//               justify-center
//               rounded
//               border
//               border-gray-300
//               hover:bg-gray-50
//               disabled:opacity-40
//             "
//           >
//             <ChevronLeft size={10} />
//           </button>

//           <button
//             className="
//               h-5
//               w-5
//               rounded
//               bg-blue-600
//               text-[8px]
//               font-medium
//               text-white
//             "
//           >
//             {currentPage}
//           </button>

//           <button
//             onClick={onNext}
//             disabled={currentPage === totalPages}
//             className="
//               flex
//               h-5
//               w-5
//               items-center
//               justify-center
//               rounded
//               border
//               border-gray-300
//               hover:bg-gray-50
//               disabled:opacity-40
//             "
//           >
//             <ChevronRight size={10} />
//           </button>

//           <select
//             value={pageSize}
//             onChange={onPageSizeChange}
//             className="
//               h-5
//               rounded
//               border
//               border-gray-300
//               px-1
//               text-[8px]
//               outline-none
//               focus:border-blue-500
//             "
//           >
//             <option value={20}>20/page</option>
//             <option value={50}>50/page</option>
//             <option value={100}>100/page</option>
//           </select>

//         </div>

//       </div>

//     </div>
//   );
// }
import {
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


export default function RolesList({
  roles = [],
  selectedRole,
  setSelectedRole,

  currentPage = 1,
  totalPages = 1,
  pageSize = 20,

  onPrevious,
  onNext,
  onPageSizeChange,
}) {


  return (

    <div
      className="
        h-full
        w-full
        bg-white
        rounded-xl
        border
        border-gray-200
        shadow-sm
        p-2
        flex
        flex-col
        overflow-hidden
      "
    >


      {/* Header */}

      <div className="flex items-center justify-between">

        <h2
          className="
            text-[12px]
            font-semibold
            text-gray-900
          "
        >
          Roles List ({roles.length})
        </h2>

      </div>




      {/* Table */}

      <div
        className="
          mt-1
          flex-1
          overflow-hidden
        "
      >

        <table
          className="
            w-full
            table-fixed
            border-collapse
          "
        >


          {/* Header */}

          <thead className="bg-gray-50">


            <tr
              className="
                h-6
                border-b
                border-gray-200
              "
            >

              <th
                className="
                  w-[22%]
                  px-1
                  text-left
                  text-[9px]
                  font-semibold
                  text-gray-700
                "
              >
                Role Name
              </th>


              <th
                className="
                  w-[32%]
                  px-1
                  text-left
                  text-[9px]
                  font-semibold
                  text-gray-700
                "
              >
                Description
              </th>


              <th
                className="
                  w-[12%]
                  px-1
                  text-center
                  text-[9px]
                  font-semibold
                  text-gray-700
                "
              >
                Users
              </th>


              <th
                className="
                  w-[18%]
                  px-1
                  text-center
                  text-[9px]
                  font-semibold
                  text-gray-700
                "
              >
                Status
              </th>


              <th
                className="
                  w-[16%]
                  px-1
                  text-center
                  text-[9px]
                  font-semibold
                  text-gray-700
                "
              >
                Action
              </th>


            </tr>


          </thead>





          {/* Body */}

          <tbody>


            {roles.map((role) => (


              <tr
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`
                  h-6
                  border-b
                  border-gray-100
                  cursor-pointer
                  hover:bg-gray-50
                  ${selectedRole?.id === role.id
                    ? "bg-blue-50"
                    : ""
                  }
                `}
              >



                {/* Role Name */}

                <td
                  className="
                    px-1
                    py-0
                    text-[9px]
                    font-medium
                    text-gray-800
                    truncate
                  "
                >

                  {role.name}

                </td>




                {/* Description */}

                <td
                  className="
                    px-1
                    py-0
                    text-[9px]
                    text-gray-500
                    truncate
                  "
                >

                  {role.description}

                </td>





                {/* Users */}

                <td
                  className="
                    px-1
                    py-0
                    text-center
                    text-[9px]
                    text-gray-700
                  "
                >

                  {role.users}

                </td>





                {/* Status */}

                <td
                  className="
                    px-1
                    py-0
                    text-center
                  "
                >

                  <span
                    className={`
                      inline-flex
                      rounded-full
                      px-1
                      py-0
                      text-[8px]
                      font-medium
                      ${role.type === "System"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                      }
                    `}
                  >

                    {role.type}

                  </span>


                </td>





                {/* Action */}

                <td
                  className="
                    px-1
                    py-0
                  "
                >

                  <div
                    className="
                      flex
                      justify-center
                      gap-0.5
                    "
                  >

                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="
                        h-5
                        w-5
                        flex
                        items-center
                        justify-center
                        rounded
                        hover:bg-gray-100
                      "
                    >

                      <Pencil
                        size={11}
                        className="text-gray-600"
                      />

                    </button>



                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="
                        h-5
                        w-5
                        flex
                        items-center
                        justify-center
                        rounded
                        hover:bg-gray-100
                      "
                    >

                      <MoreVertical
                        size={11}
                        className="text-gray-600"
                      />

                    </button>


                  </div>

                </td>



              </tr>


            ))}


          </tbody>


        </table>


      </div>






      {/* Footer */}


      <div
        className="
          mt-1
          pt-1
          border-t
          border-gray-200
          flex
          items-center
          justify-between
        "
      >


        <p
          className="
            text-[9px]
            text-gray-500
          "
        >

          Showing 1 to {roles.length} of {roles.length} roles

        </p>





        <div
          className="
            flex
            items-center
            gap-1
          "
        >


          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="
              h-5
              w-5
              flex
              items-center
              justify-center
              rounded
              border
              border-gray-300
              disabled:opacity-40
            "
          >

            <ChevronLeft size={10} />

          </button>



          <button
            className="
              h-5
              w-5
              rounded
              bg-blue-600
              text-[8px]
              text-white
            "
          >

            {currentPage}

          </button>




          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="
              h-5
              w-5
              flex
              items-center
              justify-center
              rounded
              border
              border-gray-300
              disabled:opacity-40
            "
          >

            <ChevronRight size={10} />

          </button>




          <select
            value={pageSize}
            onChange={onPageSizeChange}
            className="
              h-5
              text-[8px]
              border
              border-gray-300
              rounded
              px-1
            "
          >

            <option value={20}>20/page</option>
            <option value={50}>50/page</option>
            <option value={100}>100/page</option>

          </select>


        </div>


      </div>
    </div>

  );

}