import {
  createTask,
  deleteTask,
  getColumns,
  getTasks,
  updateTask,
} from "@/api";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

interface ITask {
  id: number;
  taskName: string;
  columnId: number;
}

interface IColumn {
  id: number;
  columnName: string;
  tasks?: ITask[];
}

export default function Board() {
  const [data, setData] = useState<IColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState<null | number>(null);
  const [taskToEditValue, setTaskToEditValue] = useState("");

  const [taskToAddMap, setTaskToAddMap] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [columns, tasks] = await Promise.all([getColumns(), getTasks()]);

    columns.forEach((col: IColumn) => {
      col.tasks = [];
      tasks.forEach((tas: ITask) => {
        if (tas.columnId === col.id && col.tasks) {
          col.tasks.push(tas);
        }
      });
    });

    setData(columns);
    setLoading(false);
  };

  const onTaskToAddKeyPress = (e: any, columnId: number) => {
    if (e.key === "Enter" && taskToAddMap[columnId].length) {
      onCreateTask(taskToAddMap[columnId], columnId);
    }
  };

  const onCreateTask = async (value: string, columnId: number) => {
    taskToAddMap[columnId] = "";
    setTaskToAddMap({ ...taskToAddMap });
    await createTask(value, columnId);
    await fetchData();
  };

  const onTaskClick = (taskId: number, value: string) => {
    setTaskToEdit(taskId);
    setTaskToEditValue(value);
  };

  const onTaskValueChange = (value: string) => {
    setTaskToEditValue(value);
  };

  const onTaskToEditKeyPress = async (
    e: any,
    columnId: number,
    taskId: number,
    value: string
  ) => {
    if (e.key !== "Enter") {
      return;
    }

    if (!taskToEditValue.length) {
      return;
    }

    setTaskToEdit(null);
    await updateTask(taskId, columnId, value);
    await fetchData();
  };

  const onDeleteTask = async (taskId: number) => {
    setTaskToEdit(null);
    await deleteTask(taskId);
    await fetchData();
  };

  const onTaskToAddChange = (newValue: string, columnId: number) => {
    taskToAddMap[columnId] = newValue;
    setTaskToAddMap({ ...taskToAddMap });
  };

  const onMoveTask = async (
    direction: string,
    columnId: number,
    taskId: number
  ) => {
    const column = data.find((c) => c.id === columnId);

    if (!column) {
      return;
    }

    const columnIndex = data.indexOf(column);

    let columnIdToMove;

    switch (direction) {
      case "left": {
        if (columnIndex <= 0) return;
        columnIdToMove = data[columnIndex - 1].id;
        break;
      }

      case "right": {
        if (columnIndex >= data.length - 1) return;
        columnIdToMove = data[columnIndex + 1].id;
        break;
      }
    }

    if (!columnIdToMove) return;

    await updateTask(taskId, columnIdToMove);
    await fetchData();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.board}>
      <div className={styles.instructions}>
        <h2>To-do List</h2>
      </div>

      <div className={styles.list}>
        {data.map((column: IColumn) => (
          <ul className={styles.column} key={column.id}>
            <li className={styles.columnTitle}>{column.columnName}</li>

            {column.tasks && column.tasks.map((task) =>
              taskToEdit !== task.id ? (
                <li
                  className={styles.task}
                  key={task.id}
                  onClick={() => onTaskClick(task.id, task.taskName)}
                >
                  {task.taskName}
                </li>
              ) : (
                <li className={styles.task} key={task.id}>
                  <input
                    placeholder="Edit task"
                    value={taskToEditValue}
                    onBlur={() => setTaskToEdit(null)}
                    onChange={(e) => onTaskValueChange(e.target.value)}
                    onKeyPress={(e) =>
                      onTaskToEditKeyPress(
                        e,
                        column.id,
                        task.id,
                        taskToEditValue
                      )
                    }
                  />

                  <div className={styles.taskActions}>
                    <div>
                      <button
                        onClick={() => onMoveTask("left", column.id, task.id)}
                      >
                        ←
                      </button>
                      <button
                        onClick={() => onMoveTask("right", column.id, task.id)}
                      >
                        →
                      </button>
                    </div>

                    <button onClick={() => onDeleteTask(task.id)}>X</button>
                  </div>
                </li>
              )
            )}

            <li>
              <input
                placeholder="Add a task"
                value={taskToAddMap[column.id] || ""}
                onChange={(e) => onTaskToAddChange(e.target.value, column.id)}
                onKeyPress={(e) => onTaskToAddKeyPress(e, column.id)}
              />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
