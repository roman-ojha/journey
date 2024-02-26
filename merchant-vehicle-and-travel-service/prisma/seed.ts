import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { VehicleModels } from "../model/VehicleModel";
import { District } from "../model";
import { Place } from "../model";
import generateRandomHash from "../utils/generateRandomHash";
import slugify from "slugify";

const vehicleModels: VehicleModels[] = [
  {
    name: "SUPER_DELUX_BUS",
    no_of_seats: 35,
    seats: [
      "KA",
      "KH",
      "A",
      "B",
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "A11",
      "A12",
      "A13",
      "A14",
      "A15",
      "GA",
      "GH",
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "B10",
      "B11",
      "B12",
      "B13",
      "B14",
    ],
  },
  {
    name: "HIASE",
    no_of_seats: 15,
    seats: [
      "A",
      "B",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
    ],
  },
];

async function createVehicleModelAndAddSeats() {
  const prisma = new PrismaClient();
  vehicleModels.map(async (model_info) => {
    try {
      if (
        !(await prisma.vehicleModel.findFirst({
          where: {
            name: model_info.name,
          },
        }))
      ) {
        // Create if doesn't exist
        await prisma.vehicleModel.create({
          data: {
            name: model_info.name,
            no_of_seats: model_info.no_of_seats,
            seats: {
              create: model_info.seats.map((seat_name) => {
                return {
                  name: seat_name,
                };
              }),
            },
          },
        });
      } else console.log(`${model_info.name} already exist`);
    } catch (err) {
      console.log(err);
    }
  });
}

const address: Partial<District>[] = [
  {
    name: "Jhapa",
    places: <Place[]>[
      {
        name: "Kerkha",
      },
      {
        name: "Kakarvhita",
      },
      {
        name: "Damak",
      },
      {
        name: "Dudee",
      },
      {
        name: "Birtamod",
      },
      {
        name: "Bhadrapur",
      },
      {
        name: "Padajugi",
      },
    ],
  },
  {
    name: "Morong",
    places: <Place[]>[
      {
        name: "Urlabari",
      },
      {
        name: "Pathri",
      },
    ],
  },
  {
    name: "Sunsari",
    places: <Place[]>[
      {
        name: "Itahari",
      },
      {
        name: "Biratnagar",
      },
    ],
  },
  {
    name: "Kathmandu",
    places: <Place[]>[
      {
        name: "Koteshowr",
      },
      {
        name: "Gongabu, New Bus Park",
      },
      {
        name: "Kalanki",
      },
      {
        name: "Jadibuti",
      },
      {
        name: "Sorhakhutte",
      },
    ],
  },
  {
    name: "Kaski",
    places: <Place[]>[
      {
        name: "Pokhara",
      },
    ],
  },
];

