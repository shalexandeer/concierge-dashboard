import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetFoodBeverageCategory } from "@/services/food-beverages-categories/queries";
import { useCreateFoodBeverageCategory, useUpdateFoodBeverageCategory } from "@/services/food-beverages-categories/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/lib/hooks/use-toast";
import { useEffect } from "react";

interface CategoryFormData {
  name: string;
  description?: string;
  icon?: string;
}

export default function MenuCategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: category } = useGetFoodBeverageCategory(id || "", isEdit);
  const createCategory = useCreateFoodBeverageCategory();
  const updateCategory = useUpdateFoodBeverageCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>();

  useEffect(() => {
    if (category && isEdit) {
      reset({
        name: category.name,
        description: category.description || "",
        icon: category.icon || "",
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
            icon: data.icon,
          },
        });
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        await createCategory.mutateAsync({
          name: data.name,
          description: data.description,
          icon: data.icon,
        });
        toast({
          title: "Success",
          description: "Category created successfully",
        });
      }
      navigate("/food-beverages-categories");
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
          {isEdit ? "Edit Category" : "Add New Category"}
        </h1>
        <p className="text-muted-foreground">
          {isEdit ? "Update category information" : "Fill in the details to add a new category"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                {...register("name", { required: "Category name is required" })}
                placeholder="e.g., Appetizers"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Brief description of the category"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Input
                id="icon"
                {...register("icon")}
                placeholder="e.g., 🥗"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {isEdit ? "Update" : "Save"} Category
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/food-beverages-categories")}
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
