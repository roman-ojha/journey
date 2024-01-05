export type EmptySeat = {
  isSeat: false;
  type?: never;
  isBooked?: never;
  isSelected?: never;
  seatNumber?: never;
  seatPrice?: never;
};

export type DriverSeat = {
  isSeat: true;
  type: "driver";
  isBooked?: never;
  isSelected?: never;
  seatNumber?: never;
  seatPrice?: never;
};

export type BookedUserSeat = {
  isSeat: true;
  type: "user";
  isBooked: true;
  isSelected?: never;
  seatNumber: string;
  seatPrice: number;
};

export type SelectedUserSeat = {
  isSeat: true;
  type: "user";
  isBooked?: never;
  isSelected: true;
  seatNumber: string;
  seatPrice: number;
};

export type NormalUserSeat = {
  isSeat: true;
  type: "user";
  isBooked: false;
  isSelected?: never;
  seatNumber: string;
  seatPrice: number;
};

export type VehicleSeat =
  | EmptySeat
  | DriverSeat
  | BookedUserSeat
  | SelectedUserSeat
  | NormalUserSeat;
