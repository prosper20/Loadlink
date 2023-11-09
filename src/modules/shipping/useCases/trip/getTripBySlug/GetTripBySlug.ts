import { UseCase } from "../../../../../shared/core/UseCase";
import { ITripRepo } from "../../../repos/tripRepo";
import { TripDetails } from "../../../domain/tripDetails";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { GetTripBySlugErrors } from "./GetTripBySlugErrors";
import { GetTripBySlugDTO } from "./GetTripBySlugDTO";

type Response = Either<
  GetTripBySlugErrors.TripNotFoundError | AppError.UnexpectedError,
  Result<TripDetails>
>;

export class GetTripBySlug implements UseCase<any, Promise<Response>> {
  private tripRepo: ITripRepo;

  constructor(tripRepo: ITripRepo) {
    this.tripRepo = tripRepo;
  }

  public async execute(req: GetTripBySlugDTO): Promise<Response> {
    let tripDetails: TripDetails;
    const { slug } = req;

    try {
      try {
        tripDetails = await this.tripRepo.getTripDetailsBySlug(slug);
      } catch (err) {
        return left(new GetTripBySlugErrors.TripNotFoundError(slug));
      }

      return right(Result.ok<TripDetails>(tripDetails));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
