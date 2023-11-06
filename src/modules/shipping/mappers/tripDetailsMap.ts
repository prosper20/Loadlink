import { Mapper } from "../../../shared/infra/Mapper";
import { TripDetails } from "../domain/tripDetails";
import { TripDTO } from "../dtos/tripDTO";
import { TripSlug } from "../domain/tripSlug";
import { TripTitle } from "../domain/tripTitle";
import { TravellerDetailsMap } from "./travellerDetailsMap";
import { TripText } from "../domain/tripText";
//import { TripLikeMap } from "./tripLikeMap";
import { TripLike } from "../domain/tripLike";
import { Destination } from "../domain/destination";
import { StartingLocation } from "../domain/startingLocation";
import { TripDate } from "../domain/tripDate";
import { TravellerId } from "../domain/travellerId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class TripDetailsMap implements Mapper<TripDetails> {
  public static toDomain(raw: any): TripDetails {
    const slug = TripSlug.createFromExisting(raw.slug).getValue();
    const title = TripTitle.create({ value: raw.title }).getValue();
    const travellerId = TravellerId.create(
      new UniqueEntityID(raw.traveller_id)
    ).getValue();
    const startingLocationOrError = StartingLocation.create({
      value: raw.starting_location,
    });
    const destinationOrError = Destination.create({ value: raw.destination });
    const beginningDateOrError = TripDate.create(raw.beginning_date);
    const endingDateOrError = TripDate.create(raw.ending_date);

    // const likes: TripLike[] = raw.Likes
    //   ? raw.Likes.map((v) => TripLikeMap.toDomain(v))
    //   : [];

    const tripDetailsOrError = TripDetails.create({
      slug,
      title,
      points: raw.points,
      dateTimePosted: raw.createdAt,
      traveller: travellerId,
      text: TripText.create({ value: raw.text }).getValue(),
      images: raw.images ? raw.images : [],
      startingLocation: startingLocationOrError.getValue(),
      destination: destinationOrError.getValue(),
      beginningDate: beginningDateOrError.getValue(),
      endingDate: endingDateOrError.getValue(),
    });

    tripDetailsOrError.isFailure
      ? console.log(tripDetailsOrError.getErrorValue())
      : "";

    return tripDetailsOrError.isSuccess ? tripDetailsOrError.getValue() : null;
  }

  public static toDTO(tripDetails: TripDetails): TripDTO {
    return {
      slug: tripDetails.slug.value,
      title: tripDetails.title.value,
      createdAt: tripDetails.dateTimePosted,
      travellerPostedBy: tripDetails.traveller,
      points: tripDetails.points,
      text: tripDetails.text.value,
      images: tripDetails.images,
      startingLocation: tripDetails.startingLocation.value,
      destination: tripDetails.destination.value,
      beginningDate: tripDetails.beginningDate.value,
      endingDate: tripDetails.endingDate.value,
    };
  }
}
