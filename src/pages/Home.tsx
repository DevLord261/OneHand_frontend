import Hero from "../assets/Hero.jpg";
import CategoryCard from "../componenets/Card";
import styles from "../styles/Home.module.css";
import Medical from "../assets/category/medic.png";
import Technology from "../assets/category/innovation.png";
import Restoring from "../assets/category/restore.png";
import Business from "../assets/category/investment.png";
import CampaignCard from "../componenets/CampaignCard";

function Home() {
  return (
    <>
      <div className={styles.mainhome}>
        {/* <ToolBar /> */}
        <div className={styles.herosection}>
          <div className={styles.textbox}>
            <label className={styles.maintext}>
              A Helping Hand for a Better Tomorrow
            </label>
            <label className={styles.alttext}>
              Launch a fundraiser to support the causes you care about.
            </label>
            <button>Start a Campaign</button>
          </div>
          <img src={Hero} alt="Hero logo"></img>
        </div>
        <div className={styles.categoriesSection}>
          <div className={styles.categtext}>
            <label className={styles.categtitle}>Top Categories</label>
            <div>
              <p className={styles.p}>
                Explore fundraiser in some of the platform's most popular
                categories.
              </p>
              <p className={styles.p}>
                {" "}
                There is more cause you can support - just check them all.
              </p>
            </div>
          </div>
          <a style={{ cursor: "pointer", fontSize: "18px" }}>
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
      </div>
    </>
  );
}

export default Home;