const vehicleImages = [
  "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1607424064879-708250e57647?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661963208071-9a65b048ebaf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1677440603651-b8e3f2c73e00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1650807486050-a142ea418b19?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1694497905206-a23fa36b4536?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1573812456956-4a85dfc2ed00?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1583508805133-8fd03a9916d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1617479625255-43666e3a3509?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1600198741448-fc40d918673a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1534359265607-b9cdb5e0a81e?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1614140510679-96ae6ebd078e?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1612616044334-d35d54f899a0?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1617727553220-ab21c48259c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1571391105999-0f21a2154d6c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1535109395380-c7807234e24b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1618805154647-7d89ac05926b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1577459640575-219cbf231b8b?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1670491584909-fad9d3a4f66d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1564694202883-46e7448c1b26?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1597920467799-ec8bee99f6eb?q=80&w=2140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661589586735-c5f07b7da1fe?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1594825223369-381029794758?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1559762740-77e772d4d6d8?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1607512060958-423166921a75?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.pexels.com/photos/575897/pexels-photo-575897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://media.istockphoto.com/id/1366757525/photo/toyota-hiace.jpg?s=1024x1024&w=is&k=20&c=k0qQkrqSccwPZm4mwGUTswMIQlOU1rrfB-8RPT6Wr0Q=",
  "https://media.istockphoto.com/id/1036529282/photo/toyota-hiace.jpg?s=1024x1024&w=is&k=20&c=qhcTSXZjetnzeIeC5X6__JMtTeddpN7gwoZPsL8vinI=",
  "https://images.pexels.com/photos/14592112/pexels-photo-14592112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/12282740/pexels-photo-12282740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/11581727/pexels-photo-11581727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/13418725/pexels-photo-13418725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/10751744/pexels-photo-10751744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/19772939/pexels-photo-19772939/free-photo-of-city-buses-in-curitiba-brazil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/18324060/pexels-photo-18324060/free-photo-of-a-blue-and-white-bus-is-parked-on-the-side-of-the-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/20166404/pexels-photo-20166404/free-photo-of-london-family-in-leicester-square.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/20152874/pexels-photo-20152874/free-photo-of-london-bus.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/18429328/pexels-photo-18429328/free-photo-of-a-group-of-buses-parked-in-a-parking-lot.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://www.heavenlybhutan.com/wp-content/uploads/2018/01/Hiace-Roof-3.jpg",
  "https://www.vietnambudgetcarrental.com/vnt_upload/product/09_2018/toyota-hiace-van-12-seats.jpg",
  "https://thumbs.dreamstime.com/b/toyota-hiace-white-minivan-toyota-hiace-white-minibus-background-green-trees-159123751.jpg",
  "https://media.istockphoto.com/id/533565864/photo/toyota-hiace-van.jpg?s=1024x1024&w=is&k=20&c=gFUw3hYnXWruEf9k3HPtwT0Neiq9UlGcXQq0RIzCuVM=",
  "https://media.istockphoto.com/id/1487991431/photo/black-toyota-commuter-hiace-with-big-alloy-wheels-on-the-road-in-the-city-with-traffic.jpg?s=1024x1024&w=is&k=20&c=k-sTVfin3_Ev4it1KwSJ6M9OaRXvapx8LMY7chCKhQU=",
  "https://media.istockphoto.com/id/1045929296/photo/trafficlights-in-the-city-at-night-time.jpg?s=1024x1024&w=is&k=20&c=KhAX6TFX__TcGu_YpODIfMNj639P8ml6b_vVb_tlFOg=",
  "https://media.istockphoto.com/id/1066484026/photo/electric-bus-illustration-urban-ecology-green-concept.jpg?s=1024x1024&w=is&k=20&c=rKk6y4uhsUcpMnfgwJ0kwSG9eIJiJbChfIbE_ed2MoM=",
  "https://media.istockphoto.com/id/1137162567/photo/tourist-buses-on-parking.jpg?s=1024x1024&w=is&k=20&c=kyDpUNUJRlE_tf-GUv80zahLfopb4QnqrkoNhMj2nVQ=",
  "https://images.pexels.com/photos/1426516/pexels-photo-1426516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://media.istockphoto.com/id/1197014116/photo/travel-company-bus.jpg?s=1024x1024&w=is&k=20&c=e4mLyW9mxaXf3l_bNSS_GWYgoXStF4bGN7tjqZn3CGE=",
  "https://media.istockphoto.com/id/1371319562/photo/blue-bus-moving-on-the-road-in-city-in-early-morning.jpg?s=1024x1024&w=is&k=20&c=aQTe0ZNcr8Ra59LgYBJU8br2zyHAISHhvb8oAW5WPCI=",
  "https://images.pexels.com/photos/14832365/pexels-photo-14832365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://img.freepik.com/free-photo/young-adults-travelling-winter-time_23-2149211140.jpg?t=st=1708880011~exp=1708883611~hmac=b7ac53f50da4340c2aa18ffc2e3ec24f12922a6c53f3d4569a8270001ded0b72&w=1060",
  "https://img.freepik.com/premium-photo/young-backpack-traveler-getting-into-bus-local-bus-karnchanaburi-province-thailand_157563-65.jpg?w=826",
  "https://img.freepik.com/free-photo/elegant-driver-sitting-shuttle-bus-smiling-camera-summer-day-front-view-happy-man_7502-10207.jpg?t=st=1708880173~exp=1708883773~hmac=f8420d094f0238fc1d04f6633d3076a210abf82d7012e32dff23ebbec94c89a1&w=1060",
  "https://img.freepik.com/premium-photo/white-shuttle-bus-back-road-poland-modern-public-transport-traffic-summer-drive-charter-coach-vehicle-vacat_756748-62816.jpg?w=1060",
  "https://weirdomatic.com/wp-content/pictures/2019/08/8f63b7f1d8fe332b7ede296fe552ed82.jpeg",
  "https://christiangrouptravelky.com/wp-content/uploads/2012/12/Tour-Bus-1.jpg",
  "https://thumbs.dreamstime.com/b/colorful-long-distance-buses-bus-station-da-lat-departure-vietnam-dalat-december-67964060.jpg",
  "https://cdn.create.vista.com/api/media/medium/340620296/stock-photo-driver-staying-in-the-front-door-of-his-bus?token=",
  "https://assetsw.bus.com/content/uploads/2020/01/06194140/how-to-charter-a-bus-min-1.jpg",
  "https://cdn.create.vista.com/api/media/medium/365303548/stock-photo-buses-standing-terminal?token=",
  "https://cdn.create.vista.com/api/media/medium/54915073/stock-photo-buses-coaches?token=",
  "https://cdn.create.vista.com/api/media/medium/71222361/stock-photo-dobule-decker-buses-line-up?token=",
  "https://cdn.create.vista.com/api/media/medium/22722439/stock-photo-colorful-generic-buses?token=",
  "https://cdn.create.vista.com/api/media/medium/324818976/stock-photo-bus-production-manufacture?token=",
  "https://cdn.create.vista.com/api/media/medium/10194301/stock-photo-london-famous-red-buses?token=",
  "https://cdn.create.vista.com/api/media/medium/403416044/stock-photo-buses-airport-building?token=",
  "https://cdn.create.vista.com/api/media/medium/403416044/stock-photo-buses-airport-building?token=",
  "https://as1.ftcdn.net/v2/jpg/02/85/79/72/1000_F_285797293_7uTTG1sdmQEBegrTIcz4cjMwy7XFBom9.jpg",
  "https://as2.ftcdn.net/v2/jpg/07/22/02/93/1000_F_722029388_pwAp3uJgEgJ1LTHBeUwg1YgD6vkBV12R.webp",
  "https://as2.ftcdn.net/v2/jpg/01/38/68/79/1000_F_138687991_EFgPqPM3Y2KNGYl5WPlOatmyy8dPYJ9c.jpg",
  "https://as2.ftcdn.net/v2/jpg/06/33/96/95/1000_F_633969541_LlHEkR7dTQaOoR38j1RBX6uGscofCH4E.jpg",
  "https://as2.ftcdn.net/v2/jpg/02/07/46/31/1000_F_207463105_tVgAZJCmWlljl7ErTJWumm4GzU2TcjfL.jpg",
  "https://as2.ftcdn.net/v2/jpg/03/70/53/05/1000_F_370530506_VUGYuZzW8WImEdLEVLZ6dSejvdEtbGbw.jpg",
  "https://as1.ftcdn.net/v2/jpg/03/05/38/90/1000_F_305389055_nAPpqZyEBWlNBEAW3RwVUvNZYCuU2wvf.jpg",
  "https://as1.ftcdn.net/v2/jpg/03/05/38/90/1000_F_305389055_nAPpqZyEBWlNBEAW3RwVUvNZYCuU2wvf.jpg",
  "https://as2.ftcdn.net/v2/jpg/06/95/52/65/1000_F_695526593_SPJRw1RbGraLoQcqUcjW2SOwRwcbf1EI.jpg",
  "https://as1.ftcdn.net/v2/jpg/00/35/04/18/1000_F_35041827_7wIbDQCfEf3uAzNVsNCNf64tGVMOR0XP.jpg",
  "https://as1.ftcdn.net/v2/jpg/02/43/46/04/1000_F_243460462_VktGQHjqwdgiXNEYYYzboPKloRFHwd0H.jpg",
  "https://as1.ftcdn.net/v2/jpg/06/33/96/76/1000_F_633967642_jscZA2JSFgk6fbxOYULXoXtNc57vLV12.jpg",
  "https://as1.ftcdn.net/v2/jpg/02/26/10/66/1000_F_226106657_UhOClZ7R63piZopJjMMDq00GO7KzZpSt.jpg",
  "https://as1.ftcdn.net/v2/jpg/01/22/35/84/1000_F_122358477_6bp5zAGjanCXARMei7h8BewagRIgRoYO.jpg",
  "https://as2.ftcdn.net/v2/jpg/02/19/64/41/1000_F_219644190_KCREYMubzYwiVisvT6AxgvGlAcEfTMud.jpg",
  "https://as1.ftcdn.net/v2/jpg/06/61/99/96/1000_F_661999646_Q4OLCLlUZf6AqxKOayZBdh4Is4Uam3JQ.jpg",
  "https://as1.ftcdn.net/v2/jpg/02/11/66/42/1000_F_211664268_gY3iuXCSD7ov1yEyrr3zq7tDwKjBO5Pv.jpg",
  "https://as2.ftcdn.net/v2/jpg/06/40/80/45/1000_F_640804557_Ul3zvi62eDuRtrvWHnInLHkzDWbiunoS.jpg",
  "https://as2.ftcdn.net/v2/jpg/03/80/29/51/1000_F_380295168_qB3sHkQNin3UbvPjBlILsu6JMnDi2C3i.jpg",
  "https://as2.ftcdn.net/v2/jpg/02/07/46/31/1000_F_207463105_tVgAZJCmWlljl7ErTJWumm4GzU2TcjfL.jpg",
  "https://as2.ftcdn.net/v2/jpg/06/61/07/83/1000_F_661078308_u2j72kUIXajEABFanTjLcDQoH3Hp0DAs.jpg",
  "https://as1.ftcdn.net/v2/jpg/01/22/35/84/1000_F_122358477_6bp5zAGjanCXARMei7h8BewagRIgRoYO.jpg",
  "https://as2.ftcdn.net/v2/jpg/01/86/72/79/1000_F_186727929_B55Mk28VGI4Gy7tukxc93nstmFMbTDZU.jpg",
  "https://as1.ftcdn.net/v2/jpg/02/26/10/66/1000_F_226106658_r15D6n1FWFYj83ex9Q0WL5ZU0qig1bMi.jpg",
  "https://as1.ftcdn.net/v2/jpg/00/35/04/18/1000_F_35041827_7wIbDQCfEf3uAzNVsNCNf64tGVMOR0XP.jpg",
  "https://as2.ftcdn.net/v2/jpg/02/19/64/41/1000_F_219644190_KCREYMubzYwiVisvT6AxgvGlAcEfTMud.jpg",
  "https://as1.ftcdn.net/v2/jpg/02/52/34/08/1000_F_252340892_l6vyi4azX2IUEZCk6ECU2ZWlWB6oPcc1.jpg",
  "https://www.atucanada.ca/sites/default/files/styles/kobol_teaser/public/article/featured/photo-2019-10-31-13-26-51.jpg?itok=7rzzO29S&c=954abb37d02716681504d72e92625ad0",
  "https://th.bing.com/th/id/R.cd44ab8371f3677f8afb51a5314aeb0a?rik=FPTf4N9IXY7TJg&pid=ImgRaw&r=0",
  "https://s3-ap-southeast-1.amazonaws.com/rbplus/BusImage/Domestic/7076_35_1.png",
];

