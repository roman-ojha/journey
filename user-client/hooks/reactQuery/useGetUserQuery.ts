import queryKeys from "@/data/queryKeys";
import { SafeUser } from "@/schema/User";
import apiRoutes from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const fetchAuthUser = async () => await apiRoutes.user.auth.profile();

export default function useGetUserQuery() {
  return useQuery<AxiosResponse<SafeUser>, AxiosError>({
    queryKey: queryKeys.authUser,
    queryFn: fetchAuthUser,
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });
}
