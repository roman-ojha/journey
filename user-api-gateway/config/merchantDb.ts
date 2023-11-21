import mysql from "mysql2";

const merchantServiceDb = mysql.createConnection({
  host: process.env.MERCHANT_SERVICE_DATABASE_HOST as string,
  user: process.env.MERCHANT_SERVICE_DATABASE_USER as string,
  database: process.env.MERCHANT_SERVICE_DATABASE_NAME as string,
  password: process.env.MERCHANT_SERVICE_DATABASE_PASSWORD as string,
  port: parseInt(process.env.MERCHANT_SERVICE_DATABASE_PORT as string),
});

export default merchantServiceDb;
