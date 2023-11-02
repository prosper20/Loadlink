import { TripLike } from "./tripLike";
import { WatchedList } from "../../../shared/domain/WatchedList";

export class TripLikes extends WatchedList<TripLike> {
  private constructor(initialVotes: TripLike[]) {
    super(initialVotes);
  }

  public compareItems(a: TripLike, b: TripLike): boolean {
    return a.equals(b);
  }

  public static create(initialVotes?: TripLike[]): TripLikes {
    return new TripLikes(initialVotes ? initialVotes : []);
  }
}
