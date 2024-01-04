"use client";
import SearchingSVG from "@/assets/svgs/searching.svg";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import styles from "@/styles/components/horizontalSearchBox.module.scss";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import Button from "@/components/buttons/Button";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

const HorizontalSearchBox = (): React.JSX.Element => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.search_form}
      >
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
                  <p>Select departure district ,</p>
                  <p>Select departure place</p>
                </span>
              </span>
            </div>
          </Trigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuLabel>District</DropdownMenuLabel>
            <ScrollArea className="h-[200px]">
              {locations.map((location, index) => {
                return (
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
                                <DropdownMenuItem key={index}>
                                  <span>{place}</span>
                                </DropdownMenuItem>
                              );
                            })}
                          </ScrollArea>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
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
                  <p>Select departure district ,</p>
                  <p>Select departure place</p>
                </span>
              </span>
            </div>
          </Trigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuLabel>District</DropdownMenuLabel>
            <ScrollArea className="h-[200px]">
              {locations.map((location, index) => {
                return (
                  <DropdownMenuGroup key={index}>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="focus:text-accent-foreground">
                        {/* <UserPlus className="mr-2 h-4 w-4" /> */}
                        <span>{location.district}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuLabel>Place</DropdownMenuLabel>
                          <ScrollArea className="max-h-[250px]">
                            {location.places.map((place, index) => {
                              return (
                                <DropdownMenuItem key={index}>
                                  <span>{place}</span>
                                </DropdownMenuItem>
                              );
                            })}
                          </ScrollArea>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                );
              })}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => {
            return (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      {/* <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button> */}
                      <div className={styles.select_item}>
                        <Icon
                          icon="ion:calendar"
                          className={styles.select_item__icon}
                        />
                        <span className={styles.select_item__info}>
                          <p>Departure at</p>
                          <span className={styles.select_item__info__location}>
                            <p>Select departure date</p>
                          </span>
                        </span>
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            );
          }}
        />
        <Button
          backgroundColor="primary"
          // width="100%"
          width="content-width"
          type="button"
          style={{ margin: "auto" }}
        >
          Search
          <Icon
            icon="fluent:vehicle-car-16-filled"
            className={styles.search_button__icon}
          />
        </Button>
      </form>
    </Form>
  );
};

export default HorizontalSearchBox;
