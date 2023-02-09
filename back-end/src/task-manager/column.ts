import { v4 as uuidv4 } from "uuid";

import { Task } from "./task";

export class Column {
  private _id: string;
  private _value: string;
  private _tasks: Task[] = [];

  constructor(value: string) {
    this._id = uuidv4();
    this._value = value;
  }

  get id() {
    return this._id;
  }

  get value() {
    return this._value;
  }

  get tasks() {
    return this._tasks;
  }

  addTask(task: Task) {
    this._tasks.push(task);
  }

  deleteTask(taskId: string) {
    this._tasks = this.tasks.filter((t) => t.id !== taskId);
  }
}
