import { useForm } from "react-hook-form";
import { useCreateBooking } from "@/services/facilities/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/lib/hooks/use-toast";
import { useState } from "react";

interface BookingFormData {
  guestName: string;
  startDateTime: string;
  endDateTime: string;
}

interface BookingDialogProps {
  facilityId: string;
  facilityName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingDialog({
  facilityId,
  facilityName,
  isOpen,
  onClose,
}: BookingDialogProps) {
  const createBooking = useCreateBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>();

  const startDateTime = watch("startDateTime");
  const endDateTime = watch("endDateTime");

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      // Convert to ISO string for API
      const startTime = new Date(data.startDateTime).toISOString();
      const endTime = new Date(data.endDateTime).toISOString();

      await createBooking.mutateAsync({
        tenantId: "default-tenant", // This should come from context or props
        facilityId,
        guestName: data.guestName,
        startDateTime: startTime,
        endDateTime: endTime,
      });

      toast({
        title: "Success",
        description: "Facility booked successfully",
      });

      reset();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to book facility",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Get current date and time for min values
  const now = new Date();
  const minDateTime = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM

  // Validate that end time is after start time
  const isEndTimeValid = startDateTime && endDateTime && 
    new Date(endDateTime) > new Date(startDateTime);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Facility</DialogTitle>
          <DialogDescription>
            Book "{facilityName}" for your event or meeting.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="guestName">Guest Name *</Label>
            <Input
              id="guestName"
              {...register("guestName", { required: "Guest name is required" })}
              placeholder="Enter guest name"
            />
            {errors.guestName && (
              <p className="text-sm text-destructive">{errors.guestName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDateTime">Start Date & Time *</Label>
            <Input
              id="startDateTime"
              type="datetime-local"
              min={minDateTime}
              {...register("startDateTime", { 
                required: "Start date and time is required",
                validate: (value) => {
                  if (new Date(value) <= now) {
                    return "Start time must be in the future";
                  }
                  return true;
                }
              })}
            />
            {errors.startDateTime && (
              <p className="text-sm text-destructive">{errors.startDateTime.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDateTime">End Date & Time *</Label>
            <Input
              id="endDateTime"
              type="datetime-local"
              min={startDateTime || minDateTime}
              {...register("endDateTime", { 
                required: "End date and time is required",
                validate: (value) => {
                  if (startDateTime && new Date(value) <= new Date(startDateTime)) {
                    return "End time must be after start time";
                  }
                  return true;
                }
              })}
            />
            {errors.endDateTime && (
              <p className="text-sm text-destructive">{errors.endDateTime.message}</p>
            )}
          </div>

          {startDateTime && endDateTime && !isEndTimeValid && (
            <p className="text-sm text-destructive">
              End time must be after start time
            </p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !isEndTimeValid}
            >
              {isSubmitting ? "Booking..." : "Book Facility"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
