import { CreateTraveller } from "./CreateTraveller";
import { userRepo } from "../../../../users/repos";
import { travellerRepo } from "../../../repos";

const createTraveller = new CreateTraveller(userRepo, travellerRepo);

export { createTraveller };
