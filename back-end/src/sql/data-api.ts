import mysql from "mysql";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IColumn {
  id: number;
  columnName: string;
}

export interface ITask {
  id: number;
  taskName: string;
  columnId: number;
}

export class DataApi {
  private con: mysql.Connection;

  constructor(con: mysql.Connection) {
    this.con = con;
  }

  async getColumns() {
    return new Promise(async (resolve) => {
      const columns = await prisma.todo_columns.findMany();

      resolve(columns);
    });
  }

  async getTasks() {
    return new Promise(async (resolve) => {
      const tasks = await prisma.todo_tasks.findMany({
        where: {
          deleted: 0,
        },
      });

      resolve(tasks);
    });
  }

  async createTask(taskName: string, columnId: number) {
    return new Promise(async (resolve) => {
      const newTask = await prisma.todo_tasks.create({
        data: {
          taskName,
          columnId,
        },
      });

      resolve(newTask);
    });
  }

  async updateTaskName(taskId: number, taskName: string) {
    return new Promise(async (resolve) => {
      const updatedTask = await prisma.todo_tasks.update({
        where: {
          id: taskId,
        },
        data: {
          taskName,
        },
      });

      resolve(updatedTask);
    });
  }

  async updateTaskColumnId(taskId: number, columnId: number) {
    return new Promise(async (resolve) => {
      const updatedTask = await prisma.todo_tasks.update({
        where: {
          id: taskId,
        },
        data: {
          columnId,
        },
      });

      resolve(updatedTask);
    });
  }

  async deleteTask(taskId: number) {
    return new Promise(async (resolve) => {
      const deletedTask = await prisma.todo_tasks.delete({
        where: {
          id: 1,
        },
      });

      resolve(deletedTask);
    });
  }
}
