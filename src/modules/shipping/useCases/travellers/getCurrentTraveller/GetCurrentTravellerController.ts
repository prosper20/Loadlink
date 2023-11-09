import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetTravellerByUserName } from "../getTravellerByUserName/GetTravellerByUserName";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetTravellerByUserNameResponseDTO } from "../getTravellerByUserName/GetTravellerByUserNameResponseDTO";
import { TravellerDetailsMap } from "../../../mappers/travellerDetailsMap";
import * as express from "express";

export class GetCurrentTravellerController extends BaseController {
  private useCase: GetTravellerByUserName;

  constructor(useCase: GetTravellerByUserName) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const { username } = req.decoded;

    try {
      const result = await this.useCase.execute({ username });

      if (result.isLeft()) {
        return this.fail(res, result.value.getErrorValue().message);
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
