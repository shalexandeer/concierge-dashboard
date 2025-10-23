import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetFoodBeverage } from "@/services/food-beverages/queries";
import { useCreateFoodBeverage, useUpdateFoodBeverage } from "@/services/food-beverages/mutations";
import { useGetFoodBeverageCategories } from "@/services/food-beverages-categories/queries";
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
import ImageUpload from "@/components/molecules/ImageUpload";
import { toast } from "@/lib/hooks/use-toast";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/services/auth/types";
import { storageKeys } from "@/services/auth/keys";
import { api } from "@/lib/axios";

interface MenuItemFormData {
  tenantId: string;
  categoryId: string;
  itemName: string;
  description?: string;
  price: number;
  preparationTime: number;
  serviceHoursStart?: string;
  serviceHoursEnd?: string;
  allDay?: boolean;
  imagePath?: string;
  isAvailable?: boolean;
  serviceHoursOption?: string;
}

export default function MenuItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [currentImagePath, setCurrentImagePath] = useState<string>("");
  const [selectedImageBase64, setSelectedImageBase64] = useState<string>("");
  const [selectedImageName, setSelectedImageName] = useState<string>("");

  const { data: menuItem } = useGetFoodBeverage(id || "", isEdit);
  const { data: categories } = useGetFoodBeverageCategories();
  const { isSuperAdmin } = useAuthStore();
  const { data: tenants } = useGetTenants(isSuperAdmin());
  const createMenuItem = useCreateFoodBeverage();
  const updateMenuItem = useUpdateFoodBeverage();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MenuItemFormData>();

  const tenantId = watch("tenantId");
  const categoryId = watch("categoryId");
  const serviceHoursOption = watch("serviceHoursOption");

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
    if (menuItem && isEdit) {
      // Determine service hours option based on existing data
      let serviceHoursOption = "custom";
      if (menuItem.allDay) {
        serviceHoursOption = "all-day";
      } else if (menuItem.serviceHoursStart && menuItem.serviceHoursEnd) {
        // Normalize time format (remove seconds if present)
        const startTime = menuItem.serviceHoursStart.substring(0, 5); // Get HH:MM
        const endTime = menuItem.serviceHoursEnd.substring(0, 5); // Get HH:MM
        
        if (startTime === "06:00" && endTime === "11:00") {
          serviceHoursOption = "breakfast";
        } else if (startTime === "11:00" && endTime === "15:00") {
          serviceHoursOption = "lunch";
        } else if (startTime === "17:00" && endTime === "22:00") {
          serviceHoursOption = "dinner";
        }
      }

      reset({
        tenantId: menuItem.tenantId,
        categoryId: menuItem.categoryId,
        itemName: menuItem.itemName,
        description: menuItem.description || "",
        price: menuItem.price,
        preparationTime: menuItem.preparationTime,
        serviceHoursStart: menuItem.serviceHoursStart || "",
        serviceHoursEnd: menuItem.serviceHoursEnd || "",
        allDay: menuItem.allDay,
        imagePath: menuItem.imagePath || "",
        isAvailable: menuItem.isAvailable,
        serviceHoursOption: serviceHoursOption,
      });
    }
  }, [menuItem, isEdit, reset]);

  // Handle service hours options
  const handleServiceHoursChange = (option: string) => {
    setValue("serviceHoursOption", option);
    
    switch (option) {
      case "all-day":
        setValue("allDay", true);
        setValue("serviceHoursStart", "");
        setValue("serviceHoursEnd", "");
        break;
      case "breakfast":
        setValue("allDay", false);
        setValue("serviceHoursStart", "06:00");
        setValue("serviceHoursEnd", "11:00");
        break;
      case "lunch":
        setValue("allDay", false);
        setValue("serviceHoursStart", "11:00");
        setValue("serviceHoursEnd", "15:00");
        break;
      case "dinner":
        setValue("allDay", false);
        setValue("serviceHoursStart", "17:00");
        setValue("serviceHoursEnd", "22:00");
        break;
      case "custom":
        setValue("allDay", false);
        // Keep existing values or clear them
        break;
    }
  };

  const uploadImage = async (base64Data: string, fileName: string): Promise<string> => {
    try {
      // Extract MIME type from base64 data URL
      const mimeType = base64Data.split(',')[0].split(':')[1].split(';')[0];
      
      // Convert base64 to blob directly
      const base64String = base64Data.split(',')[1]; // Remove data:image/jpeg;base64, prefix
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      
      // Create FormData
      const formData = new FormData();
      formData.append('image', blob, fileName);
      
      // Upload to server
      const uploadResponse = await api.post('/uploads/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return uploadResponse.data.data.path;
    } catch (error: any) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };

  const onSubmit = async (data: MenuItemFormData) => {
    try {
      let imagePath = data.imagePath;
      
      // If we have a new base64 image, upload it first
      if (selectedImageBase64 && selectedImageBase64 !== currentImagePath) {
        imagePath = await uploadImage(selectedImageBase64, selectedImageName);
      }
      
      if (isEdit && id) {
        await updateMenuItem.mutateAsync({
          id,
          payload: {
            categoryId: data.categoryId,
            itemName: data.itemName,
            description: data.description,
            price: Number(data.price),
            preparationTime: Number(data.preparationTime),
            serviceHoursStart: data.serviceHoursStart,
            serviceHoursEnd: data.serviceHoursEnd,
            allDay: data.allDay,
            imagePath: imagePath,
            isAvailable: data.isAvailable,
          },
        });
        toast({
          title: "Success",
          description: "Menu item updated successfully",
        });
      } else {
        if (!data.tenantId) {
          toast({ title: "Missing tenant", description: "No tenant found in your session.", variant: "destructive" });
          return;
        }
        await createMenuItem.mutateAsync({
          tenantId: data.tenantId,
          categoryId: data.categoryId,
          itemName: data.itemName,
          description: data.description,
          price: Number(data.price),
          preparationTime: Number(data.preparationTime),
          serviceHoursStart: data.serviceHoursStart,
          serviceHoursEnd: data.serviceHoursEnd,
          allDay: data.allDay,
          imagePath: imagePath,
          isAvailable: data.isAvailable,
        });
        toast({
          title: "Success",
          description: "Menu item created successfully",
        });
      }
      navigate("/food-beverages");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save menu item",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEdit ? "Edit Menu Item" : "Add New Menu Item"}
        </h1>
        <p className="text-muted-foreground">
          {isEdit ? "Update menu item information" : "Fill in the details below to add a new item to your menu"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
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
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                {...register("itemName", { required: "Item name is required" })}
                placeholder="e.g., Grilled Salmon"
              />
              {errors.itemName && (
                <p className="text-sm text-destructive">{errors.itemName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Brief description of the dish"
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
                <Label htmlFor="price">Price *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">Rp. </span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("price", { required: "Price is required", min: 0 })}
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preparationTime">Preparation Time *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="preparationTime"
                    type="number"
                    min="1"
                    {...register("preparationTime", { required: "Preparation time is required", min: 1 })}
                    placeholder="15"
                  />
                  <span className="text-sm text-muted-foreground">minutes</span>
                </div>
                {errors.preparationTime && (
                  <p className="text-sm text-destructive">{errors.preparationTime.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Service Hours</Label>
                <Select 
                  value={serviceHoursOption || undefined}
                  onValueChange={handleServiceHoursChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-day">All day</SelectItem>
                    <SelectItem value="breakfast">Breakfast (6-11)</SelectItem>
                    <SelectItem value="lunch">Lunch (11-15)</SelectItem>
                    <SelectItem value="dinner">Dinner (17-22)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {serviceHoursOption && serviceHoursOption === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceHoursStart">Start Time</Label>
                    <Input
                      id="serviceHoursStart"
                      type="time"
                      {...register("serviceHoursStart")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceHoursEnd">End Time</Label>
                    <Input
                      id="serviceHoursEnd"
                      type="time"
                      {...register("serviceHoursEnd")}
                    />
                  </div>
                </div>
              )}
            </div>

            <ImageUpload
              onImageSelected={(base64Data, fileName) => {
                setSelectedImageBase64(base64Data);
                setSelectedImageName(fileName);
                setValue("imagePath", base64Data); // Store base64 temporarily
              }}
              onImageRemoved={() => {
                setSelectedImageBase64("");
                setSelectedImageName("");
                setValue("imagePath", "");
                setCurrentImagePath("");
              }}
              currentImage={currentImagePath}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAvailable"
                checked={watch("isAvailable")}
                onCheckedChange={(checked) => setValue("isAvailable", !!checked)}
              />
              <div className="space-y-1">
                <Label htmlFor="isAvailable">Available for ordering</Label>
                <p className="text-sm text-muted-foreground">Customers can order this item immediately</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={!isEdit && !tenantId && !isSuperAdmin()}>
                {isEdit ? "Update" : "Save"} Menu Item
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/food-beverages")}
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
