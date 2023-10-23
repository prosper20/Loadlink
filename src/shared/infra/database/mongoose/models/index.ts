// models/index.ts
import mongoose, { Model } from "mongoose";
import { IBaseUser } from "../IModels";

// Connect to your MongoDB database
import connection from "../config";

// Load and define models
const BaseUserModel: Model<IBaseUser> = require("./BaseUserModel").default;

// Define associations if needed

export { BaseUserModel };
