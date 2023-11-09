import { GetCurrentTravellerController } from "./GetCurrentTravellerController";
import { getTravellerByUserName } from "../getTravellerByUserName";

const getCurrentTravellerController = new GetCurrentTravellerController(
  getTravellerByUserName
);

export { getCurrentTravellerController };
