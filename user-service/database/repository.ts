import Database from "./index";
import { IUser } from "../../models/User";

class Repository extends Database {
  async updateUserUsingEmail(
    email: string,
    user: Partial<IUser>
  ): Promise<IUser> {
    const updatedUser = await this.user().update({
      where: { email: email },
      data: {
        ...user,
      },
    });
    return {
      ...updatedUser,
      number: Number(updatedUser.number),
    };
  }
}

export default Repository;
