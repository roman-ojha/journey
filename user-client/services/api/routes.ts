import { client as axios } from "./axios";
import { AxiosError, AxiosResponse } from "axios";
import User, {
  UserSignUp,
  UserLogin,
  UserLoginResponse,
  SafeUser,
} from "@/schema/User";
import { ExploreVehicle } from "@/hooks/reactQuery/useExploreAndSearchedVehicles";
import { VehicleDetail } from "@/hooks/reactQuery/useVehicleDetail";
import { PlacesDetail } from "@/hooks/reactQuery/useGetPlaces";
import { BookedSeatsResponse } from "./response";
import { BookSeatsRequest } from "./request";
import { request } from "@/services/api/axios";
import { BookedVehicles } from "@/hooks/reactQuery/useGetBookedVehicles";
import { BookedVehicleDetails } from "@/hooks/reactQuery/useGetBookedVehicleDetails";

export type APISuccessResponse<T> = AxiosResponse<{
  message: string;
  data: T;
}>;

export type APIValidationErrorResponse = {
  message: string;
  errors: { [key: string]: string[] };
};

export type APIFailResponse = AxiosError<{
  message: string;
}>;

// NOTE: 'axios' doesn't contain 'Authorization' header whereas 'request' is a pre-configured instance of axios and contains 'Authorization' header

const apiRoutes = {
  user: {
    auth: {
      register: async (data: UserSignUp): Promise<APISuccessResponse<User>> => {
        return await axios({
          method: "POST",
          url: "/user/auth/register",
          headers: {
            "Content-Type": "application/json",
          },
          data,
        });
      },
      login: async (
        data: UserLogin
      ): Promise<APISuccessResponse<UserLoginResponse>> => {
        return await axios({
          method: "POST",
          url: "/user/auth/login",
          headers: {
            "Content-Type": "application/json",
          },
          data,
          withCredentials: true,
        });
      },
      profile: async (): Promise<AxiosResponse<SafeUser>> => {
        return await request({
          method: "GET",
          url: "/user/profile",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
    vehicle: {
      explore: async (): Promise<AxiosResponse<ExploreVehicle[]>> => {
        return await axios({
          method: "GET",
          url: "/user/vehicle/explore",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      vehicle_detail: async (
        vehicle_slug: string
      ): Promise<AxiosResponse<VehicleDetail>> => {
        return await axios({
          method: "GET",
          url: "/user/vehicle/" + vehicle_slug,
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      places: async (): Promise<AxiosResponse<PlacesDetail[]>> => {
        return await axios({
          method: "GET",
          url: "/user/vehicle/place/",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
    booking: {
      book_vehicle_seats: async (
        data: BookSeatsRequest
      ): Promise<APISuccessResponse<BookedSeatsResponse>> => {
        return await request({
          method: "POST",
          url: "/user/booking-service",
          headers: {
            "Content-Type": "application/json",
          },
          data,
        });
      },
      get_booked_vehicles: async (): Promise<
        APISuccessResponse<BookedVehicles[]>
      > => {
        return await request({
          method: "GET",
          url: "/user/booking-service/booked-vehicle",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      booked_vehicle_details: async (
        vehicle_slug: string
      ): Promise<APISuccessResponse<BookedVehicleDetails>> => {
        return await request({
          method: "GET",
          url: "/user/booking-service/booked-vehicle/" + vehicle_slug,
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
  },
};

export default apiRoutes;
