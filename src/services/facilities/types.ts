export interface Equipment {
  name: string;
  quantity: number;
}

export interface Facility {
  id: string;
  tenantId: string;
  facilityName: string;
  capacity: number;
  ratePerHour: number;
  status: "available" | "booked";
  equipment: Equipment[];
  imagePath?: string;
  createdAt: string;
  updatedAt: string;
  bookings?: Booking[];
}

export interface Booking {
  id: string;
  tenantId: string;
  facilityId: string;
  guestName: string;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
  updatedAt: string;
  facility?: Facility;
}

export interface CreateFacilityPayload {
  tenantId: string;
  facilityName: string;
  capacity: number;
  ratePerHour: number;
  equipment: Equipment[];
  imagePath?: string;
}

export interface UpdateFacilityPayload {
  facilityName?: string;
  capacity?: number;
  ratePerHour?: number;
  equipment?: Equipment[];
  imagePath?: string;
}

export interface CreateBookingPayload {
  tenantId: string;
  facilityId: string;
  guestName: string;
  startDateTime: string;
  endDateTime: string;
}

export interface FacilityWithBookings extends Facility {
  upcomingBookings: Booking[];
  pastBookings: Booking[];
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  tenantId?: string;
}
