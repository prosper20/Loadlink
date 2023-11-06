import { TravellerRepo } from "./implementations/mongooseTravellerRepo";
import {
  TravellerModel,
  TripModel,
  CommentModel,
  TripLikeModel,
} from "../../../shared/infra/database/mongoose/models/index";
import { TripRepo } from "./implementations/mongooseTripRepo";
import { CommentRepo } from "./implementations/commentRepo";
import { TripLikesRepo } from "./implementations/mongooseTripLikesRepo";

const tripLikesRepo = new TripLikesRepo(TripLikeModel);
const travellerRepo = new TravellerRepo(TravellerModel, TripModel);
const commentRepo = new CommentRepo(CommentModel);
const tripRepo = new TripRepo(TripModel, commentRepo, tripLikesRepo);

export { travellerRepo, tripRepo, commentRepo, tripLikesRepo };
