import Database from "./index";
import { IUser } from "../../models/User";

class Repository extends Database {
  async createNewUser(user: any): Promise<Partial<IUser>> {
    const newUser = await this.user().create({
      data: {
        ...user,
      },
      select: {
        id: true,
        f_name: true,
        l_name: true,
        email: true,
        number: true,
        gender: true,
        picture: true,
      },
    });
    return {
      ...newUser,
      number: Number(newUser.number),
      picture: this.getUserPictureUrl(newUser.picture),
    };
  }

  private getUserPictureUrl(picturePath: string | null) {
    if (!picturePath) return null;
    return `${process.env.MAIN_PROXY_URL}/api/user/profile/picture/${picturePath}`;
  }

  async updateUserUsingEmail(
    email: string,
    user: Partial<IUser>
  ): Promise<Partial<IUser>> {
    const updatedUser = await this.user().update({
      where: { email: email },
      data: {
        ...user,
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

    return {
      ...updatedUser,
      number: Number(updatedUser.number),
      picture: this.getUserPictureUrl(updatedUser.picture),
    };
  }

  // response user without password field
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

  async findFirstUserUsingEmail(email: string) {
    const user = await this.user().findFirst({
      where: {
        email,
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
