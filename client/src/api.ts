export function graphqlFetch(data: string) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: `{ ${data} }`})
  })
    .then(r => r.json())
}