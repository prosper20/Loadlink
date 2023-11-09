import { UseCase } from "../../../../../shared/core/UseCase";
import { ITravellerRepo } from "../../../repos/travellerRepo";
import { GetTravellerByUserNameDTO } from "./GetTravellerByUserNameDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { GetTravellerByUserNameErrors } from "./GetTravellerByUserNameErrors";
import { TravellerDetails } from "../../../domain/travellerDetails";

type Response = Either<
  | GetTravellerByUserNameErrors.TravellerNotFoundError
  | AppError.UnexpectedError,
  Result<TravellerDetails>
>;

export class GetTravellerByUserName
  implements UseCase<GetTravellerByUserNameDTO, Promise<Response>>
{
  private travellerRepo: ITravellerRepo;

  constructor(travellerRepo: ITravellerRepo) {
    this.travellerRepo = travellerRepo;
  }

  public async execute(request: GetTravellerByUserNameDTO): Promise<Response> {
    let travellerDetails: TravellerDetails;
    const { username } = request;

    try {
      try {
        travellerDetails =
          await this.travellerRepo.getTravellerDetailsByUserName(username);
      } catch (err) {
        return left(
          new GetTravellerByUserNameErrors.TravellerNotFoundError(username)
        );
      }

      return right(Result.ok<TravellerDetails>(travellerDetails));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
