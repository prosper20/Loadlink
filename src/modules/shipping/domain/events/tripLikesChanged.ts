// import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
// import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
// import { Trip } from "../trip";
// import { TripLike } from "../tripLike";

// export class TripLikesChanged implements IDomainEvent {
//   public dateTimeOccurred: Date;
//   public trip: Trip;
//   public like: TripLike;

//   constructor(trip: Trip, like: TripLike) {
//     this.dateTimeOccurred = new Date();
//     this.trip = trip;
//     this.like = like;
//   }

//   getAggregateId(): UniqueEntityID {
//     return this.trip.id;
//   }
// }
