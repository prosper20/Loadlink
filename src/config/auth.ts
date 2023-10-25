import * as dotenv from "dotenv";

dotenv.config();
const e: any = process.env;

const authConfig = {
  secret: e.APP_SECRET,
  tokenExpiryTime: 300, // seconds => 5 minutes
  redisServerPort: parseInt(e.REDIS_PORT, 10) || 6379,
  redisServerURL: e.REDIS_HOST,
  redisServerPASS: e.REDIS_PSWD,
  redisServerUser: e.REDIS_USER,
};

export { authConfig };
