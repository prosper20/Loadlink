import { MobileNumber } from "../domain/mobileNumber";
import { User } from "../domain/user";
import { UserName } from "../domain/userName";

export interface IUserRepo {
  exists(mobileNumber: MobileNumber): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  getUserByUserName(userName: UserName | string): Promise<User>;
  save(user: User): Promise<void>;
  delete(userId: string): Promise<void>;
  initialize(): Promise<any>;
}
