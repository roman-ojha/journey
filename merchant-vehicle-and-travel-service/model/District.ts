import { Place } from "./Place";

interface District {
  id: string;
  name: string;
  places: Place[];
  created_at: Date;
  updated_at: Date;
}

export { District };
