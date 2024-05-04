import HeroButtons from "@/components/pages/Home/HeroButtons";
import SearchBox from "@/components/pages/Home/SearchBox/SearchBox";
import { APPLICATION_NAME } from "@/data/constants";
import styles from "@/styles/page/home/index.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: APPLICATION_NAME,
};

export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero_section}>
        <div className={styles.hero_section__heading}>
          <h1 className={styles.hero_section__heading__title}>
            Easiest Way to buy ticket Online
          </h1>
          <p className={styles.hero_section__heading__info}>
            We help you to search best Bus, HiAce&apos;s vehicles, and buy long
            distance travel tickets online
          </p>
        </div>
        <div className={styles.buttons_container}>
          <HeroButtons />
        </div>
      </section>
      <SearchBox />
    </main>
  );
}
