// import ToolBar from "../componenets/ToolBar";
import styles from "../styles/Home.module.css";
import Hero from "../assets/Hero.jpg";
import CategoryCard from "../componenets/Card";
import Medical from "../assets/category/medic.png";
import Technology from "../assets/category/innovation.png";
import Restoring from "../assets/category/restore.png";
import Business from "../assets/category/investment.png";
import CampaignCard from "../componenets/CampaignCard";
import { useNavigate } from "react-router-dom";

function NewHome() {
  const naviage = useNavigate();
  return (
    <div className={styles.container}>
      <nav>{/* <ToolBar /> */}</nav>
      <main className={styles.container}>
        {/* Hero section */}
        <section className={styles.herosection}>
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
            <button type="button" onClick={() => naviage("/login")}>
              Start a Campaign
            </button>
          </div>
        </section>
        {/* caregory section */}
        <section className={styles.categoriesSection}>
          <div className={styles.categtext}>
            <h2 className={styles.categtitle}>Top Categories</h2>
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
        </section>
        {/* categoryContainer */}
        <section className={styles.categoryScrollWrapper}>
          <div className={styles.categorycontainer}>
            <CategoryCard logo={Medical} name="Medical" />
            <CategoryCard logo={Business} name="Business" />
            <CategoryCard logo={Technology} name="Technology" />
            <CategoryCard logo={Restoring} name="Rebuild & Recover" />
          </div>
        </section>
        <section className={styles.Categcontainer}>
          <h1>Featured Campaigns</h1>
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
        </section>
        <section className={styles.trustworthy}>
          <h3>Fundraising on OneHand is easy, powerful, and trusted.</h3>
          <p>
            Get what you need to help your fundraiser succeed on OneHand,
            whether you’re raising money for yourself, friends, family, or
            charity. OneHand is a trusted leader in online fundraising. With
            simple pricing and a team of Trust & Safety experts in your corner,
            you can raise money or make a donation with peace of mind. memorial
            tributes and funerals to medical emergencies and nonprofits.
            Whenever you need help, you can ask here.
          </p>
        </section>
      </main>
      <footer>
        <p>© 2025 OneHand</p>
        <a>Terms</a> <a>Privacy</a> <a>Notice</a> <a>Legal</a>
        <a>Accessibility</a> <a>Statement</a> <a>Cookie</a> <a>Policy</a>
      </footer>
    </div>
  );
}

export default NewHome;
