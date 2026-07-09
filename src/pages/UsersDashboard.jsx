

import { useState, useMemo, useEffect } from "react";
import { UserPlus, Users, UserCheck, UserX, ShieldAlert, UserCog, } from "lucide-react";

import AdminLayout from "../components/layout/AdminLayout";
import PageHeader from "../components/common/PageHeader";
import FilterBar from "../components/common/FilterBar";
import StatCard from "../components/StatCard";
import UserTable from "../components/users/UserTable";
import UserDetails from "../components/users/UserDetails";
import FooterNote from "../components/FooterNote";

import {
  stats,
  departments,
} from "../data/dummyData";

import { getUsers, getRoles, getLegalGroups } from "../api/userApi";


export default function UsersDashboard() {

  /* -------------------- STATES -------------------- */

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");
  const [userStatusFilter, setUserStatusFilter] = useState("All");

  const [role, setRole] = useState("All");
  const [roleOptions, setRoleOptions] = useState(["All"]);

  const [department, setDepartment] = useState("All");

  const [legalGroup, setLegalGroup] = useState("All");
  const [legalGroupOptions, setLegalGroupOptions] = useState(["All"]);

  const [activeOnly, setActiveOnly] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(false);
  /* -------------------- PAGINATION -------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* -------------------- FETCH USERS -------------------- */

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      console.log("Users API Response:", response.data);

      console.table(
        response.data.map((u) => ({
          id: u.user_profile_id,
          name: u.employee_name,
        }))
      );
      const formattedUsers = response.data.map((user) => ({
        id: user.user_profile_id,
        code: user.employee_code,
        name: user.employee_name,
        email: user.official_email,
        department: user.department ?? "-",
        role: user.role_code,
        status: user.active ? "Active" : "Inactive",
        lastLogin: "-",

        dateOfJoining: user.date_of_joining ?? "-",
        jobTitle: user.designation ?? "-",
        phone: user.phone ?? "--",
        location: user.location ?? "--",
        emailVerified: user.email_verified ?? false,
        mfaEnabled: user.mfa_enabled ?? false,

        raw: user,
      }));

      setUsers(formattedUsers);

      setSelectedUser((prev) => {
        if (prev) {
          const updatedSelected = formattedUsers.find(
            (item) => item.id === prev.id
          );
          return updatedSelected || formattedUsers[0];
        }
        return formattedUsers[0];
      });

    } catch (error) {
      console.error("Users API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- FETCH ROLES -------------------- */
  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      console.log("roles is", response.data.data);
      const roles = response.data.data.map((item) => item.name);
      setRoleOptions([
        {
          id: 0,
          code: "All",
          name: "All",
        },
        ...response.data.data,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  /* -------------------- FETCH LEGAL GROUPS -------------------- */
  const fetchLegalGroups = async () => {
    try {
      const response = await getLegalGroups();
      console.log("Legal Groups:", response.data);
      setLegalGroupOptions([
        {
          id: 0,
          code: "All",
          name: "All",
        },
        ...response.data.data,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  /* -------------------- PAGE LOAD -------------------- */

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchLegalGroups();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    status,
    role,
    department,
    legalGroup,
    activeOnly,
  ]);

  /* -------------------- RESET FILTERS -------------------- */

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setRole("All");
    setDepartment("All");
    setLegalGroup("All");
    setActiveOnly(false);
  };

  /* -------------------- FILTER USERS -------------------- */

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {

      const matchesSearch =
        (user.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (user.code || "").toLowerCase().includes(search.toLowerCase());

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
  userStatusFilter === "All" ||
  user.status === userStatusFilter;

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
    users,
    search,
    status,
    role,
    department,
    legalGroup,
    activeOnly,
  ]);
  /* -------------------- PAGINATION -------------------- */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / pageSize)
  );

  const startIndex = (currentPage - 1) * pageSize;

  const endIndex = startIndex + pageSize;

  const currentUsers = filteredUsers.slice(
    startIndex,
    endIndex
  );
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleFirst = () => {
    setCurrentPage(1);
  };

  const handleLast = () => {
    setCurrentPage(totalPages);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  /* -------------------- KPI CARDS -------------------- */

  const statCards = stats.map((item) => {

    let icon = Users;

    switch (item.id) {

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

  /* -------------------- LOADING -------------------- */

  if (loading) {
    return (
      <AdminLayout activeMenu="Users">
        <div className="p-6 text-sm">
          Loading Users...
        </div>
      </AdminLayout>
    );
  }
  console.log("Current Selected User:", selectedUser);
  /* ---------- PART 2 STARTS WITH RETURN ---------- */
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

      <div className="flex flex-col gap-0.5">
        {/* HEADER */}
        <PageHeader
          title="Users"
          subtitle="Manage application users, their roles and account status."
          buttonText="Add User"
          buttonIcon={UserPlus}
          onButtonClick={() => console.log("Add User")}
        />
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-0.5">
          {statCards.map((item, index) => (
            <StatCard
              key={item.key || item.title || index}
              {...item}
              delay={index * 0.08}
            />
          ))}
        </div>
        {/* FILTER BAR */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          placeholder="Search by name, email or employee code..."
          filters={[
            {
              label: "Status",
              options: ["All", "Active", "Inactive"],
              value: status,
              onChange: (e) => setStatus(e.target.value),
            },
            {
              label: "Role",
              options: roleOptions,
              value: role,
              onChange: (e) => setRole(e.target.value),
            },
            {
              label: "Department",
              options: departments,
              value: department,
              onChange: (e) => setDepartment(e.target.value),
            },
            {
              label: "Legal Group",
              options: legalGroupOptions,
              value: legalGroup,
              onChange: (e) => setLegalGroup(e.target.value),
            },
          ]}
          activeOnly={activeOnly}
          setActiveOnly={setActiveOnly}
          toggleLabel="Active Users Only"
          showMoreFilters
          onReset={resetFilters}
        />

        {/* TABLE + DETAILS */}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-0.5">

          <UserTable
            users={currentUsers}
            total={filteredUsers.length}

            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}

            onPageChange={setCurrentPage}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onFirst={handleFirst}
            onLast={handleLast}
            onPageSizeChange={handlePageSizeChange}

            selectedId={selectedUser?.id}

            onSelect={(user) => {
              console.log("Dashboard received:", user.id, user.name);
              setSelectedUser(user);
            }}

          />


          {selectedUser && (
            <UserDetails
              key={selectedUser.id}
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
            />
          )}

        </div>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-0 left-55 right-0 border-t border-gray-200 bg-white px-4 py-2 shadow-sm">
        <FooterNote
          title="Note:"
          message="Deactivated users will not be able to login. Locked users are blocked due to multiple failed login attempts."
          lastUpdated="20 Jun 2026 10:15 AM"
          onRefresh={() => console.log("Refresh clicked")}
        />
      </div>
    </AdminLayout>
  );
}