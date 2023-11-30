import { District } from "./District";

interface Place {
  id: string;
  name: string;
  district: District;
  district_id: District["id"];
  //   travel_from Travel[] @relation("FromPlace")
  //   travel_to   Travel[] @relation("ToPlace")
  created_at: Date;
  updated_at: Date;
}

export { Place };
