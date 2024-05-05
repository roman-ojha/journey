const queryKeys = {
  exploreOrSearchedVehicles: (
    searchParams: {} | null = null,
    user_id: number | null,
  ) => {
    if (!searchParams) {
      return ["explore-or-searched-vehicles"];
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
