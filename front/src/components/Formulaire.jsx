import { useState } from "react";
import "../style/formulaire.css";

export default function Formulaire({
  fonctionDuFormulaire,
  actionDuFormulaire,
  nomDuFormulaire,
  email,
  setEmail,
  password,
  setPassword
}) {
  //state

  //comportements

  //affichage (render)

  return (
    <div id="formForm">
      <form action="submit" onSubmit={fonctionDuFormulaire}>
        <h2>{nomDuFormulaire}</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="EMail"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Mot de passe"
        />
        <div id="reponseServeur"></div>
        <input type="submit" value={actionDuFormulaire} />
      </form>
    </div>
  );
}
