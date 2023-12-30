"use client";
import Button from "@/components/Button";
import { APPLICATION_NAME } from "@/constants";
import styles from "@/styles/page/index.module.scss";
import { Metadata } from "next";
import { Icon } from "@iconify/react";

// export const metadata: Metadata = {
//   title: APPLICATION_NAME,
// };

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
          <Button backgroundColor="primary" width="content-width">
            Search Vehicles
            <Icon icon="icon-park-outline:down-c" />
          </Button>
          <Button
            backgroundColor="transparent"
            width="content-width"
            href="/explore"
            border
          >
            Explore Vehicles
            <Icon icon="icon-park-outline:right-c" />
          </Button>
        </div>
      </section>
    </main>
  );
}
