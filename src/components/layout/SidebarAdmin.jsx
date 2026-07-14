// import React from "react";
// import { sections } from "../../data/dummyData";
// import { BarChart3, Info } from "lucide-react";
// import { NavLink } from "react-router-dom";


// export default function SidebarAdmin() {

//   return (

//     <aside className="
//       hidden lg:flex 
//       w-55 
//       shrink-0 
//       flex-col 
//       bg-[#061B45] 
//       text-slate-200 
//       h-screen 
//       sticky 
//       top-0 
//       border-r 
//       border-[#0F2D63]
//     ">


//       {/* Logo */}

//       <div className="
//         flex 
//         h-9 
//         items-center 
//         gap-2 
//         px-2 
//         border-b 
//         border-white/5
//       ">

//         <div className="
//           flex 
//           h-5 
//           w-5 
//           items-center 
//           justify-center 
//           rounded 
//           bg-blue-600
//         ">

//           <BarChart3 className="h-3.5 w-3.5 text-white"/>

//         </div>


//         <span className="
//           truncate 
//           text-[16px] 
//           font-bold 
//           text-white
//         ">

//           FinSight Admin

//         </span>


//       </div>



//       {/* Navigation */}


//       <nav className="
//         flex-1 
//         overflow-hidden 
//         px-1 
//         py-0.5
//       ">


//         {
//           sections.map((section)=>(


//             <div
//               key={section.title}
//               className="pt-2 mb-1"
//             >


//               {/* Section title */}

//               <p className="
//                 mb-1 
//                 px-1 
//                 text-[12px] 
//                 font-extrabold 
//                 uppercase 
//                 tracking-wide 
//                 text-slate-400
//               ">

//                 {section.title}

//               </p>



//               <ul className="space-y-0">

//                 {
//                   section.items.map((item)=>{

//                     const Icon = item.icon;
//                     return (
//                       <li key={item.label}>
//                         {
//                           item.path ? (

//                             <NavLink

//                               to={item.path}

//                               className={({isActive})=>
//                                 `
//                                 flex 
//                                 items-center 
//                                 gap-2 
//                                 rounded 
//                                 px-1 
//                                 py-1 
//                                 text-[12px] 
//                                 font-medium 
//                                 transition-colors

//                                 ${
//                                   isActive
//                                   ?
//                                   "bg-blue-600 text-white"
//                                   :
//                                   "text-slate-300 hover:bg-white/5 hover:text-white"
//                                 }

//                                 `
//                               }

//                             >
//                               <Icon 
//                                 className="
//                                 h-3.5 
//                                 w-3.5 
//                                 shrink-0
//                                 "
//                               />


//                               <span className="truncate">

//                                 {item.label}

//                               </span>


//                             </NavLink>


//                           ) : (


//                             <div
//                               className="
//                               flex 
//                               items-center 
//                               gap-2 
//                               rounded 
//                               px-1 
//                               py-1 
//                               text-[12px]
//                               text-slate-300
//                               "
//                             >

//                               <Icon 
//                                 className="
//                                 h-3.5 
//                                 w-3.5
//                                 "
//                               />


//                               <span>

//                                 {item.label}

//                               </span>


//                             </div>


//                           )

//                         }


//                       </li>

//                     );


//                   })
//                 }


//               </ul>


//             </div>


//           ))
//         }


//       </nav>




//       {/* Footer */}

//       <div className="
//         border-t 
//         border-white/5 
//         p-0.5
//       ">


//         <button
//           className="
//           flex 
//           w-full 
//           items-center 
//           gap-2 
//           rounded 
//           px-1 
//           py-1 
//           text-[12px]
//           font-medium 
//           text-slate-300 
//           hover:bg-white/5 
//           hover:text-white
//           "
//         >

//           <Info className="h-3.5 w-3.5"/>

//           <span>
//             About
//           </span>


//         </button>


//       </div>



//     </aside>

//   );

// }

// import React from "react";
// import { sections } from "../../data/dummyData";
// import { BarChart3, Info } from "lucide-react";
// import { NavLink } from "react-router-dom";


// export default function SidebarAdmin() {

//   return (

//     <aside
//   className="
//     hidden lg:flex
//     w-48
//     shrink-0
//     flex-col
//     bg-[#061B45]
//     text-slate-200
//     h-screen
//     sticky
//     top-0
//     border-r
//     border-[#0F2D63]
//   "
// >

//   {/* Logo */}
//   <div
//     className="
//       flex
//       h-8
//       items-center
//       gap-1
//       px-2
//       border-b
//       border-white/5
//     "
//   >
//     <div
//       className="
//         flex
//         h-5
//         w-5
//         items-center
//         justify-center
//         rounded
//         bg-blue-600
//       "
//     >
//       <BarChart3 className="h-3 w-3 text-white" />
//     </div>

//     <span className="truncate text-[15px] font-bold text-white">
//       FinSight Admin
//     </span>
//   </div>

//   {/* Navigation */}
//   <nav
//     className="
//       flex-1
//       overflow-y-hidden
//       px-1
//       py-0.5
//     "
//   >
//     {sections.map((section) => (
//       <div
//         key={section.title}
//         className="pt-0.5 mb-0.5"
//       >
//         {/* Section Title */}
//         <p
//           className="
//             mb-0.5
//             px-1
//             text-[10px]
//             font-extrabold
//             uppercase
//             tracking-wide
//             text-slate-400
//           "
//         >
//           {section.title}
//         </p>

//         <ul className="space-y-px">
//           {section.items.map((item) => {
//             const Icon = item.icon;

