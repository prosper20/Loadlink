import { Mapper } from "../../../shared/infra/Mapper";
import { Trip } from "../domain/trip";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { TravellerId } from "../domain/travellerId";
import { TripSlug } from "../domain/tripSlug";
import { TripTitle } from "../domain/tripTitle";
import { TripText } from "../domain/tripText";
import { StartingLocation } from "../domain/startingLocation";
import { Destination } from "../domain/destination";
import { TripDate } from "../domain/tripDate";

export class TripMap implements Mapper<Trip> {
  public static toDomain(raw: any): Trip {
    const tripOrError = Trip.create(
      {
        travellerId: TravellerId.create(
          new UniqueEntityID(raw.traveller_id)
        ).getValue(),
        slug: TripSlug.createFromExisting(raw.slug).getValue(),
        title: TripTitle.create({ value: raw.title }).getValue(),
        text: TripText.create({ value: raw.text }).getValue(),
        points: raw.points,
        dateTimePosted: raw.createdAt,
        images: raw.images,
        startingLocation: StartingLocation.create({
          value: raw.starting_location,
        }).getValue(),
        destination: Destination.create({ value: raw.destination }).getValue(),
        beginningDate: TripDate.create(raw.beginning_date).getValue(),
        endingDate: TripDate.create(raw.ending_date).getValue(),
      },
      new UniqueEntityID(raw.post_id)
    );

    tripOrError.isFailure ? console.log(tripOrError.getErrorValue()) : "";

    return tripOrError.isSuccess ? tripOrError.getValue() : null;
  }

  public static toPersistence(trip: Trip): any {
    return {
      title: trip.title.value,
      trip_id: trip.tripId.getStringValue(),
      traveller_id: trip.travellerId.getStringValue(),
      text: trip.text.value,
      slug: trip.slug.value,
      points: trip.points,
      starting_location: trip.startingLocation.value,
      destination: trip.destination.value,
      beginning_date: trip.beginningDate.value,
      ending_date: trip.endingDate.value,
    };
  }
}
