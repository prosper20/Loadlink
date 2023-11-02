import { Mapper } from "../../../shared/infra/Mapper";
import { TravellerDetails } from "../domain/travellerDetails";
import { UserName } from "../../users/domain/userName";
import { TravellerDTO } from "../dtos/travellerDTO";
import { MobileNumber } from "../../users/domain/mobileNumber";
import { FullName } from "../../users/domain/fullName";
import { UserId } from "../../users/domain/userId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class TravellerDetailsMap implements Mapper<TravellerDetails> {
  public static toDomain(raw: any): TravellerDetails {
    const userNameOrError = UserName.create({ name: raw.base_user.username });
    const mobileNumberOrError = MobileNumber.create(raw.base_user.mobileNumber);
    const fullnameOrError = FullName.create({ name: raw.base_user.fullname });
    const userIdOrError = UserId.create(
      new UniqueEntityID(raw.base_user.base_user_id)
    );

    const travellerDetailsOrError = TravellerDetails.create({
      reputation: raw.reputation,
      username: userNameOrError.getValue(),
      mobileNumber: mobileNumberOrError.getValue(),
      fullname: fullnameOrError.getValue(),
      userId: userIdOrError.getValue(),
    });

    travellerDetailsOrError.isFailure
      ? console.log(travellerDetailsOrError.getErrorValue())
      : "";

    return travellerDetailsOrError.isSuccess
      ? travellerDetailsOrError.getValue()
      : null;
  }

  public static toDTO(travellerDetails: TravellerDetails): TravellerDTO {
    return {
      reputation: travellerDetails.reputation,
      user: {
        username: travellerDetails.username.value,
        userId: travellerDetails.userId.getValue.toString(),
        fullname: travellerDetails.fullname.value,
        mobileNumber: travellerDetails.mobileNumber.value,
      },
    };
  }
}
