import { createTraveller } from "../useCases/travellers/createTraveller";
import { AfterUserCreated } from "./afterUserCreated";

// Subscriptions
new AfterUserCreated(createTraveller);
