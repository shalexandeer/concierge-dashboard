import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetUser } from "@/services/users/queries";
import { useCreateUser, useUpdateUser } from "@/services/users/mutations";
import { useGetRoles } from "@/services/roles/queries";
import { useGetTenants } from "@/services/tenants/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/lib/hooks/use-toast";
import { useEffect } from "react";
import useAuthStore from "@/lib/store/useAuthStore";

interface UserFormData {
  email: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
  roleId: string;
  tenantIds: string[];
}

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { canManageRole, isSuperAdmin } = useAuthStore();

  const { data: user } = useGetUser(id || "", isEdit);
  const { data: roles } = useGetRoles();
  const { data: tenants } = useGetTenants(isSuperAdmin());
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      roleId: "",
      tenantIds: [],
    },
  });

  useEffect(() => {
    if (user && isEdit) {
      reset({
        email: user.email,
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        roleId: user.roleId || "",
      });
    }
  }, [user, isEdit, reset]);

  // Filter roles based on current user's permissions
  const availableRoles = roles?.filter(role => {
    if (isSuperAdmin()) return true; // Super admin can assign any role
    return canManageRole(role.name);
  }) || [];

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEdit && id) {
        await updateUser.mutateAsync({
          id,
          payload: {
            email: data.email,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            roleId: data.roleId,
            tenantIds: data.tenantIds,
          },
        });
        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else {
        if (!data.password) {
          toast({
            title: "Error",
            description: "Password is required for new users",
            variant: "destructive",
          });
          return;
        }
        await createUser.mutateAsync({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          roleId: data.roleId,
          tenantIds: data.tenantIds,
        });
        toast({
          title: "Success",
          description: "User created successfully",
        });
      }
      navigate("/users");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEdit ? "Edit User" : "New User"}
        </h1>
        <p className="text-muted-foreground">
          {isEdit ? "Update user information" : "Add a new user to the system"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {!isEdit && (
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: !isEdit })}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...register("fullName")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" {...register("phoneNumber")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roleId">Role *</Label>
              <Select 
                onValueChange={(value) => setValue("roleId", value)}
                value={watch("roleId")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name} - {role.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.roleId && (
                <p className="text-sm text-destructive">{errors.roleId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenantIds">Tenants</Label>
              <Select 
                onValueChange={(value) => {
                  const currentTenants = watch("tenantIds") || [];
                  if (!currentTenants.includes(value)) {
                    setValue("tenantIds", [...currentTenants, value]);
                  }
                }}
                value=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tenants to assign" />
                </SelectTrigger>
                <SelectContent>
                  {tenants?.map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {watch("tenantIds")?.map((tenantId) => {
                  const tenant = tenants?.find(t => t.id === tenantId);
                  return (
                    <div key={tenantId} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                      <span>{tenant?.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const currentTenants = watch("tenantIds") || [];
                          setValue("tenantIds", currentTenants.filter(id => id !== tenantId));
                        }}
                        className="ml-1 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {isEdit ? "Update" : "Create"} User
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/users")}
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

