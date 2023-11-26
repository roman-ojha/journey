import Database from "./index";
import { IUser } from "../../models/User";

class Repository extends Database {
  getUserPictureUrl(picturePath: string | null) {
    if (!picturePath) return null;
    return `${process.env.MAIN_PROXY_URL}/api/user/profile/picture/${picturePath}`;
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

  async findFirstSecureUserUsingEmail(email: string) {
    const user = await this.user().findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        f_name: true,
        l_name: true,
        gender: true,
        number: true,
        picture: true,
      },
    });
    if (!user) return null;
    return {
      ...user,
      number: Number(user.number),
      picture: this.getUserPictureUrl(user.picture),
    };
  }
}

export default Repository;
