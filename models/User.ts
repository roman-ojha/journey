enum UserGender {
  "MALE",
  "FEMALE",
  "OTHER",
}

interface IUser {
  id: number;
  email: string;
  number: bigint | number;
  f_name: string;
  l_name: string;
  password: string;
  picture: string | null;
  gender: "MALE" | "FEMALE" | "OTHER";
  is_verified: boolean;
  verification_token: string | null;
  created_at: Date;
  updated_at: Date;
}

export { UserGender, IUser };
