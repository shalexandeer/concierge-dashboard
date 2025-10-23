import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Sparkles,
  Calendar,
  Settings,
  Utensils,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/lib/store/useAuthStore";
import { useLogout } from "@/services/auth/mutations";

interface SidebarNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
}

export function SidebarNav({ open, setOpen, isMobile }: SidebarNavProps) {
  // const location = useLocation();
  const navigate = useNavigate();
  const { isSuperAdmin, isTenantAdmin } = useAuthStore();

  const allNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["super_admin", "tenant_admin", "user"],
    },
    {
      title: "Users",
      href: "/users",
      icon: Users,
      roles: ["super_admin"],
    },
    {
      title: "Tenants",
      href: "/tenants",
      icon: Building2,
      roles: ["super_admin"],
    },
    {
      title: "Amenities",
      href: "/amenities",
      icon: Sparkles,
      roles: ["super_admin", "tenant_admin"],
    },
    {
      title: "Facilities",
      href: "/facilities",
      icon: Calendar,
      roles: ["super_admin", "tenant_admin", "user"],
    },
    {
      title: "Services",
      href: "/services",
      icon: Settings,
      roles: ["super_admin", "tenant_admin", "user"],
    },
    {
      title: "Food & Beverages",
      href: "/food-beverages",
      icon: Utensils,
      roles: ["super_admin", "tenant_admin", "user"],
    },
  ];

  // Filter nav items based on user role
  const navItems = allNavItems.filter((item) => {
    if (isSuperAdmin()) return true; // Super admin can see everything
    if (isTenantAdmin()) return item.roles.includes("tenant_admin");
    return item.roles.includes("user");
  });

  const { logout } = useAuthStore();
  const logoutMutation = useLogout();

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 w-[280px] bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
    {
      "translate-x-0": open,
      "-translate-x-full": !open && isMobile,
      "w-[80px]": !open && !isMobile,
    }
  );

  const overlayClasses = cn(
    "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
    {
      "opacity-100 pointer-events-auto": open && isMobile,
      "opacity-0 pointer-events-none": !open || !isMobile,
    }
  );

  // Function to check if a specific item is active
  // const isItemActive = (href: string) => {
  //   return (
  //     location.pathname === href ||
  //     (href !== "/" && location.pathname.startsWith(href + "/"))
  //   );
  // };

  return (
    <>
      <div className={overlayClasses} onClick={() => setOpen(false)} />

      <aside className={sidebarClasses}>
        <div className="p-6 flex items-center justify-between border-b border-sidebar-border relative">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            {(open || isMobile) && (
              <span className="font-display font-semibold text-lg tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300">
                Concierge
              </span>
            )}
          </div>

          {/* Collapse/Expand Button - always visible, styled for both states */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-all duration-300 absolute",
                open
                  ? "right-0 top-1/2 -translate-y-1/2"
                  : "left-1/2 -translate-x-1/2 top-14 bg-background border border-sidebar-border shadow-md z-20",
                !open && !isMobile ? "rounded-full p-2" : ""
              )}
              style={!open && !isMobile ? { width: 40, height: 40 } : {}}
            >
              {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </Button>
          )}
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              // const isActive = isItemActive(item.href);
              const isCollapsed = !open && !isMobile;

              return (
                <NavLink
                  key={item.title}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "nav-link flex items-center",
                      {
                        active: isActive,
                        "justify-center": isCollapsed,
                        "justify-start": !isCollapsed,
                      }
                    )
                  }
                >
                  <item.icon className={cn("h-5 w-5", { "mx-auto": isCollapsed, "mr-3": !isCollapsed })} />
                  {(open || !isMobile) && open && <span>{item.title}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border mt-auto">
          <button
            onClick={() => {
              navigate("/login");
              logoutMutation()
              logout();
            }}
            className={cn(
              "nav-link w-full text-left text-destructive hover:bg-destructive/10 flex items-center",
              {
                "justify-center": !open && !isMobile,
                "justify-start": open || isMobile,
              }
            )}
          >
            <LogOut className={cn("h-5 w-5", { "mx-auto": !open && !isMobile, "mr-3": open || isMobile })} />
            {(open || !isMobile) && open && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
