import { v4 as uuidv4 } from "uuid";
import { Identifier } from "./Identifier";

const uniqueId = uuidv4();

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : uniqueId);
  }
}
