import { ValueObject } from "../../../shared/domain/ValueObject";
import { TripSlug } from "./tripSlug";
import { TravellerDetails } from "./travellerDetails";
import { Result } from "../../../shared/core/Result";
import { IGuardArgument, Guard } from "../../../shared/core/Guard";
import { Destination } from "./destination";
import { StartingLocation } from "./startingLocation";
import { TripDate } from "./tripDate";
import { MeansOfTravel } from "./meansOfTravel";

interface TripDetailsProps {
  traveller: TravellerDetails;
  slug: TripSlug;
  startingLocation: StartingLocation;
  destination: Destination;
  departureDate: TripDate;
  arrivalDate: TripDate;
  startingAmount: number;
  meansOfTravel: MeansOfTravel;
  points: number;
  dateTimePosted: string | Date;
}

export class TripDetails extends ValueObject<TripDetailsProps> {
  get traveller(): TravellerDetails {
    return this.props.traveller;
  }

  get slug(): TripSlug {
    return this.props.slug;
  }

  get startingAmount(): number {
    return this.props.startingAmount;
  }

  get meansOfTravel(): MeansOfTravel {
    return this.props.meansOfTravel;
  }

  get points(): number {
    return this.props.points;
  }

  get dateTimePosted(): string | Date {
    return this.props.dateTimePosted;
  }

  get startingLocation(): StartingLocation {
    return this.props.startingLocation;
  }
  get destination(): Destination {
    return this.props.destination;
  }
  get departureDate(): TripDate {
    return this.props.departureDate;
  }

  get arrivalDate(): TripDate {
    return this.props.arrivalDate;
  }

  private constructor(props: TripDetailsProps) {
    super(props);
  }

  public static create(props: TripDetailsProps): Result<TripDetails> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.traveller, argumentName: "traveller" },
      { argument: props.slug, argumentName: "slug" },
      { argument: props.points, argumentName: "points" },
      { argument: props.dateTimePosted, argumentName: "dateTimePosted" },
      { argument: props.startingLocation, argumentName: "startingLocation" },
      { argument: props.destination, argumentName: "destination" },
      { argument: props.departureDate, argumentName: "departureDate" },
      { argument: props.arrivalDate, argumentName: "arrivalDate" },
      { argument: props.startingAmount, argumentName: "startingAmount" },
      { argument: props.meansOfTravel, argumentName: "meansOfTravel" },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (guardResult.isFailure) {
      return Result.fail<TripDetails>(guardResult.getErrorValue());
    }

    return Result.ok<TripDetails>(
      new TripDetails({
        ...props,
      })
    );
  }
}
