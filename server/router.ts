import { Express } from "express";

let tasks = [
  { id: 1, columnName: "To do", tasks: ["asdas", "sadas", "sadasd"] },
  { id: 2, columnName: "In progress", tasks: [] },
  { id: 3, columnName: "Done", tasks: ["sadas", "sadasd"] },
];

export function router(app: Express) {
  app.get("/task", (req, res) => {
    res.send(tasks);
  });

  app.post("/task", (req, res) => {
    const { task } = req.body;

    tasks.push(task);

    res.send(tasks);
  });

  app.put("/task", (req, res) => {
    const { task } = req.body;

    const taskToEdit = tasks.find((t) => t.id === task.id);

    Object.apply(taskToEdit, task);

    res.send(tasks);
  });

  app.delete("/task", (req, res) => {
    const { task } = req.body;

    tasks = tasks.filter((t) => t.id === task.id);

    res.send(tasks);
  });
}
