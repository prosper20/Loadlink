import { TravellerRepo } from "./implementations/mongooseTravellerRepo";
import {
  TravellerModel,
  TripModel,
  TripLikeModel,
} from "../../../shared/infra/database/mongoose/models/index";
import { TripRepo } from "./implementations/mongooseTripRepo";
import { TripLikesRepo } from "./implementations/mongooseTripLikesRepo";

const tripLikesRepo = new TripLikesRepo(TripLikeModel);
const travellerRepo = new TravellerRepo(TravellerModel, TripModel);
const tripRepo = new TripRepo(TripModel, tripLikesRepo);

export { travellerRepo, tripRepo, tripLikesRepo };
