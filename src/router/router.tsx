import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthInit } from "@/lib/hooks/useAuthInit";

// Auth pages
import Login from "@/pages/auth/Login";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

// Dashboard pages
import Dashboard from "@/pages/Dashboard";

// User pages
import Users from "@/pages/users/Users";
import UserForm from "@/pages/users/UserForm";

// Tenant pages
import Tenants from "@/pages/tenants/Tenants";
import TenantForm from "@/pages/tenants/TenantForm";

// Amenity pages
import Amenities from "@/pages/amenities/Amenities";
import AmenityForm from "@/pages/amenities/AmenityForm";
import Categories from "@/pages/amenities/Categories";
import CategoryForm from "@/pages/amenities/CategoryForm";

// Facility pages
import Facilities from "@/pages/facilities/Facilities";
import FacilityForm from "@/pages/facilities/FacilityForm";
import FacilityView from "@/pages/facilities/FacilityView";

// Service pages
import Services from "@/pages/services/Services";
import ServiceForm from "@/pages/services/ServiceForm";
import ServiceCategories from "@/pages/services/Categories";
import ServiceCategoryForm from "@/pages/services/CategoryForm";

// Layout components
import DashboardLayout from "@/components/templates/DashboardLayout";
import ReactQueryLayout from "@/components/templates/ReactQueryLayout";

// Role-based protection
import { RoleGuard } from "@/components/hoc/withRole";

// General pages
import NotFound from "@/pages/NotFound";

const RouterContent = () => {
  const { isLoading } = useAuthInit();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Dashboard Routes */}
      <Route element={<DashboardLayout />}>
        {/* Public routes accessible to admin users only */}
        <Route path="/dashboard" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><Dashboard /></RoleGuard>} />
        
        {/* User Routes - Super Admin only */}
        <Route path="/users" element={<RoleGuard allowedRoles={["super_admin"]}><Users /></RoleGuard>} />
        <Route path="/users/new" element={<RoleGuard allowedRoles={["super_admin"]}><UserForm /></RoleGuard>} />
        <Route path="/users/:id/edit" element={<RoleGuard allowedRoles={["super_admin"]}><UserForm /></RoleGuard>} />
        
        {/* Tenant Routes - Super Admin only */}
        <Route path="/tenants" element={<RoleGuard allowedRoles={["super_admin"]}><Tenants /></RoleGuard>} />
        <Route path="/tenants/new" element={<RoleGuard allowedRoles={["super_admin"]}><TenantForm /></RoleGuard>} />
        <Route path="/tenants/:id/edit" element={<RoleGuard allowedRoles={["super_admin"]}><TenantForm /></RoleGuard>} />
        
        {/* Amenity Routes - Super Admin and Tenant Admin */}
        <Route path="/amenities" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><Amenities /></RoleGuard>} />
        <Route path="/amenities/new" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><AmenityForm /></RoleGuard>} />
        <Route path="/amenities/:id/edit" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><AmenityForm /></RoleGuard>} />
        
        {/* Amenity Category Routes - Super Admin and Tenant Admin */}
        <Route path="/amenities/categories" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><Categories /></RoleGuard>} />
        <Route path="/amenities/categories/new" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><CategoryForm /></RoleGuard>} />
        <Route path="/amenities/categories/:id/edit" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><CategoryForm /></RoleGuard>} />
        
        {/* Facility Routes - Admin users only */}
        <Route path="/facilities" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><Facilities /></RoleGuard>} />
        <Route path="/facilities/new" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><FacilityForm /></RoleGuard>} />
        <Route path="/facilities/:id/edit" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><FacilityForm /></RoleGuard>} />
        <Route path="/facilities/:id/view" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><FacilityView /></RoleGuard>} />
        
        {/* Service Routes - Public GET, Admin POST/PUT/DELETE */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/new" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><ServiceForm /></RoleGuard>} />
        <Route path="/services/:id/edit" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><ServiceForm /></RoleGuard>} />
        
        {/* Service Category Routes - Admin users only */}
        <Route path="/services-categories" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><ServiceCategories /></RoleGuard>} />
        <Route path="/services-categories/new" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><ServiceCategoryForm /></RoleGuard>} />
        <Route path="/services-categories/:id/edit" element={<RoleGuard allowedRoles={["super_admin", "tenant_admin"]}><ServiceCategoryForm /></RoleGuard>} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const Router = () => (
  <ReactQueryLayout>
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  </ReactQueryLayout>
);

export default Router;
