"use client";
import AppLink from "@/components/buttons/AppLink";
import Button from "@/components/buttons/Button";
import { Icon } from "@iconify/react";

const HeroButtons = (): React.JSX.Element => {
  return (
    <>
      <AppLink
        backgroundColor="primary"
        width="content-width"
        href="#search-box"
      >
        Search Vehicles
        <Icon icon="icon-park-outline:down-c" />
      </AppLink>
      <AppLink
        backgroundColor="transparent"
        width="content-width"
        href="/explore"
        border
      >
        Explore Vehicles
        <Icon icon="icon-park-outline:right-c" />
      </AppLink>
    </>
  );
};

export default HeroButtons;
