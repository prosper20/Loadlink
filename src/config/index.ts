import { authConfig } from "./auth";
import * as dotenv from "dotenv";

dotenv.config();
const e: any = process.env;

const ENV: string = e.NODE_ENV || "";
const isProduction = ENV === "production";
const PORT: number = parseInt(e.PORT || "3000", 10);
const DB_USER: string = e.DB_USER || "";
const DB_PASS: string = e.DB_PASS || "";
const DB_HOST: string = e.DB_HOST || "";
const DEV_DB_NAME: string = e.DEV_DB_NAME || "";

export {
  authConfig,
  isProduction,
  PORT,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DEV_DB_NAME,
  ENV,
};
