import { v4 as uuidv4 } from "uuid";
import { Column } from "./column";
import { Task } from "./task";

export class TaskManager {
  private _columns: Column[] = [];

  constructor() {
    this.addColumn("Todo");
    this.addColumn("In progress");
    this.addColumn("Done");

    this.addTask("task 1", this.columns[0].id);
    this.addTask("task 2", this.columns[0].id);
    this.addTask("task 3", this.columns[2].id);
  }

  get columns() {
    return this._columns;
  }

  get tasks() {
    return this.columns.map((c) => c.tasks).flat(1);
  }

  addColumn(value: string) {
    const column = new Column(value);
    this._columns.push(column);
  }

  getColumn(columnId: string) {
    const column = this._columns.find((c) => c.id === columnId);

    if (!column) {
      throw new Error("Column not found");
    }

    return column;
  }

  addTask(value: string, columnId: string) {
    const column = this.getColumn(columnId);

    const task = new Task(value, columnId);

    column.addTask(task);

    return task.id;
  }

  getTask(taskId: string) {
    const task = this.tasks.find((t) => t.id === taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  updateTask(taskId: string, columnId: string, value: string) {
    const task = this.getTask(taskId);

    if (task.columnId !== columnId) {
      const oldColumn = this.getColumn(task.columnId);
      oldColumn.deleteTask(taskId);

      const newColumn = this.getColumn(columnId);
      task.setColumnId(columnId);
      newColumn.addTask(task);
    }

    

    if (value) task.setValue(value);
  }

  deleteTask(taskId: string) {
    const task = this.getTask(taskId);
    const column = this.getColumn(task.columnId);
    column.deleteTask(taskId);
  }
}
