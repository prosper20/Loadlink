import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { ITrip } from "../IModels";
import { dispatchEventsCallback } from "../hooks/index";

const TripSchema = new Schema<ITrip>(
  {
    trip_id: {
      type: String,
      unique: true,
    },
    traveller_id: {
      type: Types.ObjectId,
      ref: "Traveller",
    },
    start: {
      type: String,
    },
    destination: {
      type: String,
    },
    departure_date: {
      type: Date,
    },
    arrival_date: {
      type: Date,
    },
    starting_amount: {
      type: Number,
    },
    means_of_travel: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    is_new: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "trip",
  }
);

TripSchema.virtual("likes", {
  ref: "TripLike",
  localField: "_id",
  foreignField: "trip_id",
});

// Add hooks
TripSchema.pre<ITrip>("save", function (next) {
  this.is_new = this.isNew;
  next();
});

TripSchema.post<ITrip>("save", (doc) => {
  dispatchEventsCallback(doc.trip_id);
});

TripSchema.on("remove", (doc: ITrip) => {
  dispatchEventsCallback(doc.trip_id);
});
// Create the Mongoose model
const TripModel: Model<ITrip> = mongoose.model<ITrip>("Trip", TripSchema);

export default TripModel;
