import mongoose, { Schema, Document, Model } from "mongoose";
import { IBaseUser } from "../IModels";
import { dispatchEventsCallback } from "../hooks/index";

const BaseUserSchema = new Schema<IBaseUser>(
  {
    base_user_id: {
      type: String,
      unique: true,
    },
    fullname: {
      type: String,
      unique: true,
    },
    mobile_number: {
      type: String,
      unique: true,
    },
    is_admin_user: {
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
    },
    user_password: {
      type: String,
    },
    is_new: {
      type: Boolean,
      required: true,
      default: true,
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
    collection: "base_user",
  }
);

// Add hooks
BaseUserSchema.pre("save", function (next) {
  this.is_new = this.isNew;
  next();
});

BaseUserSchema.post<IBaseUser>("save", (doc) => {
  dispatchEventsCallback(doc.base_user_id);
});

BaseUserSchema.on("remove", (doc: IBaseUser) => {
  dispatchEventsCallback(doc.base_user_id);
});

const BaseUserModel: Model<IBaseUser> = mongoose.model<IBaseUser>(
  "BaseUser",
  BaseUserSchema
);

export default BaseUserModel;
