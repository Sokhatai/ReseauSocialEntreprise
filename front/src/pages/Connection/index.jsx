import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Formulaire from "../../components/Formulaire";
import "../../style/app.css";
import { accountService } from "../../_services/account.service";

function App() {
  // state (état, données)

  //const inputRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // comportements
  let navigate = useNavigate();

  function goToAccueil() {
    navigate("/accueil");
  }

  const login = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/auth/login", {
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
        return res.json();
      })
      .then(function (result) {
        if (result.message)
          document.getElementById("reponseServeur").innerHTML = result.message;
        else {
          console.log(result);
          accountService.saveToken(result.token, result.userId, email);
          goToAccueil();
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // affichage (render)
  return (
    <div>
      <Formulaire
        fonctionDuFormulaire={login}
        actionDuFormulaire={"se connecter"}
        nomDuFormulaire={"connection"}
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
