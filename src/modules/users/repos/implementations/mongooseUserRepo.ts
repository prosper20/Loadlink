import { IUserRepo } from "../userRepo";
import { UserName } from "../../domain/userName";
import { User } from "../../domain/user";
import { UserMap } from "../../mappers/userMap";
import { Model, Document } from "mongoose";
import { MobileNumber } from "../../domain/mobileNumber";
import { IBaseUser } from "../../../../shared/infra/database/mongoose/IModels";

export class MongooseUserRepo implements IUserRepo {
  private userModel: Model<IBaseUser>;

  constructor(model: Model<IBaseUser>) {
    this.userModel = model;
  }

  async exists(mobileNumber: MobileNumber): Promise<boolean> {
    const user = await this.userModel.findOne({
      mobile_number: mobileNumber.value,
    });
    return !!user;
  }

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const username =
      userName instanceof UserName
        ? (userName as UserName).value
        : (userName as string);
    const user = await this.userModel.findOne({ username });
    if (!user) throw new Error("User not found.");
    return UserMap.toDomain(user);
  }

  async getUserByUserId(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ base_user_id: userId });
    if (!user) throw Error("User not found.");
    return UserMap.toDomain(user);
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.mobileNumber);

    if (!exists) {
      const rawMongooseUser = await UserMap.toPersistence(user);
      const newUser = await this.userModel.findByIdAndUpdate(
        user.userId.getStringValue(),
        rawMongooseUser,
        { new: true }
      );
      newUser.save();
    }

    return;
  }

  async delete(userId: string): Promise<void> {
    const result = await this.userModel.deleteOne({ base_user_id: userId });

    if (result.deletedCount === 0) {
      throw new Error("User not found or could not be deleted.");
    }

    return;
  }

  async initialize() {
    const emptydoc = {
      base_user_id: "",
      fullname: "",
      mobile_number: "",
      username: "",
      user_password: "",
    };
    return await this.userModel.create(emptydoc);
  }
}
