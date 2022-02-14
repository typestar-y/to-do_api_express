export class TaskDTO {
  readonly id: string;
  readonly name: string;
  readonly due: string;
  readonly status: string;

  constructor(id: string, name: string, due: string, status: string) {
    this.id = id;
    this.name = name;
    this.due = due;
    this.status = status;
  }
}
