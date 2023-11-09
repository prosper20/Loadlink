import { FullName } from "./fullName";
import { UserName } from "./userName";
import { UserId } from "./userId";
import { UserCreated } from "./events/userCreated";
import { UserPassword } from "./userPassword";
import { JWTToken, RefreshToken } from "./jwt";
import { UserLoggedIn } from "./events/userLoggedIn";
import { UserDeleted } from "./events/userDeleted";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { MobileNumber } from "./mobileNumber";

interface UserProps {
  mobileNumber: MobileNumber;
  fullname: FullName;
  username: UserName;
  password: UserPassword;
  isAdminUser?: boolean;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  isDeleted?: boolean;
  isNew?: boolean;
  lastLogin?: Date;
}

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this._id).getValue();
  }

  get mobileNumber(): MobileNumber {
    return this.props.mobileNumber;
  }

  get fullname(): FullName {
    return this.props.fullname;
  }

  get username(): UserName {
    return this.props.username;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get isAdminUser(): boolean {
    return this.props.isAdminUser;
  }

  get lastLogin(): Date {
    return this.props.lastLogin;
  }

  get refreshToken(): RefreshToken {
    return this.props.refreshToken;
  }

  public isLoggedIn(): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken;
  }

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.addDomainEvent(new UserLoggedIn(this));
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  public delete(): void {
    if (!this.props.isDeleted) {
      this.addDomainEvent(new UserDeleted(this));
      this.props.isDeleted = true;
    }
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: "username" },
      { argument: props.fullname, argumentName: "fullname" },
      { argument: props.mobileNumber, argumentName: "mobileNumber" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.getErrorValue());
    }

    const isNewUser = !!props.isNew ? props.isNew : false;
    //!!id === false;
    const user = new User(
      {
        ...props,
        isDeleted: props.isDeleted ? props.isDeleted : false,
        isAdminUser: props.isAdminUser ? props.isAdminUser : false,
      },
      id
    );

    if (isNewUser) {
      user.addDomainEvent(new UserCreated(user));
    }

    return Result.ok<User>(user);
  }
}
