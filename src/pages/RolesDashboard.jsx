// import React, { useState } from "react";
// import { UserPlus } from "lucide-react";

// import AdminLayout from "../components/layout/AdminLayout";
// import PageHeader from "../components/common/PageHeader";
// import StatCard from "../components/StatCard";
// import FilterBar from "../components/common/FilterBar";
// import RolesTable from "../components/roles/RolesTable";
// import RoleDetailsPanel from "../components/roles/RoleDetailsPanel";
// import FooterNote from "../components/FooterNote";

// import { roleStats, roles } from "../data/rolesData";
// import { statuses } from "../data/dummyData";


// export default function RolesDashboard() {

//   const [search, setSearch] = useState("");
//   const [activeOnly, setActiveOnly] = useState(true);
//   const [status, setStatus] = useState("All");
//   const [selectedRole, setSelectedRole] = useState(roles[0]);


//   const resetFilters = () => {
//     setSearch("");
//     setStatus("All");
//     setActiveOnly(true);
//   };


//   return (

//     <AdminLayout
//       activeMenu="Roles"
//       breadcrumbs={[
//         "Admin",
//         "Security",
//         "Roles"
//       ]}
//       company="FJ Group"
//       initials="SA"
//       userName="Super Admin"
//       userRole="Super Administrator"
//       notificationCount={3}
//     >


//       {/* Header */}

//       <PageHeader
//         title="Roles"
//         subtitle="Create and manage user roles, define permissions and access levels across FinSight."
//         buttonText="Add Role"
//         buttonIcon={UserPlus}
//       />



//       {/* KPI CARDS */}

//       <div
//         className="
//           grid
//           grid-cols-1
//           sm:grid-cols-2
//           xl:grid-cols-5
//           gap-0.75
//         "
//       >

//         {roleStats.map((item,index)=>(

//           <StatCard
//             key={item.title}
//             {...item}
//             delay={index * 0.08}
//           />

//         ))}

//       </div>





//       {/* MAIN CONTENT */}

//       <div
//         className="
//           grid
//           grid-cols-1
//           xl:grid-cols-12
//           gap-x-0.75
//           gap-y-0.75
//           mt-0.75
//         "
//       >



//         {/* LEFT : 40% */}

//         <div
//           className="
//             xl:col-span-5
//             flex
//             flex-col
//             gap-0.75
//             min-h-0
//           "
//         >


//           {/* FILTER BAR */}

//           <FilterBar

//             width="full"

//             stackActions

//             search={search}

//             setSearch={setSearch}

//             placeholder="Search role name or description..."

//             filters={[
//               {
//                 label:"Status",
//                 options:statuses,
//                 value:status,
//                 onChange:(e)=>setStatus(e.target.value),
//               },
//             ]}

//             activeOnly={activeOnly}

//             setActiveOnly={setActiveOnly}

//             toggleLabel="Active Roles Only"

//             onReset={resetFilters}

//           />





//           {/* ROLES TABLE */}

//           <div
//             className="
//               h-[calc(100vh-320px)]
//               min-h-112.5
//               rounded-xl
//               border
//               border-gray-200
//               bg-white
//               shadow-sm
//               overflow-hidden
//               p-2
//             "
//           >

//             <RolesTable

//               roles={roles}

//               search={search}

//               activeOnly={activeOnly}

//               selectedRole={selectedRole}

//               setSelectedRole={setSelectedRole}

//             />


//           </div>


//         </div>





//         {/* RIGHT : 60% */}

//         <div
//           className="
//             xl:col-span-7
//           "
//         >

//           <RoleDetailsPanel

//             role={selectedRole}

//           />


//         </div>



//       </div>





//       {/* FOOTER */}

//       <div
//         className="
//           mt-0.75
//         "
//       >

//         <FooterNote

//           title="Note:"

//           message="Changes to role permission will affect all users assigned to this role."

//         />

//       </div>



//     </AdminLayout>

//   );

// }

import React, { useState } from "react";
import { UserPlus } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/StatCard";
import FilterBar from "../components/common/FilterBar";
import RolesTable from "../components/roles/RolesTable";
import RoleDetailsPanel from "../components/roles/RoleDetailsPanel";
import FooterNote from "../components/FooterNote";

import { roleStats, roles } from "../data/rolesData";
import { statuses } from "../data/dummyData";


export default function RolesDashboard() {

  const [search, setSearch] = useState("");
  const [activeOnly, setActiveOnly] = useState(true);
  const [status, setStatus] = useState("All");
  const [selectedRole, setSelectedRole] = useState(roles[0]);


  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setActiveOnly(true);
  };


  return (

    <>

      {/* Header */}

      <PageHeader
        title="Roles"
        subtitle="Create and manage user roles, define permissions and access levels across FinSight."
        buttonText="Add Role"
        buttonIcon={UserPlus}
      />



      {/* KPI CARDS */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-5
          gap-0.75
        "
      >

        {roleStats.map((item,index)=>(

          <StatCard
            key={item.title}
            {...item}
            delay={index * 0.08}
          />

        ))}

      </div>





      {/* MAIN CONTENT */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-12
          gap-x-0.75
          gap-y-0.75
          mt-0.75
        "
      >



        {/* LEFT : 40% */}

        <div
          className="
            xl:col-span-5
            flex
            flex-col
            gap-0.75
            min-h-0
          "
        >


          {/* FILTER BAR */}

          <FilterBar

            width="full"

            stackActions

            search={search}

            setSearch={setSearch}

            placeholder="Search role name or description..."

            filters={[
              {
                label:"Status",
                options:statuses,
                value:status,
                onChange:(e)=>setStatus(e.target.value),
              },
            ]}

            activeOnly={activeOnly}

            setActiveOnly={setActiveOnly}

            toggleLabel="Active Roles Only"

            onReset={resetFilters}

          />





          {/* ROLES TABLE */}

          <div
            className="
              h-[calc(100vh-320px)]
              min-h-112.5
              rounded-xl
              border
              border-gray-200
              bg-white
              shadow-sm
              overflow-hidden
              p-2
            "
          >

            <RolesTable

              roles={roles}

              search={search}

              activeOnly={activeOnly}

              selectedRole={selectedRole}

              setSelectedRole={setSelectedRole}

            />


          </div>


        </div>





        {/* RIGHT : 60% */}

        <div
          className="
            xl:col-span-7
          "
        >

          <RoleDetailsPanel

            role={selectedRole}

          />


        </div>



      </div>





      {/* FOOTER */}

      <div
        className="
          mt-0.75
        "
      >

        <FooterNote

          title="Note:"

          message="Changes to role permission will affect all users assigned to this role."

        />

      </div>


    </>

  );

}