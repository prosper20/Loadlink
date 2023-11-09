import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { UserName } from "../../users/domain/userName";
import { FullName } from "../../users/domain/fullName";
import { MobileNumber } from "../../users/domain/mobileNumber";
import { UserId } from "../../users/domain/userId";

interface TravellerDetailsProps {
  username: UserName;
  mobileNumber: MobileNumber;
  fullname: FullName;
  userId: UserId;
  reputation: number;
  isAdminUser?: boolean;
  isDeleted?: boolean;
}

/**
 * @desc Read model for traveller
 */

export class TravellerDetails extends ValueObject<TravellerDetailsProps> {
  get username(): UserName {
    return this.props.username;
  }

  get mobileNumber(): MobileNumber {
    return this.props.mobileNumber;
  }

  get fullname(): FullName {
    return this.props.fullname;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get reputation(): number {
    return this.props.reputation;
  }

  get isAdminUser(): boolean {
    return this.props.isAdminUser;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  private constructor(props: TravellerDetailsProps) {
    super(props);
  }

  public static create(props: TravellerDetailsProps): Result<TravellerDetails> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: "username" },
      { argument: props.reputation, argumentName: "reputation" },
      { argument: props.fullname, argumentName: "fullname" },
      { argument: props.userId, argumentName: "userId" },
      { argument: props.mobileNumber, argumentName: "mobileNumber" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<TravellerDetails>(guardResult.getErrorValue());
    }

    return Result.ok<TravellerDetails>(
      new TravellerDetails({
        ...props,
        isAdminUser: props.isAdminUser ? props.isAdminUser : false,
        isDeleted: props.isDeleted ? props.isDeleted : false,
      })
    );
  }
}
