import Hero from "../assets/Hero.jpg";
import CategoryCard from "../componenets/Card";
import styles from "../styles/Home.module.css";

function Home() {
  const categories = [
    { title: "Medical", key: "medical" },
    { title: "business", key: "business" },
    { title: "Design", key: "design" },
    { title: "Restoring", key: "restore" },
    { title: "School", key: "school" },
    { title: "Technology", key: "technology" },
  ];

  const half = Math.ceil(categories.length / 2);
  const firsthalf = categories.slice(0, half);
  const secondhalf = categories.slice(half);
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
          <a style={{ cursor: "pointer" }}>see all categories</a>
        </div>
        <div className={styles.categorycontainer}>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>
    </>
  );
}

export default Home;
