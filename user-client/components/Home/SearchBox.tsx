"use client";
import SearchingSVG from "@/assets/svgs/searching.svg";
import Image from "next/image";
import styles from "@/styles/components/Home/searchBox.module.scss";
import { Trigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Icon } from "@iconify/react";
import { useState } from "react";
import Button from "@/components/Button";

const SearchBox = (): React.JSX.Element => {
  const [locations, setLocations] = useState<
    { district: string; places: string[] }[]
  >([
    {
      district: "Jhapa",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "Kathmandu",
      places: ["Koteswor", "New Bus park"],
    },
    {
      district: "jfdkslfdj",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "jfkdsfdk",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "jfdkdfkj",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "jfdkfjdk",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "urewoi",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "4u3ue",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "vckl",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "jfdksl[jjj",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "ruewio",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "vcmx",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "vcmx",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "vcmx",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "vcmx",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "vcmx",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "vcmx",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
    {
      district: "vcmx",
      places: ["kerkha", "dude", "damak", "birathnagar", "kakarvhita"],
    },
  ]);

  return (
    <div className={styles.container}>
      <Image src={SearchingSVG} alt="searching" className={styles.image} />
      <div className={styles.container__divider}></div>
      <form className={styles.search_form}>
        <DropdownMenu>
          <Trigger asChild>
            <div className={styles.select_item}>
              <Icon
                icon="fluent:location-12-filled"
                className={styles.select_item__icon}
              />
              <span className={styles.select_item__info}>
                <p>From</p>
                <span className={styles.select_item__info__location}>
                  <p>Select departure district</p>
                  <p>,</p>
                  <p>Select departure place</p>
                </span>
              </span>
            </div>
          </Trigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>District</DropdownMenuLabel>
            <ScrollArea className="h-[200px]">
              {locations.map((location, index) => {
                return (
                  <>
                    <DropdownMenuGroup key={index}>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          {/* <UserPlus className="mr-2 h-4 w-4" /> */}
                          <span>{location.district}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuLabel>Place</DropdownMenuLabel>
                            <ScrollArea className="max-h-[250px]">
                              {location.places.map((place, index) => {
                                return (
                                  <>
                                    <DropdownMenuItem>
                                      <span>{place}</span>
                                    </DropdownMenuItem>
                                  </>
                                );
                              })}
                            </ScrollArea>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                  </>
                );
              })}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <Trigger asChild>
            <div className={styles.select_item}>
              <Icon
                icon="fluent:location-12-filled"
                className={styles.select_item__icon}
              />
              <span className={styles.select_item__info}>
                <p>From</p>
                <span className={styles.select_item__info__location}>
                  <p>Select departure district</p>
                  <p>,</p>
                  <p>Select departure place</p>
                </span>
              </span>
            </div>
          </Trigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>District</DropdownMenuLabel>
            <ScrollArea className="h-[200px]">
              {locations.map((location, index) => {
                return (
                  <>
                    <DropdownMenuGroup key={index}>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          {/* <UserPlus className="mr-2 h-4 w-4" /> */}
                          <span>{location.district}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuLabel>Place</DropdownMenuLabel>
                            <ScrollArea className="max-h-[250px]">
                              {location.places.map((place, index) => {
                                return (
                                  <>
                                    <DropdownMenuItem>
                                      <span>{place}</span>
                                    </DropdownMenuItem>
                                  </>
                                );
                              })}
                            </ScrollArea>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                  </>
                );
              })}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <Trigger asChild>
            <div className={styles.select_item}>
              <Icon
                icon="fluent:location-12-filled"
                className={styles.select_item__icon}
              />
              <span className={styles.select_item__info}>
                <p>From</p>
                <span className={styles.select_item__info__location}>
                  <p>Select departure district</p>
                  <p>,</p>
                  <p>Select departure place</p>
                </span>
              </span>
            </div>
          </Trigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>District</DropdownMenuLabel>
            <ScrollArea className="h-[200px]">
              {locations.map((location, index) => {
                return (
                  <>
                    <DropdownMenuGroup key={index}>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          {/* <UserPlus className="mr-2 h-4 w-4" /> */}
                          <span>{location.district}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuLabel>Place</DropdownMenuLabel>
                            <ScrollArea className="max-h-[250px]">
                              {location.places.map((place, index) => {
                                return (
                                  <>
                                    <DropdownMenuItem>
                                      <span>{place}</span>
                                    </DropdownMenuItem>
                                  </>
                                );
                              })}
                            </ScrollArea>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                  </>
                );
              })}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button backgroundColor="primary" width="100%" type="button">
          Search
          <Icon
            icon="fluent:vehicle-car-16-filled"
            className={styles.search_button__icon}
          />
        </Button>
      </form>
    </div>
  );
};

export default SearchBox;
