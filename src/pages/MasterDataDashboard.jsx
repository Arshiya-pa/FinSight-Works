// import React, { useState } from "react";
// import AdminLayout from "../components/layout/AdminLayout";
// import PageHeader from "../components/common/PageHeader";
// import StatCard from "../components/StatCard";
// import FilterBar from "../components/common/FilterBar";
// import FooterNote from "../components/FooterNote";
// import MasterDataTabs from "../components/masterdata/MasterDataTabs";
// import LegalGroupsTable from "../components/masterdata/LegalGroupsTable";
// import LegalGroupDetails from "../components/masterdata/LegalGroupDetails";

// import {
//   masterCards,
//   legalGroupMock,
//   legalEntitiesMock,
// } from "../data/masterData";

// import { statuses } from "../data/dummyData";

// export default function MasterDataDashboard() {
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");

//   return (
//     <AdminLayout
//       activeMenu="Master Data"
//       breadcrumbs={["Admin", "Master Data"]}
//       company="FJ Group"
//       initials="SA"
//       userName="Super Admin"
//       userRole="Super Administrator"
//       notificationCount={5}
//     >

//       {/* Header */}
//       <PageHeader
//         title="Master Data"
//         subtitle="Manage and maintain master data used across FinSight."
//       />


//       {/* KPI Cards */}
//       <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7">
//         {masterCards.map((item, index) => (
//           <StatCard
//             key={`${item.title}-${index}`}
//             {...item}
//             delay={index * 0.08}
//           />
//         ))}
//       </div>


//       {/* Tabs */}
//       <div className="mt-2">
//         <MasterDataTabs />
//       </div>


//       {/* Main Content */}
//       <div className="mt-2 grid grid-cols-12 gap-2 overflow-hidden">

//         {/* Left Section */}
//         <div className="col-span-12 min-w-0 xl:col-span-7 w-full">

//           {/* Filter */}
//           <div className="w-full">
//             <FilterBar
//               compact
//               search={search}
//               setSearch={setSearch}
//               placeholder="Search legal group..."
//               filters={[
//                 {
//                   label: "Status",
//                   options: statuses,
//                   value: status,
//                   onChange: (e) => setStatus(e.target.value),
//                 },
//               ]}
//               showMoreFilters
//               onMoreFilters={() => console.log("More Filters")}
//               showAddButton
//               addButtonLabel="Legal Group"
//               onAdd={() => console.log("Add Legal Group")}
//             />
//           </div>


//           {/* Legal Groups Table */}
//           <div className="mt-2 w-full min-w-0">
//             <LegalGroupsTable />
//           </div>

//         </div>


//         {/* Right Section */}
//         <div className="col-span-12 min-w-0 xl:col-span-5 w-full">

//           <LegalGroupDetails
//             group={legalGroupMock}
//             entities={legalEntitiesMock}
//             onEdit={() => console.log("Edit")}
//             onAnnotate={() => console.log("Annotate")}
//             onViewAll={() => console.log("View All")}
//             onStatusChange={(value) => console.log(value)}
//           />

//         </div>

//       </div>


//       {/* Footer */}
//       <div className="mt-2">
//       <FooterNote
//        title="Note:"
//         message="Master data changes will be reflected across FinSight reports and dashboards."
//        lastUpdated="20 Jun 2026 10:15 AM"
//         onRefresh={() => console.log("Refresh clicked")}
//      />
//       </div>

//     </AdminLayout>
//   );
// }

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/StatCard";
import FilterBar from "../components/common/FilterBar";
import FooterNote from "../components/FooterNote";
import MasterDataTabs from "../components/masterdata/MasterDataTabs";
import LegalGroupsTable from "../components/masterdata/LegalGroupsTable";
import LegalGroupDetails from "../components/masterdata/LegalGroupDetails";
import LegalEntitiesMasterTable from "../components/masterdata/LegalEntitiesMasterTable";
import AddLegalGroupModal from "../components/masterdata/AddLegalGroupModal";
import AddLegalEntityModal from "../components/masterdata/AddLegalEntityModal";
import LegalEntityDetails from "../components/masterdata/LegalEntityDetails";
import MasterDataModal from "../components/masterdata/MasterDataModal";

