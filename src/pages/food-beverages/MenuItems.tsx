import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetFoodBeverages } from "@/services/food-beverages/queries";
import { useGetFoodBeverageCategories } from "@/services/food-beverages-categories/queries";
import { useDeleteFoodBeverage } from "@/services/food-beverages/mutations";
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
import { Edit, Plus, Trash2, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";

export default function MenuItems() {
  const navigate = useNavigate();
  const { isSuperAdmin } = useAuthStore();
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: menuItems, isLoading, error } = useGetFoodBeverages({
    categoryId: categoryFilter && categoryFilter !== "all" ? categoryFilter : undefined,
  });
  const { data: categories } = useGetFoodBeverageCategories();
  const deleteMenuItem = useDeleteFoodBeverage();

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem.mutateAsync(id);
      setDeleteId(null);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const formatServiceHours = (item: any) => {
    if (item.allDay) {
      return "All day";
    }
    if (item.serviceHoursStart && item.serviceHoursEnd) {
      return `${item.serviceHoursStart} - ${item.serviceHoursEnd}`;
    }
    return "Not specified";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Food & Beverages</h1>
          <p className="text-muted-foreground">View and manage menu items</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Food & Beverages</h1>
          <p className="text-muted-foreground">View and manage menu items</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-destructive">Error loading menu items: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Food & Beverages</h1>
          <p className="text-muted-foreground">View and manage menu items</p>
        </div>
        {(isSuperAdmin() || true) && ( // Show for super_admin and tenant_admin
          <Button onClick={() => navigate("/food-beverages/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Menu Item
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Items ({menuItems?.length || 0})</CardTitle>
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

          {menuItems && menuItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Prep Time</TableHead>
                  <TableHead>Service Hours</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.imagePath ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/v1/uploads/images/${item.imagePath.split('/').pop()}`}
                          alt={item.itemName}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded-lg border flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">No image</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.itemName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {item.category?.name || "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {formatPrice(item.price)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {item.preparationTime} min
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatServiceHours(item)}
                    </TableCell>
                    <TableCell>
                      {item.isAvailable ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          Available
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />
                          Unavailable
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {(isSuperAdmin() || true) && ( // Show for super_admin and tenant_admin
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/food-beverages/${item.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteId(item.id)}
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
              <p className="text-muted-foreground">No menu items found</p>
              {(isSuperAdmin() || true) && ( // Show for super_admin and tenant_admin
                <Button
                  className="mt-4"
                  onClick={() => navigate("/food-beverages/new")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Menu Item
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this menu item? This action cannot be undone.
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