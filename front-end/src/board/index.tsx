import { createTask, deleteTask, getColumns, updateTask } from "@/api";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

interface ITask {
  _id: string;
  _value: string;
}

interface IColumn {
  _id: string;
  _value: string;
  _tasks: ITask[];
}

export default function Board() {
  const [data, setData] = useState<IColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState("");
  const [taskToEditValue, setTaskToEditValue] = useState("");

  const [taskToAddMap, setTaskToAddMap] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    setLoading(true);
    const columns = await getColumns();
    setData(columns);
    setLoading(false);
  };

  const onTaskToAddKeyPress = (e: any, columnId: string) => {
    if (e.key === "Enter" && taskToAddMap[columnId].length) {
      onCreateTask(taskToAddMap[columnId], columnId);
    }
  };

  const onCreateTask = async (value: string, columnId: string) => {
    taskToAddMap[columnId] = "";
    setTaskToAddMap({ ...taskToAddMap });
    await createTask(value, columnId);
    await fetchColumns();
  };

  const onTaskClick = (taskId: string, value: string) => {
    setTaskToEdit(taskId);
    setTaskToEditValue(value);
  };

  const onTaskValueChange = (value: string) => {
    setTaskToEditValue(value);
  };

  const onTaskToEditKeyPress = async (
    e: any,
    columnId: string,
    taskId: string,
    value: string
  ) => {
    if (e.key !== "Enter") {
      return;
    }

    if (!taskToEditValue.length) {
      return;
    }

    setTaskToEdit("");
    await updateTask(taskId, columnId, value);
    await fetchColumns();
  };

  const onDeleteTask = async (taskId: string) => {
    setTaskToEdit("");
    await deleteTask(taskId);
    await fetchColumns();
  };

  const onTaskToAddChange = (newValue: string, columnId: string) => {
    taskToAddMap[columnId] = newValue;
    setTaskToAddMap({ ...taskToAddMap });
  };

  const onMoveTask = async (
    direction: string,
    columnId: string,
    taskId: string
  ) => {
    const column = data.find((c) => c._id === columnId);

    if (!column) {
      return;
    }

    const columnIndex = data.indexOf(column);

    let columnIdToMove;

    switch (direction) {
      case "left": {
        if (columnIndex <= 0) return;
        columnIdToMove = data[columnIndex - 1]._id;
        break;
      }

      case "right": {
        if (columnIndex >= data.length - 1) return;
        columnIdToMove = data[columnIndex + 1]._id;
        break;
      }
    }

    if (!columnIdToMove) return;

    await updateTask(taskId, columnIdToMove, "");
    await fetchColumns();
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className={styles.board}>
      <div className={styles.instructions}>
        <h2>To-do List</h2>
      </div>

      <div className={styles.list}>
        {data.map((column: IColumn) => (
          <ul key={column._id}>
            <li className={styles.columnTitle}>{column._value}</li>

            {column._tasks.map((task) =>
              taskToEdit !== task._id ? (
                <li
                  className={styles.task}
                  key={task._id}
                  onClick={() => onTaskClick(task._id, task._value)}
                >
                  {task._value}
                </li>
              ) : (
                <li className={styles.task} key={task._id}>
                  <input
                    placeholder="Edit task"
                    value={taskToEditValue}
                    onBlur={() => setTaskToEdit("")}
                    onChange={(e) => onTaskValueChange(e.target.value)}
                    onKeyPress={(e) =>
                      onTaskToEditKeyPress(
                        e,
                        column._id,
                        task._id,
                        taskToEditValue
                      )
                    }
                  />

                  <div className={styles.taskActions}>
                    <div>
                      <button
                        onClick={() => onMoveTask("left", column._id, task._id)}
                      >
                        ←
                      </button>
                      <button
                        onClick={() =>
                          onMoveTask("right", column._id, task._id)
                        }
                      >
                        →
                      </button>
                    </div>

                    <button onClick={() => onDeleteTask(task._id)}>X</button>
                  </div>
                </li>
              )
            )}

            <li>
              <input
                placeholder="Add a task"
                value={taskToAddMap[column._id] || ""}
                onChange={(e) => onTaskToAddChange(e.target.value, column._id)}
                onKeyPress={(e) => onTaskToAddKeyPress(e, column._id)}
              />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
