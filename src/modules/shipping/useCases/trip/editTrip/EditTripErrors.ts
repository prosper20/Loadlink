import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { TripId } from "../../../domain/tripId";

export namespace EditTripErrors {
  export class TripNotFoundError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `Couldn't find a trip by id {${id}}.`,
      } as UseCaseError);
    }
  }

  export class TripSealedError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `If a trip has started, it's sealed and cannot be edited.`,
      } as UseCaseError);
    }
  }
}
