import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface DestinationProps {
  value: string;
}

export class Destination extends ValueObject<DestinationProps> {
  public static minLength: number = 2;
  public static maxLength: number = 100; // Adjust the maximum length as needed

  get value(): string {
    return this.props.value;
  }

  private constructor(props: DestinationProps) {
    super(props);
  }

  public static create(props: DestinationProps): Result<Destination> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "destination"
    );

    if (nullGuardResult.isFailure) {
      return Result.fail<Destination>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<Destination>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<Destination>(maxGuardResult.getErrorValue());
    }

    return Result.ok<Destination>(new Destination(props));
  }
}
