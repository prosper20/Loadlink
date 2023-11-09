import { ValueObject } from "../../../shared/domain/ValueObject";
import { TripText } from "./tripText";
import { TripTitle } from "./tripTitle";
import { TripSlug } from "./tripSlug";
import { TravellerDetails } from "./travellerDetails";
import { Result } from "../../../shared/core/Result";
import { IGuardArgument, Guard } from "../../../shared/core/Guard";
import { Trip } from "./trip";
import { Destination } from "./destination";
import { StartingLocation } from "./startingLocation";
import { TripDate } from "./tripDate";
import { TravellerId } from "./travellerId";

interface TripDetailsProps {
  traveller: TravellerDetails;
  slug: TripSlug;
  title?: TripTitle;
  text?: TripText;
  points: number;
  dateTimePosted: string | Date;
  images?: string[];
  startingLocation: StartingLocation;
  destination: Destination;
  beginningDate: TripDate;
  endingDate: TripDate;
}

export class TripDetails extends ValueObject<TripDetailsProps> {
  get traveller(): TravellerDetails {
    return this.props.traveller;
  }

  get slug(): TripSlug {
    return this.props.slug;
  }

  get title(): TripTitle {
    return this.props.title;
  }

  get text(): TripText {
    return this.props.text;
  }

  get points(): number {
    return this.props.points;
  }

  get dateTimePosted(): string | Date {
    return this.props.dateTimePosted;
  }

  get images(): string[] {
    return this.props.images;
  }
  get startingLocation(): StartingLocation {
    return this.props.startingLocation;
  }
  get destination(): Destination {
    return this.props.destination;
  }
  get beginningDate(): TripDate {
    return this.props.beginningDate;
  }
  get endingDate(): TripDate {
    return this.props.endingDate;
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
      { argument: props.beginningDate, argumentName: "beginningDate" },
      { argument: props.endingDate, argumentName: "endingDate" },
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
