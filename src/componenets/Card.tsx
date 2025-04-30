import styles from "../styles/Card.module.css";

export default function CategoryCard({
  logo,
  name,
}: {
  logo: string;
  name: string;
}) {
  return (
    <>
      <div className={styles.containers}>
        <div className={styles.roundedimg}>
          <img src={logo} alt="image" width={"50px"} />
        </div>
        <p>{name}</p>
      </div>
    </>
  );
}
