import "../style/header.css";
import logo from "../style/images/icon-left-font-monochrome-white.png";

export default function Header() {
  return (
    <div>
      <img src={logo} alt="logo de l'entreprise grouporama" />
    </div>
  );
}
