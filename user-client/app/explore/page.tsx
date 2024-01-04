import HorizontalSearchBox from "@/components/HorizontalSearchBox/HorizontalSearchBox";
import { APPLICATION_NAME } from "@/data/constants";
import { Metadata } from "next";
import styles from "@/styles/page/explore/index.module.scss";
import CardHeader from "@/components/pages/explore/CardHeader/CardHeader";

export const metadata: Metadata = {
  title: `Explore | ${APPLICATION_NAME}`,
};

const Explore = (): React.JSX.Element => {
  return (
    <main className={styles.explore_page}>
      <HorizontalSearchBox />
      <CardHeader />
      <div className={styles.card_and_filter}></div>
    </main>
  );
};

export default Explore;
