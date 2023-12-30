import { APPLICATION_NAME } from "@/constants";
import styles from "@/styles/page/index.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: APPLICATION_NAME,
};

export default function Home() {
  return (
    <main className={styles.home}>
      {/* <div>

    </div> */}
      <section className={styles.hero_section}>
        <h1 className={styles.hero_section__title}>
          Easiest Way to buy ticket Online
        </h1>
        <p className={styles.hero_section__info}>
          We help you to search best Bus, HiAce&apos;s vehicles, and buy long
          distance travel tickets online
        </p>
      </section>
    </main>
  );
}
