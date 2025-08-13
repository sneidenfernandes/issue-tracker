"use client";
import { SidbarToggleIcon, ViewsIcon } from "@/app/components/icons/WorkspaceIcons";
import { useSidebar } from "@/app/context/SidebarContext";

export default function Views() {
  const { openSideBar, openSidebarRef } = useSidebar();
  return (
    <div>
      <div className="h-10 border-b-[1px] border-neutral-800 px-4 md:px-8 flex justify-between items-center">
        <div className="grid grid-cols-2 gap-x-1 items-center max-w-[180px]">
          <button
            onClick={() => openSideBar()}
            className="md:hidden text-white"
            ref={openSidebarRef}
          >
            <SidbarToggleIcon />
          </button>
          <div className="flex justify-center items-center space-x-1 -ml-7 md:-ml-0 text-white">
            <ViewsIcon/>
            <p className="text-neutral-200 font-light text-sm">Analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
