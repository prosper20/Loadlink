import { Document, ObjectId } from "mongoose";

export interface IBaseUser extends Document {
  base_user_id: string;
  fullname: string;
  mobile_number: string;
  is_admin_user: boolean;
  is_deleted: boolean;
  username: string;
  is_new: boolean;
  user_password?: string;
  sender?: ObjectId;
  traveller?: ObjectId;
}

export interface ITrip extends Document {
  trip_id: string;
  traveller_id: ObjectId;
  title?: string;
  text?: string;
  slug: string;
  points: number;
  starting_location: string;
  destination: string;
  beginning_date: Date;
  ending_date: Date;
  images: string[];
}

export interface ITraveller extends Document {
  traveller_id: string;
  base_user: ObjectId;
  reputation: number;
  trips: ObjectId[];
}

export interface IComment extends Document {
  comment_id: string;
  traveller_id: string;
  trip_id: string;
  text: string;
}

export interface ITripLike extends Document {
  trip_like_id: string;
  trip_id: string;
  traveller_id: string;
}