//             return (
//               <li key={item.label}>
//                 {item.path ? (
//                   <NavLink
//                     to={item.path}
//                     className={({ isActive }) => `
//                       flex
//                       items-center
//                       gap-0.5
//                       rounded
//                       px-1.5
//                       py-[3.5px]
//                       text-[10px]
//                       leading-none
//                       font-medium
//                       transition-colors
//                       ${
//                         isActive
//                           ? "bg-blue-600 text-white"
//                           : "text-slate-300 hover:bg-white/5 hover:text-white"
//                       }
//                     `}
//                   >
//                     <Icon className="h-3 w-3 shrink-0" />

//                     <span className="truncate">
//                       {item.label}
//                     </span>
//                   </NavLink>
//                 ) : (
//                   <div
//                     className="
//                       flex
//                       items-center
//                       gap-1
//                       rounded
//                       px-1.5
//                       py-[3.5px]
//                       text-[10px]
//                       leading-none
//                       text-slate-300
//                     "
//                   >
//                     <Icon className="h-3 w-3" />

//                     <span>{item.label}</span>
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     ))}
//   </nav>

//   {/* Footer */}
//   <div
//     className="
//       border-t
//       border-white/5
//       p-1
//     "
//   >
//     <button
//       className="
//         flex
//         w-full
//         items-center
//         gap-1
//         rounded
//         px-1.5
//         py-0.75
//         text-[10px]
//         font-medium
//         text-slate-300
//         hover:bg-white/5
//         hover:text-white
//       "
//     >
//       <Info className="h-3 w-3" />

//       <span>About</span>
//     </button>
//   </div>

// </aside>

//   );
// }

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Info,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sections } from "../../data/dummyData";

export default function SidebarAdmin() {
  // Sidebar collapse state
  const [collapsed, setCollapsed] = useState(false);

  // Accordion state
  const [openSections, setOpenSections] = useState(() => {
    const state = {};
    sections.forEach((section) => {
      state[section.title] = true; // Keep all sections open initially
    });
    return state;
  });

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const toggleSection = (title) => {
    if (collapsed) return;

    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside
      className={`
    hidden lg:flex
    flex-col
    h-screen
    sticky
    top-0
    bg-[#061B45]
    border-r
    border-[#0F2D63]
    text-slate-200
    overflow-hidden
    transition-all
    duration-300
    ${collapsed ? "w-16" : "w-56"}
   `}
    >
      {/* ================= Header ================= */}

      <div className="h-12 border-b border-white/10 flex items-center justify-between px-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>

          {!collapsed && (
            <span className="font-bold text-white text-sm whitespace-nowrap">
              FinSight Admin
            </span>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="
            rounded-md
            p-1
            hover:bg-white/10
            transition-colors
          "
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>



      {/* ================= Navigation ================= */}

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-1 px-2">
        {sections.map((section) => {
          const menuItems =
            section.items ||
            section.children ||
            (section.path
              ? [
                {
                  label: section.title,
                  icon: section.icon,
                  path: section.path,
                },
              ]
              : []);
          return (
            <div key={section.title} className="mb-1">
              {/* Section Header */}
              {!collapsed && (
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="
                   w-full
                   flex
                   items-center
                   justify-between
                   px-2
                   py-1
                   rounded
                   text-[10px]
                   font-extrabold
                   uppercase
                   tracking-wide
                   text-slate-400
                   hover:bg-white/5
                   transition-colors">

                  <span>{section.title}</span>
                  {openSections[section.title] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}

              <AnimatePresence initial={false}>
                {(collapsed || openSections[section.title]) && (
                  <motion.ul
                    initial={collapsed ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-0.5 space-y-px"
                  >
                    {menuItems.map((item) => {
                      const Icon = item.icon;

                      if (item.path) {
                        return (
                          <li key={item.label}>
                            <NavLink
                              to={item.path}
                              title={collapsed ? item.label : ""}
                              className={({ isActive }) =>
                                `
                          flex
                          items-center
                          ${collapsed ? "justify-center" : ""}
                         gap-2
                          rounded
                          px-2
                          py-1
                          text-[12px]
                          leading-none
                          transition-all
                          duration-200
                          ${isActive
                                  ? "bg-blue-600 text-white shadow-sm"
                                  : "text-slate-300 hover:bg-white/10 hover:text-white"
                                }
                        `
                              }
                            >
                              <Icon className="h-3.5 w-3.5 shrink-0" />

                              {!collapsed && (
                                <span className="truncate font-medium">
                                  {item.label}
                                </span>
                              )}
                            </NavLink>
                          </li>
                        );
                      }

                      return (
                        <li key={item.label}>
                          <div
                            title={collapsed ? item.label : ""}
                            className="
                        flex
                        items-center
                      gap-2
                      rounded
                      px-2
                      py-1
                      text-[12px]
                      leading-none
                        text-slate-400
                        hover:bg-white/5
                        transition-all
                        cursor-default
                      "
                          >
                            <Icon
                              className={`
                            h-3.5
                            w-3.5
                          shrink-0
                          ${collapsed ? "mx-auto" : ""}
                        `}
                            />

                            {!collapsed && (
                              <span className="truncate">
                                {item.label}
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* ================= Footer ================= */}

      <div className="border-t border-white/10 p-1">
        <button
          className={`
            w-full
            flex
            items-center
            ${collapsed ? "justify-center" : "gap-2"}
            rounded
            px-2
            py-1
            text-[12px]
            text-slate-300
            hover:bg-white/10
            hover:text-white
            transition-all
            duration-200
          `}
          title={collapsed ? "About" : ""}
        >
          <Info className="h-4 w-4 shrink-0" />

          {!collapsed && (
            <span>About</span>
          )}
        </button>
      </div>
    </aside>
  );
}

