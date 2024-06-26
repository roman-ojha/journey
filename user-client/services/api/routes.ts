import { client as axios } from "./axios";
import { AxiosError, AxiosResponse } from "axios";
import User, {
  UserSignUp,
  UserLogin,
  UserLoginResponse,
  SafeUser,
  UserLogoutResponse,
} from "@/schema/User";
import { ExploreVehicle } from "@/hooks/reactQuery/useExploreAndSearchedVehicles";
import { VehicleDetail } from "@/hooks/reactQuery/useVehicleDetail";
import { PlacesDetail } from "@/hooks/reactQuery/useGetPlaces";
import { BookedSeatsResponse } from "./response";
import { BookSeatsRequest } from "./request";
import { request } from "@/services/api/axios";
import { BookedVehicles } from "@/hooks/reactQuery/useGetBookedVehicles";
import { BookedVehicleDetails } from "@/hooks/reactQuery/useGetBookedVehicleDetails";
import { SearchParameterObj } from "@/app/explore/_components/VehicleCards";
import { VehicleReview } from "@/schema/VehicleReview";

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
        data: UserLogin,
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
      logout: async (): Promise<APISuccessResponse<UserLogoutResponse>> => {
        return await axios({
          method: "GET",
          url: "/user/auth/logout",
          headers: {
            "Content-Type": "application/json",
          },
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
      explore: async (
        searchParams: SearchParameterObj | null,
        userId: number | null,
      ): Promise<AxiosResponse<ExploreVehicle[]>> => {
        if (searchParams) {
          return await axios({
            method: "GET",
            url:
              "/user/vehicle/explore/search?" +
              `from_district=${searchParams.from.district}&from_place=${searchParams.from.place
              }&to_district=${searchParams.to.district}&to_place=${searchParams.to.place
              }&departure_at=${searchParams.departure_at}${userId ? `&user_id=${userId}` : ""
              }`,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        return await axios({
          method: "GET",
          url: `/user/vehicle/explore${userId ? `?user_id=${userId}` : ""}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      vehicle_detail: async (
        vehicle_slug: string,
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
        data: BookSeatsRequest,
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
      get_booked_vehicle_details: async (
        vehicle_slug: string,
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
    review: {
      get_review_done_by_auth_user: async (
        vehicle_id: string,
      ): Promise<APISuccessResponse<VehicleReview>> => {
        return await request({
          method: "GET",
          url: `/user/review-service/by-auth-user/${vehicle_id}`,
          withCredentials: true,
        });
      },
      review_vehicle: async (
        vehicle_id: string,
        rating: number,
        review: string,
      ): Promise<APISuccessResponse<VehicleReview>> => {
        return await request({
          method: "POST",
          url: "/user/review-service",
          withCredentials: true,
          data: JSON.stringify({ vehicle_id, rating, review }),
        });
      },
    },
  },
};

export default apiRoutes;
