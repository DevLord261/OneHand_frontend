import styles from "../styles/ViewCampaign.module.css";

export default function Campaign() {
  return (
    <main className={styles.container}>
      <section className={styles.mainimage}>
        <img src="/main.webp" alt="main image" />

        <section>
          <section>Organizer</section>
          <div>Title</div>
          <section>
            <div>Heading 1</div>
            <div>Description</div>
            <div>Heading 2</div>
            <div>Description</div>
            <div>Heading 3</div>
            <div>Description</div>
          </section>
        </section>
      </section>
      <section className={styles.dontaion}></section>
    </main>
  );
}
