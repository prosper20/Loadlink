import redis from "redis";
import { Redis } from "redis";
import { authConfig, isProduction } from "../../../../config";

const { redisServerUser, redisServerPASS, redisServerURL, redisServerPort } =
  authConfig;
const redisConnection: Redis = redis.createClient({
  url: `redis://${redisServerUser}:${redisServerPASS}@${redisServerURL}:${redisServerPort}`,
});

redisConnection.on("connect", () => {
  console.log(
    `[Redis]: Connected to redis server at ${authConfig.redisServerURL}:${authConfig.redisServerPort}`
  );
});

export { redisConnection };
