import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // if you're using react-router
import styles from "~/styles/ToolBar.module.css";
import Logo from "/assets/Logo.png";
import SearchIcon from "/assets/search.svg";

export default function ToolBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <Link to="/campaigns" className={styles.link}>
          Campaigns
        </Link>
      </div>

      <div className={styles.search}>
        <img src={SearchIcon} alt="Search" />
        <input type="text" placeholder="Search campaigns..." />
      </div>

      <div className={styles.right}>
        <Link to="/wishlist" className={styles.link}>
          Wishlist
        </Link>
        {isLoggedIn ? (
          <Link to="/profile" className={styles.button}>
            Profile
          </Link>
        ) : (
          <Link to="/auth" className={styles.button}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
