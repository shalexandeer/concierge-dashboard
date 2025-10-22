import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetServiceCategory } from "@/services/services-categories/queries";
import { useCreateServiceCategory, useUpdateServiceCategory } from "@/services/services-categories/mutations";
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

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: category } = useGetServiceCategory(id || "", isEdit);
  const createCategory = useCreateServiceCategory();
  const updateCategory = useUpdateServiceCategory();

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
      navigate("/services-categories");
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
          {isEdit ? "Update category information" : "Add a new service category"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
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
                placeholder="e.g., car, bell, wrench"
              />
              <p className="text-sm text-muted-foreground">
                Icon name or identifier for the category
              </p>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {isEdit ? "Update" : "Create"} Category
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/services-categories")}
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
