import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { TripId } from "./tripId";
import { TravellerId } from "./travellerId";
import { Guard } from "../../../shared/core/Guard";

interface TripLikeProps {
  tripId: TripId;
  travellerId: TravellerId;
}

export class TripLike extends Entity<TripLikeProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get tripId(): TripId {
    return this.props.tripId;
  }

  get travellerId(): TravellerId {
    return this.props.travellerId;
  }

  private constructor(props: TripLikeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: TripLikeProps,
    id?: UniqueEntityID
  ): Result<TripLike> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.travellerId, argumentName: "travellerId" },
      { argument: props.tripId, argumentName: "tripId" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<TripLike>(guardResult.getErrorValue());
    } else {
      return Result.ok<TripLike>(new TripLike(props, id));
    }
  }

  public static createUpvote(
    travellerId: TravellerId,
    tripId: TripId
  ): Result<TripLike> {
    const memberGuard = Guard.againstNullOrUndefined(
      travellerId,
      "travellerId"
    );
    const tripGuard = Guard.againstNullOrUndefined(tripId, "tripId");

    if (memberGuard.isFailure) {
      return Result.fail<TripLike>(memberGuard.getErrorValue());
    }

    if (tripGuard.isFailure) {
      return Result.fail<TripLike>(tripGuard.getErrorValue());
    }

    return Result.ok<TripLike>(
      new TripLike({
        travellerId,
        tripId,
      })
    );
  }

  public static createDownvote(
    travellerId: TravellerId,
    tripId: TripId
  ): Result<TripLike> {
    const memberGuard = Guard.againstNullOrUndefined(
      travellerId,
      "travellerId"
    );
    const postGuard = Guard.againstNullOrUndefined(tripId, "tripId");

    if (memberGuard.isFailure) {
      return Result.fail<TripLike>(memberGuard.getErrorValue());
    }

    if (postGuard.isFailure) {
      return Result.fail<TripLike>(postGuard.getErrorValue());
    }

    return Result.ok<TripLike>(
      new TripLike({
        travellerId,
        tripId,
      })
    );
  }
}
