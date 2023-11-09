import { Mapper } from "../../../shared/infra/Mapper";
import { Trip } from "../domain/trip";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { TravellerId } from "../domain/travellerId";
import { TripSlug } from "../domain/tripSlug";
import { StartingLocation } from "../domain/startingLocation";
import { Destination } from "../domain/destination";
import { TripDate } from "../domain/tripDate";
import { MeansOfTravel } from "../domain/meansOfTravel";

export class TripMap implements Mapper<Trip> {
  public static toDomain(raw: any): Trip {
    const tripOrError = Trip.create(
      {
        travellerId: TravellerId.create(
          new UniqueEntityID(raw.traveller_id)
        ).getValue(),
        slug: TripSlug.createFromExisting(raw.slug).getValue(),
        startingLocation: StartingLocation.create({
          value: raw.start,
        }).getValue(),
        destination: Destination.create({ value: raw.destination }).getValue(),
        departureDate: TripDate.create(raw.departure_date).getValue(),
        arrivalDate: TripDate.create(raw.arrival_date).getValue(),
        startingAmount: raw.starting_amount,
        meansOfTravel: MeansOfTravel.create({
          value: raw.means_of_travel,
        }).getValue(),
        points: raw.points,
        dateTimePosted: raw.createdAt,
      },
      new UniqueEntityID(raw.post_id)
    );

    tripOrError.isFailure ? console.log(tripOrError.getErrorValue()) : "";

    return tripOrError.isSuccess ? tripOrError.getValue() : null;
  }

  public static toPersistence(trip: Trip): any {
    return {
      trip_id: trip.tripId.getStringValue(),
      traveller_id: trip.travellerId.getStringValue(),
      start: trip.startingLocation.value,
      destination: trip.destination.value,
      departure_date: trip.departureDate.value,
      arrival_date: trip.arrivalDate.value,
      starting_amount: trip.startingAmount,
      means_of_travel: trip.meansOfTravel.value,
      slug: trip.slug.value,
      points: trip.points,
    };
  }
}
