import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface TripDateProps {
  value: Date;
}

export class TripDate extends ValueObject<TripDateProps> {
  get value(): Date {
    return this.props.value;
  }

  getStringValue(): string {
    const day = this.props.value.getDate().toString().padStart(2, "0");
    const month = (this.props.value.getMonth() + 1).toString().padStart(2, "0");
    const year = this.props.value.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }

  private constructor(props: TripDateProps) {
    super(props);
  }

  public static create(value: string): Result<TripDate> {
    let guardResult = Guard.againstNullOrUndefined(value, "value");
    if (guardResult.isFailure) {
      return Result.fail<TripDate>(guardResult.getErrorValue());
    }

    const date = parseDate(value);

    if (!date) {
      return Result.fail<TripDate>("Invalid date format");
    }

    const tripDateProps: TripDateProps = { value: date };

    return Result.ok<TripDate>(new TripDate(tripDateProps));
  }
}

function parseDate(dateString: string): Date | null {
  // Parse the input string as a date
  const parsedDate = new Date(dateString);

  // Check if the parsed date is a valid date
  if (isValidDate(parsedDate)) {
    return parsedDate;
  }

  return null; // Invalid date format
}

function isValidDate(date: Date): boolean {
  // Use the built-in JavaScript Date class to validate the date
  return !isNaN(date.getTime());
}

// import { ValueObject } from "../../../shared/domain/ValueObject";
// import { Result } from "../../../shared/core/Result";
// import { Guard } from "../../../shared/core/Guard";

// interface TripDateProps {
//   value: string;
// }

// export class TripDate extends ValueObject<Date> {
//   get value(): Date {
//     return this.props;
//   }

//   getStringValue(): string {
//     const day = this.props.getDate().toString().padStart(2, "0");
//     const month = (this.props.getMonth() + 1).toString().padStart(2, "0");
//     const year = this.props.getFullYear().toString();

//     return `${day}-${month}-${year}`;
//   }

//   private constructor(date: Date) {
//     super(date);
//   }

//   public static create(props: TripDateProps): Result<TripDate> {
//     const value = props.value;

//     let guardResult = Guard.againstNullOrUndefined(value, "value");
//     if (guardResult.isFailure) {
//       return Result.fail<TripDate>(guardResult.getErrorValue());
//     }

//     const date = parseDate(value);

//     if (!date) {
//       return Result.fail<TripDate>("Invalid date format");
//     }

//     return Result.ok<TripDate>(new TripDate(date));
//   }
//   public static createFromDate(date: Date): Result<TripDate> {
//     if (!date) {
//       return Result.fail<TripDate>("Invalid date");
//     }

//     return Result.ok<TripDate>(new TripDate(date));
//   }
// }

// function parseDate(dateString: string): Date | null {
//   // Check if the input string matches either the "dd-mm-yyyy" or "dd/mm/yyyy" format
//   const regex = /^(\d{2})[-/](\d{2})[-/](\d{4})$/;
//   const match = dateString.match(regex);

//   if (match) {
//     const day = parseInt(match[1], 10);
//     const month = parseInt(match[2], 10) - 1;
//     const year = parseInt(match[3], 10);

//     // Validate the date
//     if (isValidDate(day, month, year)) {
//       return new Date(year, month, day);
//     }
//   }

//   return null; // Invalid date format
// }

// function isValidDate(day: number, month: number, year: number): boolean {
//   const date = new Date(year, month, day);

//   return (
//     date.getDate() === day &&
//     date.getMonth() === month &&
//     date.getFullYear() === year
//   );
// }
