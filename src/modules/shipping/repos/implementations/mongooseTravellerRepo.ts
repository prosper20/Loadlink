import { ITravellerRepo } from "../travellerRepo";
import { Traveller } from "../../domain/traveller";
import { TravellerMap } from "../../mappers/travellerMap";
import { TravellerDetails } from "../../domain/travellerDetails";
import { TravellerDetailsMap } from "../../mappers/travellerDetailsMap";
import { TravellerId } from "../../domain/travellerId";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { TravellerIdMap } from "../../mappers/travellerIdMap";
//import { Trip } from "../../domain/trip";
import { Model, Document } from "mongoose";
import {
  ITraveller,
  ITrip,
} from "../../../../shared/infra/database/mongoose/IModels";

export class TravellerRepo implements ITravellerRepo {
  private travellerModel: Model<ITraveller>;
  private tripModel: Model<ITrip>;

  constructor(travellerModel: Model<ITraveller>, tripModel: Model<ITrip>) {
    this.travellerModel = travellerModel;
    this.tripModel = tripModel;
  }

  public async exists(userId: string): Promise<boolean> {
    const traveller = await this.travellerModel.findOne({
      base_user: userId,
    });
    const found = !!traveller === true;
    return found;
  }

  public async getTravellerDetailsByTripSlug(
    slug: string
  ): Promise<TravellerDetails> {
    const trip = await this.tripModel.findOne({ slug });

    if (!trip) {
      throw new Error("trip not found");
    }

    const traveller = await this.travellerModel.findOne({
      traveller_id: trip.traveller_id,
    });

    if (!traveller) {
      throw new Error("Traveller not found");
    }

    return TravellerDetailsMap.toDomain(traveller);
  }

  public async getTravellerIdByUserId(userId: string): Promise<TravellerId> {
    const traveller = await this.travellerModel.findOne({
      base_user: userId,
    });
    const found = !!traveller === true;
    if (!found) throw new Error("Traveller id not found");
    return TravellerIdMap.toDomain(traveller);
  }

  public async getTravellerByUserId(userId: string): Promise<Traveller> {
    const traveller = await this.travellerModel.findOne({
      base_user: userId,
    });
    const found = !!traveller === true;
    if (!found) throw new Error("Traveller not found");
    return TravellerMap.toDomain(traveller);
  }

  public async getTravellerByUserName(username: string): Promise<Traveller> {
    const TravellerModel = this.travellerModel;
    const result = await TravellerModel.aggregate([
      {
        $lookup: {
          from: "base_user",
          localField: "base_user",
          foreignField: "_id",
          as: "base_user",
        },
      },
      {
        $match: {
          "base_user.username": username,
        },
      },
    ]);

    if (!result) {
      throw new Error("Traveller not found");
    }
    const traveller = {
      ...result[0],
      base_user: result[0].base_user[0],
    };

    return TravellerMap.toDomain(traveller);
  }

  public async getTravellerDetailsByUserName(
    username: string
  ): Promise<TravellerDetails> {
    const TravellerModel = this.travellerModel;

    const result = await TravellerModel.aggregate([
      {
        $lookup: {
          from: "base_user",
          localField: "base_user",
          foreignField: "_id",
          as: "base_user",
        },
      },
      {
        $match: {
          "base_user.username": username,
        },
      },
    ]);

    if (!result) {
      throw new Error("Traveller not found");
    }
    const traveller = {
      ...result[0],
      base_user: result[0].base_user[0],
    };

    return TravellerDetailsMap.toDomain(traveller);
  }

  public async getTravellerDetailsByTravellerId(
    travellerId: string
  ): Promise<TravellerDetails> {
    const TravellerModel = this.travellerModel;

    const traveller = await TravellerModel.findOne({
      traveller_id: travellerId,
    });
    console.log(traveller);
    if (!traveller) {
      throw new Error("Traveller not found");
    }
    return TravellerDetailsMap.toDomain(traveller);
  }

  public async save(traveller: Traveller): Promise<void> {
    const exists = await this.exists(traveller.userId.getStringValue());

    if (!exists) {
      const rawMongooseTraveller = await TravellerMap.toPersistence(traveller);
      const newTraveller = await this.travellerModel.findByIdAndUpdate(
        traveller.travellerId.getStringValue(),
        rawMongooseTraveller,
        { new: true }
      );
      newTraveller.save();
    }

    return;
  }
  public async delete(traveller: Traveller): Promise<void> {
    const TravellerModel = this.travellerModel;
    const result = await TravellerModel.deleteOne({
      base_user: traveller.userId.getStringValue(),
    });

    if (result.deletedCount === 0) {
      throw new Error("Traveller not found or could not be deleted.");
    }

    return;
  }

  async initialize() {
    const emptydoc = {
      traveller_id: "",
    };
    return await this.travellerModel.create(emptydoc);
  }
}
