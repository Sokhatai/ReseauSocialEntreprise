import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { accountService } from "../../_services/account.service";
import "../../style/message.css";
import FormData from 'form-data';


function App() {


  //const inputRef = useRef();

  let navigate = useNavigate();
  // comportements

  function goToAccueil() {
    navigate("/accueil");
  }
  //gérer l'image télécharger




  axios.interceptors.request.use((request) => {
    if (accountService.isLogged()) {
      request.headers.Authorization = "Bearer " + accountService.getToken();
    }
    return request;
  });

// Gestion du formulaire
// 1. création du formulaire
// 2. soumission du formulaire
// 3. collecte des données du formulaires

  // state (état, données)
    // state (état, données)
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    
  //const inputRef = useRef();
  let { id } = useParams();
  // comportements
  const onFileAdded = (event) => {
    const file = (event.target).files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(file);
    };
    reader.readAsDataURL(file);
  }
 
   const modifyPost = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', imageUrl);
    axios
      .put("http://localhost:3000/api/post/"+id, 
        formData
      )
      .then(function (result) {
        goToAccueil();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  function getOnePost() {
    axios
      .get("http://localhost:3000/api/post/" + id)
      .then(function (res) {
        setMessage(res.data.message);
        setImageUrl(res.data.imageUrl);
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  const handleDelete = (id) => {
    console.log(id);
    axios.delete("http://localhost:3000/api/post/" + id)
      .then(function (res) {
      console.log(res);
    })
    .catch( function (err){
      console.log(err);
    })
  };

  axios.interceptors.request.use((request) => {
    if (accountService.isLogged()) {
      request.headers.Authorization = "Bearer " + accountService.getToken();
    }
    return request;
  });

  useEffect(() => {
    getOnePost();
  }, []);
  // affichage (render)

  // affichage (render)
  return (
    <div id="formForm">
      <form action="submit" onSubmit={modifyPost}>
        <h2>Modifier Message</h2>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Message"
        />
        <input
          type="file"
          name="file"
          encType=" multipart/form-data "
          onChange={(e) => onFileAdded(e)}
        />
        <div id="reponseServeur"></div>
        <input type="submit" value="Modifier" />
        <button onClick={() => handleDelete(id)}> Supprimer </button>
      </form>

    </div>
  );
}

export default App;

// Gestion du formulaire
// 1. création du formulaire
// 2. soumission du formulaire
// 3. collecte des données du formulaires
