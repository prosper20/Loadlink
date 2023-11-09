import { TripDetailsMap } from "../../../mappers/tripDetailsMap";
import { GetTripBySlug } from "./GetTripBySlug";
import { GetTripBySlugDTO } from "./GetTripBySlugDTO";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { TripDTO } from "../../../dtos/tripDTO";
import * as express from "express";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";

export class GetTripBySlugController extends BaseController {
  private useCase: GetTripBySlug;

  constructor(useCase: GetTripBySlug) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetTripBySlugDTO = {
      slug: req.query.slug as string,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const tripDetails = result.value.getValue();
        return this.ok<{ trip: TripDTO }>(res, {
          trip: TripDetailsMap.toDTO(tripDetails),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
