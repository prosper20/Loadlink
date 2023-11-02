import { TravellerRepo } from "./implementations/mongooseTravellerRepo";
import {
  TravellerModel,
  TripModel,
} from "../../../shared/infra/database/mongoose/models/index";
// import { PostRepo } from "./implementations/sequelizePostRepo";
// import { CommentRepo } from "./implementations/commentRepo";
// import { PostVotesRepo } from "./implementations/sequelizePostVotesRepo";
// import { CommentVotesRepo } from "./implementations/sequelizeCommentVotesRepo";

// const commentVotesRepo = new CommentVotesRepo(models);
// const postVotesRepo = new PostVotesRepo(models);
const travellerRepo = new TravellerRepo(TravellerModel, TripModel);
// const commentRepo = new CommentRepo(models, commentVotesRepo);
// const postRepo = new PostRepo(models, commentRepo, postVotesRepo);

export { travellerRepo };
