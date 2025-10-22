import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetServices } from "@/services/services/queries";
import { useGetServiceCategories } from "@/services/services-categories/queries";
import { useDeleteService } from "@/services/services/mutations";
import useAuthStore from "@/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Plus, Trash2, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Services() {
  const navigate = useNavigate();
  const { isSuperAdmin } = useAuthStore();
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: services, isLoading } = useGetServices({
    categoryId: categoryFilter && categoryFilter !== "all" ? categoryFilter : undefined,
  });
  const { data: categories } = useGetServiceCategories();
  const deleteService = useDeleteService();

  const handleDelete = async (id: string) => {
    try {
      await deleteService.mutateAsync(id);
      setDeleteId(null);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const formatOperatingHours = (service: any) => {
    if (service.available24_7) {
      return "24/7";
    }
    if (service.operatingHoursFrom && service.operatingHoursTo) {
      return `${service.operatingHoursFrom} - ${service.operatingHoursTo}`;
    }
    return "Not specified";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">View and manage services</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">View and manage services</p>
        </div>
        {(isSuperAdmin() || true) && ( // Show for super_admin and tenant_admin
          <Button onClick={() => navigate("/services/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Services ({services?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={categoryFilter || undefined} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {services && services.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Operating Hours</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      {service.serviceName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {service.category?.name || "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatOperatingHours(service)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {service.responseTime ? (
                        <span>{service.responseTime} min</span>
                      ) : (
                        <span className="text-muted-foreground">Not specified</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {service.isActive ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />
                          Inactive
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {(isSuperAdmin() || true) && ( // Show for super_admin and tenant_admin
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/services/${service.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteId(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No services found</p>
              {(isSuperAdmin() || true) && ( // Show for super_admin and tenant_admin
                <Button
                  className="mt-4"
                  onClick={() => navigate("/services/new")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Service
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
