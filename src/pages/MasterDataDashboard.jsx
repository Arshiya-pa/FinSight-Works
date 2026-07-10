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

import React, { useState } from "react";

import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/StatCard";
import FilterBar from "../components/common/FilterBar";
import FooterNote from "../components/FooterNote";
import MasterDataTabs from "../components/masterdata/MasterDataTabs";
import LegalGroupsTable from "../components/masterdata/LegalGroupsTable";
import LegalGroupDetails from "../components/masterdata/LegalGroupDetails";

import {
  masterCards,
  legalGroupMock,
  legalEntitiesMock,
} from "../data/masterData";

import { statuses } from "../data/dummyData";


export default function MasterDataDashboard() {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");


  return (

    <>

      {/* Header */}

      <PageHeader
        title="Master Data"
        subtitle="Manage and maintain master data used across FinSight."
      />



      {/* KPI Cards */}

      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7">

        {masterCards.map((item, index) => (

          <StatCard
            key={`${item.title}-${index}`}
            {...item}
            delay={index * 0.08}
          />

        ))}

      </div>




      {/* Tabs */}

      <div className="mt-2">

        <MasterDataTabs />

      </div>




      {/* Main Content */}

      <div className="mt-2 grid grid-cols-12 gap-2 overflow-hidden">


        {/* Left Section */}

        <div className="col-span-12 min-w-0 xl:col-span-7 w-full">


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

              addButtonLabel="Legal Group"

              onAdd={() => console.log("Add Legal Group")}

            />

          </div>




          {/* Legal Groups Table */}

          <div className="mt-2 w-full min-w-0">

            <LegalGroupsTable />

          </div>


        </div>





        {/* Right Section */}

        <div className="col-span-12 min-w-0 xl:col-span-5 w-full">


          <LegalGroupDetails

            group={legalGroupMock}

            entities={legalEntitiesMock}

            onEdit={() => console.log("Edit")}

            onAnnotate={() => console.log("Annotate")}

            onViewAll={() => console.log("View All")}

            onStatusChange={(value) => console.log(value)}

          />


        </div>


      </div>





      {/* Footer */}

      <div className="mt-2">

        <FooterNote

          title="Note:"

          message="Master data changes will be reflected across FinSight reports and dashboards."

          lastUpdated="20 Jun 2026 10:15 AM"

          onRefresh={() => console.log("Refresh clicked")}

        />

      </div>


    </>

  );

}