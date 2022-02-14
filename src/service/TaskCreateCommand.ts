export class TaskCreateCommand {
  private readonly _name: string;
  private readonly _due: string;

  constructor(name: string, due: string) {
    this._name = name;
    this._due = due;
  }

  get name(): string {
    return this._name;
  }

  get due(): string {
    return this._due;
  }
}
