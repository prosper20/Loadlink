import { Document, ObjectId } from "mongoose";

export interface IBaseUser extends Document {
  base_user_id: string;
  user_email: string;
  is_email_verified: boolean;
  is_deleted: boolean;
  username: string;
  user_password?: string;
  sender?: ObjectId;
  traveller?: ObjectId;
}
