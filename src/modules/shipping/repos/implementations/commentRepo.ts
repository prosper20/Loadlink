import { Comment } from "../../domain/comment";
import { CommentDetails } from "../../domain/commentDetails";
import { CommentId } from "../../domain/commentId";
import { TravellerId } from "../../domain/travellerId";
import { Model } from "mongoose";
import { IComment } from "../../../../shared/infra/database/mongoose/IModels";
import { ICommentRepo } from "../commentRepo";
import { UserId } from "../../../users/domain/userId";
import { CommentText } from "../../domain/commentText";
import { TripId } from "../../domain/tripId";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Result } from "../../../../shared/core/Result";
import { TripTitle } from "../../domain/tripTitle";
import { TripSlug } from "../../domain/tripSlug";
import { TravellerDetailsMap } from "../../mappers/travellerDetailsMap";

export class CommentRepo implements ICommentRepo {
  private commentModel: Model<IComment>;

  constructor(commentModel: Model<IComment>) {
    this.commentModel = commentModel;
  }

  async exists(commentId: string): Promise<boolean> {
    // Not yet implemented
    return false;
  }

  async getCommentDetailsByTripSlug(
    slug: string,
    travellerId?: TravellerId,
    offset?: number
  ): Promise<CommentDetails[]> {
    // Not yet implemented
    return [];
  }

  async getCommentByCommentId(commentId: string): Promise<Comment> {
    // Not yet implemented
    const props = {
      userId: UserId.create(new UniqueEntityID("hdkjdaks")).getValue(),
      text: CommentText.create({ value: "hhhhhh" }).getValue(),
      tripId: TripId.create(new UniqueEntityID("hdkjdaks")).getValue(),
    };
    const commentOrError: Result<Comment> = Comment.create(props);

    if (commentOrError.isFailure) {
      return;
    }

    return commentOrError.getValue();
  }

  async getCommentDetailsByCommentId(
    commentId: string,
    travellerId?: TravellerId
  ): Promise<CommentDetails> {
    // Not yet implemented
    const title = TripTitle.create({
      value: "tugfugy",
    }).getValue();
    const props = {
      commentId: CommentId.create(new UniqueEntityID("hdkjdaks")).getValue(),
      text: CommentText.create({ value: "hhhhhh" }).getValue(),
      createdAt: "string",
      traveller: TravellerDetailsMap.toDomain({ traveller: "J" }),
      tripTitle: TripTitle.create({
        value: "tugfugy",
      }).getValue(),
      tripSlug: TripSlug.create(title).getValue(),
    };
    const commentDetailsOrError: Result<CommentDetails> =
      CommentDetails.create(props);

    if (commentDetailsOrError.isFailure) {
      return;
    }

    return commentDetailsOrError.getValue();
  }

  async deleteComment(commentId: CommentId): Promise<void> {
    // Not yet implemented
  }

  async save(comment: Comment): Promise<void> {
    // Not yet implemented
  }

  async saveBulk(comments: Comment[]): Promise<void> {
    // Not yet implemented
  }
}