import {
  masterCards,
  legalGroupMock,
  legalEntitiesMock,
} from "../data/masterData";
import ConfirmationModel from "../components/common/ConfirmationModel";
import { statuses } from "../data/dummyData";
import {
  addLegalGroup, updateLegalGroup, getLegalGroups,
  getLegalEntities, updateLegalEntities, addLegalEntities
} from "../api/masterLegalApi";

export default function MasterDataDashboard() {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editLegalGroup, setEditLegalGroup] = useState(null);

  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [selectedEditGroup, setSelectedEditGroup] = useState(null);

  const [showEntityModal, setShowEntityModal] = useState(false);
  const [editLegalEntity, setEditLegalEntity] = useState(null);
  const [activeTab, setActiveTab] = useState("legal-groups");

  const [legalGroups, setLegalGroups] = useState([]);
  const [legalEntities, setLegalEntities] = useState([]);
  const [parentDivisions, setParentDivisions] = useState([]);
  const [subDivisions, setSubDivisions] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [analysisCodes, setAnalysisCodes] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedParentDivision, setSelectedParentDivision] = useState(null);
  const [selectedSubDivision, setSelectedSubDivision] = useState(null);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState(null);
  const [selectedAnalysisCode, setSelectedAnalysisCode] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const dynamicMasterCards = [
    {
      id: "legal-groups",
      title: "Legal Groups",
      value: legalGroups.length,
      description: "Active",
      icon: masterCards[0].icon,
      color: masterCards[0].color,
    },

    {
      id: "legal-entities",
      title: "Legal Entities",
      value: legalEntities.filter(
        (group) => group.active === true
      ).length,
      description: "Active",
      icon: masterCards[1].icon,
      color: masterCards[1].color,
    },

    {
      id: "parent-divisions",
      title: "Parent Divisions",
      value: legalGroups.filter(
        (group) => group.active === false
      ).length,
      description: "Inactive",
      icon: masterCards[2].icon,
      color: masterCards[2].color,
    },
    {
      id: "sub-divisions",
      title: "Sub Divisions",
      value: legalGroups.filter(
        (group) => group.active === false
      ).length,
      description: "Inactive",
      icon: masterCards[3].icon,
      color: masterCards[3].color,
    },
    {
      id: "business-units",
      title: "Business Units",
      value: legalGroups.filter(
        (group) => group.active === false
      ).length,
      description: "Inactive",
      icon: masterCards[4].icon,
      color: masterCards[4].color,
    },
    {
      id: "analysis-codes",
      title: "Analysis Codes",
      value: legalGroups.filter(
        (group) => group.active === false
      ).length,
      description: "Inactive",
      icon: masterCards[5].icon,
      color: masterCards[5].color,
    },
    {
      id: "currencies",
      title: "Currencies",
      value: legalGroups.filter(
        (group) => group.active === false
      ).length,
      description: "Inactive",
      icon: masterCards[6].icon,
      color: masterCards[6].color,
    }
  ];

 /* -------------------- LOAD KPI CARDS -------------------- */
  const loadMasterData = async () => {
  try {
    await Promise.all([
      fetchLegalGroups(),
      fetchLegalEntities(),

      // later
      // fetchParentDivisions(),
      // fetchSubDivisions(),
      // fetchBusinessUnits(),
      // fetchAnalysisCodes(),
      // fetchCurrencies(),
    ]);
  } catch (err) {
    console.log(err);
  }
};
// Load every master table once
useEffect(() => {
  loadMasterData();
}, []);

  /* -------------------- FETCH LEGAL GROUPS -------------------- */
  const fetchLegalGroups = async () => {
    try {
      const response = await getLegalGroups();
      const data = response.data.data || response.data;
      const updatedGroups = data.map((group) => ({
        ...group,
        active: true,
      }));
      setLegalGroups(updatedGroups);
      if (updatedGroups.length > 0) {
        setSelectedGroup(updatedGroups[0]);
      } else {
        setSelectedGroup(null);
      }

    } catch (error) {
      console.error(error);
    }
  };

  /* -------------------- FETCH LEGAL ENTITIES -------------------- */
  const fetchLegalEntities = async () => {
    try {
      const response = await getLegalEntities();

      const data = response.data.data || response.data;

      const updatedEntities = data.map((entity) => ({
        ...entity,
        active: entity.active ?? true,
      }));

      setLegalEntities(updatedEntities);

      // Select first entity automatically
      if (updatedEntities.length > 0) {
        setSelectedEntity(updatedEntities[0]);
      } else {
        setSelectedEntity(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
   /* -------------------- FILTER LEGAL ENTITY WITH INPUT BOX -------------------- */
  const filteredLegalEntities = legalEntities.filter((entity) => {
  const keyword = search.toLowerCase();

  const matchesSearch =
    entity.legal_entity_code?.toLowerCase().includes(keyword) ||
    entity.legal_entity_name?.toLowerCase().includes(keyword);

  const matchesStatus =
    status === "All" ||
    (status === "Active" && entity.active) ||
    (status === "Inactive" && !entity.active);

  return matchesSearch && matchesStatus;
 });

  /* -------------------- FILTER LEGAL GROUPS WITH INPUT BOX -------------------- */
  const filteredLegalGroups = legalGroups.filter((group) => {
    const keyword = search.toLowerCase();

    return (
      group.legal_group_code?.toLowerCase().includes(keyword) ||
      group.legal_group_name?.toLowerCase().includes(keyword)
    );
  });

  /* -------------------- PAGE LOAD -------------------- */
  useEffect(() => {
    switch (activeTab) {

      case "legal-groups":
        fetchLegalGroups();
        break;

      case "legal-entities":
        fetchLegalEntities();
        break;

    }
    console.log("Active Tab:", activeTab);
  }, [activeTab]);

  const handleStatusToggle = async (group) => {
    try {

      await updateLegalGroup(
        group.legal_group_id,
        {
          legal_group_code: group.legal_group_code,
          legal_group_name: group.legal_group_name,
          active: false,
        }
      );

      toast.success("Legal Group deactivated successfully");


      // fetch only active groups from API
      await fetchLegalGroups();


    } catch (error) {
      console.log(error);
      toast.error("Unable to update status");
    }
  };
  const handleEntityStatusToggle = async (entity) => {
    try {
      await updateLegalEntities(
        entity.legal_entity_id,
        {
          legal_entity_code:
            entity.legal_entity_code,

          legal_entity_name:
            entity.legal_entity_name,
          active: !entity.active,
        }
      );
      toast.success(
        "Legal Entity updated successfully"
      );
      fetchLegalEntities();
    } catch (err) {
      toast.error(
        "Unable to update Legal Entity"
      );
    }
  };
  return (
    <>
      {/* Header */}
      <PageHeader
        title="Master Data"
        subtitle="Manage and maintain master data used across FinSight."
      />
      {/* KPI Cards */}
      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7">
        {dynamicMasterCards.map((item, index) => (
          <StatCard
            key={`${item.title}-${index}`}
            {...item}
            delay={index * 0.08}
          />
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-2">
        <MasterDataTabs
          tabs={dynamicMasterCards}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Main Content */}
      <div className="mt-2 grid h-[calc(100vh-200px)] grid-cols-12 gap-2 overflow-hidden">
        {/* Left Section */}
        <div className="col-span-12 min-w-0 xl:col-span-7 w-full flex flex-col">
          {/* Filter */}
          <div className="w-full">
            <FilterBar
              compact
              search={search}
              setSearch={setSearch}
              placeholder="Search legal group..."
              filters={[
                {
                  label: "Status",
                  options: statuses,
                  value: status,
                  onChange: (e) => setStatus(e.target.value),
                },
              ]}

              showMoreFilters
              onMoreFilters={() => console.log("More Filters")}
              showAddButton
              addButtonLabel={
                activeTab === "legal-groups"
                  ? "Legal Group"
                  : activeTab === "legal-entities"
                    ? "Legal Entity"
                    : activeTab === "parent-divisions"
                      ? "Parent Division"
                      : activeTab === "sub-divisions"
                        ? "Sub Division"
                        : activeTab === "business-units"
                          ? "Business Unit"
                          : activeTab === "analysis-codes"
                            ? "Analysis Code"
                            : "Currency"
              }
              onAdd={() => {
                if (activeTab === "legal-groups") {
                  setEditLegalGroup(null);
                  setShowAddModal(true);
                }
                if (activeTab === "legal-entities") {
                  setEditLegalEntity(null);
                  setShowEntityModal(true);
                }
              }}
            />
          </div>

          {/* Legal Groups Table */}
          <div className="mt-2 w-full min-w-0 flex-1">
            {activeTab === "legal-groups" && (
              <LegalGroupsTable
                legalGroups={filteredLegalGroups}
                onSelect={setSelectedGroup}
                selectedGroup={selectedGroup}
                onEdit={(group) => {
                  setSelectedEditGroup(group);
                  setShowEditConfirm(true);
                }}
                onStatusToggle={handleStatusToggle}
              />
            )}
            {activeTab === "legal-entities" && (
              <LegalEntitiesMasterTable
                legalEntities={filteredLegalEntities}
                selectedEntity={selectedEntity}
                onSelect={setSelectedEntity}
                onEdit={(entity) => {
                  setSelectedEditGroup(entity);
                  setShowEditConfirm(true);
                }}
                onStatusToggle={handleEntityStatusToggle}
              />
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-12 min-w-0 xl:col-span-5 w-full">
          {activeTab === "legal-groups" && (
            <LegalGroupDetails
              group={selectedGroup}
              entities={legalEntitiesMock}
              onEdit={() => console.log("Edit")}
              onAnnotate={() => console.log("Annotate")}
              onViewAll={() => console.log("View All")}
              onStatusChange={(value) => console.log(value)}
            />
          )}
          {activeTab === "legal-entities" && (
            <LegalEntityDetails
              entity={selectedEntity}
              onEdit={() => console.log("Edit")}
              onAnnotate={() => console.log("Annotate")}
              onStatusChange={(value) => console.log(value)}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-55 right-0 border-t border-gray-200 bg-white px-3 py-1 shadow-sm">
        <FooterNote
          title="Note:"
          message="Master data changes will be reflected across FinSight reports and dashboards."
          lastUpdated="20 Jun 2026 10:15 AM"
          onRefresh={() => console.log("Refresh clicked")}
        />
      </div>

      {activeTab === "legal-groups" &&
        <AddLegalGroupModal
          open={showAddModal}
          editLegalGroup={editLegalGroup}
          onClose={() => {
            setShowAddModal(false);
            setEditLegalGroup(null);
          }}
          onSuccess={fetchLegalGroups}
        />
      }

      {activeTab === "legal-entities" && (
        <MasterDataModal
          open={showEntityModal}
          onClose={() => {
            setShowEntityModal(false);
            setEditLegalEntity(null);
          }}
          onSuccess={fetchLegalEntities}

          title="Legal Entity"

          editData={editLegalEntity}

          idField="legal_entity_id"
          codeField="legal_entity_code"
          nameField="legal_entity_name"

          codeLabel="Legal Entity Code"
          nameLabel="Legal Entity Name"

          addApi={addLegalEntities}
          updateApi={updateLegalEntities}
        />
      )}

      <ConfirmationModel
        open={showEditConfirm}
        title={
          activeTab === "legal-groups"
            ? "Edit Legal Group"
            : "Edit Legal Entity"
        }
        message={
          activeTab === "legal-groups"
            ? "Do you want to edit this Legal Group?"
            : "Do you want to edit this Legal Entity?"
        }
        confirmText="Edit"
        cancelText="Cancel"
        onCancel={() => {
          setShowEditConfirm(false);
          setSelectedEditGroup(null);
        }}
        onConfirm={() => {
          if (activeTab === "legal-groups") {
            setEditLegalGroup(selectedEditGroup);
            setShowAddModal(true);
          }

          if (activeTab === "legal-entities") {
            setEditLegalEntity(selectedEditGroup);
            setShowEntityModal(true);
          }

          setShowEditConfirm(false);
          setSelectedEditGroup(null);
        }}
      />
    </>
  );
}