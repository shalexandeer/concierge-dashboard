import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetTenant } from "@/services/tenants/queries";
import { useCreateTenant, useUpdateTenant } from "@/services/tenants/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/lib/hooks/use-toast";
import { useEffect } from "react";

interface TenantFormData {
  name: string;
  domain?: string;
}

export default function TenantForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: tenant } = useGetTenant(id || "", isEdit);
  const createTenant = useCreateTenant();
  const updateTenant = useUpdateTenant();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TenantFormData>();

  useEffect(() => {
    if (tenant && isEdit) {
      reset({
        name: tenant.name,
        domain: tenant.domain || "",
      });
    }
  }, [tenant, isEdit, reset]);

  const onSubmit = async (data: TenantFormData) => {
    try {
      if (isEdit && id) {
        await updateTenant.mutateAsync({
          id,
          payload: data,
        });
        toast({
          title: "Success",
          description: "Tenant updated successfully",
        });
      } else {
        await createTenant.mutateAsync(data);
        toast({
          title: "Success",
          description: "Tenant created successfully",
        });
      }
      navigate("/tenants");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save tenant",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEdit ? "Edit Tenant" : "New Tenant"}
        </h1>
        <p className="text-muted-foreground">
          {isEdit ? "Update tenant information" : "Add a new tenant to the system"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenant Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input id="domain" {...register("domain")} />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {isEdit ? "Update" : "Create"} Tenant
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/tenants")}
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

