// import { Comment } from "../domain/comment";
// import { CommentDetails } from "../domain/commentDetails";
// import { CommentId } from "../domain/commentId";
// import { TravellerId } from "../domain/travellerId";

// export interface ICommentRepo {
//   exists(commentId: string): Promise<boolean>;
//   getCommentDetailsByTripSlug(
//     slug: string,
//     travellerId?: TravellerId,
//     offset?: number
//   ): Promise<CommentDetails[]>;
//   getCommentDetailsByCommentId(
//     commentId: string,
//     travellerId?: TravellerId
//   ): Promise<CommentDetails>;
//   getCommentByCommentId(commentId: string): Promise<Comment>;
//   save(comment: Comment): Promise<void>;
//   saveBulk(comments: Comment[]): Promise<void>;
//   deleteComment(commentId: CommentId): Promise<void>;
// }
