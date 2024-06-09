import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt=""></img>
      </Link>
      <img className="profile" src={assets.profile_image} alt=""></img>
    </div>
  );
}

export default Navbar;
