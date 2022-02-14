export class TaskUpdateCommand {
  private readonly _targetId: string;
  private readonly _name: string;
  private readonly _due: string;
  private readonly _status: string;

  constructor(targetId: string, name: string, due: string, status: string) {
    this._targetId = targetId;
    this._name = name;
    this._due = due;
    this._status = status;
  }

  get targetId(): string {
    return this._targetId;
  }

  get name(): string {
    return this._name;
  }

  get due(): string {
    return this._due;
  }

  get status(): string {
    return this._status;
  }
}
