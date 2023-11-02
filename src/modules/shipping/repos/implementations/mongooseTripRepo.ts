// import { ITripRepo } from "../tripRepo";
// import { TripId } from "../../domain/tripId";
// import { Trip } from "../../domain/trip";
// import { TripMap } from "../../mappers/tripMap";
// import { TripDetails } from "../../domain/tripDetails";
// import { TripDetailsMap } from "../../mappers/tripDetailsMap";
// import { ICommentRepo } from "../commentRepo";
// import { ITripLikesRepo } from "../tripLikesRepo";
// import { TripLikes } from "../../domain/tripLikes";
// import { Model, Document } from "mongoose";

// export class TripRepo implements ITripRepo {
//   private tripModel: Model<Document>;
//   private commentRepo: ICommentRepo;
//   private tripLikesRepo: ITripLikesRepo;

//   constructor(
//     tripModel: Model<Document>,
//     commentRepo: ICommentRepo,
//     tripLikesRepo: ITripLikesRepo
//   ) {
//     this.tripModel = tripModel;
//     this.commentRepo = commentRepo;
//     this.tripLikesRepo = tripLikesRepo;
//   }

//   private createBaseQuery(): any {
//     // Create and return the base query for Mongoose
//     return {};
//   }

//   private createBaseDetailsQuery(): any {
//     // Create and return the base details query for Mongoose
//     return {};
//   }

//   public async getTripByTripId(tripId: TripId | string): Promise<Trip> {
//     tripId =
//       tripId instanceof TripId ? (<TripId>tripId).getStringValue() : tripId;
//     const TripModel = this.tripModel;
//     const detailsQuery = this.createBaseQuery();
//     detailsQuery.trip_id = tripId;
//     const trip = await TripModel.findOne(detailsQuery);
//     const found = !!trip === true;
//     if (!found) throw new Error("Trip not found");
//     return TripMap.toDomain(trip);
//   }

//   public async getLocationHistoryByTripId(
//     tripId: TripId | string
//   ): Promise<number> {
//     tripId =
//       tripId instanceof TripId ? (<TripId>tripId).getStringValue() : tripId;

//     const result = await this.tripModel.countDocuments({
//       "comments.trip_id": tripId,
//     });
//     return result;
//   }

//   public async getTripDetailsBySlug(
//     slug: string,
//     offset?: number
//   ): Promise<TripDetails> {
//     const TripModel = this.tripModel;
//     const detailsQuery = this.createBaseDetailsQuery();
//     detailsQuery.slug = slug;
//     const trip = await TripModel.findOne(detailsQuery);
//     const found = !!trip === true;
//     if (!found) throw new Error("Trip not found");
//     return TripDetailsMap.toDomain(trip);
//   }

//   public async getRecentTrips(offset?: number): Promise<TripDetails[]> {
//     const TripModel = this.tripModel;
//     const detailsQuery = this.createBaseDetailsQuery();
//     detailsQuery.offset = offset ? offset : detailsQuery.offset;

//     const trips = await TripModel.find(detailsQuery);
//     return trips.map((t) => TripDetailsMap.toDomain(t));
//   }

//   public async getPopularTrips(offset?: number): Promise<TripDetails[]> {
//     const TripModel = this.tripModel;
//     const detailsQuery = this.createBaseDetailsQuery();
//     detailsQuery.offset = offset ? offset : detailsQuery.offset;
//     detailsQuery.sort = { points: -1 };

//     const trips = await TripModel.find(detailsQuery);
//     return trips.map((t) => TripDetailsMap.toDomain(t));
//   }

//   public async getTripBySlug(slug: string): Promise<Trip> {
//     const TripModel = this.tripModel;
//     const detailsQuery = this.createBaseQuery();
//     detailsQuery.slug = slug;
//     const trip = await TripModel.findOne(detailsQuery);
//     const found = !!trip === true;
//     if (!found) throw new Error("Trip not found");
//     return TripMap.toDomain(trip);
//   }

//   public async exists(tripId: TripId): Promise<boolean> {
//     const TripModel = this.tripModel;
//     const baseQuery = this.createBaseQuery();
//     baseQuery.trip_id = tripId.getStringValue();
//     const trip = await TripModel.findOne(baseQuery);
//     const found = !!trip === true;
//     return found;
//   }

//   public async delete(tripId: TripId): Promise<void> {
//     const result = await this.tripModel.deleteOne({
//       trip_id: tripId.getStringValue(),
//     });

//     if (result.deletedCount === 0) {
//       throw new Error("Trip not found or could not be deleted.");
//     }

//     return;
//   }

//   private saveComments(comments: Comments) {
//     return this.commentRepo.saveBulk(comments.getItems());
//   }

//   private saveTripLikes(tripLikes: TripLikes) {
//     return this.tripLikesRepo.saveBulk(tripLikes);
//   }

//   public async save(trip: Trip): Promise<void> {
//     const TripModel = this.tripModel;
//     const exists = await this.exists(trip.tripId);
//     const isNewTrip = !exists;
//     const rawMongooseTrip = await TripMap.toPersistence(trip);

//     if (isNewTrip) {
//       try {
//         await TripModel.create(rawMongooseTrip);
//         await this.saveComments(trip.comments);
//         await this.saveTripLikes(trip.getLikes());
//       } catch (err) {
//         await this.delete(trip.tripId);
//         throw new Error(err.toString());
//       }
//     } else {
//       // Save non-aggregate tables before saving the aggregate
//       // so that any domain events on the aggregate get dispatched
//       await this.saveComments(trip.comments);
//       await this.saveTripLikes(trip.getLikes());

//       await TripModel.updateOne(
//         { trip_id: trip.tripId.getStringValue() },
//         rawMongooseTrip
//       );
//     }
//   }
// }
