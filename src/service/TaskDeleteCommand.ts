export class TaskDeleteCommand {
  private readonly _targetId: string;

  constructor(targetId: string) {
    this._targetId = targetId;
  }

  get targetId(): string {
    return this._targetId;
  }
}
