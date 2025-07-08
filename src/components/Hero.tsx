import styles from "./styles/hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        src="/ocean.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.head}>Elevate how you hydrate</div>
        <div className={styles.subhead}>
          Pure RO water enriched with minerals, sustainably packaged.
        </div>
      </div>
    </section>
  );
}
