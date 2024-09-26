export default async function createDeck(title: string) {
  const response = await fetch("http://localhost:5088/deck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });

  return response.json();
}
