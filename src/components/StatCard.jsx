
// import { motion } from "framer-motion";

// const colorMap = {
//   blue: "bg-blue-50 text-blue-600",
//   green: "bg-green-50 text-green-600",
//   orange: "bg-orange-50 text-orange-600",
//   purple: "bg-purple-50 text-purple-600",
//   teal: "bg-teal-50 text-teal-600",
//   red: "bg-red-50 text-red-600",
// };

// export default function StatCard({
//   icon: Icon,
//   title,
//   value,
//   description,
//   trend,
//   trendDir = "flat",
//   color = "blue",
//   delay = 0,
//   className = "",
//   onClick,
//   loading = false,
//   children,label
// }) {
//   const trendColor =
//     trendDir === "up"
//       ? "text-green-600"
//       : trendDir === "down"
//       ? "text-orange-600"
//       : "text-gray-400";

//   const arrow =
//     trendDir === "up"
//       ? "↑"
//       : trendDir === "down"
//       ? "↓"
//       : "—";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.35, delay }}
//       whileHover={{ y: -2 }}
//       onClick={onClick}
//       className={`
//         bg-white
//         rounded-xl
//         border border-gray-200
//         shadow-sm
//         hover:shadow-md
//         transition-all
//         duration-300
//         p-5
//         ${onClick ? "cursor-pointer" : ""}
//         ${className}
//       `}
//     >
//       {loading ? (
//         <div className="animate-pulse">
//           <div className="h-10 w-10 rounded-lg bg-gray-200 mb-3"></div>
//           <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
//           <div className="h-8 w-20 bg-gray-200 rounded"></div>
//         </div>
//       ) : (
//         <>
//           <div className="flex items-start gap-4">
//             {Icon && (
//               <div
//                 className={`w-11 h-11 rounded-lg flex items-center justify-center ${
//                   colorMap[color] || colorMap.blue
//                 }`}
//               >
//                 <Icon className="w-5 h-5" />
//               </div>
//             )}

//             <div className="flex-1">

//               <p className="text-sm font-medium text-gray-500">
//                 {label}
//               </p>
//               <p className="text-sm font-medium text-gray-500">
//                 {title}
//               </p>

//               <p className="mt-1 text-3xl font-bold text-gray-900">
//                 {value}
//               </p>

//               {description && (
//                 <p className="mt-1 text-sm text-gray-500">
//                   {description}
//                 </p>
//               )}

//               {trend && (
//                 <p className={`mt-2 text-xs font-medium ${trendColor}`}>
//                   {arrow} {trend}
//                 </p>
//               )}
//             </div>
//           </div>

//           {children && (
//             <div className="mt-4 border-t border-gray-100 pt-3">
//               {children}
//             </div>
//           )}
//         </>
//       )}
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
  teal: "bg-teal-50 text-teal-600",
  red: "bg-red-50 text-red-600",
};

export default function StatCard({
  icon: Icon,
  title,
  value,
  label,
  description,
  trend,
  trendDir = "flat",
  color = "blue",
  delay = 0,
  className = "",
  onClick,
  loading = false,
  children,
}) {
  const trendColor =
    trendDir === "up"
      ? "text-green-600"
      : trendDir === "down"
      ? "text-orange-600"
      : "text-gray-400";

  const arrow =
    trendDir === "up"
      ? "↑"
      : trendDir === "down"
      ? "↓"
      : "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`
        bg-white
        rounded-lg
        border
        border-gray-200
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
        p-3
        min-h-22
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 w-8 rounded-md bg-gray-200 mb-2"></div>
          <div className="h-3 w-20 rounded bg-gray-200 mb-2"></div>
          <div className="h-5 w-14 rounded bg-gray-200"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">

            {Icon && (
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  colorMap[color] || colorMap.blue
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
            )}

            <div className="flex-1 min-w-0">

              {label && (
                <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  {label}
                </p>
              )}

              <p className="truncate text-xs font-medium text-gray-500">
                {title}
              </p>

              <p className="mt-0.5 text-xl font-bold text-gray-900">
                {value}
              </p>

              {description && (
                <p className="truncate text-[11px] text-gray-500">
                  {description}
                </p>
              )}

              {trend && (
                <p className={`text-[10px] font-medium ${trendColor}`}>
                  {arrow} {trend}
                </p>
              )}
            </div>

          </div>

          {children && (
            <div className="mt-2 border-t border-gray-100 pt-2">
              {children}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}