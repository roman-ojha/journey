import { APPLICATION_NAME } from "@/data/constants";
import { Metadata } from "next";
import styles from "@/styles/page/explore/index.module.scss";
import MainExplore from "./_components/Main.tsx";

export const metadata: Metadata = {
  title: `Explore | ${APPLICATION_NAME}`,
};

const Explore = (): React.JSX.Element => {
  return (
    <main className={styles.explore_page}>
      <MainExplore />
    </main>
  );
};

export default Explore;
