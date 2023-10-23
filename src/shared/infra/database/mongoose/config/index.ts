import mongoose, { ConnectOptions } from "mongoose";
// import dotenv from "dotenv";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASS, DB_HOST, DEV_DB_NAME, IS_PRODUCTION } = process.env;

const mode = IS_PRODUCTION === "true" ? "prod" : "dev";

console.log(`[DB]: Connecting to the database in ${mode} mode.`);

let dbUri = `mongodb+srv://bobson:$upermanLock1@cluster0.1rwevnl.mongodb.net/Loadlink_dev?retryWrites=true&w=majority`;

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("[DB]: MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("[DB]: MongoDB connection error", err);
  });

export default mongoose.connection;
