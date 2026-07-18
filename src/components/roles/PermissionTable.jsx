
import PermissionRow from "./PermissionRow";
import { useState, useEffect, } from "react";
import { ChevronRight, Folder, } from "lucide-react";

import { permissionModules } from "../../data/rolesData";
import { moduleIcons } from "./ModuleIcon";
import Checkbox from "../common/Checkbox";

export default function PermissionTable({
  onSelectAll,
  onClearAll,
  disabled = false,
  setDirty, permissions,
}) {

  // const [rows, setRows] = useState(() => permissions ?? []);
  const [rows, setRows] = useState(
    permissions || permissionModules
  );

  /* ---------------- Toggle Single Permission ---------------- */

 const togglePermission = (id, permission, value) => {
  if (setDirty) {
    setDirty(true);
  }

  setRows((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            [permission]: value,
          }
        : item
    )
  );
};

  /* ---------------- Select All ---------------- */

  const selectAllPermissions = () => {
    if (disabled) return;
    if (setDirty) {
      setDirty(true);
    }
    setRows(prev =>
      prev.map(item => ({
        ...item,
        view: true,
        export: true,
        upload: true,
        admin: true
      }))
    )
  }

  /* ---------------- Clear All ---------------- */

  const clearAllPermissions = () => {
    if (disabled) return;
    if (setDirty) {
      setDirty(true);
    }

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
  // useEffect(() => {
  //   setRows(permissions || []);
  // }, [permissions]);
  useEffect(() => {
    setRows(permissions || permissionModules);
  }, [permissions]);

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
                  text-left
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
                  text-left
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
                  text-left
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
                  text-left
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
            {rows?.map((item) => {
              const Icon = moduleIcons[item.module] || Folder;

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
                  <td className="px-2 py-0 align-middle">
                    <div className="flex items-center gap-1">
                      <ChevronRight
                        size={8}
                        className="text-gray-500"
                      />

                      <Icon
                        size={10}
                        className="text-blue-600"
                      />

                      <span
                        className="
                truncate
                text-[8px]
                font-medium
                text-gray-700
              "
                      >
                        {item.module}
                      </span>
                    </div>
                  </td>

                  {/* View */}
                  <td className="text-center">
                    <Checkbox
                      checked={item.view}
                      color="blue"
                      onChange={(value) =>
                        togglePermission(item.id, "view", value)
                      }
                      className="h-3 w-3 accent-blue-600"
                    />
                  </td>

                  {/* Export */}
                  <td className="text-center">
                    <Checkbox
                      checked={item.export}
                      color="green"
                      onChange={(value) =>
                        togglePermission(item.id, "export", value)
                      }
                      className="h-3 w-3 accent-green-600"
                    />
                  </td>

                  {/* Upload */}
                  <td className="text-center">
                    <Checkbox
                      checked={item.upload}
                      color="orange"
                      onChange={(value) =>
                        togglePermission(item.id, "upload", value)
                      }
                      className="h-3 w-3 accent-orange-500"
                    />
                  </td>

                  {/* Admin */}
                  <td className="text-center">
                    <Checkbox
                      checked={item.admin}
                      color="purple"
                      onChange={(value) =>
                        togglePermission(item.id, "admin", value)
                      }
                      className="h-3 w-3 accent-purple-600"
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