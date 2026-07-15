// import { useState } from "react";
// import {
//   ChevronRight,
//   Folder,
// } from "lucide-react";

// import { permissionModules } from "../../data/rolesData";
// import { moduleIcons } from "./ModuleIcon";

// export default function PermissionTable({
//     onSelectAll,
//     onClearAll
// }){
//   const [rows, setRows] = useState(permissionModules);

//   const togglePermission = (id, permission) => {
//     setRows((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               [permission]: !item[permission],
//             }
//           : item
//       )
//     );
//   };

//   const selectAllPermissions = () => {
//     setRows(prev =>
//         prev.map(item => ({
//             ...item,
//             view: true,
//             export: true,
//             upload: true,
//             admin: true,
//         }))
//     );
// };

// const clearAllPermissions = () => {
//     setRows(prev =>
//         prev.map(item => ({
//             ...item,
//             view: false,
//             export: false,
//             upload: false,
//             admin: false,
//         }))
//     );
// };

//   return (
//     <div
//       className="
//         overflow-hidden
//         rounded
//         border
//         border-gray-200
//         bg-white
//         shadow-sm
//       "
//     >
//       <div className="h-full overflow-y-auto overflow-x-auto">

//         <table className="w-full table-fixed border-collapse">

//           {/* Header */}

//           <thead className="sticky top-0 bg-gray-50 z-10">

//             <tr className="h-6.25">

//               <th
//                 className="
//                   w-[52%]
//                   px-2
//                   py-0
//                   text-left
//                   text-[8px]
//                   font-semibold
//                   uppercase
//                   leading-none
//                   text-gray-600
//                 "
//               >
//                 Module / Feature
//               </th>

//               <th
//                 className="
//                   w-[12%]
//                   px-0.5
//                   py-0
//                   text-center
//                   text-[8px]
//                   font-semibold
//                   uppercase
//                   leading-none
//                   text-gray-600
//                 "
//               >
//                 View
//               </th>

//               <th
//                 className="
//                   w-[12%]
//                   px-0.5
//                   py-0
//                   text-center
//                   text-[8px]
//                   font-semibold
//                   uppercase
//                   leading-none
//                   text-gray-600
//                 "
//               >
//                 Export
//               </th>

//               <th
//                 className="
//                   w-[12%]
//                   px-0.5
//                   py-0
//                   text-center
//                   text-[8px]
//                   font-semibold
//                   uppercase
//                   leading-none
//                   text-gray-600
//                 "
//               >
//                 Upload
//               </th>

