"use client";
import VehicleCard, {
  VehicleCardType,
} from "@/components/VehicleCard/VehicleCard";
import { ExploreVehicle } from "@/hooks/reactQuery/useExploreAndSearchedVehicles";
import { useAppSelector } from "@/hooks/useAppStore";
import getFormattedDateFromUTC from "@/lib/getFormattedDateFromUTC";
import styles from "@/styles/page/explore/index.module.scss";

type VehicleCardsProps = {
  travelVehicles?: ExploreVehicle[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

const VehicleCards: React.FC<VehicleCardsProps> = ({
  travelVehicles,
  isLoading,
  isError,
  isSuccess,
}): React.JSX.Element => {
  const vehicleCardLayout = useAppSelector((state) => state.vehicleCardLayout);

  // Mock Setup ==================================
  // function shuffleArray(cards: VehicleCardType[]) {
  //   for (let i = cards.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [cards[i], cards[j]] = [cards[j], cards[i]];
  //   }
  //   return cards;
  // }
  // const initialVehicle = shuffleArray([
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
  //     slug: "a",
  //     rating: 2.5,
  //     no_of_review: Math.floor(Math.random() * 100000),
  //     departure_at: getFormattedDateFromUTC(new Date()),
  //     price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
  //     vehicle_type: "Deluxe Bus",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
  //     slug: "ab",
  //     rating: 4.5,
  //     no_of_review: Math.floor(Math.random() * 100000),
  //     departure_at: getFormattedDateFromUTC(new Date()),
  //     price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
  //     vehicle_type: "Deluxe Bus",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
  //     slug: "abc",
  //     rating: 5,
  //     no_of_review: Math.floor(Math.random() * 100000),
  //     departure_at: getFormattedDateFromUTC(new Date()),
  //     price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
  //     vehicle_type: "Deluxe Bus",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1607424064879-708250e57647?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
  //     slug: "abcd",
  //     rating: 3.5,
  //     no_of_review: Math.floor(Math.random() * 100000),
  //     departure_at: getFormattedDateFromUTC(new Date()),
  //     price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
  //     vehicle_type: "Deluxe Bus",
  //   },
  //   {
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1661963208071-9a65b048ebaf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
  //     slug: "abcde",
  //     rating: 1.5,
  //     no_of_review: Math.floor(Math.random() * 100000),
  //     departure_at: getFormattedDateFromUTC(new Date()),
  //     price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
  //     vehicle_type: "Deluxe Bus",
  //   },
  //   {
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1677440603651-b8e3f2c73e00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
  //     slug: "abcdef",
  //     rating: 2,
  //     no_of_review: Math.floor(Math.random() * 100000),
  //     departure_at: getFormattedDateFromUTC(new Date()),
  //     price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
  //     vehicle_type: "Deluxe Bus",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1650807486050-a142ea418b19?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
  //     slug: "abcdefg",
  //     rating: 1,
  //     no_of_review: Math.floor(Math.random() * 100000),
  //     departure_at: getFormattedDateFromUTC(new Date()),
  //     price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
  //     vehicle_type: "Deluxe Bus",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1694497905206-a23fa36b4536?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)",
  //     slug: "abcdefgh",
  //     rating: 4.5,
  //     no_of_review: Math.floor(Math.random() * 100000),
  //     departure_at: getFormattedDateFromUTC(new Date()),
  //     price: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
  //     vehicle_type: "Deluxe Bus",
  //   },
  // ]);

  // const [{ isLoading, vehicles }, setCards] = useState<VehicleCardResponse>({
  //   isError: false,
  //   isLoading: true,
  //   vehicles: [],
  //   error: "",
  // });

  // useEffect(() => {
  //   async function fetchVehicles() {
  //     const response = new Promise<VehicleCardResponse>(
  //       async (resolve, reject) => {
  //         setTimeout(() => {
  //           resolve({
  //             isError: false,
  //             error: "",
  //             isLoading: false,
  //             vehicles: initialVehicle,
  //           });
  //         }, 1500);
  //       }
  //     );
  //     setCards(await response);
  //   }
  //   fetchVehicles();
  // }, []);

  // Mock Setup End ==================================

  return (
    <section
      className={`${styles.card_container} ${
        vehicleCardLayout.layout == "grid"
          ? styles.card_container_grid_view
          : styles.card_container_list_view
      }`}
    >
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <VehicleCard
              image={""}
              title={""}
              rating={0}
              no_of_review={0}
              departure_at={""}
              price={0}
              vehicle_type={""}
              slug={""}
              key={index}
              isLoading={isLoading}
            />
          ))
        : isSuccess && travelVehicles
        ? travelVehicles.map((tVehicle, index) => (
            <VehicleCard
              image={tVehicle.vehicle.images[0].image}
              title={tVehicle.vehicle.name}
              rating={tVehicle.rating}
              no_of_review={tVehicle.no_of_reviews}
              departure_at={getFormattedDateFromUTC(tVehicle.departure_at)}
              price={tVehicle.seat_average_price}
              vehicle_type={tVehicle.vehicle.model.name}
              slug={tVehicle.vehicle.slug}
              key={index}
              isLoading={isLoading}
            />
          ))
        : ""}
    </section>
  );
};

export default VehicleCards;
