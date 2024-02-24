const queryKeys = {
  exploreOrSearchedVehicles: (searchedKey?: string) => {
    if (!searchedKey) {
      return ["explore-or-searched-vehicles"];
    }
    return ["explore-or-searched-vehicles", searchedKey];
  },
  authUser: ["auth-user"],
};
export default queryKeys;
