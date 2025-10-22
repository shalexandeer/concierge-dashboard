import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

// Layout components
import DashboardLayout from "@/components/templates/DashboardLayout";
import ReactQueryLayout from "@/components/templates/ReactQueryLayout";

// General pages
import NotFound from "@/pages/NotFound";

const Router = () => (
  <ReactQueryLayout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* User Routes */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          
          {/* Tenant Routes */}
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/tenants/new" element={<TenantForm />} />
          <Route path="/tenants/:id/edit" element={<TenantForm />} />
          
          {/* Amenity Routes */}
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/amenities/new" element={<AmenityForm />} />
          <Route path="/amenities/:id/edit" element={<AmenityForm />} />
          
          {/* Amenity Category Routes */}
          <Route path="/amenities/categories" element={<Categories />} />
          <Route path="/amenities/categories/new" element={<CategoryForm />} />
          <Route path="/amenities/categories/:id/edit" element={<CategoryForm />} />
          
          {/* Facility Routes */}
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/facilities/new" element={<FacilityForm />} />
          <Route path="/facilities/:id/edit" element={<FacilityForm />} />
          <Route path="/facilities/:id/view" element={<FacilityView />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ReactQueryLayout>
);

export default Router;
