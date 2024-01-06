export interface EmptySeat {
  isSeat: false;
  type?: never;
  isBooked?: never;
  isSelected?: never;
  seatNumber?: never;
  seatPrice?: never;
}

export interface DriverSeat {
  isSeat: true;
  type: "driver";
  isBooked?: never;
  isSelected?: never;
  seatNumber?: never;
  seatPrice?: never;
}

export interface BookedUserSeat {
  isSeat: true;
  type: "user";
  isBooked: true;
  isSelected?: never;
  seatNumber: string;
  seatPrice: number;
}

export interface SelectedUserSeat {
  isSeat: true;
  type: "user";
  isBooked?: never;
  isSelected: true;
  seatNumber: string;
  seatPrice: number;
}

export interface NormalUserSeat {
  isSeat: true;
  type: "user";
  isBooked: false;
  isSelected?: never;
  seatNumber: string;
  seatPrice: number;
}

export type VehicleSeat =
  | EmptySeat
  | DriverSeat
  | BookedUserSeat
  | SelectedUserSeat
  | NormalUserSeat;

export interface Vehicle {
  image: string;
  title: string;
  slug: string;
  no_of_review: number;
  rating: number;
  departure_at: string;
  price: number;
  vehicle_type: string;
  plate_number: string;
  departure_from: string;
  destination_place: string;
  seats: VehicleSeat[][];
}
