declare namespace NodeJS {
  interface ProcessEnv {
    MAIN_PROXY_PORT: number;
    API_DOCS_SERVICE_PORT: number;
    USER_SERVICE_PORT: number;
    USER_GATEWAY_PORT: number;
    ADMIN_CLIENT_PORT: number;
    USER_API_GATEWAY_URL: string;
    USER_SERVICE_URL: string;
    API_DOCS_SERVICE_URL: string;
    USER_SERVICE_DATABASE_URL: string;
    ADMIN_CLIENT_URL: string;
    USER_SERVICE_PUBLIC_SECRET_KEY: string;
    USER_SERVICE_PRIVATE_SECRET_KEY: string;
  }
}
