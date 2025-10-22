import { useState } from "react";
import { useGetFacilities } from "@/services/facilities/queries";
import { useDeleteFacility } from "@/services/facilities/mutations";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useAuthStore from "@/lib/store/useAuthStore";
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
import { toast } from "@/lib/hooks/use-toast";
import { Facility } from "@/services/facilities/types";

export default function Facilities() {
  const { data: facilities, isLoading } = useGetFacilities();
  const deleteFacility = useDeleteFacility();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { isTenantAdmin, isSuperAdmin } = useAuthStore();
  
  // Check if user can manage facilities
  const canManageFacilities = isTenantAdmin() || isSuperAdmin();

  console.log(facilities)

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteFacility.mutateAsync(deleteId);
      toast({
        title: "Success",
        description: "Facility deleted successfully",
      });
      setDeleteId(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete facility",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hotel Facilities</h1>
          <p className="text-muted-foreground">Manage hotel facilities and bookings</p>
        </div>
        {canManageFacilities && (
          <Button asChild>
            <Link to="/facilities/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Facility
            </Link>
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Facility Name</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Rate/Hour</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facilities && facilities.data && facilities.data.length > 0 ? (
              facilities.data.map((facility: Facility) => (
                <TableRow key={facility.id}>
                  <TableCell className="font-medium">{facility.facilityName}</TableCell>
                  <TableCell>{facility.capacity} people</TableCell>
                  <TableCell>{formatCurrency(facility.ratePerHour)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={facility.status === "available" ? "default" : "destructive"}
                      className={facility.status === "available" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {facility.status === "available" ? "Available" : "Booked"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {facility.equipment && facility.equipment.length > 0 ? (
                        facility.equipment.slice(0, 2).map((equipment, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {equipment.name} ({equipment.quantity})
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">No equipment</span>
                      )}
                      {facility.equipment && facility.equipment.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{facility.equipment.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(facility.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/facilities/${facility.id}/view`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/facilities/${facility.id}/book`}>
                        <Calendar className="h-4 w-4" />
                      </Link>
                    </Button>
                    {canManageFacilities && (
                      <>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/facilities/${facility.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(facility.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No facilities found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              facility and all its bookings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
