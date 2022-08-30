import "../style/formulaire.css";

export default function Formulaire({
  handleSubmit,
  actionDuFormulaire,
  nomDuFormulaire
}) {
  //state

  //comportements

  //affichage (render)

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <h2>{nomDuFormulaire}</h2>
      <input type="text" placeholder="EMail" />

      <input type="text" placeholder="Mot de passe" />

      <button action="submit">{actionDuFormulaire}</button>
    </form>
  );
}
