"use client";
import { Icon } from "@iconify/react";

type AppIconifyIconProps = {
  iconName: React.ComponentProps<typeof Icon>["icon"];
  use: "iconify";
} & Omit<React.ComponentProps<typeof Icon>, "icon">;

type AppIconProps = AppIconifyIconProps;

const AppIcon: React.FC<AppIconProps> = ({
  iconName,
  use,
  ...props
}): React.JSX.Element => {
  if (use === "iconify") {
    return <Icon {...props} icon={iconName} />;
  }
  return <></>;
};

export default AppIcon;
