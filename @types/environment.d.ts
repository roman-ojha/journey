declare namespace NodeJS {
  interface ProcessEnv {
    MAIN_PROXY_PORT: number;
    API_DOCS_SERVICE_PORT: number;
    API_DOCS_SERVICE_URL: string;
    USER_SERVICE_PORT: number;
    USER_SERVICE_URL: string;
    USER_API_GATEWAY_URL: string;
    USER_SERVICE_DATABASE_URL: string;
    USER_GATEWAY_PORT: number;
    USER_SERVICE_PUBLIC_SECRET_KEY: string;
    USER_SERVICE_PRIVATE_SECRET_KEY: string;
    ADMIN_CLIENT_PORT: number;
    ADMIN_CLIENT_URL: string;
    ADMIN_SERVICE_PORT: number;
    ADMIN_SERVICE_URL: string;
    ADMIN_SERVICE_SECRET: string;
    ADMIN_SERVICE_DATABASE_NAME: string;
    ADMIN_SERVICE_DATABASE_USER: string;
    ADMIN_SERVICE_DATABASE_PASSWORD: string;
    ADMIN_SERVICE_DATABASE_HOST: string;
    ADMIN_SERVICE_DATABASE_PORT: number;
    POSTGRES_DB: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    USER_SERVICE_PRISMA_STUDIO_PORT: number;
    USER_SERVICE_PRISMA_STUDIO_URL: string;
    ENVIRONMENT: "development" | "docker" | "production";
    MERCHANT_API_GATEWAY_PORT: string;
    MERCHANT_API_GATEWAY_URL: string;
  }
}
