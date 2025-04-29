import styles from "../styles/Card.module.css";
import test from "../assets/category/medical.svg";
export default function CategoryCard() {
  return (
    <>
      <div className={styles.containers}>
        <img src={test} alt="image" />
        <p>Medical</p>
      </div>
    </>
  );
}
