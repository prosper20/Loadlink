import mongoose, { Schema, Document, Model } from "mongoose";
import { ITripLike } from "../IModels";

const TripLikeSchema = new Schema<ITripLike>(
  {
    trip_like_id: {
      type: String,
      unique: true,
    },
    trip_id: {
      type: String,
      required: true,
    },
    traveller_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "trip_like",
  }
);

// Create the Mongoose model
const TripLikeModel: Model<ITripLike> = mongoose.model<ITripLike>(
  "TripLike",
  TripLikeSchema
);

export default TripLikeModel;
