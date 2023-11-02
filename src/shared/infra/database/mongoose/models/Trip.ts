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
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    starting_location: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    beginning_date: {
      type: Date,
      required: true,
    },
    ending_date: {
      type: Date,
      required: true,
    },
    images: {
      type: [String],
      validate: {
        validator: function (value: string[]) {
          return value.length <= 4; // Maximum of 4 images
        },
        message: "Maximum of 4 images allowed",
      },
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

TripSchema.pre<ITrip>("save", function (next) {
  if (this.starting_location && this.destination) {
    this.title = `${this.starting_location} - ${this.destination}`;
  }
  next();
});

// Create the Mongoose model
const TripModel: Model<ITrip> = mongoose.model<ITrip>("Trip", TripSchema);

// Add hooks
TripSchema.post<ITrip>("save", (doc) => {
  dispatchEventsCallback(doc.trip_id);
});

TripSchema.on("remove", (doc: ITrip) => {
  dispatchEventsCallback(doc.trip_id);
});

export default TripModel;
