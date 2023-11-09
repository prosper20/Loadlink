import { ITripLikesRepo } from "../tripLikesRepo";
import { TripLike } from "../../domain/tripLike";
import { TravellerId } from "../../domain/travellerId";
import { TripId } from "../../domain/tripId";
import { TripLikes } from "../../domain/tripLikes";
import { Model } from "mongoose";

export class TripLikesRepo implements ITripLikesRepo {
  private tripLikesModel: Model<any>;

  constructor(tripLikesModel: Model<any>) {
    this.tripLikesModel = tripLikesModel;
  }

  exists(tripId: TripId, travellerId: TravellerId): Promise<boolean> {
    // Not yet implemented
    return Promise.resolve(false);
  }

  getLikesForTripByTravellerId(
    tripId: TripId,
    travellerId: TravellerId
  ): Promise<TripLike[]> {
    // Not yet implemented
    return Promise.resolve([]);
  }

  save(like: TripLike): Promise<any> {
    // Not yet implemented
    return Promise.resolve(undefined);
  }

  delete(like: TripLike): Promise<any> {
    // Not yet implemented
    return Promise.resolve(undefined);
  }

  saveBulk(likes: TripLikes): Promise<any> {
    // Not yet implemented
    return Promise.resolve(undefined);
  }
}
