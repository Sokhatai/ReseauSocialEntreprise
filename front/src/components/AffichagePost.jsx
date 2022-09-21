import { useHref, useNavigate } from "react-router";
import "../style/message.css";
import axios from "axios";
import { accountService } from "../_services/account.service";


export default function AffichagePost({ post, user, handleDelete, like }) {

  let navigate = useNavigate();

  function modifMessage() {
    navigate("/post/" + post._id);
  }

  function imagePart(){
    if (post.imageUrl){
    return <div id ="imagePost"><img id="imageInPost" src={post.imageUrl}/> <br /></div>
  }
}

  function modifDeletePart(){
    if (post.userId == user._id || user.admin)
      return <div><a onClick={() => modifMessage()}>modifier</a>
      <button onClick={() => handleDelete(post._id)}> X </button></div>
  }

  function notLiked(){
    return <div>
    <span>{post.likes} </span>  
    <button id="likeButton" onClick={() => like(post._id, 1)}>
    {" "}
    🤍
  </button>
  </div>
  }

  function liked(){
    return <div>
    <span>{post.likes} </span>  
    <button id="likeButton" onClick={() => like(post._id, 0)}>
    {" "}
    ❤️️
  </button>
  </div>
  }

  function likePart(whoLiked){
    if (whoLiked.indexOf(user._id) == -1){
      return notLiked();
    }
    return liked();

  }

  axios.interceptors.request.use((request) => {
    if (accountService.isLogged()) {
      request.headers.Authorization = "Bearer " + accountService.getToken();
    }
    return request;
  });


  return (
    <li key={post._id}>
      <span id="messageCreator">
        {post.email} : <br />
      </span>{" "}
      {post.message}
      {"  "} <br />
      {imagePart()}
      <div id ="likeZone">

      </div>
      {likePart(post.usersLiked)}
      {modifDeletePart()}
    </li>
  );
}
