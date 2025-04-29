import styles from "../styles/ToolBar.module.css";
import Logo from "../assets/Logo.png";
import Search from "../assets/search.svg";
export default function ToolBar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles["left-toolbar"]}>
          <img
            src={Logo}
            alt="logo"
            style={{ width: "64px", marginTop: "10px" }}
          />
          <div className={styles.enteris}>
            <label> Donater </label>
            <label> Fundraiser </label>
          </div>
        </div>
        <div className={styles["search-box"]}>
          <img src={Search} alt="Search icon" />
          <input type="text" placeholder="Search" />
        </div>
        <div className={styles["right-toolbar"]}>
          <label> About </label>
          <a type="button" href="login">
            Sign In
          </a>
        </div>
      </div>
    </>
  );
}
