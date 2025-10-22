import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetService } from "@/services/services/queries";
import { useCreateService, useUpdateService } from "@/services/services/mutations";
import { useGetServiceCategories } from "@/services/services-categories/queries";
import { useGetTenants } from "@/services/tenants/queries";
import useAuthStore from "@/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/lib/hooks/use-toast";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/services/auth/types";
import { storageKeys } from "@/services/auth/keys";

interface ServiceFormData {
  tenantId: string;
  categoryId: string;
  serviceName: string;
  description?: string;
  operatingHoursFrom?: string;
  operatingHoursTo?: string;
  available24_7?: boolean;
  responseTime?: number;
  isActive?: boolean;
}

export default function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: service } = useGetService(id || "", isEdit);
  const { data: categories } = useGetServiceCategories();
  const { isSuperAdmin } = useAuthStore();
  const { data: tenants } = useGetTenants(isSuperAdmin());
  const createService = useCreateService();
  const updateService = useUpdateService();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceFormData>();

  const tenantId = watch("tenantId");
  const categoryId = watch("categoryId");
  const available24_7 = watch("available24_7");

  useEffect(() => {
    // Auto-fill tenantId from JWT token for creation (only for non-super admins)
    if (!isEdit && !isSuperAdmin()) {
      const token = localStorage.getItem(storageKeys.accessToken);
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          if (decoded?.tenantId) {
            setValue("tenantId", decoded.tenantId);
          }
        } catch (e) {
          // ignore decode errors
        }
      }
    }
  }, [isEdit, isSuperAdmin, setValue]);

  useEffect(() => {
    if (service && isEdit) {
      reset({
        tenantId: service.tenantId,
        categoryId: service.categoryId,
        serviceName: service.serviceName,
        description: service.description || "",
        operatingHoursFrom: service.operatingHoursFrom || "",
        operatingHoursTo: service.operatingHoursTo || "",
        available24_7: service.available24_7,
        responseTime: service.responseTime,
        isActive: service.isActive,
      });
    }
  }, [service, isEdit, reset]);

  // Handle 24/7 toggle
  useEffect(() => {
    if (available24_7) {
      setValue("operatingHoursFrom", "00:00");
      setValue("operatingHoursTo", "23:59");
    }
  }, [available24_7, setValue]);

  const onSubmit = async (data: ServiceFormData) => {
    try {
      if (isEdit && id) {
        await updateService.mutateAsync({
          id,
          payload: {
            categoryId: data.categoryId,
            serviceName: data.serviceName,
            description: data.description,
            operatingHoursFrom: data.operatingHoursFrom,
            operatingHoursTo: data.operatingHoursTo,
            available24_7: data.available24_7,
            responseTime: data.responseTime,
            isActive: data.isActive,
          },
        });
        toast({
          title: "Success",
          description: "Service updated successfully",
        });
      } else {
        if (!data.tenantId) {
          toast({ title: "Missing tenant", description: "No tenant found in your session.", variant: "destructive" });
          return;
        }
        await createService.mutateAsync({
          tenantId: data.tenantId,
          categoryId: data.categoryId,
          serviceName: data.serviceName,
          description: data.description,
          operatingHoursFrom: data.operatingHoursFrom,
          operatingHoursTo: data.operatingHoursTo,
          available24_7: data.available24_7,
          responseTime: data.responseTime,
          isActive: data.isActive,
        });
        toast({
          title: "Success",
          description: "Service created successfully",
        });
      }
      navigate("/services");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save service",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEdit ? "Edit Service" : "Add New Service"}
        </h1>
        <p className="text-muted-foreground">
          {isEdit ? "Update service information" : "Fill in the details to add a new service"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Tenant selector - only show for super admins */}
            {isSuperAdmin() && !isEdit && (
              <div className="space-y-2">
                <Label htmlFor="tenantId">Tenant *</Label>
                <Select
                  value={tenantId || undefined}
                  onValueChange={(value) => setValue("tenantId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants?.map((tenant) => (
                      <SelectItem key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tenantId && (
                  <p className="text-sm text-destructive">
                    {errors.tenantId.message}
                  </p>
                )}
              </div>
            )}

            {/* Hidden tenantId input for non-super admins */}
            {!isSuperAdmin() && (
              <input type="hidden" {...register("tenantId", { required: !isEdit ? "Tenant is required" : false })} />
            )}

            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name *</Label>
              <Input
                id="serviceName"
                {...register("serviceName", { required: "Service name is required" })}
                placeholder="e.g., Airport Transfer"
              />
              {errors.serviceName && (
                <p className="text-sm text-destructive">{errors.serviceName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Brief description of the service"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Category *</Label>
              <Select
                value={categoryId || undefined}
                onValueChange={(value) => setValue("categoryId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-sm text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="operatingHoursFrom">Operating Hours From</Label>
                <Input
                  id="operatingHoursFrom"
                  type="time"
                  {...register("operatingHoursFrom")}
                  disabled={available24_7}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingHoursTo">Operating Hours To</Label>
                <Input
                  id="operatingHoursTo"
                  type="time"
                  {...register("operatingHoursTo")}
                  disabled={available24_7}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="available24_7"
                checked={available24_7}
                onCheckedChange={(checked) => setValue("available24_7", checked as boolean)}
              />
              <Label htmlFor="available24_7">Available 24/7</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responseTime">Response Time (minutes)</Label>
              <Input
                id="responseTime"
                type="number"
                {...register("responseTime", { valueAsNumber: true })}
                placeholder="Expected response time"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={watch("isActive")}
                onCheckedChange={(checked) => setValue("isActive", checked as boolean)}
              />
              <Label htmlFor="isActive">Service is active</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={!isEdit && !tenantId && !isSuperAdmin()}>
                {isEdit ? "Update" : "Save"} Service
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/services")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
