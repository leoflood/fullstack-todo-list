import "./App.css";

const data = [
  { id: 1, columnName: "To do", tasks: ["asdas", "sadas", "sadasd"] },
  { id: 2, columnName: "In progress", tasks: [] },
  { id: 3, columnName: "Done", tasks: ["sadas", "sadasd"] },
];

function App() {
  return (
    <div className="App">
      <p>Click to advance a task</p>
      <p>Right click to go back a task</p>

      <div style={{ display: "flex" }}>
        {data.map((column) => (
          <ul key={column.id}>
            {column.columnName}
            {column.tasks.map((task) => (
              <li>{task}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
