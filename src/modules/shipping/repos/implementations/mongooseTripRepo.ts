import { ITripRepo } from "../tripRepo";
import { TripId } from "../../domain/tripId";
import { Trip } from "../../domain/trip";
import { TripMap } from "../../mappers/tripMap";
import { TripDetails } from "../../domain/tripDetails";
import { TripDetailsMap } from "../../mappers/tripDetailsMap";
import { ITripLikesRepo } from "../tripLikesRepo";
import { TripLikes } from "../../domain/tripLikes";
import { Model } from "mongoose";
import { ITrip } from "../../../../shared/infra/database/mongoose/IModels";

export class TripRepo implements ITripRepo {
  private tripModel: Model<ITrip>;
  private tripLikesRepo: ITripLikesRepo;

  constructor(tripModel: Model<ITrip>, tripLikesRepo: ITripLikesRepo) {
    this.tripModel = tripModel;
    this.tripLikesRepo = tripLikesRepo;
  }

  public async getTripByTripId(tripId: TripId | string): Promise<Trip> {
    tripId = tripId instanceof TripId ? tripId.getStringValue() : tripId;
    const trip = await this.tripModel.findOne({ trip_id: tripId });
    const found = !!trip === true;
    if (!found) throw new Error("Trip not found");
    return TripMap.toDomain(trip);
  }

  public async getLocationHistoryByTripId(
    tripId: TripId | string
  ): Promise<number> {
    tripId = tripId instanceof TripId ? tripId.getStringValue() : tripId;

    // Not yet implemented
    return -1;
  }

  public async getTripDetailsBySlug(slug: string): Promise<TripDetails> {
    const trip = await this.tripModel.findOne({ slug });
    const found = !!trip === true;
    if (!found) throw new Error("Trip not found");
    return TripDetailsMap.toDomain(trip);
  }

  public async getRecentTrips(
    offset: number = 0,
    limit: number = 50
  ): Promise<TripDetails[]> {
    const query = this.tripModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    const trips = await query.exec();
    return Promise.all(
      trips.map(async (t) => await TripDetailsMap.toDomain(t))
    );
  }

  public async getPopularTrips(
    offset: number = 0,
    limit: number = 15
  ): Promise<TripDetails[]> {
    const query = this.tripModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ points: -1 });

    const trips = await query.exec();
    return Promise.all(
      trips.map(async (t) => await TripDetailsMap.toDomain(t))
    );

    //return trips.map((t) => TripDetailsMap.toDomain(t));
  }

  public async getTripBySlug(slug: string): Promise<Trip> {
    const trip = await this.tripModel.findOne({ slug });
    const found = !!trip === true;
    if (!found) throw new Error("Trip not found");
    return TripMap.toDomain(trip);
  }

  public async exists(tripId: TripId): Promise<boolean> {
    const trip = await this.tripModel.findOne({
      trip_id: tripId.getStringValue(),
    });
    const found = !!trip === true;
    return found;
  }

  public async delete(tripId: TripId): Promise<void> {
    const result = await this.tripModel.deleteOne({
      trip_id: tripId.getStringValue(),
    });

    if (result.deletedCount === 0) {
      throw new Error("Trip not found or could not be deleted.");
    }

    return;
  }

  private saveTripLikes(tripLikes: TripLikes) {
    return this.tripLikesRepo.saveBulk(tripLikes);
  }

  public async save(trip: Trip): Promise<void> {
    const doc = await this.tripModel.findOne({
      trip_id: trip.tripId.getStringValue(),
    });
    const found = !!doc === true;

    const isNewTrip = found ? doc.is_new : false;
    const rawMongooseTrip = await TripMap.toPersistence(trip);

    if (isNewTrip) {
      try {
        const newTrip = await this.tripModel.findByIdAndUpdate(
          trip.tripId.getStringValue(),
          rawMongooseTrip,
          { new: true }
        );
        newTrip.save();
        //await this.saveTripLikes(trip.getLikes());
      } catch (err) {
        //await this.delete(trip.tripId);
        throw new Error(err.toString());
      }
    } else {
      // Save non-aggregate collections before saving the aggregate
      // so that any domain events on the aggregate get dispatched

      //await this.saveTripLikes(trip.getLikes());

      const updatedTrip = await this.tripModel.findByIdAndUpdate(
        trip.tripId.getStringValue(),
        rawMongooseTrip,
        { new: true }
      );
      updatedTrip.save();
    }
  }
  // create and empty trip
  async initialize() {
    const emptydoc = {
      means_of_travel: "",
      trip_id: "",
      starting_amount: 0,
      slug: "",
      start: "",
      destination: "",
    };
    return await this.tripModel.create(emptydoc);
  }
}
