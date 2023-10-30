import mongoose, { Model } from "mongoose";
import { IBaseUser } from "../IModels";

//import connection from "../config";

const BaseUserModel: Model<IBaseUser> = require("./BaseUser").default;

export { BaseUserModel };
