import { BookSeatsRequest } from "@/services/api/request";
import { BookedSeatsResponse } from "@/services/api/response";
import apiRoutes, { APISuccessResponse } from "@/services/api/routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const bookSeats = async (data: BookSeatsRequest) =>
  apiRoutes.user.booking.book_vehicle_seats(data);

export default function useBookSeats() {
  return useMutation<
    APISuccessResponse<BookedSeatsResponse>,
    AxiosError,
    BookSeatsRequest
  >({
    mutationFn: bookSeats,
  });
}
