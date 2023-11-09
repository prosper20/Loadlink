import { TravellerDetails } from "../domain/travellerDetails";
import { TravellerId } from "../domain/travellerId";
import { TravellerDTO } from "./travellerDTO";

export interface TripDTO {
  slug: string;
  start: string;
  destination: string;
  departureDate: string | Date;
  arrivalDate: string | Date;
  startingAmount: number;
  meansOfTravel: string;
  postedBy: TravellerDTO;
  points: number;
  dateTimePosted: string | Date;
}
