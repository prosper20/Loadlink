import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Traveller } from "../traveller";

export class TravellerCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public traveller: Traveller;

  constructor(traveller: Traveller) {
    this.dateTimeOccurred = new Date();
    this.traveller = traveller;
  }

  getAggregateId(): UniqueEntityID {
    return this.traveller.id;
  }
}
