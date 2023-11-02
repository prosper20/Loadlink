import { Entity } from "../../../shared/domain/Entity";
import { Result } from "../../../shared/core/Result";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { CommentId } from "./commentId";
import { CommentText } from "./commentText";
import { UserId } from "../../users/domain/userId";
import { Guard } from "../../../shared/core/Guard";
import { TripId } from "./tripId";
import { has } from "lodash";

export interface CommentProps {
  userId: UserId;
  text: CommentText;
  tripId: TripId;
}

export class Comment extends Entity<CommentProps> {
  get commentId(): CommentId {
    return CommentId.create(this._id).getValue();
  }

  get tripId(): TripId {
    return this.props.tripId;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get text(): CommentText {
    return this.props.text;
  }

  private constructor(props: CommentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CommentProps,
    id?: UniqueEntityID
  ): Result<Comment> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: "userId" },
      { argument: props.text, argumentName: "text" },
      { argument: props.tripId, argumentName: "tripId" },
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Comment>(nullGuard.getErrorValue());
    } else {
      const isNewComment = !!id === false;

      const defaultCommentProps: CommentProps = {
        ...props,
      };

      const comment = new Comment(defaultCommentProps, id);

      return Result.ok<Comment>(comment);
    }
  }
}
