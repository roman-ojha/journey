enum UserGender {
  "MALE",
  "FEMALE",
  "OTHER",
}

interface User {
  id: number;
  email: string;
  number: number;
  f_name: string;
  l_name: string;
  password: string;
  photo_url: string;
  gender: UserGender;
  is_verified: boolean;
  verification_token?: string;
  created_at: Date;
  updated_at: Date;
}

export { UserGender };
