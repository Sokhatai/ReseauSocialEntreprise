import { useState } from "react";
import axios from "axios";
import { accountService } from "../../_services/account.service";
import FormData from 'form-data';
import { useNavigate } from "react-router";


function App() {
  // state (état, données)
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);


  //const inputRef = useRef();
  let navigate = useNavigate();
  // comportements

  function goToAccueil() {
    navigate("/accueil");
  }

  //gérer l'image télécharger
  const onFileAdded = (event) => {
    const file = (event.target).files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(file);
    };
    reader.readAsDataURL(file);
  }



  const newPost = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', imageUrl);
    console.log(formData.get('message'));
    console.log(formData.get('image'));
    axios
      .post("http://localhost:3000/api/post/", 
        formData
      )
      .then(function (result) {
        goToAccueil();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  axios.interceptors.request.use((request) => {
    if (accountService.isLogged()) {
      request.headers.Authorization = "Bearer " + accountService.getToken();
    }
    return request;
  });


  // affichage (render)
  return (
    <div id="formForm">
      <form action="submit" onSubmit={newPost}>
        <h2>Nouveau Message</h2>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Message"
        />
        <input
          aria-label="Ajouter une image"
          type="file"
          name="file"
          encType=" multipart/form-data "
          onChange={(e) => onFileAdded(e)}
        />
        <div id="reponseServeur"></div>
        <input type="submit" value="envoyer" />
      </form>
    </div>
  );
}

export default App;

// Gestion du formulaire
// 1. création du formulaire
// 2. soumission du formulaire
// 3. collecte des données du formulaires
