import Solar from "../assets/solarenergy.jpg";
import styles from "../styles/CampaignCard.module.css";
export default function CampaignCard() {
  return (
    <div className={styles.container}>
      <img src={Solar} alt="solar energy" width={"450px"} height={"200px"} />
    </div>
  );
}
