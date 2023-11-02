import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface TripTextProps {
  value: string;
}

export class TripText extends ValueObject<TripTextProps> {
  public static minLength: number = 2;
  public static maxLength: number = 10000;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: TripTextProps) {
    super(props);
  }

  public static create(props: TripTextProps): Result<TripText> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "tripText"
    );

    if (nullGuardResult.isFailure) {
      return Result.fail<TripText>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<TripText>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<TripText>(maxGuardResult.getErrorValue());
    }

    return Result.ok<TripText>(new TripText(props));
  }
}
