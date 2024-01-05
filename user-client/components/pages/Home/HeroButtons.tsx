import AppIcon from "@/components/appIcon/AppIcon";
import AppLink from "@/components/buttons/AppLink";

const HeroButtons = (): React.JSX.Element => {
  return (
    <>
      <AppLink
        backgroundColor="primary"
        width="content-width"
        href="#search-box"
      >
        Search Vehicles
        <AppIcon iconName="icon-park-outline:down-c" use="iconify" />
      </AppLink>
      <AppLink
        backgroundColor="transparent"
        width="content-width"
        href="/explore"
        border
      >
        Explore Vehicles
        <AppIcon iconName="icon-park-outline:right-c" use="iconify" />
      </AppLink>
    </>
  );
};

export default HeroButtons;
