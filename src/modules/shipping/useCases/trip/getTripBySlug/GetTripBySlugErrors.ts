import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace GetTripBySlugErrors {
  export class TripNotFoundError extends Result<UseCaseError> {
    constructor(slug: string) {
      super(false, {
        message: `Couldn't find a trip by slug {${slug}}.`,
      } as UseCaseError);
    }
  }
}
