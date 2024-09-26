import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import getDecks from "./api/getDecks";
import createDeck from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";

type TDeck = {
  _id: string;
  title: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();

    await createDeck(title).then((data) => {
      setDecks([...decks, data]);
      setTitle("");
    });

    // console.log(data);
  };

  useEffect(() => {
    getDecks().then((data) => {
      setDecks(data);
      console.log(" this is new get decks: " + data);
    });

    // (async() => {
    //   await fetch("http://localhost:5088/decks");
    // })();
  }, []);

  const handleDeleteDeck = async (id: string) => {
    deleteDeck(id);
    setDecks(decks.filter((deck) => deck._id !== id));
  };

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}> X</button>
            <Link to={`/decks/${deck._id}`}> {deck.title}</Link>

            {/* {deck.title} */}
          </li>
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
