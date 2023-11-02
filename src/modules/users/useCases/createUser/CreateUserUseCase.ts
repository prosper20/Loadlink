import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserErrors } from "./CreateUserErrors";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { AppError } from "../../../../shared/core/AppError";
import { IUserRepo } from "../../repos/userRepo";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserPassword } from "../../domain/userPassword";
import { UserName } from "../../domain/userName";
import { User } from "../../domain/user";
import { FullName } from "../../domain/fullName";
import { MobileNumber } from "../../domain/mobileNumber";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

type Response = Either<
  | CreateUserErrors.MobileNumberAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<Response>>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: CreateUserDTO): Promise<Response> {
    const mobileNumberOrError = MobileNumber.create(request.mobileNumber);
    const passwordOrError = UserPassword.create({ value: request.password });
    const fullnameOrError = FullName.create({ name: request.fullname });
    const usernameOrError = UserName.create({ name: request.username });

    const dtoResult = Result.combine([
      mobileNumberOrError,
      passwordOrError,
      usernameOrError,
      fullnameOrError,
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
    }

    const mobileNumber: MobileNumber = mobileNumberOrError.getValue();
    const password: UserPassword = passwordOrError.getValue();
    const fullname: FullName = fullnameOrError.getValue();
    const username: UserName = usernameOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepo.exists(mobileNumber);

      if (userAlreadyExists) {
        return left(
          new CreateUserErrors.MobileNumberAlreadyExistsError(
            mobileNumber.value
          )
        ) as Response;
      }

      try {
        const alreadyCreatedUserByUserName =
          await this.userRepo.getUserByUserName(username);

        const userNameTaken = !!alreadyCreatedUserByUserName === true;

        if (userNameTaken) {
          return left(
            new CreateUserErrors.UsernameTakenError(username.value)
          ) as Response;
        }
      } catch (err) {}

      const emptyUser = await this.userRepo.initialize();
      const id = new UniqueEntityID(emptyUser._id.toString());
      const isNew = emptyUser.is_new as boolean;

      const userOrError: Result<User> = User.create(
        {
          mobileNumber,
          password,
          fullname,
          username,
          isNew,
        },
        id
      );

      if (userOrError.isFailure) {
        return left(
          Result.fail<User>(userOrError.getErrorValue().toString())
        ) as Response;
      }

      const user: User = userOrError.getValue();

      await this.userRepo.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
