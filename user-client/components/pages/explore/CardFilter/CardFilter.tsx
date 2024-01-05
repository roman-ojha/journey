"use client";
import AppIcon from "@/components/appIcon/AppIcon";
import styles from "@/styles/page/explore/cardFilter.module.scss";
import PriceFilterRangeSlider from "./PriceFilterRangeSlider";
import CheckBox from "@/components/CheckBox";
import { useState } from "react";

const CardFilter = (): React.JSX.Element => {
  const [vehicleType, setVehicleType] = useState({
    bus: true,
    hiAce: false,
  });

  const [departureTime, setDepartureTime] = useState({
    morning: true,
    evening: false,
    night: false,
  });

  return (
    <section className={styles.container}>
      <div className={styles.vehicle_type}>
        <div className={styles.vehicle_type__header}>
          <AppIcon
            iconName="fluent:vehicle-cab-16-filled"
            use="iconify"
            className={styles.vehicle_type__header__icon}
          />
          <h6>Vehicle Type</h6>
        </div>
        <div className={styles.check_boxes}>
          <div className={styles.check_boxes__box}>
            <CheckBox
              checked={vehicleType.bus}
              inputProps={{ "aria-label": "vehicle-type-bus" }}
              name="vehicle-type-bus"
              onClick={() => {
                setVehicleType({
                  ...vehicleType,
                  bus: !vehicleType.bus,
                });
              }}
            />
            <label htmlFor="vehicle-type-bus">Bus</label>
          </div>
          <div className={styles.check_boxes__box}>
            <CheckBox
              checked={vehicleType.hiAce}
              inputProps={{ "aria-label": "vehicle-type-hiAce" }}
              name="vehicle-type-hiAce"
              onClick={() => {
                setVehicleType({
                  ...vehicleType,
                  hiAce: !vehicleType.hiAce,
                });
              }}
            />
            <label htmlFor="vehicle-type-hiAce">HiAce&apos;s</label>
          </div>
        </div>
      </div>
      <div className={styles.filter_divider}></div>
      <div className={styles.price}>
        <div className={styles.price__header}>
          <AppIcon
            iconName="raphael:dollar"
            use="iconify"
            className={styles.price__header__icon}
          />
          <div className={styles.price_title}>
            <h6>Price </h6>
            <p>(Nrs.)</p>
          </div>
        </div>
        <PriceFilterRangeSlider />
      </div>
      <div className={styles.filter_divider}></div>
      <div className={styles.departure_time}>
        <div className={styles.departure_time__header}>
          <AppIcon
            iconName="carbon:time-filled"
            use="iconify"
            className={styles.departure_time__header__icon}
          />
          <h6>Departure Time</h6>
        </div>
        <div className={styles.check_boxes}>
          <div className={styles.check_boxes__box}>
            <CheckBox
              checked={departureTime.morning}
              inputProps={{ "aria-label": "departure-time-morning" }}
              name="departure-time-morning"
              onClick={() => {
                setDepartureTime({
                  ...departureTime,
                  morning: !departureTime.morning,
                });
              }}
            />
            <label htmlFor="">Morning</label>
          </div>
          <div className={styles.check_boxes__box}>
            <CheckBox
              checked={departureTime.evening}
              inputProps={{ "aria-label": "departure-time-evening" }}
              name="departure-time-evening"
              onClick={() => {
                setDepartureTime({
                  ...departureTime,
                  evening: !departureTime.evening,
                });
              }}
            />
            <label htmlFor="">Evening</label>
          </div>
          <div className={styles.check_boxes__box}>
            <CheckBox
              checked={departureTime.night}
              inputProps={{ "aria-label": "departure-time-night" }}
              name="departure-time-night"
              onClick={() => {
                setDepartureTime({
                  ...departureTime,
                  night: !departureTime.night,
                });
              }}
            />
            <label htmlFor="">Night</label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardFilter;
