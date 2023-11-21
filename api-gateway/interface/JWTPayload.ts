export default interface JWTPayload {
  sub: number;
  email: string;
  iat: Date;
}
