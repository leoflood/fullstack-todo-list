import { getColumns, updateTask } from "@/api";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

interface ITask {
  _id: string;
  _value: string;
}

interface IColumn {
  _id: string;
  _value: string;
  _tasks: ITask[]
}

export default function Board() {
  const [data, setData] = useState<IColumn[]>([]);
  const [taskToEdit, setTaskToEdit] = useState("");
  const [taskToEditValue, setTaskToEditValue] = useState("");

  useEffect(() => {
    getColumns().then((columns) => {
      setData(columns);
    });
  }, []);

  const onTaskClick = (taskId: string, value: string) => {
    setTaskToEdit(taskId);
    setTaskToEditValue(value);
  };

  const onTaskValueChange = (value: string) => {
    setTaskToEditValue(value);
  };

  const onTaskBlur = async (taskId: string, value: string) => {
    setTaskToEdit("");
    await updateTask(taskId, value);
    const columns = await getColumns();
    setData(columns);
  };

  return (
    <div className={styles.board}>
      <div className={styles.instructions}>
        <p>Click to advance a task</p>
        <p>Right click to go back a task</p>
      </div>

      <div className={styles.list}>
        {data.map((column: IColumn) => (
          <ul key={column._id}>
            <li className={styles.columnTitle}>{column._value}</li>

            {column._tasks.map((task) =>
              taskToEdit !== task._id ? (
                <li
                  key={task._id}
                  onClick={() => onTaskClick(task._id, task._value)}
                >
                  {task._value}
                </li>
              ) : (
                <li key={task._id}>
                  <input
                    value={taskToEditValue}
                    onBlur={() => onTaskBlur(task._id, taskToEditValue)}
                    onChange={(e) => onTaskValueChange(e.target.value)}
                  />
                </li>
              )
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}
