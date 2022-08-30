export default function AffichagePost({ handleDelete, messageInfo }) {
  return (
    <li key={messageInfo.id}>
      From {messageInfo.userId} {messageInfo.message}
      {"  "}
      <span>{messageInfo.like} </span>️ ❤️
      <button onClick={() => handleDelete(messageInfo.id)}>Supprimer</button>
    </li>
  );
}
