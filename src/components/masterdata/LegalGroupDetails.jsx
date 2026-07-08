import { Pencil, Edit3 } from "lucide-react";
import AvatarBadge from "../AvatarBadge";
import StatusBadge from "../StatusBadge";
import LegalEntitiesTable from "./LegalEntitiesTable";

function InfoField({ label, children }) {
  return (
    <div className="leading-tight py-[1.5px]">
      <p className="text-[9px] text-gray-500">
        {label}
      </p>

      <div className="mt-0.5 text-[11px] font-medium text-gray-800">
        {children}
      </div>
    </div>
  );
}

export default function LegalGroupDetails({
  group,
  entities = [],
  onEdit,
  onAnnotate,
  onViewAll,
  onStatusChange,
}) {
  if (!group) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 pt-2 pb-1 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between h-7">
        <h2 className="text-[15px] font-semibold text-gray-900">
          Legal Group Details
        </h2>

        <div className="flex gap-1">
          <button
            onClick={onEdit}
            className="rounded p-1 hover:bg-gray-100"
          >
            <Pencil className="h-3.5 w-3.5 text-gray-500" />
          </button>

          <button
            onClick={onAnnotate}
            className="rounded p-1 hover:bg-gray-100"
          >
            <Edit3 className="h-3.5 w-3.5 text-gray-500" />
          </button>
        </div>
      </div>


      {/* Profile */}
      <div className="mt-1.5 flex items-center gap-2">
        <AvatarBadge initials={group.initials} />

        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-[13px] font-semibold text-gray-900">
              {group.name}
            </h3>

            <StatusBadge
              label={group.status}
              tone="green"
            />
          </div>

          <p className="text-[10px] text-gray-500">
            {group.subtitle}
          </p>
        </div>
      </div>


      {/* Information */}
      <div className="mt-2 grid grid-cols-2 gap-x-5 gap-y-1.5">

        <InfoField label="Code">
          {group.code}
        </InfoField>

        <InfoField label="Created On">
          {group.createdOn}
        </InfoField>

        <InfoField label="Description">
          {group.description}
        </InfoField>

        <InfoField label="Last Updated By">
          {group.updatedBy}
        </InfoField>


        <div className="leading-tight py-[1.5px]">
          <p className="text-[9px] text-gray-500">
            Status
          </p>

          <select
            value={group.status}
            onChange={(e) =>
              onStatusChange?.(e.target.value)
            }
            className="mt-0.5 h-6 w-full rounded border border-gray-300 px-1 text-[10px] text-green-600 focus:border-blue-500 focus:outline-none"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>


        <InfoField label="Last Updated On">
          {group.updatedOn}
        </InfoField>

        <InfoField label="No. of Legal Entities">
          {group.legalEntityCount}
        </InfoField>

        <InfoField label="Created By">
          {group.createdBy}
        </InfoField>

      </div>


      {/* Divider */}
      <div className="mt-1 mb-0.5 border-t border-gray-200" />


      {/* Table */}
      <LegalEntitiesTable
        entities={entities}
        total={group.legalEntityCount}
        onViewAll={onViewAll}
      />

    </div>
  );
}