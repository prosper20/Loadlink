import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { UserId } from "../../users/domain/userId";
import { UserName } from "../../users/domain/userName";
import { Guard } from "../../../shared/core/Guard";
import { TravellerCreated } from "./events/travellerCreated";
import { TravellerId } from "./travellerId";

interface TravellerProps {
  userId: UserId;
  username: UserName;
  reputation?: number;
  isNew?: boolean;
}

export class Traveller extends AggregateRoot<TravellerProps> {
  get travellerId(): TravellerId {
    return TravellerId.create(this._id).getValue();
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get username(): UserName {
    return this.props.username;
  }

  get reputation(): number {
    return this.props.reputation;
  }

  private constructor(props: TravellerProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: TravellerProps,
    id?: UniqueEntityID
  ): Result<Traveller> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: "userId" },
      { argument: props.username, argumentName: "username" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Traveller>(guardResult.getErrorValue());
    }

    const defaultValues: TravellerProps = {
      ...props,
      reputation: props.reputation ? props.reputation : 0,
    };

    const traveller = new Traveller(defaultValues, id);
    const isNewTraveller = !!props.isNew ? props.isNew : false;
    // !!id === false;

    if (isNewTraveller) {
      traveller.addDomainEvent(new TravellerCreated(traveller));
    }

    return Result.ok<Traveller>(traveller);
  }
}
