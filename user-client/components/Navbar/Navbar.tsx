"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { NO_NAVBAR_FOR_ROUTES } from "@/data/constants";

const NavBar = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const pathName = usePathname();

  if (NO_NAVBAR_FOR_ROUTES.includes(pathName)) {
    return <></>;
  }

  return <>{children}</>;
};

export default NavBar;
