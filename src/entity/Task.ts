import { v4 as uuidV4 } from "uuid";
import { Status } from "../value-object/Status";

export class Task {
  private readonly _id: string;
  private _name: string;
  private _due: Date;
  private _status: Status;

  private constructor(id: string, name: string, due: Date, status: Status) {
    this._id = id;
    this._name = name;
    this._due = due;
    this._status = status;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get due(): Date {
    return this._due;
  }

  get status(): Status {
    return this._status;
  }

  static create(name: string, due: string): Task {
    return new Task(uuidV4().toString(), name, new Date(due), Status.TODO);
  }

  static of(id: string, name: string, due: string, status: string): Task {
    return new Task(id, name, new Date(due), Status.of(status));
  }

  updateName(newName: string): void {
    this._name = newName;
  }

  updateDue(newDue: string): void {
    this._due = new Date(newDue);
  }

  updateStatus(newStatus: string): void {
    this._status = Status.of(newStatus);
  }
}
