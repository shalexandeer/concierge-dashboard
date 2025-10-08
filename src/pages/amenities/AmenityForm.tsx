import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetAmenity } from "@/services/amenities/queries";
import { useCreateAmenity, useUpdateAmenity } from "@/services/amenities/mutations";
import { useGetAmenityCategories } from "@/services/amenities-categories/queries";
import { useGetTenants } from "@/services/tenants/queries";
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

interface AmenityFormData {
  tenantId: string;
  categoryId: string;
  itemName: string;
  description?: string;
  stock?: number;
  minimumStock?: number;
  available?: boolean;
}

export default function AmenityForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: amenity } = useGetAmenity(id || "", isEdit);
  const { data: categories } = useGetAmenityCategories();
  const { data: tenants } = useGetTenants();
  const createAmenity = useCreateAmenity();
  const updateAmenity = useUpdateAmenity();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AmenityFormData>();

  const tenantId = watch("tenantId");
  const categoryId = watch("categoryId");

  useEffect(() => {
    if (amenity && isEdit) {
      reset({
        tenantId: amenity.tenantId,
        categoryId: amenity.categoryId,
        itemName: amenity.itemName,
        description: amenity.description || "",
        stock: amenity.stock,
        minimumStock: amenity.minimumStock,
        available: amenity.available,
      });
    }
  }, [amenity, isEdit, reset]);

  const onSubmit = async (data: AmenityFormData) => {
    try {
      if (isEdit && id) {
        await updateAmenity.mutateAsync({
          id,
          payload: {
            categoryId: data.categoryId,
            itemName: data.itemName,
            description: data.description,
            stock: data.stock,
            minimumStock: data.minimumStock,
            available: data.available,
          },
        });
        toast({
          title: "Success",
          description: "Amenity updated successfully",
        });
      } else {
        await createAmenity.mutateAsync({
          tenantId: data.tenantId,
          categoryId: data.categoryId,
          itemName: data.itemName,
          description: data.description,
          stock: data.stock,
          minimumStock: data.minimumStock,
          available: data.available,
        });
        toast({
          title: "Success",
          description: "Amenity created successfully",
        });
      }
      navigate("/amenities");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save amenity",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEdit ? "Edit Amenity" : "New Amenity"}
        </h1>
        <p className="text-muted-foreground">
          {isEdit ? "Update amenity information" : "Add a new amenity to the system"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Amenity Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="categoryId">Category *</Label>
                <Select
                  value={categoryId}
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="itemName">Name *</Label>
              <Input
                id="itemName"
                {...register("itemName", { required: "Name is required" })}
              />
              {errors.itemName && (
                <p className="text-sm text-destructive">{errors.itemName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  {...register("stock", { valueAsNumber: true })}
                />
                {errors.stock && (
                  <p className="text-sm text-destructive">
                    {errors.stock.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumStock">Minimum Stock</Label>
                <Input
                  id="minimumStock"
                  type="number"
                  {...register("minimumStock", { valueAsNumber: true })}
                />
                {errors.minimumStock && (
                  <p className="text-sm text-destructive">
                    {errors.minimumStock.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="available"
                checked={watch("available")}
                onCheckedChange={(checked) => setValue("available", checked as boolean)}
              />
              <Label htmlFor="available">Available</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {isEdit ? "Update" : "Create"} Amenity
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/amenities")}
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

