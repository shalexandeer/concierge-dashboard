import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useGetFacility } from "@/services/facilities/queries";
import { useCreateFacility, useUpdateFacility } from "@/services/facilities/mutations";
import { useGetTenants } from "@/services/tenants/queries";
import useAuthStore from "@/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/lib/hooks/use-toast";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Equipment } from "@/services/facilities/types";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/services/auth/types";
import { storageKeys } from "@/services/auth/keys";
import ImageUpload from "@/components/molecules/ImageUpload";
import { api } from "@/lib/axios";

interface FacilityFormData {
  tenantId: string;
  facilityName: string;
  capacity: number;
  ratePerHour: number;
  equipment: Equipment[];
  imagePath?: string;
}

export default function FacilityForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [currentImagePath, setCurrentImagePath] = useState<string>("");
  const [selectedImageBase64, setSelectedImageBase64] = useState<string>("");
  const [selectedImageName, setSelectedImageName] = useState<string>("");

  const { data: facility } = useGetFacility(id || "", isEdit);
  const { isSuperAdmin } = useAuthStore();
  const { data: tenants } = useGetTenants(isSuperAdmin());
  const createFacility = useCreateFacility();
  const updateFacility = useUpdateFacility();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<FacilityFormData>({
    defaultValues: {
      equipment: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "equipment",
  });

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
        } catch (_) {}
      }
    }
  }, [isEdit, isSuperAdmin, setValue]);

  useEffect(() => {
    if (facility && isEdit) {
      reset({
        tenantId: facility.tenantId,
        facilityName: facility.facilityName,
        capacity: facility.capacity,
        ratePerHour: facility.ratePerHour,
        equipment: facility.equipment || [],
        imagePath: facility.imagePath || "",
      });
      setCurrentImagePath(facility.imagePath || "");
    }
  }, [facility, isEdit, reset]);

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

  const onSubmit = async (data: FacilityFormData) => {
    try {
      let imagePath = data.imagePath;
      
      // If we have a new base64 image, upload it first
      if (selectedImageBase64 && selectedImageBase64 !== currentImagePath) {
        imagePath = await uploadImage(selectedImageBase64, selectedImageName);
      }
      
      if (isEdit && id) {
        await updateFacility.mutateAsync({
          id,
          payload: {
            facilityName: data.facilityName,
            capacity: data.capacity,
            ratePerHour: data.ratePerHour,
            equipment: data.equipment,
            imagePath: imagePath,
          },
        });
        toast({
          title: "Success",
          description: "Facility updated successfully",
        });
      } else {
        if (!data.tenantId) {
          toast({ title: "Missing tenant", description: "No tenant found in your session.", variant: "destructive" });
          return;
        }
        await createFacility.mutateAsync({
          tenantId: data.tenantId,
          facilityName: data.facilityName,
          capacity: data.capacity,
          ratePerHour: data.ratePerHour,
          equipment: data.equipment,
          imagePath: imagePath,
        });
        toast({
          title: "Success",
          description: "Facility created successfully",
        });
      }
      navigate("/facilities");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save facility",
        variant: "destructive",
      });
    }
  };

  const addEquipment = () => {
    append({ name: "", quantity: 1 });
  };

  const removeEquipment = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEdit ? "Edit Facility" : "New Facility"}
        </h1>
        <p className="text-muted-foreground">
          {isEdit ? "Update facility information" : "Add a new facility to the system"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facility Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Tenant selector - only show for super admins */}
            {isSuperAdmin() && !isEdit && (
              <div className="space-y-2">
                <Label htmlFor="tenantId">Tenant *</Label>
                <Select onValueChange={(value) => setValue("tenantId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tenant" />
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
                  <p className="text-sm text-destructive">{errors.tenantId.message}</p>
                )}
              </div>
            )}

            {/* Hidden tenantId input for non-super admins */}
            {!isSuperAdmin() && (
              <input type="hidden" {...register("tenantId", { required: !isEdit ? "Tenant is required" : false })} />
            )}

            <div className="space-y-2">
              <Label htmlFor="facilityName">Facility Name *</Label>
              <Input
                id="facilityName"
                {...register("facilityName", { required: "Facility name is required" })}
              />
              {errors.facilityName && (
                <p className="text-sm text-destructive">{errors.facilityName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  {...register("capacity", { 
                    required: "Capacity is required",
                    min: { value: 1, message: "Capacity must be at least 1" },
                    valueAsNumber: true
                  })}
                />
                {errors.capacity && (
                  <p className="text-sm text-destructive">{errors.capacity.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ratePerHour">Rate per Hour (IDR) *</Label>
                <Input
                  id="ratePerHour"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("ratePerHour", { 
                    required: "Rate per hour is required",
                    min: { value: 0, message: "Rate must be non-negative" },
                    valueAsNumber: true
                  })}
                />
                {errors.ratePerHour && (
                  <p className="text-sm text-destructive">{errors.ratePerHour.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <ImageUpload
                onImageSelected={(base64Data, fileName) => {
                  setSelectedImageBase64(base64Data);
                  setSelectedImageName(fileName);
                }}
                onImageRemoved={() => {
                  setSelectedImageBase64("");
                  setSelectedImageName("");
                }}
                currentImage={currentImagePath}
              />

              <div className="flex items-center justify-between">
                <Label>Equipment</Label>
                <Button type="button" onClick={addEquipment} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Equipment
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`equipment.${index}.name`}>Equipment Name</Label>
                    <Input
                      {...register(`equipment.${index}.name` as const, {
                        required: "Equipment name is required",
                      })}
                      placeholder="e.g., Projector"
                    />
                    {errors.equipment?.[index]?.name && (
                      <p className="text-sm text-destructive">
                        {errors.equipment[index]?.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-24 space-y-2">
                    <Label htmlFor={`equipment.${index}.quantity`}>Qty</Label>
                    <Input
                      type="number"
                      min="1"
                      {...register(`equipment.${index}.quantity` as const, {
                        required: "Quantity is required",
                        min: { value: 1, message: "Quantity must be at least 1" },
                        valueAsNumber: true
                      })}
                    />
                    {errors.equipment?.[index]?.quantity && (
                      <p className="text-sm text-destructive">
                        {errors.equipment[index]?.quantity?.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEquipment(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}

              {fields.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No equipment added. Click "Add Equipment" to add items.
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={(!isEdit && !watch("tenantId") && !isSuperAdmin()) || createFacility.isPending || updateFacility.isPending}>
                {isEdit ? "Update Facility" : "Create Facility"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/facilities")}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
