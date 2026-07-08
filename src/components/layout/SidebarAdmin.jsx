

// import React from "react";
// import { sections } from "../../data/dummyData";
// import { BarChart3, Info } from "lucide-react";

//  export default function SidebarAdmin({
//   activeItem = "",
//  })   {
//   return (
//     <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-[#061B45] text-slate-200 h-screen sticky top-0">

//       {/* Logo */}
//       <div className="flex items-center gap-2 px-5 h-16 border-b border-white/5">
//         <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
//           <BarChart3 className="w-5 h-5 text-white" />
//         </div>

//         <span className="font-semibold text-white text-[15px]">
//           FinSight Admin
//         </span>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
//      {sections.map((section) => (
//     <div key={section.title}>
//       {/* Section Title */}
//       <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//         {section.title}
//       </p>

//       {/* Section Items */}
//       <ul className="space-y-1">
//         {section.items.map((item) => {
//           const Icon = item.icon;
//           const isActive = item.label === activeItem;

//           return (
//             <li key={item.label}>
//               <a
//                 href="#"
//                 className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
//                   isActive
//                     ? "bg-blue-600 text-white shadow-sm"
//                     : "text-slate-300 hover:bg-white/5 hover:text-white"
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span>{item.label}</span>
//               </a>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   ))}
//    </nav>
//       {/* Footer */}
//       <div className="border-t border-white/5 p-3">
//         <button className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
//           <Info className="w-4 h-4" />
//           About
//         </button>
//       </div>
//     </aside>
//   );
// }
import React from "react";
import { sections } from "../../data/dummyData";
import { BarChart3, Info } from "lucide-react";

export default function SidebarAdmin({
  activeItem = "",
}) {
  return (
    <aside className="hidden lg:flex w-55 shrink-0 flex-col bg-[#061B45] text-slate-200 h-screen sticky top-0 border-r border-[#0F2D63]">

      {/* Logo */}
      <div className="flex h-9 items-center gap-1 px-2 border-b border-white/5">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600">
          <BarChart3 className="h-3 w-3 text-white" />
        </div>

        <span className="truncate text-[10px] font-semibold text-white">
          FinSight Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-hidden px-1 py-1">
        {sections.map((section) => (
          <div key={section.title} className="mb-1">

            {/* Section Heading */}
            <p className="mb-0.5 px-1 text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
              {section.title}
            </p>

            <ul className="space-y-0">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.label;

                return (
                  <li key={item.label}>
                    <a
                      href="#"
                      className={`flex h-5 items-center gap-1 rounded px-1 py-0.5 text-[10px] font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="h-2.5 w-2.5 shrink-0" />

                      <span className="min-w-0 truncate leading-none">
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 p-1">
        <button className="flex h-5 w-full items-center gap-1 rounded px-1 py-0.5 text-[10px] font-medium text-slate-300 hover:bg-white/5 hover:text-white">
          <Info className="h-2.5 w-2.5" />
          <span className="truncate leading-none">About</span>
        </button>
      </div>
    </aside>
  );
}