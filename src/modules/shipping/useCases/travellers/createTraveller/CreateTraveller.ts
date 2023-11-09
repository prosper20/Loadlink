import { UseCase } from "../../../../../shared/core/UseCase";
import { ITravellerRepo } from "../../../repos/travellerRepo";
import { CreateTravellerDTO } from "./CreateTravellerDTO";
import { IUserRepo } from "../../../../users/repos/userRepo";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { CreateTravellerErrors } from "./CreateTravellerErrors";
import { User } from "../../../../users/domain/user";
import { Traveller } from "../../../domain/traveller";
import { UniqueEntityID } from "../../../../../shared/domain/UniqueEntityID";

type Response = Either<
  | CreateTravellerErrors.TravellerAlreadyExistsError
  | CreateTravellerErrors.UserDoesntExistError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateTraveller
  implements UseCase<CreateTravellerDTO, Promise<Response>>
{
  private travellerRepo: ITravellerRepo;
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo, travellerRepo: ITravellerRepo) {
    this.userRepo = userRepo;
    this.travellerRepo = travellerRepo;
  }

  public async execute(request: CreateTravellerDTO): Promise<Response> {
    let user: User;
    let traveller: Traveller;
    const { userId } = request;

    try {
      try {
        user = await this.userRepo.getUserByUserId(userId);
      } catch (err) {
        return left(new CreateTravellerErrors.UserDoesntExistError(userId));
      }

      try {
        traveller = await this.travellerRepo.getTravellerByUserId(userId);
        const travellerExists = !!traveller === true;

        if (travellerExists) {
          return left(
            new CreateTravellerErrors.TravellerAlreadyExistsError(userId)
          );
        }
      } catch (err) {}

      const emptyTraveller = await this.travellerRepo.initialize();
      const id = new UniqueEntityID(emptyTraveller._id.toString());
      const isNew = emptyTraveller.is_new as boolean;

      const travellerOrError: Result<Traveller> = Traveller.create(
        {
          userId: user.userId,
          username: user.username,
          isNew,
        },
        id
      );

      if (travellerOrError.isFailure) {
        this.travellerRepo.delete(emptyTraveller._id);
        return left(travellerOrError);
      }

      traveller = travellerOrError.getValue();

      await this.travellerRepo.save(traveller);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    //return null;
  }
}
