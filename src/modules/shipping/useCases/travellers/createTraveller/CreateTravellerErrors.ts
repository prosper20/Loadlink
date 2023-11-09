import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace CreateTravellerErrors {
  export class UserDoesntExistError extends Result<UseCaseError> {
    constructor(baseUserId: string) {
      super(false, {
        message: `A user for user id ${baseUserId} doesn't exist or was deleted.`,
      } as UseCaseError);
    }
  }

  export class TravellerAlreadyExistsError extends Result<UseCaseError> {
    constructor(baseUserId: string) {
      super(false, {
        message: `Traveller for ${baseUserId} already exists.`,
      } as UseCaseError);
    }
  }
}
