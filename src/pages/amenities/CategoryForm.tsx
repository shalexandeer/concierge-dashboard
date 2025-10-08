import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetAmenityCategory } from "@/services/amenities-categories/queries";
import { useCreateAmenityCategory, useUpdateAmenityCategory } from "@/services/amenities-categories/mutations";
import { useGetTenants } from "@/services/tenants/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface CategoryFormData {
  tenantId: string;
  name: string;
  description?: string;
}

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: category } = useGetAmenityCategory(id || "", isEdit);
  const { data: tenants } = useGetTenants();
  const createCategory = useCreateAmenityCategory();
  const updateCategory = useUpdateAmenityCategory();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>();

  const tenantId = watch("tenantId");

  useEffect(() => {
    if (category && isEdit) {
      reset({
        tenantId: category.tenantId,
        name: category.name,
        description: category.description || "",
      });
    }
  }, [category, isEdit, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEdit && id) {
        await updateCategory.mutateAsync({
          id,
          payload: {
            name: data.name,
            description: data.description,
          },
        });
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        await createCategory.mutateAsync(data);
        toast({
          title: "Success",
          description: "Category created successfully",
        });
      }
      navigate("/amenities/categories");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save category",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEdit ? "Edit Category" : "New Category"}
        </h1>
        <p className="text-muted-foreground">
          {isEdit
            ? "Update category information"
            : "Add a new amenity category"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tenantId">Tenant *</Label>
              <Select
                value={tenantId}
                onValueChange={(value) => setValue("tenantId", value)}
                disabled={isEdit}
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
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {isEdit ? "Update" : "Create"} Category
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/amenities/categories")}
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

