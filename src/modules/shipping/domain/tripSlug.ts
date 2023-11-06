import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { TripTitle } from "./tripTitle";
import slug from "slug";
import { TextUtils } from "../../../shared/utils/TextUtils";

slug.defaults.mode = "pretty";
slug.defaults.modes["pretty"] = {
  replacement: "-", // replace spaces with replacement
  symbols: false, // replace unicode symbols or not
  lower: true, // result in lower case
  charmap: slug.charmap, // replace special characters
  multicharmap: slug.multicharmap, // replace multi-characters
};

export interface TripSlugProps {
  value: string;
}

export class TripSlug extends ValueObject<TripSlugProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: TripSlugProps) {
    super(props);
  }

  public static createFromExisting(slugName: string) {
    if (!!slugName === true) {
      return Result.ok<TripSlug>(new TripSlug({ value: slugName }));
    } else {
      return Result.fail<TripSlug>("No slug passed in");
    }
  }

  public static create(tripTitle: TripTitle): Result<TripSlug> {
    let returnSlug = "";

    // Run the slug algorithm here to create a slug
    // Strip all non alphabetic characters such as . / ; ,
    returnSlug = tripTitle.value.replace(/[\W_]+/g, " ");
    returnSlug =
      TextUtils.createRandomNumericString(7) + "-" + slug(tripTitle.value);

    return Result.ok<TripSlug>(new TripSlug({ value: returnSlug }));
  }
}
