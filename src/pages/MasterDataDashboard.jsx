
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
import ParentDivisionTable from "../components/masterdata/ParentDivisionTable";
import ParentDivisionDetails from "../components/masterdata/ParentDivisionDetails";
import BusinessUnitDetails from "../components/masterdata/BusinessUnitDetails";
import SubDivisionTable from "../components/masterdata/SubDivisionTable";
import BusinessUnitTable from "../components/masterdata/BusinessUnitTable";
import AnalysisCodeTable from "../components/masterdata/AnalysisCodeTable";
import SubDivisionDetails from "../components/masterdata/SubDivisionDetails";
import AnalysisCodeDetails from "../components/masterdata/AnalysisCodeDetails";

import { masterCards, legalGroupMock, legalEntitiesMock, } from "../data/masterData";

import ConfirmationModel from "../components/common/ConfirmationModel";
import { statuses } from "../data/dummyData";
import {
  addLegalGroup, updateLegalGroup, getLegalGroups,
  getLegalEntities, updateLegalEntities, addLegalEntities,
  getParentDivision, addParentDivision, updateParentDivision,
  getSubDivision, addSubDivision, updateSubDivision,
  getBusinessunits, addBusinessunits, updateBusinessunits,
  getAnalysisCodes, addAnalysisCodes, updateAnalysisCodes,
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
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const [showParentDivisionModal, setShowParentDivisionModal] = useState(false);
  const [editParentDivision, setEditParentDivision] = useState(null);
  const [parentDivisions, setParentDivisions] = useState([]);
  const [selectedParentDivision, setSelectedParentDivision] = useState(null);

  const [showSubDivisionModal, setShowSubDivisionModal] = useState(false);
  const [editSubDivision, setEditSubDivision] = useState(null);
  const [SubDivisions, setSubDivisions] = useState([]);
  const [selectedSubDivision, setSelectedSubDivision] = useState(null);

  const [showBusinessUnitModal, setShowBusinessUnitModal] = useState(false);
  const [editBusinessUnit, setEditBusinessUnit] = useState(null);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState(null);

  const [showAnalysisCodeModal, setShowAnalysisCodeModal] = useState(false);
  const [editAnalysisCode, setEditAnalysisCode] = useState(null);
  const [analysisCodes, setAnalysisCodes] = useState([]);
  const [selectedAnalysisCode, setSelectedAnalysisCode] = useState(null);



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
      value: parentDivisions.filter(
        (item) => item.active
      ).length,
      description: "Active",
      icon: masterCards[2].icon,
      color: masterCards[2].color,
    },
    {
      id: "sub-divisions",
      title: "Sub Divisions",
      value: SubDivisions.filter(
        (item) => item.active
      ).length,
      description: "Active",
      icon: masterCards[3].icon,
      color: masterCards[3].color,
    },
    {
      id: "business-units",
      title: "Business Units",
      value: businessUnits.filter(
        (item) => item.active
      ).length,
      description: "Active",
      icon: masterCards[4].icon,
      color: masterCards[4].color,
    },
    {
      id: "analysis-codes",
      title: "Analysis Codes",
      value: analysisCodes.filter(
        (item) => item.active
      ).length,
      description: "Active",
      icon: masterCards[5].icon,
      color: masterCards[5].color,
    },
    {
      id: "currencies",
      title: "Currencies",
      value: legalGroups.filter(
        (group) => group.active === false
      ).length,
      description: "Active",
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
        fetchParentDivisions(),
        fetchSubDivisions(),
        fetchBusinessUnits(),
        fetchAnalysisCodes(),
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
  /* -------------------- FETCH PARENT DIVISIONS -------------------- */
  const fetchParentDivisions = async () => {
    try {
      const response = await getParentDivision();
      const data =
        response.data.data || response.data;
      const updatedDivisions = data.map((item) => ({
        ...item,
        active: item.active ?? true,
      }));
      setParentDivisions(updatedDivisions);
      if (updatedDivisions.length > 0) {
        setSelectedParentDivision(updatedDivisions[0]);
      } else {
        setSelectedParentDivision(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* -------------------- FETCH SUB DIVISIONS -------------------- */
  const fetchSubDivisions = async () => {
    try {
      const response = await getSubDivision();
      const data =
        response.data.data || response.data;
      const updatedDivisions = data.map((item) => ({
        ...item,
        active: item.active ?? true,
      }));
      setSubDivisions(updatedDivisions);
      if (updatedDivisions.length > 0) {
        setSelectedSubDivision(updatedDivisions[0]);
      } else {
        setSelectedSubDivision(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* -------------------- FETCH BUSINESS UNITS -------------------- */
  const fetchBusinessUnits = async () => {
    try {
      const response = await getBusinessunits();

      const data =
        response.data.data || response.data;

      const updatedUnits = data.map((item) => ({
        ...item,
        active: item.active ?? true,
      }));

      setBusinessUnits(updatedUnits);

      if (updatedUnits.length > 0) {
        setSelectedBusinessUnit(updatedUnits[0]);
      } else {
        setSelectedBusinessUnit(null);
      }

    } catch (error) {
      console.log(
        "Business Unit Load Error:",
        error
      );
    }
  };
  /* -------------------- FETCH ANALYSIS CODES -------------------- */
  const fetchAnalysisCodes = async () => {
    try {

      const response = await getAnalysisCodes();
      const data =
        response.data.data || response.data;
      const updatedCodes = data.map((item) => ({
        ...item,
        active: item.active ?? true,
      }));

      setAnalysisCodes(updatedCodes);
      if (updatedCodes.length > 0) {
        setSelectedAnalysisCode(
          updatedCodes[0]
        );

      } else {
        setSelectedAnalysisCode(null);
      }
    } catch (error) {
      console.log(
        "Analysis Code Load Error:",
        error
      );
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

    const matchesSearch =
      group.legal_group_code?.toLowerCase().includes(keyword) ||
      group.legal_group_name?.toLowerCase().includes(keyword);

    const matchesStatus =
      status === "All" ||
      (status === "Active" && group.active) ||
      (status === "Inactive" && !group.active);

    return matchesSearch && matchesStatus;
  });
  /* ------------ FILTER PARENT DIVISIONS WITH INPUT BOX -------------------- */
  const filteredParentDivisions =
    parentDivisions.filter((item) => {

      const keyword = search.toLowerCase();

      const matchesSearch =
        item.parent_division_code
          ?.toLowerCase()
          .includes(keyword) ||

        item.parent_division_name
          ?.toLowerCase()
          .includes(keyword);

      const matchesStatus =
        status === "All" ||
        (status === "Active" && item.active === true) ||
        (status === "Inactive" && item.active === false);

      return matchesSearch && matchesStatus;
    });

  /* ------------ FILTER SUB DIVISIONS WITH INPUT BOX -------------------- */
  const filteredSubDivisions =
    SubDivisions.filter((item) => {

      const keyword = search.toLowerCase();

      const matchesSearch =
        item.subdivision_code
          ?.toLowerCase()
          .includes(keyword) ||

        item.subdivision_name
          ?.toLowerCase()
          .includes(keyword);

      const matchesStatus =
        status === "All" ||
        (status === "Active" && item.active === true) ||
        (status === "Inactive" && item.active === false);

      return matchesSearch && matchesStatus;
    });

  /* ------------ FILTER BUSINESS UNITS WITH INPUT BOX -------------------- */
  const filteredBusinessUnits =
    businessUnits.filter((item) => {

      const keyword = search.toLowerCase();
      const matchesSearch =

        item.business_unit_name
          ?.toLowerCase()
          .includes(keyword);

      const matchesStatus =
        status === "All" ||
        (status === "Active" && item.active === true) ||
        (status === "Inactive" && item.active === false);

      return matchesSearch && matchesStatus;
    });

  /* ------------ FILTER ANALYSIS CODES WITH INPUT BOX -------------------- */
  const filteredAnalysisCodes =
    analysisCodes.filter((item) => {

      const keyword = search.toLowerCase();

      const matchesSearch =

        item.analysis_code
          ?.toLowerCase()
          .includes(keyword) ||

        item.analysis_name
          ?.toLowerCase()
          .includes(keyword);

      const matchesStatus =
        status === "All" ||
        (status === "Active" && item.active === true) ||
        (status === "Inactive" && item.active === false);

      return matchesSearch && matchesStatus;
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

      case "parent-divisions":
        fetchParentDivisions();
        break;

      case "sub-divisions":
        fetchSubDivisions();
        break;

      case "business-units":
        fetchBusinessUnits();
        break;

      case "analysis-codes":
        fetchAnalysisCodes();
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
  const handleParentDivisionStatusToggle =
    async (item) => {
      try {
        await updateParentDivision(
          item.parent_division_id,
          {
            parent_division_code:
              item.parent_division_code,

            parent_division_name:
              item.parent_division_name,

            active: !item.active,
          }
        );
        toast.success(
          "Parent Division updated successfully"
        );
        fetchParentDivisions();
      } catch (error) {
        toast.error(
          "Unable to update Parent Division"
        );
      }
    };
  const handleSubDivisionStatusToggle =
    async (item) => {
      try {
        await updateSubDivision(
          item.subdivision_id,
          {
            subdivision_code:
              item.subdivision_code,

            subdivision_name:
              item.subdivision_name,

            parent_division_id:
              item.parent_division_id,

            active: !item.active,
          }
        );
        toast.success(
          "Sub Division updated successfully"
        );
        fetchParentDivisions();
      } catch (error) {
        toast.error(
          "Unable to update Sub Division"
        );
      }

    };

  const handleBusinessUnitStatusToggle =
    async (item) => {
      try {
        await updateBusinessunits(
          item.business_unit_id,
          {
            business_unit_name:
              item.business_unit_name,
            subdivision_id:
              item.subdivision_id,
            subdivision_code:
              item.subdivision_code,
            subdivision_name:
              item.subdivision_name,
            parent_division_id:
              item.parent_division_id,
            parent_division_code:
              item.parent_division_code,
            parent_division_name_name:
              item.parent_division_name,
            active: !item.active,
          }
        );
        toast.success(
          "Business Units updated successfully"
        );
        fetchBusinessUnits();
      } catch (error) {
        toast.error(
          "Unable to update Business Units"
        );
      }
    };
  const handleAnalysisCodeStatusToggle =
    async (item) => {
      try {
        await updateAnalysisCodes(
          item.analysis_code_id,
          {
            analysis_code:
              item.analysis_code,

            analysis_name:
              item.analysis_name,

            active: !item.active,
          }
        );
        toast.success(
          "Analysis Codes updated successfully"
        );
        fetchAnalysisCodes();
      } catch (error) {
        toast.error(
          "Unable to update Analysis Codes"
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
                if (activeTab === "parent-divisions") {
                  setEditParentDivision(null);
                  setShowParentDivisionModal(true);
                }
                if (activeTab === "sub-divisions") {
                  setEditSubDivision(null);
                  setShowSubDivisionModal(true);
                }
                if (activeTab === "business-units") {
                  setEditBusinessUnit(null);
                  setShowBusinessUnitModal(true);
                }
                if (activeTab === "analysis-codes") {
                  setEditAnalysisCode(null);
                  setShowAnalysisCodeModal(true);
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
            {activeTab === "parent-divisions" && (
              <ParentDivisionTable
                parentDivisions={filteredParentDivisions}
                selectedDivision={selectedParentDivision}
                onSelect={setSelectedParentDivision}
                onEdit={(division) => {
                  setSelectedEditGroup(division);
                  setShowEditConfirm(true);
                }}
                onStatusToggle={handleParentDivisionStatusToggle}
              />
            )}

            {activeTab === "sub-divisions" && (
              <SubDivisionTable
                subDivisions={filteredSubDivisions}
                selectedDivision={selectedSubDivision}
                onSelect={setSelectedSubDivision}
                onEdit={(division) => {
                  setSelectedEditGroup(division);
                  setShowEditConfirm(true);
                }}
                onStatusToggle={handleSubDivisionStatusToggle}
              />
            )}
            {activeTab === "business-units" && (
              <BusinessUnitTable
                businessUnits={filteredBusinessUnits}
                selectedBusinessUnit={selectedBusinessUnit}
                onSelect={setSelectedBusinessUnit}
                onEdit={(unit) => {
                  setSelectedEditGroup(unit);
                  setShowEditConfirm(true);
                }}
                onStatusToggle={handleBusinessUnitStatusToggle}
              />
            )}
            {activeTab === "analysis-codes" && (
              <AnalysisCodeTable
                analysisCodes={filteredAnalysisCodes}
                selectedAnalysisCode={selectedAnalysisCode}
                onSelect={setSelectedAnalysisCode}
                onEdit={(code) => {
                  setSelectedEditGroup(code);
                  setShowEditConfirm(true);
                }}
                onStatusToggle={handleAnalysisCodeStatusToggle}
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
          {activeTab === "parent-divisions" && (
            <ParentDivisionDetails
              division={selectedParentDivision}
              onEdit={() => {
                setSelectedEditGroup(selectedParentDivision);
                setShowEditConfirm(true);
              }}
              onAnnotate={() =>
                console.log("Annotate")
              }
              onStatusChange={(value) =>
                console.log(value)
              }
            />
          )}
          {activeTab === "sub-divisions" && (
            <SubDivisionDetails
              subdivision={selectedSubDivision}
              onEdit={() => {
                setSelectedEditGroup(selectedSubDivision);
                setShowEditConfirm(true);
              }}
              onAnnotate={() =>
                console.log("Annotate")
              }
              onStatusChange={(value) =>
                console.log(value)
              }
            />
          )}
          {activeTab === "business-units" && (
            <BusinessUnitDetails
              businessUnit={selectedBusinessUnit}
              onEdit={() => {
                setSelectedEditGroup(selectedBusinessUnit);
                setShowEditConfirm(true);
              }}
              onAnnotate={() =>
                console.log("Annotate")
              }
              onStatusChange={(value) =>
                console.log(value)
              }
            />
          )}
          {activeTab === "analysis-codes" && (
            <AnalysisCodeDetails
              analysisCode={selectedAnalysisCode}
              onEdit={() => {
                setSelectedEditGroup(selectedAnalysisCode);
                setShowEditConfirm(true);
              }}
              onAnnotate={() =>
                console.log("Annotate")
              }
              onStatusChange={(value) =>
                console.log(value)
              }
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
      {activeTab === "parent-divisions" && (
        <MasterDataModal

          open={showParentDivisionModal}
          onClose={() => {
            setShowParentDivisionModal(false);
            setEditParentDivision(null);
          }}
          onSuccess={fetchParentDivisions}
          title="Parent Division"
          editData={editParentDivision}
          idField="parent_division_id"
          codeField="parent_division_code"
          nameField="parent_division_name"
          codeLabel="Parent Division Code"
          nameLabel="Parent Division Name"
          addApi={addParentDivision}
          updateApi={updateParentDivision}
        />
      )}
      {activeTab === "sub-divisions" && (
        <MasterDataModal
          open={showSubDivisionModal}
          onClose={() => {
            setShowSubDivisionModal(false);
            setEditSubDivision(null);
          }}
          onSuccess={fetchSubDivisions}
          title="Sub Division"
          editData={editSubDivision}
          idField="subdivision_id"
          codeField="subdivision_code"
          nameField="subdivision_name"
          codeLabel="Subdivision Code"
          nameLabel="Subdivision Name"
          extraFields={[
            {
              name: "parent_division_id",
              label: "Parent Division ID",
              type: "text",
            },
          ]}
          addApi={addSubDivision}
          updateApi={updateSubDivision}
        />
      )}
      {activeTab === "business-units" && (
        <MasterDataModal
          open={showBusinessUnitModal}
          onClose={() => {
            setShowBusinessUnitModal(false);
            setEditBusinessUnit(null);
          }}
          onSuccess={fetchBusinessUnits}
          title="Business Unit"
          editData={editBusinessUnit}
          idField="business_unit_id"
          codeField={null}
          nameField="business_unit_name"
          nameLabel="Business Unit Name"
          extraFields={[
            {
              name: "subdivision_id",
              label: "Subdivision ID"
            },

            {
              name: "subdivision_code",
              label: "Subdivision Code"
            },

            {
              name: "subdivision_name",
              label: "Subdivision Name"
            },

            {
              name: "parent_division_id",
              label: "Parent Division ID"
            },

            {
              name: "parent_division_code",
              label: "Parent Division Code"
            },

            {
              name: "parent_division_name",
              label: "Parent Division Name"
            }

          ]}
          addApi={addBusinessunits}
          updateApi={updateBusinessunits}
          compactLayout={true}
        />
      )}
      {activeTab === "analysis-codes" && (
        <MasterDataModal
          open={showAnalysisCodeModal}
          onClose={() => {
            setShowAnalysisCodeModal(false);
            setEditAnalysisCode(null);
          }}
          onSuccess={fetchAnalysisCodes}
          title="Analysis Code"
          editData={editAnalysisCode}
          idField="analysis_code_id"
          codeField="analysis_code"
          nameField="analysis_name"
          codeLabel="Analysis Code"
          nameLabel="Analysis Name"
          addApi={addAnalysisCodes}
          updateApi={updateAnalysisCodes}
        />
      )}

      <ConfirmationModel
        open={showEditConfirm}

        title={
          activeTab === "legal-groups"
            ? "Edit Legal Group"

            : activeTab === "legal-entities"
              ? "Edit Legal Entity"

              : activeTab === "parent-divisions"
                ? "Edit Parent Division"

                : activeTab === "sub-divisions"
                  ? "Edit Sub Division"

                  : activeTab === "business-units"
                    ? "Edit Business Unit"

                    : activeTab === "analysis-codes"
                      ? "Edit Analysis Code"

                      : ""
        }


        message={
          activeTab === "legal-groups"
            ? "Do you want to edit this Legal Group?"

            : activeTab === "legal-entities"
              ? "Do you want to edit this Legal Entity?"

              : activeTab === "parent-divisions"
                ? "Do you want to edit this Parent Division?"

                : activeTab === "sub-divisions"
                  ? "Do you want to edit this Sub Division?"

                  : activeTab === "business-units"
                    ? "Do you want to edit this Business Unit?"

                    : activeTab === "analysis-codes"
                      ? "Do you want to edit this Analysis Code?"

                      : ""
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

          if (activeTab === "parent-divisions") {

            setEditParentDivision(selectedEditGroup);
            setShowParentDivisionModal(true);

          }

          if (activeTab === "sub-divisions") {

            setEditSubDivision(selectedEditGroup);
            setShowSubDivisionModal(true);

          }

          if (activeTab === "business-units") {

            setEditBusinessUnit(selectedEditGroup);
            setShowBusinessUnitModal(true);

          }

          if (activeTab === "analysis-codes") {

            setEditAnalysisCode(selectedEditGroup);
            setShowAnalysisCodeModal(true);

          }

          setShowEditConfirm(false);
          setSelectedEditGroup(null);

        }}

      />
    </>
  );
}