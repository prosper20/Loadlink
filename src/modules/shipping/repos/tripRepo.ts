// import { Trip } from "../domain/trip";
// import { TripId } from "../domain/tripId";
// import { TripDetails } from "../domain/tripDetails";

// export interface ITripRepo {
//   getTripDetailsBySlug(slug: string): Promise<TripDetails>;
//   getTripBySlug(slug: string): Promise<Trip>;
//   getRecentTrips(offset?: number): Promise<TripDetails[]>;
//   getPopularTrips(offset?: number): Promise<TripDetails[]>;
//   getLocationHistoryByTripId(tripId: TripId | string): Promise<number>;
//   getTripByTripId(tripId: TripId | string): Promise<Trip>;
//   exists(tripId: TripId): Promise<boolean>;
//   save(trip: Trip): Promise<void>;
//   delete(tripId: TripId): Promise<void>;
// }
