import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { CommentText } from "./commentText";
import { CommentId } from "./commentId";
import { TripSlug } from "./tripSlug";
import { Guard } from "../../../shared/core/Guard";
import { TravellerDetails } from "./travellerDetails";
import { TripTitle } from "./tripTitle";

interface CommentDetailsProps {
  commentId: CommentId;
  text: CommentText;
  traveller: TravellerDetails;
  createdAt: Date | string;
  tripSlug: TripSlug;
  tripTitle: TripTitle;
}

export class CommentDetails extends ValueObject<CommentDetailsProps> {
  get commentId(): CommentId {
    return this.props.commentId;
  }

  get text(): CommentText {
    return this.props.text;
  }

  get traveller(): TravellerDetails {
    return this.props.traveller;
  }

  get createdAt(): Date | string {
    return this.props.createdAt;
  }

  get tripSlug(): TripSlug {
    return this.props.tripSlug;
  }

  get tripTitle(): TripTitle {
    return this.props.tripTitle;
  }

  private constructor(props: CommentDetailsProps) {
    super(props);
  }

  public static create(props: CommentDetailsProps): Result<CommentDetails> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.commentId, argumentName: "commentId" },
      { argument: props.text, argumentName: "text" },
      { argument: props.traveller, argumentName: "traveller" },
      { argument: props.createdAt, argumentName: "createdAt" },
      { argument: props.tripSlug, argumentName: "tripSlug" },
      { argument: props.tripTitle, argumentName: "tripTitle" },
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<CommentDetails>(nullGuard.getErrorValue());
    }

    return Result.ok<CommentDetails>(
      new CommentDetails({
        ...props,
      })
    );
  }
}
