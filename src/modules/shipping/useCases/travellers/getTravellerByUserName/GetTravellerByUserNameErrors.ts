import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace GetTravellerByUserNameErrors {
  export class TravellerNotFoundError extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `Couldn't find a traveller with the username ${username}`,
      } as UseCaseError);
    }
  }
}
