import styles from "~/styles/CampaignCard.module.css";
import ProgressBar from "./PrograssBar";
import { Campaign } from "~/types/campaign";

const Verified = "/assets/verified.png";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={`data:image/jpeg;base64,${campaign.base64image}`}
        alt="solar energy"
        loading="lazy"
      />
      <section className={styles.sectioncontainer}>
        <h3 className={styles.title} style={{ paddingLeft: "20px" }}>
          {campaign.title}
        </h3>
        <div className={styles.ProgressBar}>
          <ProgressBar value={75} /> {/* 75% funded */}
        </div>
        <div className={styles.info}>
          <p>$10,000 Raised</p>
          <p>Goal: ${campaign.donationGoal}</p>
        </div>
        <div className={styles.infocontainer}>
          <div className={styles.verifiedContainer}>
            <img src={Verified} alt="verified badge" />
            <p>Verified</p>
          </div>
          <p>Location: {campaign.location}</p>
        </div>
      </section>
    </div>
  );
}
