import mongoose, { Schema, Document, Model } from "mongoose";
import { IBaseUser } from "../IModels";
import { dispatchEventsCallback } from "../hooks/index";

const BaseUserSchema = new Schema<IBaseUser>(
  {
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    is_email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    username: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sender",
    },
    traveller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Traveller",
    },
  },
  {
    timestamps: true,
    collection: "base_user", // Define the collection name
  }
);

// Create the Mongoose model
const BaseUserModel: Model<IBaseUser> = mongoose.model<IBaseUser>(
  "BaseUser",
  BaseUserSchema
);

// Add hooks
BaseUserSchema.post<IBaseUser>("save", (doc) => {
  dispatchEventsCallback(doc._id);
});

BaseUserSchema.on("remove", (doc: IBaseUser) => {
  dispatchEventsCallback(doc._id);
});

export default BaseUserModel;
