import express from "express";
import { middleware } from "../../../../../shared/infra/http";
import { getTravellerByUserNameController } from "../../../useCases/travellers/getTravellerByUserName";
import { getCurrentTravellerController } from "../../../useCases/travellers/getCurrentTraveller";

const travellerRouter = express.Router();

travellerRouter.get("/me", middleware.ensureAuthenticated(), (req, res) =>
  getCurrentTravellerController.execute(req, res)
);

travellerRouter.get("/:username", (req, res) =>
  getTravellerByUserNameController.execute(req, res)
);

export { travellerRouter };
