import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/utils";
import withAuth from "@/components/hoc/withAuth";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex w-full">
      <SidebarNav open={sidebarOpen} setOpen={setSidebarOpen} isMobile={isMobile} />
      
      <div className={cn(
        "flex-1 flex flex-col w-full transition-all duration-300 ease-in-out",
        sidebarOpen && !isMobile ? "lg:pl-[280px]" : ""
      )}>
        <TopBar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
        
        <main className="overflow-y-auto p-4 md:p-6 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout, "petugas-tps");
