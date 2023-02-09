const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export function getColumns() {
  return fetch(serverUrl + "/columns").then((res) => res.json());
}

export function updateTask(taskId: string, value: string) {
  return fetch(serverUrl + "/task", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId,
      value,
    }),
  }).then((res) => res.json());
}
