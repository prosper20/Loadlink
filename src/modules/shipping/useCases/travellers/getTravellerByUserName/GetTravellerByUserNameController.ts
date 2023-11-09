import { GetTravellerByUserName } from "./GetTravellerByUserName";
import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetTravellerByUserNameDTO } from "./GetTravellerByUserNameDTO";
import { GetTravellerByUserNameErrors } from "./GetTravellerByUserNameErrors";
import { GetTravellerByUserNameResponseDTO } from "./GetTravellerByUserNameResponseDTO";
import { TravellerDetailsMap } from "../../../mappers/travellerDetailsMap";
import * as express from "express";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";

export class GetTravellerByUserNameController extends BaseController {
  private useCase: GetTravellerByUserName;

  constructor(useCase: GetTravellerByUserName) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetTravellerByUserNameDTO = {
      username: req.params.username,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetTravellerByUserNameErrors.TravellerNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const travellerDetails = result.value.getValue();

        return this.ok<GetTravellerByUserNameResponseDTO>(res, {
          traveller: TravellerDetailsMap.toDTO(travellerDetails),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
