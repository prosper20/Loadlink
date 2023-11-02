import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface TripTitleProps {
  value: string;
}

export class TripTitle extends ValueObject<TripTitleProps> {
  public static minLength: number = 2;
  public static maxLength: number = 85;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: TripTitleProps) {
    super(props);
  }

  public static create(props: TripTitleProps): Result<TripTitle> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "tripTitle"
    );

    if (nullGuardResult.isFailure) {
      return Result.fail<TripTitle>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<TripTitle>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<TripTitle>(maxGuardResult.getErrorValue());
    }

    return Result.ok<TripTitle>(new TripTitle(props));
  }
}
