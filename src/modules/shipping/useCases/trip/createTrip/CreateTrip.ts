// import { UseCase } from "../../../../../shared/core/UseCase";
// import { ITripRepo } from "../../../repos/tripRepo";
// import { Either, Result, left, right } from "../../../../../shared/core/Result";
// import { AppError } from "../../../../../shared/core/AppError";
// import { CreateTripDTO } from "./CreateTripDTO";
// import { ITravellerRepo } from "../../../repos/travellerRepo";
// import { Traveller } from "../../../domain/traveller";
// import { CreateTripErrors } from "./CreateTripErrors";
// import { Trip, TripProps } from "../../../domain/trip";
// import { TripTitle } from "../../../domain/tripTitle";
// import { TripText } from "../../../domain/tripText";
// import { TripSlug } from "../../../domain/tripSlug";
// import { link } from "fs";
// import { Destination } from "../../../domain/destination";
// import { StartingLocation } from "../../../domain/startingLocation";
// import { TripDate } from "../../../domain/tripDate";

// type Response = Either<
//   | CreateTripErrors.TravellerDoesntExistError
//   | AppError.UnexpectedError
//   | Result<any>,
//   Result<void>
// >;

// export class CreateTrip implements UseCase<CreateTripDTO, Promise<Response>> {
//   private tripRepo: ITripRepo;
//   private travellerRepo: ITravellerRepo;

//   constructor(tripRepo: ITripRepo, travellerRepo: ITravellerRepo) {
//     this.tripRepo = tripRepo;
//     this.travellerRepo = travellerRepo;
//   }

//   public async execute(request: CreateTripDTO): Promise<Response> {
//     let traveller: Traveller;
//     let title: TripTitle;
//     let text: TripText;
//     let slug: TripSlug;
//     let trip: Trip;
//     let startingLocation: StartingLocation;
//     let destination: Destination;
//     let beginningDate: TripDate;
//     let endingDate: TripDate;

//     const { userId } = request;

//     try {
//       try {
//         traveller = await this.travellerRepo.getTravellerByUserId(userId);
//       } catch (err) {
//         return left(new CreateTripErrors.TravellerDoesntExistError());
//       }

//       const titleOrError = TripTitle.create({
//         value: request.title
//           ? request.title
//           : `${request.startingLocation} - ${request.destination}`,
//       });

//       if (titleOrError.isFailure) {
//         return left(titleOrError);
//       }
//       title = titleOrError.getValue();

//       const textOrError = TripText.create({ value: request.text });
//       if (textOrError.isFailure) {
//         return left(textOrError);
//       }
//       text = textOrError.getValue();

//       const slugOrError = TripSlug.create(title);

//       if (slugOrError.isFailure) {
//         return left(slugOrError);
//       }

//       slug = slugOrError.getValue();

//       const startingLocationOrError = StartingLocation.create({
//         value: request.text,
//       });
//       if (startingLocationOrError.isFailure) {
//         return left(startingLocationOrError);
//       }
//       startingLocation = startingLocationOrError.getValue();

//       const destinationOrError = Destination.create({ value: request.text });
//       if (destinationOrError.isFailure) {
//         return left(destinationOrError);
//       }
//       destination = destinationOrError.getValue();

//       const beginningDateOrError = TripDate.create({ value: request.text });
//       if (beginningDateOrError.isFailure) {
//         return left(beginningDateOrError);
//       }
//       beginningDate = beginningDateOrError.getValue();

//       const endingDateOrError = TripDate.create({ value: request.text });
//       if (endingDateOrError.isFailure) {
//         return left(endingDateOrError);
//       }
//       endingDate = endingDateOrError.getValue();

//       const tripProps: TripProps = {
//         title,
//         slug,
//         travellerId: traveller.travellerId,
//         text,
//         startingLocation,
//         destination,
//         beginningDate,
//         endingDate,
//       };

//       const tripOrError = Trip.create(tripProps);

//       if (tripOrError.isFailure) {
//         return left(tripOrError);
//       }

//       trip = tripOrError.getValue();

//       await this.tripRepo.save(trip);

//       return right(Result.ok<void>());
//     } catch (err) {
//       return left(new AppError.UnexpectedError(err));
//     }
//   }
// }
