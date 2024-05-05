"use client";
import ProfileCardHeaders from "./_components/CardHeader/ProfileCardHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetAuthUserQuery from "@/hooks/reactQuery/useGetAuthUserQuery";
import { useQueryClient } from "@tanstack/react-query";
import styles from "@/styles/page/profile/index.module.scss";
import ProfileVehicleCards from "./_components/ProfileVehicleCards";

const Profile = (): React.JSX.Element => {
  const queryClient = useQueryClient();

  const { data, isError, isSuccess } = useGetAuthUserQuery({
    retry: false,
  });

  if (isSuccess) {
    return (
      <>
        <div className="px-12 relative">
          <div className="p-8 bg-background shadow mt-24 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p className="font-bold text-primary-foreground text-xl">
                    10
                  </p>
                  <p className="text-primary-foreground">Booked Vehicles</p>
                </div>
                <div>
                  <p className="font-bold text-primary-foreground text-xl">
                    22
                  </p>
                  <p className="text-primary-foreground">Booked Seats</p>
                </div>
                {/* <div>
                  <p className="font-bold text-gray-700 text-xl">10</p>
                  <p className="text-gray-400">Photos</p>
                </div> */}
                <div>
                  <p className="font-bold text-primary-foreground text-xl">
                    89
                  </p>
                  <p className="text-primary-foreground">My Reviews</p>
                </div>
              </div>
              <div className="relative">
                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  <Avatar className="w-48 h-48">
                    <AvatarImage src={data?.data?.picture} />
                    <AvatarFallback className="capitalize bg-secondary text-4xl text-white">
                      {data?.data?.f_name.slice(0, 1)}
                      {data?.data?.l_name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              {/* <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Connect
                </button>
                <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Message
                </button>
              </div> */}
            </div>
            <div className="mt-20 text-center pb-12">
              <h1 className="text-4xl font-medium text-primary-foreground">
                {data.data.f_name} {data.data.l_name}
              </h1>
              <p className="font-light text-secondary-foreground mt-3">
                {data.data.email}
              </p>
              <p className="font-light text-tertiary-foreground mt-3">
                {data.data.number}
              </p>
            </div>
            <ProfileCardHeaders />
            <div className={styles.cards_container}>
              <ProfileVehicleCards />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Profile;
