import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CreateTrip } from "./CreateTrip";
import { CreateTripDTO } from "./CreateTripDTO";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { CreateTripErrors } from "./CreateTripErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";
import * as express from "express";

export class CreateTripController extends BaseController {
  private useCase: CreateTrip;

  constructor(useCase: CreateTrip) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const { userId } = req.decoded;

    const dto: CreateTripDTO = {
      userId: userId,
      start: TextUtils.sanitize(req.body.start),
      destination: TextUtils.sanitize(req.body.destination),
      departureDate: TextUtils.sanitize(
        `${req.body.departureDate}T${req.body.departureTime}`
      ),
      arrivalDate: TextUtils.sanitize(
        `${req.body.arrivalDate}T${req.body.arrivalTime}`
      ),
      startingAmount: TextUtils.sanitize(req.body.startingAmount),
      meansOfTravel: TextUtils.sanitize(req.body.meansOfTravel),
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateTripErrors.TravellerDoesntExistError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
