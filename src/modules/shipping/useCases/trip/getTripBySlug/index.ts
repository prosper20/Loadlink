import { GetTripBySlug } from "./GetTripBySlug";
import { tripRepo } from "../../../repos";
import { GetTripBySlugController } from "./GetTripBySlugController";

const getTripBySlug = new GetTripBySlug(tripRepo);
const getTripBySlugController = new GetTripBySlugController(getTripBySlug);

export { getTripBySlug, getTripBySlugController };
