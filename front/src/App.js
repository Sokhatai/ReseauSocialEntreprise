import { useRef, useState } from "react";
import AffichagePost from "./components/AffichagePost";
import Formulaire from "./components/Formulaire";
import Header from "./components/Header";
import "./style/app.css";

function App() {
  // state (état, données)
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Je suis bientot à la retraite, like si tu aimes",
      userId: "Corentin",
      like: 100
    },
    {
      id: 2,
      message: "Qui à des infos sur le prochain projet?",
      userId: "Mysterea",
      like: 24
    },
    {
      id: 3,
      message:
        "N'oubliez pas de faire des composants réutilisable pour le projet",
      userId: "Openclassrooms",
      like: 1
    }
  ]);
  //const inputRef = useRef();

  // comportements

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(inputRef.current.value);
  };

  const handleDelete = (id) => {
    // 1 copie du state
    const messagesCopy = [...messages];

    // 2 modifier la copie
    const messagesCopyUpdated = messagesCopy.filter((fruit) => fruit.id !== id);

    // 3 modifier le state avec le setter
    setMessages(messagesCopyUpdated);
  };

  // affichage (render)
  return (
    <div>
      <Header />
      <Formulaire
        handleSubmit={handleSubmit}
        actionDuFormulaire={"se connecter"}
        nomDuFormulaire={"connection"}
      />
      <Formulaire
        handleSubmit={handleSubmit}
        actionDuFormulaire={"s'inscrire"}
        nomDuFormulaire={"inscription"}
      />

      <h2>Message Test</h2>
      <ul>
        {messages.map((message) => {
          return (
            <AffichagePost handleDelete={handleDelete} messageInfo={message} />
          );
        })}
      </ul>
    </div>
  );
}

export default App;

// Gestion du formulaire
// 1. création du formulaire
// 2. soumission du formulaire
// 3. collecte des données du formulaires
