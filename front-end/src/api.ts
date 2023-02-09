const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export function getColumns() {
  return fetch(serverUrl + "/columns").then((res) => res.json());
}

export function createTask(value: string, columnId: string) {
  return fetch(serverUrl + "/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value,
      columnId,
    }),
  }).then((res) => res.json());
}

export function updateTask(taskId: string, columnId: string, value: string) {
  return fetch(serverUrl + "/task", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId,
      columnId,
      value,
    }),
  }).then((res) => res.json());
}

export function deleteTask(taskId: string) {
  return fetch(serverUrl + "/task", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId,
    }),
  }).then((res) => res.json());
}
