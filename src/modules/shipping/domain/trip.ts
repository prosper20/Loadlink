// import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
// import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
// import { Result, Either, left, right } from "../../../shared/core/Result";
// import { TravellerId } from "./travellerId";
// import { TripSlug } from "./tripSlug";
// import { TripTitle } from "./tripTitle";
// import { TripId } from "./tripId";
// import { TripText } from "./tripText";
// import { Comment } from "./comment";
// import { Guard, IGuardArgument } from "../../../shared/core/Guard";
// import { has } from "lodash";
// import { TripCreated } from "./events/tripCreated";
// import { CommentPosted } from "./events/commentPosted";
// import { TripLike } from "./tripLike";
// import { TripLikes } from "./tripLikes";
// import { Comments } from "./comments";
// import { EditPostErrors } from "../useCases/post/editPost/EditPostErrors";
// import { TripLikesChanged } from "./events/tripLikesChanged";
// import { TripDate } from "./tripDate";
// import { Destination } from "./destination";
// import { StartingLocation } from "./startingLocation";

// export type UpdateTripResult = Either<
//   | EditPostErrors.InvalidPostTypeOperationError
//   | EditPostErrors.PostSealedError
//   | Result<any>,
//   Result<void>
// >;

// export interface TripProps {
//   travellerId: TravellerId;
//   slug: TripSlug;
//   title?: TripTitle;
//   text?: TripText;
//   comments?: Comments;
//   likes?: TripLikes;
//   points?: number;
//   dateTimePosted?: string | Date;
//   images?: string[];
//   startingLocation: StartingLocation;
//   destination: Destination;
//   beginningDate: TripDate;
//   endingDate: TripDate;
// }

// export class Trip extends AggregateRoot<TripProps> {
//   get tripId(): TripId {
//     return TripId.create(this._id).getValue();
//   }

//   get travellerId(): TravellerId {
//     return this.props.travellerId;
//   }

//   get title(): TripTitle {
//     return this.props.title;
//   }

//   get slug(): TripSlug {
//     return this.props.slug;
//   }

//   get dateTimePosted(): string | Date {
//     return this.props.dateTimePosted;
//   }

//   get comments(): Comments {
//     return this.props.comments;
//   }

//   get points(): number {
//     return this.props.points;
//   }

//   get text(): TripText {
//     return this.props.text;
//   }

//   get startingLocation(): StartingLocation {
//     return this.props.startingLocation;
//   }

//   get destination(): Destination {
//     return this.props.destination;
//   }

//   get beginningDate(): TripDate {
//     return this.props.beginningDate;
//   }

//   get endingDate(): TripDate {
//     return this.props.endingDate;
//   }

//   public updateText(tripText: TripText): UpdateTripResult {
//     const guardResult = Guard.againstNullOrUndefined(tripText, "tripText");

//     if (guardResult.isFailure) {
//       return left(Result.fail<any>(guardResult.getErrorValue()));
//     }

//     this.props.text = tripText;
//     return right(Result.ok<void>());
//   }

//   public updatePostScore(numTripLikes: number) {
//     this.props.points = numTripLikes;
//   }

//   public addLike(like: TripLike): Result<void> {
//     this.props.likes.add(like);
//     this.addDomainEvent(new TripLikesChanged(this, like));
//     return Result.ok<void>();
//   }

//   public removeLike(like: TripLike): Result<void> {
//     this.props.likes.remove(like);
//     this.addDomainEvent(new TripLikesChanged(this, like));
//     return Result.ok<void>();
//   }

//   private removeCommentIfExists(comment: Comment): void {
//     if (this.props.comments.exists(comment)) {
//       this.props.comments.remove(comment);
//     }
//   }

//   public addComment(comment: Comment): Result<void> {
//     this.removeCommentIfExists(comment);
//     this.props.comments.add(comment);
//     this.addDomainEvent(new CommentPosted(this, comment));
//     return Result.ok<void>();
//   }

//   public updateComment(comment: Comment): Result<void> {
//     this.removeCommentIfExists(comment);
//     this.props.comments.add(comment);
//     return Result.ok<void>();
//   }

//   public getLikes(): TripLikes {
//     return this.props.likes;
//   }

//   private constructor(props: TripProps, id?: UniqueEntityID) {
//     super(props, id);
//   }

//   public static create(props: TripProps, id?: UniqueEntityID): Result<Trip> {
//     const guardArgs: IGuardArgument[] = [
//       { argument: props.travellerId, argumentName: "travellerId" },
//       { argument: props.slug, argumentName: "slug" },
//       { argument: props.startingLocation, argumentName: "startingLocation" },
//       { argument: props.destination, argumentName: "destination" },
//       { argument: props.beginningDate, argumentName: "beginningDate" },
//       { argument: props.endingDate, argumentName: "endingDate" },
//     ];

//     const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

//     if (guardResult.isFailure) {
//       return Result.fail<Trip>(guardResult.getErrorValue());
//     }

//     const defaultValues: TripProps = {
//       ...props,
//       comments: props.comments ? props.comments : Comments.create([]),
//       points: has(props, "points") ? props.points : 0,
//       dateTimePosted: props.dateTimePosted ? props.dateTimePosted : new Date(),
//       likes: props.likes ? props.likes : TripLikes.create([]),
//     };

//     const isNewPost = !!id === false;
//     const trip = new Trip(defaultValues, id);

//     if (isNewPost) {
//       trip.addDomainEvent(new TripCreated(trip));

//       trip.addLike(
//         TripLike.create({
//           travellerId: props.travellerId,
//           tripId: trip.tripId,
//         }).getValue()
//       );
//     }

//     return Result.ok<Trip>(trip);
//   }
// }
