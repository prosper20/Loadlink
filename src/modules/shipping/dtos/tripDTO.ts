import { TravellerId } from "../domain/travellerId";
import { TravellerDTO } from "./travellerDTO";

export interface TripDTO {
  slug: string;
  title: string;
  images?: string[];
  travellerPostedBy: TravellerId;
  points: number;
  text: string;
  startingLocation: string;
  destination: string;
  beginningDate: string | Date;
  endingDate: string | Date;
  createdAt: string | Date;
}
