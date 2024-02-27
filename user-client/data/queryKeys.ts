import { SearchParameterObj } from "@/components/pages/explore/Main";

const queryKeys = {
  exploreOrSearchedVehicles: (
    searchParams: SearchParameterObj | null = null,
    user_id: number
  ) => {
    if (!searchParams) {
      return ["explore-or-searched-vehicles", user_id];
    }
    return [
      "explore-or-searched-vehicles",
      JSON.stringify(searchParams),
      user_id,
    ];
  },
  authUser: ["auth-user"],
};
export default queryKeys;
