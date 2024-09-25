import { useEffect, useState } from "react";
import "./App.css";

type TDeck = {
  _id: string;
  title: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5088/deck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5088/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
      console.log(newDecks);
    }
    fetchDecks();

    // (async() => {
    //   await fetch("http://localhost:5088/decks");
    // })();
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>{deck.title}</li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
