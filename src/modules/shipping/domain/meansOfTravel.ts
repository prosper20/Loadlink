import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface MeansOfTravelProps {
  value: string;
}

export class MeansOfTravel extends ValueObject<MeansOfTravelProps> {
  public static minLength: number = 2;
  public static maxLength: number = 100;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: MeansOfTravelProps) {
    super(props);
  }

  public static create(props: MeansOfTravelProps): Result<MeansOfTravel> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "meansOfTravel"
    );

    if (nullGuardResult.isFailure) {
      return Result.fail<MeansOfTravel>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<MeansOfTravel>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<MeansOfTravel>(maxGuardResult.getErrorValue());
    }

    return Result.ok<MeansOfTravel>(new MeansOfTravel(props));
  }
}
