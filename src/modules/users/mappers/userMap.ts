import { Mapper } from "../../../shared/infra/Mapper";
import { User } from "../domain/user";
import { UserDTO } from "../dtos/userDTO";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { UserName } from "../domain/userName";
import { UserPassword } from "../domain/userPassword";
import { FullName } from "../domain/fullName";
import { MobileNumber } from "../domain/mobileNumber";

export class UserMap implements Mapper<User> {
  public static toDTO(user: User): UserDTO {
    return {
      userId: user.userId.getValue().toString(),
      fullname: user.fullname.value,
      username: user.username.value,
      mobileNumber: user.mobileNumber.value,
      isAdminUser: user.isAdminUser,
      isDeleted: user.isDeleted,
    };
  }

  public static toDomain(raw: any): User {
    const fullNameOrError = FullName.create({ name: raw.fullname });
    const userNameOrError = UserName.create({ name: raw.username });
    const mobileNumberOrError = MobileNumber.create(raw.mobile_number);
    const userPasswordOrError = UserPassword.create({
      value: raw.user_password,
      hashed: true,
    });

    const userOrError = User.create(
      {
        fullname: fullNameOrError.getValue(),
        username: userNameOrError.getValue(),
        mobileNumber: mobileNumberOrError.getValue(),
        isAdminUser: raw.is_admin_user,
        isDeleted: raw.is_deleted,

        password: userPasswordOrError.getValue(),
      },
      new UniqueEntityID(raw.base_user_id)
    );

    userOrError.isFailure ? console.log(userOrError.getErrorValue()) : "";

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static async toPersistence(user: User): Promise<any> {
    let password: string = null;
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }

    return {
      base_user_id: user.userId.getStringValue(),
      fullname: user.fullname.value,
      mobile_number: user.mobileNumber.value,
      username: user.username.value,
      user_password: password,
      is_admin_user: user.isAdminUser,
      is_deleted: user.isDeleted,
    };
  }
}
