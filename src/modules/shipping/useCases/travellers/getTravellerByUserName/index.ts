import { GetTravellerByUserName } from "./GetTravellerByUserName";
import { travellerRepo } from "../../../repos";
import { GetTravellerByUserNameController } from "./GetTravellerByUserNameController";

const getTravellerByUserName = new GetTravellerByUserName(travellerRepo);

const getTravellerByUserNameController = new GetTravellerByUserNameController(
  getTravellerByUserName
);

export { getTravellerByUserName, getTravellerByUserNameController };
