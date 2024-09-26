export default async function getDecks() {
  const response = await fetch("http://localhost:5088/decks");
  return response.json();
}
