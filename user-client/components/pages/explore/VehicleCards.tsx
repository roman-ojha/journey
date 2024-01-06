"use client";
import VehicleCard, {
  VehicleCardType,
} from "@/components/VehicleCard/VehicleCard";
import { useAppSelector } from "@/hooks/useAppStore";
import getFormattedDateFromUTC from "@/lib/getFormattedDateFromUTC";
import styles from "@/styles/page/explore/index.module.scss";
import { useEffect, useState } from "react";

type VehicleCardResponse = {
  isError: boolean;
  vehicles: VehicleCardType[];
  isLoading: boolean;
  error: string;
};

const VehicleCards = (): React.JSX.Element => {
  const vehicleCardLayout = useAppSelector((state) => state.vehicleCardLayout);

  function shuffleArray(cards: VehicleCardType[]) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  const initialVehicle = shuffleArray([
    {
      image:
        "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
      slug: "a",
      rating: 2.5,
      no_of_review: Math.floor(Math.random() * 100000),
      departure_at: getFormattedDateFromUTC(new Date()),
      price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
      vehicle_type: "Deluxe Bus",
    },
    {
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
      slug: "ab",
      rating: 4.5,
      no_of_review: Math.floor(Math.random() * 100000),
      departure_at: getFormattedDateFromUTC(new Date()),
      price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
      vehicle_type: "Deluxe Bus",
    },
    {
      image:
        "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
      slug: "abc",
      rating: 5,
      no_of_review: Math.floor(Math.random() * 100000),
      departure_at: getFormattedDateFromUTC(new Date()),
      price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
      vehicle_type: "Deluxe Bus",
    },
    {
      image:
        "https://images.unsplash.com/photo-1607424064879-708250e57647?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
      slug: "abcd",
      rating: 3.5,
      no_of_review: Math.floor(Math.random() * 100000),
      departure_at: getFormattedDateFromUTC(new Date()),
      price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
      vehicle_type: "Deluxe Bus",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1661963208071-9a65b048ebaf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
      slug: "abcde",
      rating: 1.5,
      no_of_review: Math.floor(Math.random() * 100000),
      departure_at: getFormattedDateFromUTC(new Date()),
      price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
      vehicle_type: "Deluxe Bus",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1677440603651-b8e3f2c73e00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
      slug: "abcdef",
      rating: 2,
      no_of_review: Math.floor(Math.random() * 100000),
      departure_at: getFormattedDateFromUTC(new Date()),
      price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
      vehicle_type: "Deluxe Bus",
    },
    {
      image:
        "https://images.unsplash.com/photo-1650807486050-a142ea418b19?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
      slug: "abcdefg",
      rating: 1,
      no_of_review: Math.floor(Math.random() * 100000),
      departure_at: getFormattedDateFromUTC(new Date()),
      price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
      vehicle_type: "Deluxe Bus",
    },
    {
      image:
        "https://images.unsplash.com/photo-1694497905206-a23fa36b4536?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
      slug: "abcdefgh",
      rating: 4.5,
      no_of_review: Math.floor(Math.random() * 100000),
      departure_at: getFormattedDateFromUTC(new Date()),
      price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
      vehicle_type: "Deluxe Bus",
    },
  ]);

  const [{ isLoading, vehicles }, setCards] = useState<VehicleCardResponse>({
    isError: false,
    isLoading: true,
    vehicles: [],
    error: "",
  });

  useEffect(() => {
    async function fetchVehicles() {
      const response = new Promise<VehicleCardResponse>(
        async (resolve, reject) => {
          setTimeout(() => {
            resolve({
              isError: false,
              error: "",
              isLoading: false,
              vehicles: initialVehicle,
            });
          }, 1500);
        }
      );
      setCards(await response);
    }
    fetchVehicles();
  }, []);

  return (
    <section
      className={`${styles.card_container} ${
        vehicleCardLayout.layout == "grid"
          ? styles.card_container_grid_view
          : styles.card_container_list_view
      }`}
    >
      {initialVehicle.map((card, index) => (
        <VehicleCard
          image={card.image}
          title={card.title}
          rating={card.rating}
          no_of_review={card.no_of_review}
          departure_at={card.departure_at}
          price={card.price}
          vehicle_type={card.vehicle_type}
          slug={card.slug}
          key={card.slug}
          isLoading={isLoading}
        />
      ))}
    </section>
  );
};

export default VehicleCards;
