"use client";
import { usePathname } from "next/navigation";
import { NO_NAVBAR_FOR_ROUTES } from "@/data/constants";

const Footer = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  if (NO_NAVBAR_FOR_ROUTES.includes(path)) {
    return <></>;
  }

  return <>{children}</>;
};

export default Footer;
