import { TripLike } from "../domain/tripLike";
import { TravellerId } from "../domain/travellerId";
import { TripId } from "../domain/tripId";
import { TripLikes } from "../domain/tripLikes";

export interface ITripLikesRepo {
  exists(tripId: TripId, travellerId: TravellerId): Promise<boolean>;
  getLikesForTripByTravellerId(
    tripId: TripId,
    travellerId: TravellerId
  ): Promise<TripLike[]>;
  saveBulk(likes: TripLikes): Promise<any>;
  save(likes: TripLike): Promise<any>;
  delete(like: TripLike): Promise<any>;
}
