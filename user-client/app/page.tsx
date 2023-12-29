"use client";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";
import styles from "@/styles/page/index.module.scss";

type ThemeMode = "light" | "dark";

export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero_section}>
        <h1 className={styles.hero_section__title}>
          Easiest Way to buy ticket Online
        </h1>
        <p className={styles.hero_section__info}>
          We help you to search best Bus, HiAce's vehicles, and buy long
          distance travel tickets online
        </p>
      </section>
    </main>
  );
}
