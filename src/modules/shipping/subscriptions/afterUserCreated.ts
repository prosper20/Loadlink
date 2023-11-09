import { User } from "../../users/domain/user";
import { UserCreated } from "../../users/domain/events/userCreated";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { CreateTraveller } from "../useCases/travellers/createTraveller/CreateTraveller";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";

export class AfterUserCreated implements IHandle<UserCreated> {
  private createTraveller: CreateTraveller;

  constructor(createTraveller: CreateTraveller) {
    this.setupSubscriptions();
    this.createTraveller = createTraveller;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(this.onUserCreated.bind(this), UserCreated.name);
  }

  private async onUserCreated(event: UserCreated): Promise<void> {
    const { user } = event;

    try {
      await this.createTraveller.execute({
        userId: user.userId.getStringValue(),
      });
      console.log(
        `[AfterUserCreated]: Successfully executed CreateTraveller use case AfterUserCreated`
      );
    } catch (err) {
      console.log(
        `[AfterUserCreated]: Failed to execute CreateTraveller use case AfterUserCreated.`
      );
    }
  }
}
