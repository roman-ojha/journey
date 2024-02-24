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

const ProfileCardHeaders = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <div className={styles.short_by_container}>
        <p>Filter:</p>
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
            <SelectValue placeholder="Active" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active" defaultChecked>
              Active
            </SelectItem>
            <SelectItem value="inAcive">InActive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className={styles.title}>Booked Seats Vehicles</p>
      <ChangeCardLayout />
    </section>
  );
};

export default ProfileCardHeaders;
