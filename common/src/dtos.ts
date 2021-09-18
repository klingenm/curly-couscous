import { classToPlain, plainToClass } from "class-transformer";

abstract class DtoBase {
  toPlain() {
    return classToPlain(this);
  }
}

export type Gender = "male" | "female";
export type PersonInput = Omit<Person, "fromPlain" | "toPlain">;
export class Person extends DtoBase {
  id?: string;
  name: string;
  birthYear: string;
  mass: number;
  created: Date;
  updated: Date;
  gender: Gender;

  static fromPlain(obj: PersonInput) {
    return plainToClass(Person, obj);
  }
}
