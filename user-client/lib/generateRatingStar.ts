export type RatingStar =
  | "1"
  | "1.5"
  | "2"
  | "2.5"
  | "3"
  | "3.5"
  | "4"
  | "4.5"
  | "5";

type ReturnType = ("full" | "outline" | "half")[];
export function generateRatingStar(
  rating: RatingStar
): ("full" | "outline" | "half")[] {
  switch (rating) {
    case "1":
      return ["full", "outline", "outline", "outline", "outline"];
    case "1.5":
      return ["full", "half", "outline", "outline", "outline"];
    case "2":
      return ["full", "full", "outline", "outline", "outline"];
    case "2.5":
      return ["full", "full", "half", "outline", "outline"];
    case "3":
      return ["full", "full", "full", "outline", "outline"];
    case "3.5":
      return ["full", "full", "full", "half", "outline"];
    case "4":
      return ["full", "full", "full", "full", "outline"];
    case "4.5":
      return ["full", "full", "full", "full", "half"];
    case "5":
      return ["full", "full", "full", "full", "full"];
    default:
      return [];
  }
}
