import { useState } from "react";
import {
  X,
  KeyRound,
  UserX,
  Edit,
  CheckCircle2,
} from "lucide-react";
import StatusBadge from "../StatusBadge";

const tabs = [
  "Profile",
  "Roles & Access",
  "Activity",
  "Preferences",
];

function Field({ label, value }) {
  return (
    <div className="py-0.5">
      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <div className="mt-1 text-[13px] text-gray-800">
        {value}
      </div>
    </div>
  );
}

export default function UserDetails({
  user,
  onClose,
}) {
  const [tab, setTab] = useState("Profile");

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <aside className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">

    {/* Header */}
   <div className="flex items-center justify-between border-b border-gray-200 px-5 py-1.25">

   <h3 className="text-[13px] font-semibold text-gray-800">
    User Details
   </h3>
   <button
    onClick={onClose}
    className="rounded p-0.5 text-gray-500 hover:bg-gray-100"
   >
    <X className="h-4 w-4" />
  </button>
</div>

{/* Profile Header */}
<div className="flex items-center gap-2 border-b border-gray-100 px-5 py-1.25">

  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white">
    {initials}
  </div>


  <div className="min-w-0 flex-1 gap-2">

    <div className="flex items-center gap-1">

      <p className="truncate text-[13px] font-semibold text-gray-900">
        {user.name} ({user.code})
      </p>

      <StatusBadge
        label={user.status}
        tone={
          user.status === "Active"
            ? "green"
            : user.status === "Inactive"
            ? "gray"
            : "red"
        }
        className="px-2 py-0 text-[9px]"
      />

    </div>


    <p className="truncate text-[11px] text-gray-500">
      {user.email}
    </p>

  </div>

</div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-2">

        {tabs.map((t) => (

          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
              tab === t
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>

        ))}

      </div>



      {/* Content */}
      <div className="flex-1 space-y-1 px-5 py-1.5">


        {tab === "Profile" && (

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.25">


            <Field
              label="Employee Code"
              value={user.code}
            />


            <Field
              label="Date of Joining"
              value={user.dateOfJoining}
            />


            <Field
              label="Department"
              value={user.department}
            />


            <Field
              label="Last Login"
              value={user.lastLogin}
            />


            <Field
              label="Job Title"
              value={user.jobTitle}
            />


            <Field
              label="Status"
              value={
                <select
                  defaultValue={user.status}
                  className="h-6 w-full rounded-md border border-gray-200 bg-white px-2 text-[12px]"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Locked</option>
                </select>
              }
            />



            <Field
              label="Phone"
              value={user.phone}
            />



            <Field
              label="Email Verified"
              value={
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                    user.emailVerified
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />

                  {user.emailVerified
                    ? "Verified"
                    : "Not verified"}

                </span>
              }
            />



            <Field
              label="Location"
              value={user.location}
            />



            <Field
              label="MFA Status"
              value={
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                    user.mfaEnabled
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >

                  <CheckCircle2 className="h-3 w-3" />

                  {user.mfaEnabled
                    ? "Enabled"
                    : "Disabled"}

                </span>
              }
            />


          </div>

        )}



        {tab !== "Profile" && (

          <div className="py-4 text-center text-[13px] text-gray-500">
            {tab} details will appear here.
          </div>

        )}


      </div>




      {/* Footer Actions */}
      <div className="grid grid-cols-3 gap-1.5 border-t border-gray-200 px-5 py-1">


        <button className="flex h-7 items-center justify-center gap-1 rounded-md border border-gray-200 bg-white text-[11px] font-medium text-gray-700 hover:bg-gray-50">

          <KeyRound className="h-3 w-3" />

          Reset Password

        </button>



        <button className="flex h-7 items-center justify-center gap-1 rounded-md border border-red-200 bg-white text-[11px] font-medium text-red-600 hover:bg-red-50">

          <UserX className="h-3 w-3" />

          Deactivate

        </button>



        <button className="flex h-7 items-center justify-center gap-1 rounded-md bg-blue-600 text-[11px] font-medium text-white hover:bg-blue-700">

          <Edit className="h-3 w-3" />

          Edit User

        </button>


      </div>


    </aside>
  );
}