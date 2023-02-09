import { TaskManager } from "./task-manager";

describe("TaskManager test suite", () => {
  let taskManager;
  beforeEach(() => {
    taskManager = new TaskManager();
  });

  describe("addTask", () => {
    test("Should be one more task after adding", () => {
      const previousTasksLength = taskManager.tasks.length;
      const columnId = taskManager.columns[0].id;

      taskManager.addTask("test-task", columnId);

      expect(taskManager.tasks.length).toBe(previousTasksLength + 1);
    });

    test("This new task should be at the end of the column", () => {
      const columnId = taskManager.columns[0].id;
      const column = taskManager.getColumn(columnId);

      const taskId = taskManager.addTask("test-task", columnId);
      const addedTask = taskManager.getTask(taskId);

      expect(column.tasks[column.tasks.length - 1].id).toBe(addedTask.id);
    });

    test("This new task should have the value sent", () => {
      const columnId = taskManager.columns[0].id;
      const value = "test-task";

      const taskId = taskManager.addTask(value, columnId);
      const addedTask = taskManager.getTask(taskId);

      expect(addedTask.value).toBe(value);
    });
  });

  describe("updateTask", () => {
    test("Should update an specific task", () => {
      const columnId = taskManager.columns[0].id;
      const oldValue = "test-old-value";
      const newValue = "test-new-value";
      const taskId = taskManager.addTask(oldValue, columnId);

      taskManager.updateTask(taskId, newValue);

      const updatedTask = taskManager.getTask(taskId);

      expect(oldValue).not.toBe(newValue);
      expect(updatedTask.value).toBe(newValue);
    });
  });

  describe("deleteTask", () => {
    test("Should delete an specific task", () => {
      const columnId = taskManager.columns[0].id;
      const taskId = taskManager.addTask("test-task", columnId);

      const taskLength = taskManager.tasks.length;

      taskManager.deleteTask(taskId);

      expect(taskManager.tasks.length).toBe(taskLength - 1);
      expect(() => taskManager.getTask(taskId)).toThrow("Task not found");
    });
  });
});
