import { v4 as uuidv4 } from "uuid";

export class Task {
  private _id: string;
  private _value: string;
  private _columnId: string;

  constructor(value: string, columnId: string) {
    this._id = uuidv4();
    this._columnId = columnId;
    this._value = value;
  }

  get id() {
    return this._id;
  }

  get value() {
    return this._value;
  }

  get columnId() {
    return this._columnId;
  }

  setValue(value: string) {
    this._value = value;
  }
}