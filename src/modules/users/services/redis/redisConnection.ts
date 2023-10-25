import { createClient, RedisClientType } from "redis";

import { authConfig, isProduction } from "../../../../config";

const { redisServerUser, redisServerPASS, redisServerURL, redisServerPort } =
  authConfig;
const createRedisConnection = async () => {
  const client = createClient({
    url: `redis://${redisServerUser}:${redisServerPASS}@${redisServerURL}:${redisServerPort}`,
  });

  client.on("connect", () => {
    console.log(
      `[Redis]: Connected to redis server at ${authConfig.redisServerURL}:${authConfig.redisServerPort}`
    );
  });

  // try {
  //   await client.connect();

  //   console.log(
  //     `[Redis]: Connected to redis server at ${authConfig.redisServerURL}:${authConfig.redisServerPort}`
  //   );
  //   return client;
  // } catch (error) {
  //   console.error("[Redis]: Connection error", error);
  //   throw error;
  // }
};

const redisConnection = createRedisConnection();

export { redisConnection };

// import redis from "redis";
// import { Redis } from "redis";
// import { authConfig, isProduction } from "../../../../config";

// const port = authConfig.redisServerPort;
// const host = authConfig.redisServerURL;
// const redisConnection: Redis = isProduction
//   ? redis.createClient(authConfig.redisConnectionString)
//   : redis.createClient(port, host); // creates a new client

// redisConnection.on("connect", () => {
//   console.log(`[Redis]: Connected to redis server at ${host}:${port}`);
// });

// export { redisConnection };
