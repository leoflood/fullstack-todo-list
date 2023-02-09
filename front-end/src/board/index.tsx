import { getColumns } from "@/api";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

export default function Board() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getColumns().then((columns) => {
      console.log(columns);
      setData(columns);
    });
  }, []);

  return (
    <div className={styles.board}>
      <div className={styles.instructions}>
        <p>Click to advance a task</p>
        <p>Right click to go back a task</p>
      </div>

      <div className={styles.list}>
        {data.map((column) => (
          <ul key={column._id}>
            <li className={styles.columnTitle}>{column._value}</li>

            {column._tasks.map((task) => (
              <li key={task._id}>{task._value}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
