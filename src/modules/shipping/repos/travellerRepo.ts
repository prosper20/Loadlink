import { Traveller } from "../domain/traveller";
import { TravellerDetails } from "../domain/travellerDetails";
import { TravellerId } from "../domain/travellerId";

export interface ITravellerRepo {
  exists(userId: string): Promise<boolean>;
  getTravellerByUserId(userId: string): Promise<Traveller>;
  getTravellerIdByUserId(userId: string): Promise<TravellerId>;
  getTravellerByUserName(username: string): Promise<Traveller>;
  getTravellerDetailsByUserName(username: string): Promise<TravellerDetails>;
  getTravellerDetailsByTripSlug(slug: string): Promise<TravellerDetails>;
  save(traveller: Traveller): Promise<void>;
  delete(traveller: Traveller): Promise<void>;
}
