import "../style/header.css";
import logo from "../style/images/icon-left-font-monochrome-white.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { accountService } from "../_services/account.service";

export default function Header() {
  let navigate = useNavigate();

  const Logout = () => {
    accountService.logout();
    navigate("/");
  };

  return (
    <div>
      <img id="logo" src={logo} alt="logo de l'entreprise grouporama" />
      <button onClick={Logout} id="logout">Se déconnecter</button>
      <h2 className="headerNav">
        <Link to="/newPost">message</Link>
      </h2>
      <h2 className="headerNav">
        <Link to="/Accueil">Accueil</Link>
      </h2>
    </div>
  );
}
