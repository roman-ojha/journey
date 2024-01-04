import HorizontalSearchBox from "@/components/HorizontalSearchBox/HorizontalSearchBox";
import { APPLICATION_NAME } from "@/data/constants";
import { Metadata } from "next";
import styles from "@/styles/page/explore.module.scss";
import CardHeader from "@/components/pages/explore/CardHeader";

export const metadata: Metadata = {
  title: `Explore | ${APPLICATION_NAME}`,
};

const Explore = (): React.JSX.Element => {
  return (
    <main className={styles.explore_page}>
      <HorizontalSearchBox />
      <CardHeader />
    </main>
  );
};

export default Explore;
