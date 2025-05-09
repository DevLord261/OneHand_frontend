import Solar from "../assets/solarenergy.jpg";
import styles from "../styles/CampaignCard.module.css";
import Verified from "../assets/verified.png";
import ProgressBar from "./PrograssBar";

export default function CampaignCard() {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={Solar}
        alt="solar energy"
        loading="lazy"
      />
      <section className={styles.sectioncontainer}>
        <h3 className={styles.title} style={{ paddingLeft: "20px" }}>
          Solar Energy Campaign
        </h3>
        <div className={styles.ProgressBar}>
          <ProgressBar value={75} /> {/* 75% funded */}
        </div>
        <div className={styles.info}>
          <p>$10,000 Raised</p>
          <p>Goal: $20,000</p>
        </div>
        <div className={styles.infocontainer}>
          <div className={styles.verifiedContainer}>
            <img src={Verified} alt="verified badge" />
            <p>Verified</p>
          </div>
          <p>Location: New York</p>
        </div>
      </section>
    </div>
  );
}
