// import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
// import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
// import { Trip } from "../trip";

// export class TripCreated implements IDomainEvent {
//   public dateTimeOccurred: Date;
//   public trip: Trip;

//   constructor(trip: Trip) {
//     this.dateTimeOccurred = new Date();
//     this.trip = trip;
//   }

//   getAggregateId(): UniqueEntityID {
//     return this.trip.id;
//   }
// }
