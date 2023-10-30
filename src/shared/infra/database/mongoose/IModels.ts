import { Document, ObjectId } from "mongoose";

export interface IBaseUser extends Document {
  base_user_id: string;
  fullname: string;
  mobile_number: string;
  is_admin_user: boolean;
  is_deleted: boolean;
  username: string;
  user_password?: string;
  sender?: ObjectId;
  traveller?: ObjectId;
}
