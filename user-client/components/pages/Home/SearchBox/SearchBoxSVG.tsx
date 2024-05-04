import Image from "next/image";
import SearchingSVG from "@/assets/svg/searching.svg";
import styles from "@/styles/page/home/searchBox.module.scss";

const SearchBoxSVG = () => {
  return (
    <>
      <Image src={SearchingSVG} alt="searching" className={styles.image} />
      <div className={styles.container__divider}></div>
    </>
  );
};

export default SearchBoxSVG;
