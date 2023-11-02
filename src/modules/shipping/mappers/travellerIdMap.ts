import { Mapper } from "../../../shared/infra/Mapper";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { TravellerId } from "../domain/travellerId";

export class TravellerIdMap implements Mapper<TravellerId> {
  public static toDomain(rawTraveller: any): TravellerId {
    const travellerIdOrError = TravellerId.create(
      new UniqueEntityID(rawTraveller.traveller_id)
    );
    return travellerIdOrError.isSuccess ? travellerIdOrError.getValue() : null;
  }
}
