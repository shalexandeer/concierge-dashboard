import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Menu, Sun, Moon, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/store/useAuthStore";
import { useLogout } from "@/services/auth/mutations";

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function TopBar({ sidebarOpen, setSidebarOpen }: TopBarProps) {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [pageTitle, setPageTitle] = useState("");
  
  // Get user and logout function from auth store
  const user = useAuthStore.useUser();
  const logoutMutation = useLogout()
  
  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };
  
  // Handle logout
  const handleLogout = () => {
    logoutMutation()
  };
  
  // Set the theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
    const currentTheme = savedTheme || systemTheme;
    setTheme(currentTheme);
    
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  
  // Set page title based on route
  useEffect(() => {
    const path = location.pathname;
    
    if (path === "/dashboard") {
      setPageTitle("Dashboard");
    } else if (path.startsWith("/transactions")) {
      if (path === "/transactions/new") {
        setPageTitle("Tambah Transaksi");
      } else {
        setPageTitle("Transaksi");
      }
    } else if (path.startsWith("/records")) {
      if (path === "/records/incoming") {
        setPageTitle("Pencatatan Sampah Masuk");
      } else if (path === "/records/outgoing") {
        setPageTitle("Pencatatan Sampah Keluar");
      } else if (path === "/records/processed") {
        setPageTitle("Pencatatan Sampah Diproses");
      } else {
        setPageTitle("Pencatatan");
      }
    } else if (path.startsWith("/customers")) {
      setPageTitle("Manajemen Nasabah");
    } else if (path.startsWith("/waste")) {
      setPageTitle("Manajemen Sampah");
    } else if (path.startsWith("/admin/users")) {
      setPageTitle("Manajemen Pengguna");
    } else if (path.startsWith("/reports")) {
      setPageTitle("Laporan");
    } else if (path.startsWith("/settings")) {
      setPageTitle("Pengaturan");
    } else {
      setPageTitle("Dashboard");
    }
  }, [location]);
  
  // Get role display name
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "superadmin":
        return "Super Admin";
      case "petugas-tps":
        return "Petugas TPS";
      default:
        return role;
    }
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="font-display font-medium text-xl">
        {pageTitle}
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari..."
            className="w-64 pl-9 rounded-full bg-secondary border-none focus-visible:ring-primary"
          />
        </div>

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="text-muted-foreground"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {user && (
              <>
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.fullName || user.email}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="px-2 py-1.5">
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    {getRoleDisplayName(user.role?.name || 'user')}
                  </span>
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Pengaturan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive" 
              onClick={handleLogout}
            >
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}