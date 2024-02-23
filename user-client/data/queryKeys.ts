const queryKeys = {
  exploreOrSearchedVehicles: (searchedKey?: string) => {
    if (!searchedKey) {
      return ["explore-or-searched-vehicles"];
    }
    return ["explore-or-searched-vehicles", searchedKey];
  },
};
export default queryKeys;
