
// import { useState, useMemo } from "react";
// import {
//   UserPlus,
//   Users,
//   UserCheck,
//   UserX,
//   ShieldAlert,
//   UserCog,
// } from "lucide-react";

// import AdminLayout from "../components/layout/AdminLayout";
// import PageHeader from "../components/common/PageHeader";
// import FilterBar from "../components/common/FilterBar";
// import StatCard from "../components/StatCard";
// import UserTable from "../components/users/UserTable";
// import UserDetails from "../components/users/UserDetails";
// import FooterNote from "../components/FooterNote";

// import { users, stats } from "../data/dummyData";

// export default function UsersDashboard() {
//   const [search, setSearch] = useState("");
//   const [activeOnly, setActiveOnly] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(users[0]);

//   // Filter users
//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const matchesSearch =
//         user.name.toLowerCase().includes(search.toLowerCase()) ||
//         user.email.toLowerCase().includes(search.toLowerCase()) ||
//         user.code.toLowerCase().includes(search.toLowerCase());

//       const matchesActive =
//         !activeOnly || user.status === "Active";

//       return matchesSearch && matchesActive;
//     });
//   }, [search, activeOnly]);

//   // Add icons to stat cards
//   const statCards = stats.map((item) => {
//     let icon = Users;

//     switch (item.key) {
//       case "total":
//         icon = Users;
//         break;
//       case "active":
//         icon = UserCheck;
//         break;
//       case "inactive":
//         icon = UserX;
//         break;
//       case "locked":
//         icon = ShieldAlert;
//         break;
//       case "noRole":
//         icon = UserCog;
//         break;
//     }

//     return {
//       ...item,
//       icon,
//     };
//   });

//   return (
//     <AdminLayout
//       activeMenu="Users"
//       breadcrumbs={["Admin", "Security", "Users"]}
//       company="FJ Group"
//       initials="SA"
//       userName="Super Admin"
//       userRole="Super Administrator"
//       notificationCount={3}
//     >
//       {/* Header */}
//       <PageHeader
//         title="Users"
//         subtitle="Manage application users, their roles and account status."
//         buttonText="Add User"
//         buttonIcon={UserPlus}
//       />

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
//         {statCards.map((item, index) => (
//           <StatCard
//             key={item.title}
//             {...item}
//             delay={index * 0.08}
//           />
//         ))}
//       </div>

//       {/* Filter */}
//       <FilterBar
//         search={search}
//         setSearch={setSearch}
//         activeOnly={activeOnly}
//         setActiveOnly={setActiveOnly}
//       />

//       {/* Table + Details */}
//       <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
//         <UserTable
//           users={filteredUsers}
//           total={users.length}
//           selectedId={selectedUser?.id}
//           onSelect={setSelectedUser}
//         />

//         {selectedUser && (
//           <UserDetails
//             user={selectedUser}
//             onClose={() => setSelectedUser(null)}
//           />
//         )}
//       </div>

//       {/* Footer */}
//       <FooterNote />
//     </AdminLayout>
//   );
// }

import { useState, useMemo } from "react";
import {
  UserPlus,
  Users,
  UserCheck,
  UserX,
  ShieldAlert,
  UserCog,
} from "lucide-react";

import AdminLayout from "../components/layout/AdminLayout";
import PageHeader from "../components/common/PageHeader";
import FilterBar from "../components/common/FilterBar";
import StatCard from "../components/StatCard";
import UserTable from "../components/users/UserTable";
import UserDetails from "../components/users/UserDetails";
import FooterNote from "../components/FooterNote";

import {
  users,
  stats,
  statuses,
  roles,
  departments,
  legalGroups,
} from "../data/dummyData";

export default function UsersDashboard() {
  // ----------------------------
  // State
  // ----------------------------

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");
  const [role, setRole] = useState("All");
  const [department, setDepartment] = useState("All");
  const [legalGroup, setLegalGroup] = useState("All");

  const [activeOnly, setActiveOnly] = useState(false);

  const [selectedUser, setSelectedUser] = useState(users[0]);

  // ----------------------------
  // Reset Filters
  // ----------------------------

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setRole("All");
    setDepartment("All");
    setLegalGroup("All");
    setActiveOnly(false);
  };

  // ----------------------------
  // Filter Users
  // ----------------------------

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.code.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || user.status === status;

      const matchesRole =
        role === "All" || user.role === role;

      const matchesDepartment =
        department === "All" ||
        user.department === department;

      const matchesLegalGroup =
        legalGroup === "All" ||
        user.legalGroup === legalGroup;

      const matchesActive =
        !activeOnly || user.status === "Active";

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRole &&
        matchesDepartment &&
        matchesLegalGroup &&
        matchesActive
      );
    });
  }, [
    search,
    status,
    role,
    department,
    legalGroup,
    activeOnly,
  ]);

  // ----------------------------
  // KPI Cards
  // ----------------------------

  const statCards = stats.map((item) => {
    let icon = Users;

    switch (item.key) {
      case "total":
        icon = Users;
        break;

      case "active":
        icon = UserCheck;
        break;

      case "inactive":
        icon = UserX;
        break;

      case "locked":
        icon = ShieldAlert;
        break;

      case "noRole":
        icon = UserCog;
        break;

      default:
        icon = Users;
    }

    return {
      ...item,
      icon,
    };
  });

  // ----------------------------
  // UI
  // ----------------------------

  return (
    <AdminLayout
      activeMenu="Users"
      breadcrumbs={["Admin", "Security", "Users"]}
      company="FJ Group"
      initials="SA"
      userName="Super Admin"
      userRole="Super Administrator"
      notificationCount={3}
    >
      {/* Header */}
      <PageHeader
        title="Users"
        subtitle="Manage application users, their roles and account status."
        buttonText="Add User"
        buttonIcon={UserPlus}
        onButtonClick={() => console.log("Add User")}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {statCards.map((item, index) => (
          <StatCard
            key={item.title}
            {...item}
            delay={index * 0.08}
          />
        ))}
      </div>

      {/* Filter Bar */}
    
     <FilterBar
       search={search}
       setSearch={setSearch}
       placeholder="Search by name, email or employee code..."
     
       filters={[
         {
           label:"Status",
           options:statuses,
           value:status,
           onChange:(e)=>setStatus(e.target.value),
         },
         {
           label:"Role",
           options:roles,
           value:role,
           onChange:(e)=>setRole(e.target.value),
         },
         {
           label:"Department",
           options:departments,
           value:department,
           onChange:(e)=>setDepartment(e.target.value),
         },
         {
           label:"Legal Group",
           options:["All", ...legalGroups],
           value:legalGroup,
           onChange:(e)=>setLegalGroup(e.target.value),
         },
       ]}
       activeOnly={activeOnly}
       setActiveOnly={setActiveOnly}
       toggleLabel="Active Users Only"
        showMoreFilters
       onReset={resetFilters}
     />

           {/* User Table + Details */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <UserTable
          users={filteredUsers}
          total={filteredUsers.length}
          selectedId={selectedUser?.id}
          onSelect={setSelectedUser}
        />

        {selectedUser && (
          <UserDetails
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>

      {/* Footer */}
      
            <FooterNote
             title="Note:"
              message="Deactivated users will not able to login.Locked users are blocked due to multiple failed login attempts."
             lastUpdated="20 Jun 2026 10:15 AM"
              onRefresh={() => console.log("Refresh clicked")}
           />
            
    </AdminLayout>
  );
}