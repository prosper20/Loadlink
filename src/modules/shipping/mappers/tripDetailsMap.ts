import { Mapper } from "../../../shared/infra/Mapper";
import { TripDetails } from "../domain/tripDetails";
import { TripDTO } from "../dtos/tripDTO";
import { TripSlug } from "../domain/tripSlug";
import { TravellerDetailsMap } from "./travellerDetailsMap";
//import { TripLikeMap } from "./tripLikeMap";
import { TripLike } from "../domain/tripLike";
import { Destination } from "../domain/destination";
import { StartingLocation } from "../domain/startingLocation";
import { TripDate } from "../domain/tripDate";
import { TravellerId } from "../domain/travellerId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { TravellerDetails } from "../domain/travellerDetails";
import { AppError } from "../../../shared/core/AppError";
import { travellerRepo } from "../repos";
import { MeansOfTravel } from "../domain/meansOfTravel";

export class TripDetailsMap implements Mapper<TripDetails> {
  public static async toDomain(raw: any): Promise<TripDetails> {
    const slug = TripSlug.createFromExisting(raw.slug).getValue();
    const startingLocationOrError = StartingLocation.create({
      value: raw.start,
    });
    const destinationOrError = Destination.create({ value: raw.destination });
    const departureDateOrError = TripDate.create(raw.departure_date);
    const arrivalDateOrError = TripDate.create(raw.arrival_date);
    const meansOfTravelOrError = MeansOfTravel.create({
      value: raw.means_of_travel,
    });
    const traveller = await travellerRepo.getTravellerDetailsByTripSlug(
      raw.slug
    );
    // const likes: TripLike[] = raw.Likes
    //   ? raw.Likes.map((v) => TripLikeMap.toDomain(v))
    //   : [];

    const tripDetailsOrError = TripDetails.create({
      traveller,
      slug,
      startingLocation: startingLocationOrError.getValue(),
      destination: destinationOrError.getValue(),
      departureDate: departureDateOrError.getValue(),
      arrivalDate: arrivalDateOrError.getValue(),
      startingAmount: raw.starting_amount,
      meansOfTravel: meansOfTravelOrError.getValue(),
      points: raw.points,
      dateTimePosted: raw.createdAt,
    });

    tripDetailsOrError.isFailure
      ? console.log(tripDetailsOrError.getErrorValue())
      : "";

    return tripDetailsOrError.isSuccess ? tripDetailsOrError.getValue() : null;
  }

  public static toDTO(tripDetails: TripDetails): TripDTO {
    return {
      slug: tripDetails.slug.value,
      start: tripDetails.startingLocation.value,
      destination: tripDetails.destination.value,
      departureDate: tripDetails.departureDate.value,
      arrivalDate: tripDetails.arrivalDate.value,
      startingAmount: tripDetails.startingAmount,
      meansOfTravel: tripDetails.meansOfTravel.value,
      postedBy: TravellerDetailsMap.toDTO(tripDetails.traveller),
      points: tripDetails.points,
      dateTimePosted: tripDetails.dateTimePosted,
    };
  }
}
