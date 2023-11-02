import { Mapper } from "../../../shared/infra/Mapper";
import { Traveller } from "../domain/traveller";
import { TravellerDTO } from "../dtos/travellerDTO";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { UserName } from "../../users/domain/userName";
import { UserId } from "../../users/domain/userId";

export class TravellerMap implements Mapper<Traveller> {
  public static toDomain(raw: any): Traveller {
    const userNameOrError = UserName.create({ name: raw.base_user.username });
    const userIdOrError = UserId.create(
      new UniqueEntityID(raw.base_user.base_user_id)
    );

    const travellerOrError = Traveller.create(
      {
        username: userNameOrError.getValue(),
        reputation: raw.reputation,
        userId: userIdOrError.getValue(),
      },
      new UniqueEntityID(raw.traveller_id)
    );

    travellerOrError.isFailure
      ? console.log(travellerOrError.getErrorValue())
      : "";

    return travellerOrError.isSuccess ? travellerOrError.getValue() : null;
  }

  public static toPersistence(traveller: Traveller): any {
    return {
      traveller_id: traveller.travellerId.getStringValue(),
      base_user: traveller.userId.getStringValue(),
      reputation: traveller.reputation,
    };
  }
}
