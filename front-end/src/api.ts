const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export function getColumns() {
  return fetch(serverUrl + "/columns").then((res) => res.json());
}
