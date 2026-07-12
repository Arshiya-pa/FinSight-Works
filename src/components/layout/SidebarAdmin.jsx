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
import React from "react";
import { sections } from "../../data/dummyData";
import { BarChart3, Info } from "lucide-react";
import { NavLink } from "react-router-dom";


export default function SidebarAdmin() {

  return (

    <aside
  className="
    hidden lg:flex
    w-48
    shrink-0
    flex-col
    bg-[#061B45]
    text-slate-200
    h-screen
    sticky
    top-0
    border-r
    border-[#0F2D63]
  "
>

  {/* Logo */}
  <div
    className="
      flex
      h-8
      items-center
      gap-1
      px-2
      border-b
      border-white/5
    "
  >
    <div
      className="
        flex
        h-5
        w-5
        items-center
        justify-center
        rounded
        bg-blue-600
      "
    >
      <BarChart3 className="h-3 w-3 text-white" />
    </div>

    <span className="truncate text-[15px] font-bold text-white">
      FinSight Admin
    </span>
  </div>

  {/* Navigation */}
  <nav
    className="
      flex-1
      overflow-y-hidden
      px-1
      py-0.5
    "
  >
    {sections.map((section) => (
      <div
        key={section.title}
        className="pt-0.5 mb-0.5"
      >
        {/* Section Title */}
        <p
          className="
            mb-0.5
            px-1
            text-[10px]
            font-extrabold
            uppercase
            tracking-wide
            text-slate-400
          "
        >
          {section.title}
        </p>

        <ul className="space-y-px">
          {section.items.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                {item.path ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      flex
                      items-center
                      gap-0.5
                      rounded
                      px-1.5
                      py-[3.5px]
                      text-[10px]
                      leading-none
                      font-medium
                      transition-colors
                      ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <Icon className="h-3 w-3 shrink-0" />

                    <span className="truncate">
                      {item.label}
                    </span>
                  </NavLink>
                ) : (
                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      rounded
                      px-1.5
                      py-[3.5px]
                      text-[10px]
                      leading-none
                      text-slate-300
                    "
                  >
                    <Icon className="h-3 w-3" />

                    <span>{item.label}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    ))}
  </nav>

  {/* Footer */}
  <div
    className="
      border-t
      border-white/5
      p-1
    "
  >
    <button
      className="
        flex
        w-full
        items-center
        gap-1
        rounded
        px-1.5
        py-0.75
        text-[10px]
        font-medium
        text-slate-300
        hover:bg-white/5
        hover:text-white
      "
    >
      <Info className="h-3 w-3" />

      <span>About</span>
    </button>
  </div>

</aside>

  );
}