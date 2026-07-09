import React from "react";
import { sections } from "../../data/dummyData";
import { BarChart3, Info } from "lucide-react";

export default function SidebarAdmin({
  activeItem = "",
}) {
  return (
    <aside className="hidden lg:flex w-55 shrink-0 flex-col bg-[#061B45] text-slate-200 h-screen sticky top-0 border-r border-[#0F2D63]">

      {/* Logo */}
      <div className="flex h-9 items-center gap-2 px-2 border-b border-white/5">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600">
          <BarChart3 className="h-3.5 w-3.5 text-white" />
        </div>

        <span className="truncate text-[16px] font-bold text-white">
          FinSight Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-hidden px-1 py-0.5">
        {sections.map((section) => (
          <div
            key={section.title}
            className="pt-2 mb-0.5"
          >
            {/* Section Heading */}
            <p className="mb-0 px-1 text-[12px] font-extrabold uppercase tracking-wide text-slate-400">
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
                      className={`flex items-center gap-2 rounded px-1 py-0.5 text-[12px] font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />

                      <span className="truncate leading-none">
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
      <div className="border-t border-white/5 p-0.5">
        <button className="flex w-full items-center gap-2 rounded px-1 py-0.5 text-[12px] font-medium text-slate-300 hover:bg-white/5 hover:text-white">
          <Info className="h-3.5 w-3.5" />
          <span className="truncate leading-none">About</span>
        </button>
      </div>

    </aside>
  );
}