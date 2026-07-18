import { useState, useRef } from "react";
import {
  Eye,
  Download,
  Upload,
  Shield,
} from "lucide-react";
import ConfirmationModel from "../common/ConfirmationModel";

import PermissionTable from "./PermissionTable";
import DataAccessScope from "./DataAccessScope";
import UserAssignment from "./UserAssignment";
import AuditLog from "./AuditLog";
import { protectedRoles } from "../../data/rolesData";
import SaveFooter from "../common/SaveFooter";

export default function RoleDetailsPanel({
  role,
  users,
}) {

  const [activeTab, setActiveTab] = useState("permissions");
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);

  const isProtectedRole =
    protectedRoles.includes(role?.role_code);
  const selectAllRef = useRef(null);
  const clearAllRef = useRef(null);
  const [userChanges, setUserChanges] = useState({
    addedUsers: [],
    removedUsers: []
  });

  const tabs = [
    {
      id: "permissions",
      label: "Module Permissions",
    },
    {
      id: "scope",
      label: "Data Access Scope",
    },
    {
      id: "users",
      label: "User Assignment",
    },
    {
      id: "audit",
      label: "Audit Log",
    },
  ];

  const handleSavePermissions = () => {

    console.log("Saving permissions");

    // API later
    // PUT /roles/{role_code}/permissions

  };


  const handleSaveScope = () => {

    console.log("Saving data access scope");

    // API later
    // PUT /roles/{role_code}/scope

  };


  const handleSaveUsers = () => {

    console.log(
      "ROLE",
      role.role_code
    );

    console.log(
      "ADD USERS",
      userChanges.addedUsers
    );

    console.log(
      "REMOVE USERS",
      userChanges.removedUsers
    );


    // API HERE

  };

  const handleTabChange = (tab) => {
    if (hasChanges) {
      setPendingTab(tab);
      setShowConfirm(true);
      return;
    }
    setActiveTab(tab);
  };
  if (!role) {
    return (
      <div className="h-full flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
        <p className="text-sm text-gray-500">
          Select a role to view details
        </p>
      </div>
    );
  }
  return (
    <div
      className="h-full flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Header */}

      <div
        className="
          border-b
          border-gray-100
          px-3
          py-1
        "
      >
        <h2
          className="
            text-[12px]
            font-semibold
            text-gray-900
            leading-none
          "
        >
          Role Details
        </h2>
      </div>

      {/* Form */}

      <div className="px-3 py-1 h-20 flex flex-col">

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-1.5
            items-start
          "
        >

          {/* Role Name */}

          <div>

            <label
              className="
                mb-0.5
                block
                text-[10px]
                font-medium
                text-gray-600
                leading-none
              "
            >
              Role Name
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              value={role.name || ""}
              readOnly
              className="
                h-6
                w-full
                rounded
                border
                border-gray-300
                px-2
                text-[10px]
                leading-none
                outline-none
                focus:border-blue-500
                focus:ring-1
                focus:ring-blue-100
              "
            />

          </div>

          {/* Description */}

          <div>

            <label
              className="
                mb-0.5
                block
                text-[10px]
                font-medium
                text-gray-600
                leading-none
              "
            >
              Description
            </label>

            <textarea
              rows={2}
              value={role.description || ""}
              readOnly
              className="
                h-10
                w-full
                resize-none
                rounded
                border
                border-gray-300
                px-2
                py-1
                text-[10px]
                leading-tight
                outline-none
                focus:border-blue-500
                focus:ring-1
                focus:ring-blue-100
              "
            />

          </div>

          {/* Right Side */}

          <div className="space-y-1">

            <div>

              <label
                className="
                  mb-0.5
                  block
                  text-[10px]
                  font-medium
                  text-gray-600
                  leading-none
                "
              >
                Role Type
              </label>

              <select
                className="
                  h-6
                  w-full
                  rounded
                  border
                  border-gray-300
                  px-2
                  text-[10px]
                  outline-none
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-100
                "
              >
                <option>Custom Role</option>
                <option>System Role</option>
              </select>

            </div>

            <div>

              <label
                className="
                  mb-0.5
                  block
                  text-[10px]
                  font-medium
                  text-gray-600
                  leading-none
                "
              >
                Status
              </label>

              <input
                value={role.active ? "Active" : "Inactive"}
                readOnly
                className="h-6 w-full rounded border border-gray-300 px-2 text-[10px]"
              />
            </div>

          </div>

        </div>

      </div>
      {/* Tabs */}

      <div className="border-b border-gray-200">

        <div className="flex">

          {tabs.map((tab) => (

            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                h-7
                px-3
                text-[10px]
                font-medium
                transition-colors
                ${activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
                }
              `}
            >
              {tab.label}
            </button>

          ))}

        </div>

      </div>

      {/* Permissions */}

      {activeTab === "permissions" && (

        <div className="px-3 py-1">

          {/* Toolbar */}

          <div className="mb-1 flex items-center justify-between">

            <p className="text-[9px] text-gray-500">
              Set permissions for modules and features
            </p>

            <div className="flex flex-wrap items-center gap-2">

              <button
                type="button"
                onClick={() => selectAllRef.current?.()}
                className="rounded border border-gray-300 px-2 py-0.5 text-[9px] hover:bg-gray-100"
              >
                Select All
              </button>

              <button
                type="button"
                onClick={() => clearAllRef.current?.()}
                className="rounded border border-gray-300 px-2 py-0.5 text-[9px] hover:bg-gray-100"
              >
                Clear All
              </button>

              <span className="flex items-center gap-1 text-[9px] text-gray-600">
                <Eye className="h-2.5 w-2.5 text-blue-600" />
                View
              </span>

              <span className="flex items-center gap-1 text-[9px] text-gray-600">
                <Download className="h-2.5 w-2.5 text-green-600" />
                Export
              </span>

              <span className="flex items-center gap-1 text-[9px] text-gray-600">
                <Upload className="h-2.5 w-2.5 text-orange-500" />
                Upload
              </span>

              <span className="flex items-center gap-1 text-[9px] text-gray-600">
                <Shield className="h-2.5 w-2.5 text-purple-600" />
                Admin
              </span>

            </div>

          </div>


          {/* Warning for System Role */}

          {
            isProtectedRole && (
              <div
                className="
                mb-2
                rounded
                border
                border-yellow-300
                bg-yellow-50
                px-3
                py-2
                text-[10px]
                text-yellow-700">
                ⚠️ This is a system role.
                Permissions cannot be modified.
              </div>
            )
          }

          {
            loading ?

              (
                <div className="p-5 text-center text-xs text-gray-400">

                  Loading permissions...

                </div>

              )

              :

              (
                <PermissionTable
                  disabled={isProtectedRole}
                  onSelectAll={selectAllRef}
                  onClearAll={clearAllRef}
                  setDirty={setHasChanges}
                />
              )

          }

          {/* Footer */}
          <div
            className="
          flex
          items-center
          justify-between
          border-t
          border-gray-100
          bg-white
          px-2
          py-0.5
        "
          >
            {/* Left */}
            <p className="text-[8px] leading-none text-gray-500">
              <span className="text-blue-600">Note:</span> Admin permission includes all other permissions.
            </p>

            {/* Right */}
            <div className="flex items-center gap-1">

              {/* <button
                type="button"
                className="
              h-6
              px-2.5
              rounded
              border
              border-gray-300
              bg-white
              text-[10px]
              font-medium
              text-gray-700
              hover:bg-gray-50
              transition-colors
            "
              >
                Cancel
              </button> */}

              {
                !isProtectedRole && (
                  <SaveFooter
                    buttonText="Save Permissions"
                    onSave={handleSavePermissions}
                  />
                )
              }
            </div>
          </div>
        </div>
      )}

      {/* Other Tabs */}
      {activeTab === "scope" && (

        <>
          <DataAccessScope
            role={role}
          />

          <SaveFooter
            buttonText="Save Access Scope"
            onSave={handleSaveScope}
          />
        </>
      )}

      {activeTab === "users" && (
        <UserAssignment
          role={role}
          users={users}
          setDirty={setHasChanges}
        />
      )}

      {activeTab === "audit" && (
        <AuditLog />
      )}

      <ConfirmationModel

    open={showConfirm}

    title="Unsaved Changes"

    message="
    You have unsaved changes.
    Do you want to leave this tab?
    "

    confirmText="Discard Changes"

    cancelText="Stay Here"


    onCancel={()=>{
        setShowConfirm(false);
    }}


    onConfirm={()=>{

        setHasChanges(false);

        setActiveTab(pendingTab);

        setPendingTab(null);

        setShowConfirm(false);

    }}

/>
    </div>
  );
}