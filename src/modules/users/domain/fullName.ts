import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface FullNameProps {
  name: string;
}

export class FullName extends ValueObject<FullNameProps> {
  public static maxLength: number = 30;
  public static minLength: number = 2;

  get value(): string {
    return this.props.name;
  }

  private constructor(props: FullNameProps) {
    super(props);
  }

  public static create(props: FullNameProps): Result<FullName> {
    const fullnameResult = Guard.againstNullOrUndefined(props.name, "fullname");
    if (fullnameResult.isFailure) {
      return Result.fail<FullName>(fullnameResult.getErrorValue());
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
    if (minLengthResult.isFailure) {
      return Result.fail<FullName>(minLengthResult.getErrorValue());
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);
    if (maxLengthResult.isFailure) {
      return Result.fail<FullName>(minLengthResult.getErrorValue());
    }

    return Result.ok<FullName>(new FullName(props));
  }
}