async function createVehiclesAndTravel() {
  const prisma = new PrismaClient();
  const vehicleModelsRes = await prisma.vehicleModel.findMany({
    select: {
      id: true,
      name: true,
      no_of_seats: true,
      seats: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  for (let i = 0; i < vehicleImages.length; i++) {
    const vehicleModel =
      vehicleModelsRes[Math.floor(Math.random() * vehicleModelsRes.length)];
    // const vehicleSeats = vehicleModels.filter(
    //   (model) => model.name === vehicleModel.name
    // )[0].seats;
    const vehicleSeats = vehicleModel.seats;
    const placesRes = await prisma.places.findMany();
    const fromPlaceIndex = Math.floor(Math.random() * placesRes.length);
    const fromPlace = placesRes[fromPlaceIndex];
    const toPlace = placesRes[(fromPlaceIndex + 1) % placesRes.length];
    // const vehicleImage =
    //   vehicleImages[Math.floor(Math.random() * vehicleImages.length)];
    const vehicleImage = vehicleImages[i];

    const vehicleMerchantName = faker.person.firstName() + " Yatayat Pvt.Ltd";
    const vehicleName = faker.person.firstName() + " Delux";
    const vehicleTempName = vehicleName + ", AC (" + vehicleMerchantName + ")";
    const vehicleSlug =
      slugify(vehicleName, { lower: true }) + "-" + generateRandomHash(25);

    prisma.vehicles
      .create({
        data: {
          merchant_id: 1,
          plate_no: "BA 1 KHA " + faker.number.int(),
          name: vehicleTempName,
          slug: vehicleSlug,
          images: {
            create: [
              {
                image: vehicleImage,
              },
            ],
          },
          model_id: vehicleModel.id,
          // seats: {
          //   create: vehicleSeats.map((seat) => {
          //     return {
          //       name: seat,
          //     };
          //   }),
          // },
          seats: {
            create: vehicleSeats.map((seat) => {
              const is_booked = Math.random() > 0.5;
              let seat_booked_at: Date | null = null;
              let user_id: number | null = null;
              if (is_booked) {
                seat_booked_at = new Date();
                user_id = 1000;
              }
              return {
                price: 1600,
                seat_id: seat.id,
                // random true or false
                is_booked: is_booked,
                booked_at: seat_booked_at,
                user_id,
              };
            }),
          },
          travels: {
            create: [
              {
                from_: fromPlace.id,
                to: toPlace.id,
                driver_no: faker.number.bigInt(),
                route: "",
                departure_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
                is_active: true,
                seat_average_price:
                  Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100, // Random price between 1100 and 2000
              },
            ],
          },
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }
}

async function createAddress() {
  const prisma = new PrismaClient();
  address.map(async (address) => {
    try {
      async function createPlaces(newDistrictId: string) {
        address.places?.map(async (place) => {
          if (
            !(await prisma.places.findFirst({
              where: {
                district_id: newDistrictId,
                name: place.name,
              },
            }))
          ) {
            // Places have still not created
            // So create new place
            const newPlace = await prisma.places.create({
              data: {
                name: place.name as string,
                district_id: newDistrictId,
              },
            });
          }
        });
      }
      const district = await prisma.district.findFirst({
        where: {
          name: address.name,
        },
      });

      if (!district) {
        //  District doesn't exist
        const newDistrict = await prisma.district.create({
          data: {
            name: address.name as string,
          },
        });
        if (newDistrict) {
          // District created
          // Now create places
          createPlaces(newDistrict.id);
        }
      } else {
        // District has been created now try to create places
        console.log(`${district.name} Already exist, Creating Places`);
        createPlaces(district.id);
      }
    } catch (err) {
      console.log(err);
    }
  });
}

// createVehicleModelAndAddSeats();
// createAddress();

createVehiclesAndTravel();
