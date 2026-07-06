// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FiGrid, FiTrendingUp, FiPieChart, FiBriefcase, FiLayers, FiDollarSign, 
//   FiUsers, FiShield, FiSettings, FiMenu, FiChevronRight, FiChevronDown 
// } from 'react-icons/fi';

// const menuItems = [
//   { name: 'Dashboard', icon: FiGrid },
//   { name: 'Sales Revenue Report', icon: FiTrendingUp },
//   { name: 'Profit & Loss Account', icon: FiPieChart },
//   { name: 'Balance Sheet', icon: FiBriefcase },
//   { name: 'Receivables Report', icon: FiLayers },
//   { 
//     name: 'Payable Report', 
//     icon: FiDollarSign, 
//     isOpen: true,
//     subItems: ['Top 10 Vendors', 'Payable Aging Report', 'Overdue Report', 'Payment Run Report'] 
//   },
//   { name: 'Inventory Report', icon: FiLayers },
//   { name: 'Working Capital Report', icon: FiBriefcase },
//   { name: 'Short Term Financing', icon: FiDollarSign },
//   { name: 'Investment Analysis', icon: FiPieChart },
//   { name: 'Sales Engineer Performance', icon: FiTrendingUp },
//   { header: 'MANAGEMENT' },
//   { name: 'Data Management', icon: FiLayers },
//   { name: 'User Management', icon: FiUsers },
//   { name: 'Role Management', icon: FiShield },
//   { name: 'Access Control', icon: FiShield },
//   { name: 'System Settings', icon: FiSettings },
// ];

// export default function Sidebar({ isMobileOpen, setMobileOpen }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeSub, setActiveSub] = useState('Top 10 Vendors');

//   return (
//     <aside className={`bg-[#081B46] text-slate-300 min-h-screen z-30 transition-all duration-300 flex flex-col border-r border-slate-800/40
//       ${collapsed ? 'w-20' : 'w-72'} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:sticky top-0`}
//     >
//       <div className="p-5 border-b border-slate-800/60">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white tracking-wider">Fi</div>
//           {!collapsed && (
//             <div>
//               <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-1">FinSight</h1>
//               <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap">Financial Intelligence at Your Fingertips</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
//         {menuItems.map((item, idx) => {
//           if (item.header) {
//             return !collapsed && <div key={idx} className="text-[10px] font-bold text-slate-500 tracking-wider px-3 pt-4 pb-1">{item.header}</div>;
//           }

//           const Icon = item.icon;
//           const isPayables = item.name === 'Payable Report';

//           return (
//             <div key={idx}>
//               <button className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
//                 ${isPayables ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-800/50 hover:text-white'}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Icon className={`text-lg shrink-0 ${isPayables ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white'}`} />
//                   {!collapsed && <span className="truncate">{item.name}</span>}
//                 </div>
//                 {!collapsed && item.subItems && <FiChevronDown className="text-xs" />}
//               </button>

//               {!collapsed && item.subItems && (
//                 <div className="mt-1 ml-4 pl-4 border-l border-slate-800/80 space-y-1">
//                   {item.subItems.map((sub, sIdx) => (
//                     <button
//                       key={sIdx}
//                       onClick={() => setActiveSub(sub)}
//                       className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all block
//                         ${activeSub === sub ? 'text-indigo-400 bg-indigo-600/10' : 'text-slate-400 hover:text-white'}`}
//                     >
//                       {sub}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <div className="p-3 border-t border-slate-800/60">
//         <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium bg-slate-800/40 hover:bg-slate-800 rounded-lg transition-all text-slate-400 hover:text-white">
//           <FiMenu /> {!collapsed && <span>Collapse Menu</span>}
//         </button>
//       </div>
//     </aside>
//   );
// }

