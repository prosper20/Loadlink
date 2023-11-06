import { GetRecentTrips } from "./GetRecentTrips";
import { tripRepo, travellerRepo } from "../../../repos";
import { GetRecentTripsController } from "./GetRecentTripsController";

const getRecentTrips = new GetRecentTrips(tripRepo);
const getRecentTripsController = new GetRecentTripsController(getRecentTrips);

export { getRecentTrips, getRecentTripsController };
