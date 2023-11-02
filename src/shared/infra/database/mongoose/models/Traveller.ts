import mongoose, { Schema, Document, Model, Types, Query } from "mongoose";
import { ITraveller } from "../IModels";
import { dispatchEventsCallback } from "../hooks/index";

const TravellerSchema = new Schema<ITraveller>(
  {
    traveller_id: {
      type: String,
      required: true,
      unique: true,
    },
    base_user: {
      type: Types.ObjectId,
      ref: "BaseUser",
      required: true,
    },
    reputation: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "traveller",
  }
);

TravellerSchema.virtual("trips", {
  ref: "Trip",
  localField: "_id",
  foreignField: "traveller_id",
});

// Add hooks
TravellerSchema.pre("save", function (next) {
  if (!this.isNew) return next();

  this.traveller_id = this._id.toString();
  next();
});

TravellerSchema.pre<Query<ITraveller, Document>>(/^find/, function (next) {
  this.populate({
    path: "base_user",
  });
  next();
});

TravellerSchema.post<ITraveller>("save", (doc) => {
  dispatchEventsCallback(doc.traveller_id);
});

TravellerSchema.on("remove", (doc: ITraveller) => {
  dispatchEventsCallback(doc.traveller_id);
});

// Create the Mongoose model
const TravellerModel: Model<ITraveller> = mongoose.model<ITraveller>(
  "Traveller",
  TravellerSchema
);

export default TravellerModel;
