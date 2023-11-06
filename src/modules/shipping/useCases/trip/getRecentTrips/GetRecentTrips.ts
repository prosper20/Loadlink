import { UseCase } from "../../../../../shared/core/UseCase";
import { GetRecentTripsRequestDTO } from "./GetRecentTripsRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { TripDetails } from "../../../domain/tripDetails";
import { ITripRepo } from "../../../repos/tripRepo";

type Response = Either<AppError.UnexpectedError, Result<TripDetails[]>>;

export class GetRecentTrips
  implements UseCase<GetRecentTripsRequestDTO, Promise<Response>>
{
  private tripRepo: ITripRepo;

  constructor(tripRepo: ITripRepo) {
    this.tripRepo = tripRepo;
  }

  public async execute(req: GetRecentTripsRequestDTO): Promise<Response> {
    try {
      const trips = await this.tripRepo.getRecentTrips(req.offset);
      return right(Result.ok<TripDetails[]>(trips));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