import React, { useState } from 'react';
import {
  FiGrid,
  FiTrendingUp,
  FiPieChart,
  FiBriefcase,
  FiLayers,
  FiDollarSign,
  FiUsers,
  FiShield,
  FiSettings,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi';

const menuItems = [
  { name: 'Dashboard', icon: FiGrid },
  { name: 'Sales Revenue Report', icon: FiTrendingUp },
  { name: 'Profit & Loss Account', icon: FiPieChart },
  { name: 'Balance Sheet', icon: FiBriefcase },
  { name: 'Receivables Report', icon: FiLayers },
  {
    name: 'Payable Report',
    icon: FiDollarSign,
    isOpen: true,
    subItems: [
      'Top 10 Vendors',
      'Payable Aging Report',
      'Overdue Report',
      'Payment Run Report',
    ],
  },
  { name: 'Inventory Report', icon: FiLayers },
  { name: 'Working Capital Report', icon: FiBriefcase },
  { name: 'Short Term Financing', icon: FiDollarSign },
  { name: 'Investment Analysis', icon: FiPieChart },
  { name: 'Sales Engineer Performance', icon: FiTrendingUp },
  { header: 'MANAGEMENT' },
  { name: 'Data Management', icon: FiLayers },
  { name: 'User Management', icon: FiUsers },
  { name: 'Role Management', icon: FiShield },
  { name: 'Access Control', icon: FiShield },
  { name: 'System Settings', icon: FiSettings },
];

export default function Sidebar({ isMobileOpen, setMobileOpen }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSub, setActiveSub] = useState('Top 10 Vendors');

  return (
    <aside
      className={`bg-[#081B46] text-slate-300 min-h-screen z-30 transition-all duration-300 flex flex-col border-r border-slate-800/40
      ${collapsed ? 'w-16' : 'w-64'}
      ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0 fixed md:sticky top-0`}
    >
      {/* Header */}
      <div className="px-3 py-2 border-b border-slate-800/60">

        <div className="flex items-center gap-2">

          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center font-bold text-[12px] text-white">
            Fi
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-2xl font-bold text-white leading-none">
                FinSight
              </h1>

              <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                Financial Intelligence
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-2 py-1.5 space-y-0.5">

        {menuItems.map((item, idx) => {
          if (item.header) {
            return (
              !collapsed && (
                <div
                  key={idx}
                  className="text-[10px] font-bold text-slate-500 tracking-wider px-2 pt-2 pb-1"
                >
                  {item.header}
                </div>
              )
            );
          }

          const Icon = item.icon;
          const isPayables = item.name === 'Payable Report';

          return (
            <div key={idx}>

              <button
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-all group
                ${
                  isPayables
                    ? 'bg-indigo-600/10 text-indigo-400'
                    : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >

                <div className="flex items-center gap-2">

                  <Icon
                    className={`text-[15px] shrink-0
                    ${
                      isPayables
                        ? 'text-indigo-400'
                        : 'text-slate-400 group-hover:text-white'
                    }`}
                  />

                  {!collapsed && (
                    <span className="truncate text-[10px] font-medium leading-none">
                      {item.name}
                    </span>
                  )}

                </div>

                {!collapsed && item.subItems && (
                  <FiChevronDown className="text-[9px]" />
                )}

              </button>

              {/* Sub Menu */}
              {!collapsed && item.subItems && (
                <div className="mt-0.5 ml-3 pl-2 border-l border-slate-800/80 space-y-0.5">

                  {item.subItems.map((sub, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => setActiveSub(sub)}
                      className={`w-full text-left px-2 py-0.5 rounded text-[9px] font-medium transition-all
                      ${
                        activeSub === sub
                          ? 'bg-indigo-600/10 text-indigo-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}

                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-2 py-1.5 border-t border-slate-800/60">

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-1 py-1 text-[9px] font-medium bg-slate-800/40 hover:bg-slate-800 rounded-md transition-all text-slate-400 hover:text-white"
        >
          <FiMenu className="text-[12px]" />

          {!collapsed && <span>Collapse</span>}
        </button>

      </div>
    </aside>
  );
}