//               <th
//                 className="
//                   w-[12%]
//                   px-0.5
//                   py-0
//                   text-center
//                   text-[8px]
//                   font-semibold
//                   uppercase
//                   leading-none
//                   text-gray-600
//                 "
//               >
//                 Admin
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {rows.map((item) => {

//               const Icon =
//                 moduleIcons?.[item.module] || Folder;

//               return (

//                 <tr
//                   key={item.id}
//                   className="h-[24.5px]
//                     border-t
//                     border-gray-100
//                     hover:bg-gray-50
//                     transition-colors
//                   "
//                 >

//                   {/* Module */}

//                   <td className="px-2 py-0 align-middle">

//                     <div className="flex items-center gap-px">

//                       <ChevronRight
//                         size={8}
//                         className="shrink-0 text-gray-400"
//                       />

//                       <Icon
//                         size={9}
//                         className="shrink-0 text-blue-600"
//                       />

//                       <span
//                         className="
//                           truncate
//                           text-[8px]
//                           font-medium
//                           leading-none
//                           text-gray-700
//                         "
//                       >
//                         {item.module}
//                       </span>

//                     </div>

//                   </td>

//                   {/* View */}

//                   <td className="px-0.5 py-0 text-center align-middle">

//                     <input
//                       type="checkbox"
//                       checked={item.view}
//                       onChange={() =>
//                         togglePermission(item.id, "view")
//                       }
//                       className="
//                         h-2.5
//                         w-2.5
//                         cursor-pointer
//                         accent-blue-600
//                       "
//                     />

//                   </td>
//                  {/* Export */}

//                   <td className="px-0.5 py-0 text-center align-middle">

//                     <input
//                       type="checkbox"
//                       checked={item.export}
//                       onChange={() =>
//                         togglePermission(item.id, "export")
//                       }
//                       className="
//                         h-2.5
//                         w-2.5
//                         cursor-pointer
//                         accent-green-600
//                       "
//                     />

//                   </td>

//                   {/* Upload */}

//                   <td className="px-0.5 py-0 text-center align-middle">

//                     <input
//                       type="checkbox"
//                       checked={item.upload}
//                       onChange={() =>
//                         togglePermission(item.id, "upload")
//                       }
//                       className="
//                         h-2.5
//                         w-2.5
//                         cursor-pointer
//                         accent-orange-500
//                       "
//                     />

//                   </td>

//                   {/* Admin */}

//                   <td className="px-0.5 py-0 text-center align-middle">

//                     <input
//                       type="checkbox"
//                       checked={item.admin}
//                       onChange={() =>
//                         togglePermission(item.id, "admin")
//                       }
//                       className="
//                         h-2.5
//                         w-2.5
//                         cursor-pointer
//                         accent-purple-600
//                       "
//                     />

//                   </td>

//                 </tr>

//               );

//             })}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }

import {
  useState,
  useEffect,
} from "react";
import {
  ChevronRight,
  Folder,
} from "lucide-react";

import { permissionModules } from "../../data/rolesData";
import { moduleIcons } from "./ModuleIcon";

export default function PermissionTable({
  onSelectAll,
  onClearAll,
}) {

  const [rows, setRows] = useState(permissionModules);

  /* ---------------- Toggle Single Permission ---------------- */

  const togglePermission = (id, permission) => {
    setRows((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [permission]: !item[permission],
            }
          : item
      )
    );
  };

  /* ---------------- Select All ---------------- */

  const selectAllPermissions = () => {
    setRows((prev) =>
      prev.map((item) => ({
        ...item,
        view: true,
        export: true,
        upload: true,
        admin: true,
      }))
    );
  };

  /* ---------------- Clear All ---------------- */

  const clearAllPermissions = () => {
    setRows((prev) =>
      prev.map((item) => ({
        ...item,
        view: false,
        export: false,
        upload: false,
        admin: false,
      }))
    );
  };

  useEffect(() => {
    if (onSelectAll) {
        onSelectAll.current = selectAllPermissions;
    }

    if (onClearAll) {
        onClearAll.current = clearAllPermissions;
    }
}, [rows]);

 

  return (
    <div
      className="
        overflow-hidden
        rounded
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      <div className="h-full overflow-y-auto overflow-x-auto">

        <table className="w-full table-fixed border-collapse">

          {/* Header */}

          <thead className="sticky top-0 bg-gray-50 z-10">

            <tr className="h-6.25">

              <th
                className="
                  w-[52%]
                  px-2
                  py-0
                  text-left
                  text-[8px]
                  font-semibold
                  uppercase
                  leading-none
                  text-gray-600
                "
              >
                Module / Feature
              </th>

              <th
                className="
                  w-[12%]
                  px-0.5
                  py-0
                  text-center
                  text-[8px]
                  font-semibold
                  uppercase
                  leading-none
                  text-gray-600
                "
              >
                View
              </th>

              <th
                className="
                  w-[12%]
                  px-0.5
                  py-0
                  text-center
                  text-[8px]
                  font-semibold
                  uppercase
                  leading-none
                  text-gray-600
                "
              >
                Export
              </th>

              <th
                className="
                  w-[12%]
                  px-0.5
                  py-0
                  text-center
                  text-[8px]
                  font-semibold
                  uppercase
                  leading-none
                  text-gray-600
                "
              >
                Upload
              </th>

              <th
                className="
                  w-[12%]
                  px-0.5
                  py-0
                  text-center
                  text-[8px]
                  font-semibold
                  uppercase
                  leading-none
                  text-gray-600
                "
              >
                Admin
              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map((item) => {

              const Icon =
                moduleIcons?.[item.module] || Folder;

              return (

                <tr
                  key={item.id}
                  className="
                    h-[24.5px]
                    border-t
                    border-gray-100
                    hover:bg-gray-50
                    transition-colors
                  "
                >

                  {/* Module */}

                  <td className="px-2 py-0 align-middle ">

                    <div className="flex items-center gap-px">

                      <ChevronRight
                        size={8}
                        className="shrink-0 text-gray-600"
                      />

                      <Icon
                        size={9}
                        className="shrink-0 text-blue-600"
                      />

                      <span
                        className="
                          truncate
                          text-[8px]
                          font-medium
                          leading-none
                          text-gray-700
                        "
                      >
                        {item.module}
                      </span>

                    </div>

                  </td>

                  {/* View */}

                  <td className="px-0.5 py-0 text-center align-middle">

                    <input
                      type="checkbox"
                      checked={item.view}
                      onChange={() =>
                        togglePermission(item.id, "view")
                      }
                      className="
                        h-2.5
                        w-2.5
                        cursor-pointer
                        accent-blue-600
                      "
                    />

                  </td>

                  {/* Export */}

                  <td className="px-0.5 py-0 text-center align-middle">

                    <input
                      type="checkbox"
                      checked={item.export}
                      onChange={() =>
                        togglePermission(item.id, "export")
                      }
                      className="
                        h-2.5
                        w-2.5
                        cursor-pointer
                        accent-green-600
                      "
                    />

                  </td>

                  {/* Upload */}

                  <td className="px-0.5 py-0 text-center align-middle">

                    <input
                      type="checkbox"
                      checked={item.upload}
                      onChange={() =>
                        togglePermission(item.id, "upload")
                      }
                      className="
                        h-2.5
                        w-2.5
                        cursor-pointer
                        accent-orange-500
                      "
                    />

                  </td>

                  {/* Admin */}

                  <td className="px-0.5 py-0 text-center align-middle">

                    <input
                      type="checkbox"
                      checked={item.admin}
                      onChange={() =>
                        togglePermission(item.id, "admin")
                      }
                      className="
                        h-2.5
                        w-2.5
                        cursor-pointer
                        accent-purple-600
                      "
                    />

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}