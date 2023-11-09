import { UseCase } from "../../../../../shared/core/UseCase";
import { ITripRepo } from "../../../repos/tripRepo";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { CreateTripDTO } from "./CreateTripDTO";
import { ITravellerRepo } from "../../../repos/travellerRepo";
import { Traveller } from "../../../domain/traveller";
import { CreateTripErrors } from "./CreateTripErrors";
import { Trip, TripProps } from "../../../domain/trip";
import { TripSlug } from "../../../domain/tripSlug";
import { Destination } from "../../../domain/destination";
import { StartingLocation } from "../../../domain/startingLocation";
import { TripDate } from "../../../domain/tripDate";
import { UniqueEntityID } from "../../../../../shared/domain/UniqueEntityID";
import { MeansOfTravel } from "../../../domain/meansOfTravel";

type Response = Either<
  | CreateTripErrors.TravellerDoesntExistError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateTrip implements UseCase<CreateTripDTO, Promise<Response>> {
  private tripRepo: ITripRepo;
  private travellerRepo: ITravellerRepo;

  constructor(tripRepo: ITripRepo, travellerRepo: ITravellerRepo) {
    this.tripRepo = tripRepo;
    this.travellerRepo = travellerRepo;
  }

  public async execute(request: CreateTripDTO): Promise<Response> {
    let traveller: Traveller;
    let slug: TripSlug;
    let trip: Trip;
    let startingLocation: StartingLocation;
    let destination: Destination;
    let departureDate: TripDate;
    let arrivalDate: TripDate;
    let startingAmount: number;
    let meansOfTravel: MeansOfTravel;

    const { userId } = request;

    try {
      try {
        traveller = await this.travellerRepo.getTravellerByUserId(userId);
      } catch (err) {
        return left(new CreateTripErrors.TravellerDoesntExistError());
      }

      const meansOfTravelOrError = MeansOfTravel.create({
        value: request.meansOfTravel,
      });

      if (meansOfTravelOrError.isFailure) {
        return left(meansOfTravelOrError);
      }
      meansOfTravel = meansOfTravelOrError.getValue();

      startingAmount = parseInt(request.startingAmount, 10);

      const slugOrError = TripSlug.create(
        `${request.start} to ${request.destination} `
      );

      if (slugOrError.isFailure) {
        return left(slugOrError);
      }

      slug = slugOrError.getValue();

      const startingLocationOrError = StartingLocation.create({
        value: request.start,
      });
      if (startingLocationOrError.isFailure) {
        return left(startingLocationOrError);
      }
      startingLocation = startingLocationOrError.getValue();

      const destinationOrError = Destination.create({
        value: request.destination,
      });
      if (destinationOrError.isFailure) {
        return left(destinationOrError);
      }
      destination = destinationOrError.getValue();

      const departureDateOrError = TripDate.create(request.departureDate);
      if (departureDateOrError.isFailure) {
        return left(departureDateOrError);
      }
      departureDate = departureDateOrError.getValue();

      const arrivalDateOrError = TripDate.create(request.arrivalDate);
      if (arrivalDateOrError.isFailure) {
        return left(arrivalDateOrError);
      }
      arrivalDate = arrivalDateOrError.getValue();

      const emptyTrip = await this.tripRepo.initialize();
      const id = new UniqueEntityID(emptyTrip._id.toString());
      const isNew = emptyTrip.is_new as boolean;

      const tripProps: TripProps = {
        meansOfTravel,
        slug,
        travellerId: traveller.travellerId,
        startingAmount,
        startingLocation,
        destination,
        departureDate,
        arrivalDate,
        isNew,
      };

      const tripOrError = Trip.create(tripProps, id);

      if (tripOrError.isFailure) {
        this.tripRepo.delete(emptyTrip._id);
        return left(tripOrError);
      }

      trip = tripOrError.getValue();

      await this.tripRepo.save(trip);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
