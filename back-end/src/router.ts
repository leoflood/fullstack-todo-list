import { Express } from "express";
import { TaskManager } from "./task-manager/task-manager";

const taskManager = new TaskManager();

export function router(app: Express) {
  app.get("/columns", (req, res) => {
    res.send(taskManager.columns);
  });

  app.post("/task", (req, res) => {
    const { value, columnId } = req.body;
    taskManager.addTask(value, columnId);
    res.send(taskManager.columns);
  });

  app.put("/task", (req, res) => {
    const { taskId, columnId, value } = req.body;
    taskManager.updateTask(taskId, columnId, value);
    res.send(taskManager.columns);
  });

  app.delete("/task", (req, res) => {
    const { taskId } = req.body;
    taskManager.deleteTask(taskId);
    res.send(taskManager.columns);
  });
}
