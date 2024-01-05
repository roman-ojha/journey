"use client";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import getCssVariable from "@/lib/getCssVariable";
import styles from "@/styles/page/explore/cardFilter.module.scss";

function valuetext(value: number) {
  return `${value}`;
}
const PriceSlider = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 25,
    width: 25,
    backgroundColor: getCssVariable("--clr-base-secondary"),
    border: "3px solid white",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    color: getCssVariable("--clr-base-primary"),
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: "white",
    opacity: 1,
    height: 4,
  },
}));

const PriceFilterRangeSlider = (): React.JSX.Element => {
  const [priceRange, setPriceRange] = useState<number[]>([15, 80]);

  const minPrice = 1000;
  const maxPrice = 2500;

  const getActualPrice = (price: number) => {
    return `${(price / 100) * (maxPrice - minPrice) + minPrice}`;
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  console.log();
  return (
    <div className={styles.price_range_selector}>
      <div className={styles.price_range_selector__prices}>
        <p>{getActualPrice(priceRange[0])}</p>
        <p>{getActualPrice(priceRange[1])}</p>
      </div>
      <PriceSlider
        getAriaLabel={() => "Price range"}
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={5}
        marks
        // getAriaValueText={valuetext}
      />
    </div>
  );
};

export default PriceFilterRangeSlider;
