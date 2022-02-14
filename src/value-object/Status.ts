export class Status {
  private static _values: Status[] = [];

  private readonly _name: string;

  static readonly TODO = new Status("Todo");
  static readonly DOING = new Status("Doing");
  static readonly DONE = new Status("Done");

  private constructor(readonly name: string) {
    this._name = name;
    Status._values.push(this);
  }

  static get values(): Status[] {
    return this._values;
  }

  static of(name: string): Status {
    const status = this._values.find((status: Status) => status.name === name);
    if (status === undefined) {
      throw new Error(); // TODO
    }
    return status;
  }

  toString(): string {
    return this.name;
  }
}
