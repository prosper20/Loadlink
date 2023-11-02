import mongoose, { Schema, Document, Model } from "mongoose";
import { IComment } from "../IModels";

// Define the schema for the Comment
const CommentSchema = new Schema<IComment>(
  {
    comment_id: {
      type: String,
      unique: true,
    },
    traveller_id: {
      type: String,
      required: true,
      ref: "Traveller",
    },
    trip_id: {
      type: String,
      required: true,
      ref: "Trip", // Reference the 'Post' model
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "comment", // Define the collection name
  }
);

// Create the Mongoose model
const CommentModel: Model<IComment> = mongoose.model<IComment>(
  "Comment",
  CommentSchema
);

export default CommentModel;
