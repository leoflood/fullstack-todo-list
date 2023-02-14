import { Express } from "express";
import mysql from "mysql";
import { DataApi } from "./sql/data-api";

export async function router(app: Express, con: mysql.Connection) {
  const dataApi = new DataApi(con);

  app.get("/columns", async (req, res) => {
    const columns = await dataApi.getColumns();
    res.send(columns);
  });

  app.get("/tasks", async (req, res) => {
    const tasks = await dataApi.getTasks();
    res.send(tasks);
  });

  app.post("/task", async (req, res) => {
    const { value, columnId } = req.body;
    await dataApi.createTask(value, columnId);
    res.send(true);
  });

  app.put("/task", async (req, res) => {
    const { taskId, columnId, value } = req.body;

    if (columnId) await dataApi.updateTaskColumnId(taskId, columnId);
    if (value) await dataApi.updateTaskName(taskId, value);

    res.send(true);
  });

  app.delete("/task", async (req, res) => {
    const { taskId } = req.body;
    await dataApi.deleteTask(taskId);
    res.send(true);
  });
}
