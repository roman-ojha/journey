import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AppIcon from "./appIcon/AppIcon";
import styles from "@/styles/components/rateVehicle.module.scss";
import { Textarea } from "./ui/textarea";

function RatedStars({ rating }: { rating: number }) {
  return <></>;
}

export function RateVehicle() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className={styles.vehicle_info_rate_vehicle}>
          <AppIcon
            iconName="typcn:star-outline"
            use="iconify"
            className={styles.vehicle_rating_icon}
          />
          <p>Rate</p>
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate & Review Vehicle</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <span>
            <p>😀 Good</p>
          </span>
          <Textarea
            placeholder="Tell us about your experience with this vehicle"
            className="resize-none"
          />
        </div>
        <DialogFooter>
          <Button type="submit">Rate and Review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
