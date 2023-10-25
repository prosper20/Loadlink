import { IUserRepo } from "../userRepo";
import { UserName } from "../../domain/userName";
import { User } from "../../domain/user";
import { UserMap } from "../../mappers/userMap";
import { UserEmail } from "../../domain/userEmail";
import { Model, Document } from "mongoose";

export class MongooseUserRepo implements IUserRepo {
  private userModel: Model<Document>;

  constructor(model: Model<Document>) {
    this.userModel = model;
  }

  async exists(userEmail: UserEmail): Promise<boolean> {
    const user = await this.userModel.findOne({ email: userEmail.value });
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
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) throw Error("User not found.");
    return UserMap.toDomain(user);
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.email);

    if (!exists) {
      const rawMongooseUser = await UserMap.toPersistence(user);
      const newUser = new this.userModel(rawMongooseUser);
      await newUser.save();
    }

    return;
  }
}
