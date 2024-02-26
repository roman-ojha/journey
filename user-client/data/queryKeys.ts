import { SearchParameterObj } from "@/components/pages/explore/Main";

const queryKeys = {
  exploreOrSearchedVehicles: (searchParams: SearchParameterObj | null) => {
    if (!searchParams) {
      return ["explore-or-searched-vehicles"];
    }
    return ["explore-or-searched-vehicles", JSON.stringify(searchParams)];
  },
  authUser: ["auth-user"],
};
export default queryKeys;
