import SearchBoxSVG from "./SearchBoxSVG";
import SearchBoxForm from "./SearchBoxForm/SearchBoxForm";
import styles from "@/styles/page/home/searchBox.module.scss";

const SearchBox = (): React.JSX.Element => {
  return (
    <div className={styles.container} id="search-box">
      <SearchBoxSVG />
      <SearchBoxForm />
    </div>
  );
};

export default SearchBox;
