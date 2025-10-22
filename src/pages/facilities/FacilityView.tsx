import { useParams, Link } from "react-router-dom";
import { useGetFacility, useGetFacilityBookings } from "@/services/facilities/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Users, Clock, DollarSign, Settings } from "lucide-react";
import { Booking } from "@/services/facilities/types";
import { useState } from "react";
import BookingDialog from "@/components/organisms/BookingDialog";

export default function FacilityView() {
  const { id } = useParams();
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  
  const { data: facility, isLoading: facilityLoading } = useGetFacility(id || "", !!id);
  const { data: bookings, isLoading: bookingsLoading } = useGetFacilityBookings(id || "", !!id);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUpcoming = (booking: Booking) => {
    return new Date(booking.startDateTime) > new Date();
  };

  const upcomingBookings = bookings?.filter(isUpcoming) || [];
  const pastBookings = bookings?.filter((booking) => !isUpcoming(booking)) || [];

  if (facilityLoading) {
    return <div>Loading facility details...</div>;
  }

  if (!facility) {
    return <div>Facility not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{facility.facilityName}</h1>
          <p className="text-muted-foreground">Facility details and booking history</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsBookingDialogOpen(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Book Facility
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/facilities/${facility.id}/edit`}>
              <Settings className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Facility Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Facility Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Capacity:</span>
              <span>{facility.capacity} people</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Rate:</span>
              <span>{formatCurrency(facility.ratePerHour)}/hour</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={facility.status === "available" ? "default" : "destructive"}
                className={facility.status === "available" ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {facility.status === "available" ? "Available" : "Booked"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Equipment */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            {facility.equipment && facility.equipment.length > 0 ? (
              <div className="space-y-2">
                {facility.equipment.map((equipment, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{equipment.name}</span>
                    <Badge variant="outline">{equipment.quantity}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No equipment listed</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Bookings:</span>
              <span>{bookings?.length || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Upcoming:</span>
              <span>{upcomingBookings.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Past: {pastBookings.length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking History */}
      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          {bookingsLoading ? (
            <div>Loading bookings...</div>
          ) : bookings && bookings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest Name</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking: Booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.guestName}</TableCell>
                    <TableCell>{formatDateTime(booking.startDateTime)}</TableCell>
                    <TableCell>{formatDateTime(booking.endDateTime)}</TableCell>
                    <TableCell>
                      {Math.ceil(
                        (new Date(booking.endDateTime).getTime() - 
                         new Date(booking.startDateTime).getTime()) / (1000 * 60 * 60)
                      )} hours
                    </TableCell>
                    <TableCell>
                      <Badge variant={isUpcoming(booking) ? "default" : "secondary"}>
                        {isUpcoming(booking) ? "Upcoming" : "Past"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No bookings found for this facility</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Dialog */}
      <BookingDialog
        facilityId={facility.id}
        facilityName={facility.facilityName}
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
      />
    </div>
  );
}
