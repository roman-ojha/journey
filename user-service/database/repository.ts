import Database from "./index";
import { IUser } from "../../models/User";

class Repository extends Database {
  getUserPictureUrl(picturePath: string | null) {
    if (!picturePath) return null;
    return `${process.env.MAIN_PROXY_PORT}/api/user/profile/picture/${picturePath}`;
  }
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
      picture: this.getUserPictureUrl(updatedUser.picture),
    };
  }
}

export default Repository;
