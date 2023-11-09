import express from "express";
import { userRouter } from "../../../../modules/users/infra/http/routes";
import { tripRouter } from "../../../../modules/shipping/infra/http/routes/trip";
import { travellerRouter } from "../../../../modules/shipping/infra/http/routes/traveller";

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
  return res.json({ message: "Yo! we're up" });
});

v1Router.use("/users", userRouter);
v1Router.use("/trips", tripRouter);
v1Router.use("/travellers", travellerRouter);

export { v1Router };
