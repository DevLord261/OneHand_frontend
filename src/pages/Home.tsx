// import ToolBar from "../componenets/ToolBar";
import styles from "../styles/Home.module.css";
import Hero from "../assets/Hero.jpg";
import CategoryCard from "../componenets/Card";
import Medical from "../assets/category/medic.png";
import Technology from "../assets/category/innovation.png";
import Restoring from "../assets/category/restore.png";
import Business from "../assets/category/investment.png";
import CampaignCard from "../componenets/CampaignCard";

function NewHome() {
  return (
    <div className={styles.container}>
      <nav>{/* <ToolBar /> */}</nav>
      <main className={styles.container}>
        <div className={styles.herosection}>
          <picture>
            <source srcSet="Hero.webp" type="image/webp" />
            <img
              className={styles.herologo}
              src={Hero}
              alt="Hero logo"
              rel="preload"
            ></img>
          </picture>
          <div className={styles.textbox}>
            <label className={styles.maintext}>
              A Helping Hand for a Better Tomorrow
            </label>
            <label className={styles.alttext}>
              Launch a fundraiser to support the causes you care about.
            </label>
            <button>Start a Campaign</button>
          </div>
        </div>
        {/* caregory section */}
        <div className={styles.categoriesSection}>
          <div className={styles.categtext}>
            <label className={styles.categtitle}>Top Categories</label>
            <div>
              <p>
                Explore fundraiser in some of the platform's most popular
                categories.
              </p>
              <p> There is more cause you can support - just check them all.</p>
            </div>
          </div>
          <a
            style={{
              cursor: "pointer",
              fontSize: "18px",
              height: "fit-content",
            }}
          >
            See all categories
          </a>
        </div>
        <div className={styles.categorycontainer}>
          <CategoryCard logo={Medical} name="Medical" />
          <CategoryCard logo={Business} name="Business" />
          <CategoryCard logo={Technology} name="Technology" />
          <CategoryCard logo={Restoring} name="Rebuild & Recover" />
        </div>
        <div className={styles.Categcontainer}>
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
        </div>
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default NewHome;
