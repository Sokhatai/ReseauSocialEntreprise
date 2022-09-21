import { useRef, useState } from "react";
import Formulaire from "../../components/Formulaire";
import "../../style/app.css";

function App() {
  // state (état, données)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const inputRef = useRef();

  // comportements

  const signup = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(function (res) {
        console.log(res);
        return res.json();
      })
      .then(function (result) {
        if (result.message)
          document.getElementById("reponseServeur").innerHTML = result.message;
        else
          document.getElementById("reponseServeur").innerHTML =
            "erreur lors de la création peut être avez vous déjà un compte?";
      })
      .catch(function (err) {
        alert(err);
        console.log(err);
      });
  };

  // affichage (render)
  return (
    <div>
      <Formulaire
        fonctionDuFormulaire={signup}
        actionDuFormulaire={"S'inscrire"}
        nomDuFormulaire={"Inscription"}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
}

export default App;

// Gestion du formulaire
// 1. création du formulaire
// 2. soumission du formulaire
// 3. collecte des données du formulaires
