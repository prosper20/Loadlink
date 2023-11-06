import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Comment } from "../comment";
import { Trip } from "../trip";

export class CommentPosted implements IDomainEvent {
  public dateTimeOccurred: Date;
  public trip: Trip;
  public comment: Comment;

  constructor(trip: Trip, comment: Comment) {
    this.dateTimeOccurred = new Date();
    this.trip = trip;
    this.comment = comment;
  }

  getAggregateId(): UniqueEntityID {
    return this.trip.id;
  }
}
