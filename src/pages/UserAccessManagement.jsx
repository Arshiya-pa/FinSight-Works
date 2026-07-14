
import { useState, useMemo, useEffect } from "react";
import {
    UserPlus, Users, UserCheck, UserX, ShieldAlert, UserCog, Edit, Shield,
    Building2, Building, Layers, GitBranch, Briefcase, BarChart3,
} from "lucide-react";
import ConfirmationModel from "../components/common/ConfirmationModel";

import HierarchyTree from "../components/userAccess/HierarchyTree";
import toast from "react-hot-toast";
import AdminLayout from "../components/layout/AdminLayout";
import PageHeader from "../components/common/PageHeader";
import FilterBar from "../components/common/FilterBar";
import StatCard from "../components/StatCard";
import UserTable from "../components/users/UserTable";
import UserDetails from "../components/users/UserDetails";
import FooterNote from "../components/FooterNote";
import AddUserModal from "../components/users/AddUserModal";
import SelectedUserCard from "../components/userAccess/SelectUserCard";
import {
    stats,
    departments,
} from "../data/dummyData";
import { getUserAccessSummary } from "../api/userAccessApi";
import { getUsers, getRoles, getLegalGroups, updateUserStatus } from "../api/userApi";


export default function UserAccessMangement() {

    /* -------------------- STATES -------------------- */

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const [role, setRole] = useState("All");
    const [roleOptions, setRoleOptions] = useState(["All"]);

    const [legalGroup, setLegalGroup] = useState("All");
    const [legalGroupOptions, setLegalGroupOptions] = useState(["All"]);

    const [activeOnly, setActiveOnly] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [showAddUser, setShowAddUser] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showEditConfirm, setShowEditConfirm] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [selectedAccess, setSelectedAccess] = useState([]);

    const [summaryCards, setSummaryCards] = useState([]);

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
                active: user.active, // <-- ADD THIS
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
    console.log("........", status);
    console.log("----------", activeOnly);
    /* -------------------- FETCH ROLES -------------------- */
    const fetchRoles = async () => {
        try {
            const response = await getRoles();
            console.log(response.data);
            const roles = response.data.map((item, index) => ({
                id: index + 1,
                code: item.role_code,
                name: item.role_name,
            }));
            setRoleOptions([
                {
                    id: 0,
                    code: "All",
                    name: "All",
                },
                ...roles,
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

            const groups = response.data.map((item) => ({
                id: item.legal_group_id,
                code: item.legal_group_code,
                name: item.legal_group_name,
            }));

            setLegalGroupOptions([
                {
                    id: 0,
                    code: "All",
                    name: "All",
                },
                ...groups,
            ]);
        } catch (error) {
            console.error(error);
        }
    };
    // called from SelectedUserCard
    const handleSaveClick = () => {

        setShowConfirm(true);

    };


    const handleConfirmSave = async () => {

        try {

            setSaving(true);


            const payload = {

                userId: selectedUser.id,

                access: selectedAccess

            };


            console.log(
                "UPDATE ACCESS PAYLOAD",
                payload
            );


            // await updateUserAccess(payload);


            toast.success(
                "User access updated successfully"
            );


            setShowConfirm(false);


        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to update access"
            );


        } finally {

            setSaving(false);

        }

    };

    /* -------------------- FETCH CARDS DATA -------------------- */
    const fetchSummaryCards = async () => {
        try {
            const { data } = await getUserAccessSummary();

            setSummaryCards([
                {
                    label: "Total Users",
                    value: data.users,
                    description: "Active users",
                    icon: Users,
                    color: "blue",
                },
                {
                    label: "Active Accesses",
                    value: data.active_accesses,
                    description: "Active acceses",
                    icon: Shield,
                    color: "purple",
                },
                {
                    label: "Legal Groups",
                    value: data.legal_groups,
                    description: "Active groups",
                    icon: Building2,
                    color: "orange",
                },
                {
                    label: "Legal Entities",
                    value: data.legal_entities,
                    description: "Total entities",
                    icon: Building,
                    color: "teal",
                },
                {
                    label: "Parent Divisions",
                    value: data.parent_divisions,
                    description: "Total divisions",
                    icon: Layers,
                    color: "blue",
                },
                {
                    label: "Subdivisions",
                    value: data.subdivisions,
                    description: "Total subdivisions",
                    icon: GitBranch,
                    color: "indigo",
                },
                {
                    label: "Business Units",
                    value: data.business_units,
                    description: "Total units",
                    icon: Briefcase,
                    color: "blue",
                },
                {
                    label: "Analysis Codes",
                    value: data.analysis_codes,
                    description: "Total codes",
                    icon: BarChart3,
                    color: "blue",
                },
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
        fetchSummaryCards();
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        status,
        role,
        //department,
        legalGroup,
        activeOnly,
    ]);

    /* -------------------- RESET FILTERS -------------------- */

    const resetFilters = () => {
        setSearch("");
        setStatus("All");
        setRole("All");
        // setDepartment("All");
        setLegalGroup("All");
        setActiveOnly(false);
    };

    /* -------------------- FILTER USERS -------------------- */

    const filteredUsers = useMemo(() => {

        console.log("Toggle:", activeOnly);

        return users.filter((user) => {

            console.log(
                user.name,
                user.status,
                activeOnly
            );

            const matchesSearch =
                (user.name || "").toLowerCase().includes(search.toLowerCase()) ||
                (user.email || "").toLowerCase().includes(search.toLowerCase()) ||
                (user.code || "").toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                status === "All" || user.status === status;

            const matchesRole =
                role === "All" || user.role === role;

            const matchesLegalGroup =
                legalGroup === "All" ||
                user.legalGroup === legalGroup;

            const matchesActive =
                !activeOnly || user.status === "Active";

            // console.log(
            //   "matchesActive:",
            //   matchesActive
            // );

            return (
                matchesSearch &&
                matchesStatus &&
                matchesRole &&
                matchesLegalGroup &&
                matchesActive
            );

        });

    }, [users, search, status, role, legalGroup, activeOnly]);
    /* -------------------- PAGINATION -------------------- */

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
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
    /* -------------------- EDIT USER FORM-------------------- */
    const handleEdit = (user) => {
        setUserToEdit(user);
        setShowEditConfirm(true);
        <div className="w-90 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Edit className="h-5 w-5 text-blue-600" />
                </div>

                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Edit User
                    </h3>

                    <p className="mt-1 text-xs text-gray-600">
                        Do you want to edit{" "}
                        <span className="font-semibold">
                            {user.name}
                        </span>
                        ?
                    </p>
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-100"
                        >Cancel</button>

                        <button
                            onClick={() => {
                                toast.dismiss(t.id);
                                setSelectedUser(user);
                                setShowEditUser(true);
                            }}
                            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                        >Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    };

    const handleConfirmEdit = () => {
        setShowEditConfirm(false);
        setSelectedUser(userToEdit);
        setShowEditUser(true);
        setUserToEdit(null);
    };

    const handleCancelEdit = () => {
        setShowEditConfirm(false);
        setUserToEdit(null);
    };

    const handleToggleStatus = async (user) => {
        try {
            const payload = {
                employee_code: user.raw.employee_code,
                employee_name: user.raw.employee_name,
                official_email: user.raw.official_email,
                designation: user.raw.designation,
                department: user.raw.department,
                reporting_manager_code: user.raw.reporting_manager_code,
                role_code: user.raw.role_code,
                active: !user.active,
            };

            console.log("Payload:", payload);
            console.log(user.raw);

            await updateUserStatus(user.id, payload);

            toast.success(
                user.active
                    ? "User deactivated successfully"
                    : "User activated successfully"
            );

            await fetchUsers();
        } catch (error) {
            console.error(error.response?.data);
            toast.error("Unable to update user status");
        }
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
    console.log("Active Only:", activeOnly);
    /* -------------------- LOADING -------------------- */

    if (loading) {
        return (
            <div className="p-6 text-sm">
                Loading...
            </div>
        );
    }
    console.log("Current Selected User:", selectedUser);
    /* ---------- PART 2 STARTS WITH RETURN ---------- */
    return (

        <div className="flex flex-col gap-0.5">
            {/* HEADER */}
            <div>
                <PageHeader
                    title="User Access Management"
                    subtitle="Manage users and define their access to Legal Entities,Divisions,SubDivisions and BusinessUnits."
                    buttonText="Add User"
                    buttonIcon={UserPlus}
                    onButtonClick={() => setShowAddUser(true)}
                />

                <AddUserModal
                    open={showAddUser || showEditUser}
                    editUser={selectedUser}
                    onClose={() => {
                        setShowAddUser(false);
                        setShowEditUser(false);
                    }}
                    onSuccess={() => {
                        fetchUsers();
                        setShowAddUser(false);
                        setShowEditUser(false);
                    }}
                />
                {/* KPI CARDS */}
                <div className="grid grid-cols-8 gap-2.5">
                    {summaryCards.map((item, index) => (
                        <StatCard
                            key={item.key || item.title || index}
                            {...item}
                            delay={index * 0.08}
                        />
                    ))}
                </div>
                {/* FILTER BAR */}
                <FilterBar
                    customOrder={true}
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
                {/* ================= USER TABLE + Hierarchy+ userdetails ================= */}
                <div className=" grid grid-cols-[40%_30%_30%] gap-3 w-full h-[calc(100vh-310px)] min-h-0 overflow-hidden">

                    {/* ================= USER TABLE 40% ================= */}
                    <div className=" min-w-0 w-full h-full overflow-hidden">
                        <UserTable
                            compactAccess={true}
                            users={currentUsers}
                            total={filteredUsers.length}
                            onEdit={handleEdit}
                            onToggleStatus={handleToggleStatus}
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
                                setSelectedUser(user);
                            }} />
                    </div>
                    {/* ================= HIERARCHY 30% ================= */}
                    <div className="min-w-0 h-full min-h-0 overflow-hidden flex ">
                        <HierarchyTree
                            selectedUser={selectedUser}
                            selected={selectedAccess}
                            setSelected={setSelectedAccess}
                        />
                    </div>
                    {/* ================= USER DETAILS 30% ================= */}

                    <div className="w-92.5 h-full min-h-0 overflow-hidden">
                        {
                            selectedUser && (
                                <SelectedUserCard
                                    user={selectedUser}
                                    onSave={() => setShowConfirm(true)}
                                    onClose={() => {
                                        setSelectedUser(null);
                                    }}
                                />
                            )
                        }
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="fixed bottom-0 left-55 right-0 border-t border-gray-200 bg-white px-3 py-1 shadow-sm">
                <FooterNote
                    title="Note:"
                    message="Deactivated users will not be able to login. Locked users are blocked due to multiple failed login attempts."
                    lastUpdated="20 Jun 2026 10:15 AM"
                    onRefresh={() => console.log("Refresh clicked")}
                />
            </div>
            <AddUserModal
                open={showAddUser}
                onClose={() => setShowAddUser(false)}
                onSuccess={() => {
                    fetchUsers();
                    setShowAddUser(false);
                }}
            />
            <ConfirmationModel
                open={showEditConfirm}
                title="Edit User?"
                message={
                    `Are you sure you want to edit ${userToEdit?.name || "this user"
                    }?`
                }
                confirmText="Edit"
                cancelText="Cancel"
                onCancel={handleCancelEdit}
                onConfirm={handleConfirmEdit}
            />
        </div>
    );
}
