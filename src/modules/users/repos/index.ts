import { MongooseUserRepo } from "./implementations/mongooseUserRepo";
import { BaseUserModel } from "../../../shared/infra/database/mongoose/models/index";

const userRepo = new MongooseUserRepo(BaseUserModel);

export { userRepo };
