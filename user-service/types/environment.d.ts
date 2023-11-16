declare namespace NodeJS {
  interface ProcessEnv {
    USER_SERVICE_PORT: number;
    USER_SERVICE_DATABASE_URL: string;
    USER_SERVICE_PUBLIC_SECRET_KEY: string;
    USER_SERVICE_PRIVATE_SECRET_KEY: string;
  }
}
