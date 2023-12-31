"use client";
import Button from "@/components/Button";
import { Icon } from "@iconify/react";

const HeroButtons = (): React.JSX.Element => {
  return (
    <>
      <Button
        backgroundColor="primary"
        width="content-width"
        href="#search-box"
      >
        Search Vehicles
        <Icon icon="icon-park-outline:down-c" />
      </Button>
      <Button
        backgroundColor="transparent"
        width="content-width"
        href="/explore"
        border
      >
        Explore Vehicles
        <Icon icon="icon-park-outline:right-c" />
      </Button>
    </>
  );
};

export default HeroButtons;
