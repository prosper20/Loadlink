import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetRecentTripsRequestDTO } from "./GetRecentTripsRequestDTO";
import { GetRecentTrips } from "./GetRecentTrips";
import { GetRecentTripsResponseDTO } from "./GetRecentTripsResponseDTO";
import { TripDetailsMap } from "../../../mappers/tripDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";

export class GetRecentTripsController extends BaseController {
  private useCase: GetRecentTrips;

  constructor(useCase: GetRecentTrips) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    const offset = req.query.offset ? (req.query.offset as string) : null;
    const dto: GetRecentTripsRequestDTO = {
      offset: offset ? parseInt(offset, 10) : 0,
      userId: !!req.decoded === true ? req.decoded.userId : null,
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
        return this.ok<GetRecentTripsResponseDTO>(res, {
          trips: tripDetails.map((d) => TripDetailsMap.toDTO(d)),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
