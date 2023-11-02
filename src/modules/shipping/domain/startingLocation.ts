import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface StartingLocationProps {
  value: string;
}

export class StartingLocation extends ValueObject<StartingLocationProps> {
  public static minLength: number = 2;
  public static maxLength: number = 100; // Adjust the maximum length as needed

  get value(): string {
    return this.props.value;
  }

  private constructor(props: StartingLocationProps) {
    super(props);
  }

  public static create(props: StartingLocationProps): Result<StartingLocation> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "startingLocation"
    );

    if (nullGuardResult.isFailure) {
      return Result.fail<StartingLocation>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<StartingLocation>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<StartingLocation>(maxGuardResult.getErrorValue());
    }

    return Result.ok<StartingLocation>(new StartingLocation(props));
  }
}
