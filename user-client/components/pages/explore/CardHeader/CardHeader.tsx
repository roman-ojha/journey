import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getCssVariable from "@/lib/getCssVariable";
import styles from "@/styles/page/explore/cardHeader.module.scss";
import ChangeCardLayout from "./ChangeCardLayout";

const CardHeader = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <div className={styles.short_by_container}>
        <p>Sort By</p>
        <Select>
          <SelectTrigger
            className="w-[180px]"
            style={{
              borderColor: getCssVariable("--clr-container-border"),
              borderRadius: "12px",
              backgroundColor: "transparent",
              fontWeight: "bold",
            }}
          >
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating" defaultChecked>
              Rating
            </SelectItem>
            <SelectItem value="duration">Duration Time</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className={styles.title}>9 Vehicle Found</p>
      <ChangeCardLayout />
    </section>
  );
};

export default CardHeader;
