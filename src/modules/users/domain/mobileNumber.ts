import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export interface MobileNumberProps {
  value: string;
}

export class MobileNumber extends ValueObject<MobileNumberProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: MobileNumberProps) {
    super(props);
  }

  private static isValidMobileNumber(mobileNumber: string) {
    const localRegex = /^(0\d{10})$/;
    const internationalRegex = /^\+234\d{10}$/;
    return (
      localRegex.test(mobileNumber) || internationalRegex.test(mobileNumber)
    );
  }

  private static format(mobileNumber: string) {
    return mobileNumber.replace(/\D/g, "");
  }

  public static create(mobileNumber: string): Result<MobileNumber> {
    if (!this.isValidMobileNumber(mobileNumber)) {
      return Result.fail<MobileNumber>("Mobile number not valid");
    } else {
      return Result.ok<MobileNumber>(
        new MobileNumber({ value: this.format(mobileNumber) })
      );
    }
  }
}
