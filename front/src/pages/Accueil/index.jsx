import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AffichagePost from "../../components/AffichagePost";
import "../../style/app.css";
import { accountService } from "../../_services/account.service";
function App() {
  // state (état, données)
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  //const inputRef = useRef();

  // comportements
  function getPosts() {
    axios
      .get("http://localhost:3000/api/post")
      .then(function (res) {
        setPosts(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function getUser() {
    axios
      .get("http://localhost:3000/api/auth")
      .then(function (res) {
        setUser(res.data);
      })
      .catch(function (err) {
        console.log(err);
      }); 
  }

  const like = (id, value) => {
    axios.post(`http://localhost:3000/api/post/${id}/like`, {
      like : value
    })
    .then(function (res) {
      console.log(res.data.message);
      getPosts()
    })
    .catch(function (err) {
      console.log(err);
      console.log("brrr");
    });
  }

  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/api/post/" + id)
    .then(function (res) {
      getPosts()
    })
  };

  axios.interceptors.request.use((request) => {
    if (accountService.isLogged()) {
      request.headers.Authorization = "Bearer " + accountService.getToken();
    }
    return request;
  });

  useEffect(() => {
    getPosts();
    getUser();
  }, []);



  // affichage (render)
  return (
    <div>
      <ul>
        {posts.map((post) => {
          return <AffichagePost post={post} user={user} handleDelete={handleDelete} like={like} />;
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
