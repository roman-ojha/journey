import { UserSignUp } from "@/model/User";
import apiRoutes from "@/services/api/routes";

export const mutationFunctions = {
  user: {
    register: (data: UserSignUp) => apiRoutes.user.auth.register(data),
  },
};
