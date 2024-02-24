"use client";
import * as React from "react";
import { Minus, Plus } from "lucide-react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts"
import styles from "@/styles/page/vehicle/selectedSeats.module.scss";

import { Button } from "@/components/ui/button";
import AppButton from "@/components/buttons/Button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import getCssVariable from "@/lib/getCssVariable";
import AppIcon from "@/components/appIcon/AppIcon";
import {
  getSelectedSeats,
  getTotalSeatPrice,
} from "@/services/store/features/vehicleSeat/vehicleSeatSlice";
import { useAppSelector } from "@/hooks/useAppStore";
import useBookSeats from "@/hooks/reactMutation/useBookSeats";

type BuySeatsDrawerProps = {
  disabled?: boolean;
  vehicle_id?: string;
};

export function BuySeatsDrawer({
  disabled = false,
  vehicle_id,
}: BuySeatsDrawerProps) {
  const selectedSeats = getSelectedSeats({
    vehicleSeats: useAppSelector((state) => state.vehicleSeats),
  });

  const { mutate: bookSeats, data, isSuccess, isError } = useBookSeats();

  function handleBookSeats() {
    bookSeats({
      vehicle_id: vehicle_id as string,
      seats: selectedSeats.map(
        (selectedSeat) => selectedSeat.seatNumber
      ) as string[],
    });
  }

  if (isSuccess) {
    // console.log(data.data.data.payment_url);
    window.location.href = data.data.data.payment_url;
  }

  return (
    <Drawer>
      <DrawerTrigger asChild disabled={disabled}>
        <Button variant="default" className="w-full text-white">
          Continue
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm flex flex-col items-center">
          <DrawerHeader>
            <DrawerTitle style={{ textAlign: "center" }}>
              Book Seats
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col items-center gap-3 w-full">
            <div className={styles.selected_seats}>
              {selectedSeats.map((seat, index) => (
                <span className={styles.vehicle_seat} key={index}>
                  <AppIcon
                    iconName="mdi:seat"
                    use="iconify"
                    className={styles.vehicle_seat__icon}
                    style={{
                      color: getCssVariable("--clr-base-secondary"),
                    }}
                  />
                  <b>{seat.seatNumber}</b>
                  <p>Rs. {seat.seatPrice}</p>
                </span>
              ))}
            </div>
            <div className={styles.selected_seats_total_price}>
              <b>Total Price: </b>
              <p>Rs. {getTotalSeatPrice(selectedSeats)}/-</p>
            </div>
          </div>
          <DrawerFooter>
            <Button className="w-80 text-white" onClick={handleBookSeats}>
              Book Seats
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
