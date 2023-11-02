import { UseCaseError } from "../../../../shared/core/UseCaseError";
import { Result } from "../../../../shared/core/Result";

export namespace CreateUserErrors {
  export class MobileNumberAlreadyExistsError extends Result<UseCaseError> {
    constructor(mobileNumber: string) {
      super(false, {
        message: `The mobileNumber ${mobileNumber}  already exists`,
      } as UseCaseError);
    }
  }

  export class UsernameTakenError extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `The username ${username} was already taken`,
      } as UseCaseError);
    }
  }
}
