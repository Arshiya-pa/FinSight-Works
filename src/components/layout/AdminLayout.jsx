

// import SidebarAdmin from "./SidebarAdmin";
// import NavbarAdmin from "./NavbarAdmin";

// export default function AdminLayout({
//   activeMenu = "",
//   breadcrumbs = [],
//   company = "FJ Group",
//   initials = "SA",
//   userName = "Super Admin",
//   userRole = "Super Administrator",
//   notificationCount = 0,
//   children,
// }) {
//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Sidebar */}
//       <SidebarAdmin activeItem={activeMenu} />

//       {/* Right Content */}
//       <div className="flex-1 flex flex-col min-w-0">
//         <NavbarAdmin
//           breadcrumbs={breadcrumbs}
//           company={company}
//           initials={initials}
//           userName={userName}
//           userRole={userRole}
//           notificationCount={notificationCount}
//         />

//        <main className="flex-1 overflow-auto p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import SidebarAdmin from "./SidebarAdmin";
import NavbarAdmin from "./NavbarAdmin";

export default function AdminLayout({
  activeMenu = "",
  breadcrumbs = [],
  company = "FJ Group",
  initials = "SA",
  userName = "Super Admin",
  userRole = "Super Administrator",
  notificationCount = 0,
  children,
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <SidebarAdmin activeItem={activeMenu} />

      {/* Right Content */}
      <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
        <NavbarAdmin
          breadcrumbs={breadcrumbs}
          company={company}
          initials={initials}
          userName={userName}
          userRole={userRole}
          notificationCount={notificationCount}
        />

        {/* Page */}
        <main className="flex-1 overflow-hidden p-5">
          <div className="flex h-full flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}