import mongoose, { Model } from "mongoose";
import { IBaseUser, ITrip, ITraveller, ITripLike, IComment } from "../IModels";

//import connection from "../config";

const BaseUserModel: Model<IBaseUser> = require("./BaseUser").default;
const TripModel: Model<ITrip> = require("./Trip").default;
const TravellerModel: Model<ITraveller> = require("./Traveller").default;
const TripLikeModel: Model<ITripLike> = require("./TripLike").default;
const CommentModel: Model<IComment> = require("./Comment").default;

export {
  BaseUserModel,
  TripModel,
  TravellerModel,
  TripLikeModel,
  CommentModel,
};
