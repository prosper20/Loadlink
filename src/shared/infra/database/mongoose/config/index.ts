import mongoose, { ConnectOptions } from "mongoose";
import * as config from "../../../../../config/index";

const { DB_USER, DB_PASS, DB_HOST, DEV_DB_NAME, isProduction } = config;

const mode = isProduction ? "prod" : "dev";

console.log(`[DB]: Connecting to the database in ${mode} mode.`);

let dbUri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.1rwevnl.mongodb.net/${DEV_DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("[DB]: MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("[DB]: MongoDB connection error", err);
  });

export default mongoose.connection;
