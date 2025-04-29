import "../styles/ToolBar.css";
import Logo from "../assets/Logo.png";
import Search from "../assets/search.svg";
export default function ToolBar() {
  return (
    <>
      <div className="container">
        <div className="left-toolbar">
          <img
            src={Logo}
            alt="logo"
            style={{ width: "64px", marginTop: "10px" }}
          />
          <div className="enteris">
            <label> Donater </label>
            <label> Fundraiser </label>
          </div>
        </div>
        <div className="search-box">
          <img src={Search} alt="Search icon" />
          <input type="text" placeholder="Search" />
        </div>
        <div className="right-toolbar">
          <label> About </label>
          <a type="button" href="login">
            Sign In
          </a>
        </div>
      </div>
    </>
  );
}
