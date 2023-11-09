import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { createTripController } from "../../../useCases/trip/createTrip";
import { getRecentTripsController } from "../../../useCases/trip/getRecentTrips";
import { getTripBySlugController } from "../../../useCases/trip/getTripBySlug";
// import { getPopularTripsController } from "../../../useCases/trip/getPopularTrips";

const tripRouter = express.Router();

tripRouter.post("/", middleware.ensureAuthenticated(), (req, res) =>
  createTripController.execute(req, res)
);

tripRouter.get(
  "/recent",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getRecentTripsController.execute(req, res)
);

// tripRouter.get(
//   "/popular",
//   middleware.includeDecodedTokenIfExists(),
//   (req, res) => getPopularTripsController.execute(req, res)
// );

tripRouter.get("/", middleware.includeDecodedTokenIfExists(), (req, res) =>
  getTripBySlugController.execute(req, res)
);

export { tripRouter };
