import { IdNameModel } from "./part-detail";

export interface PartSimple {
  id: string;
  name: string;
  materials: MaterialSimple[];  // Add this line
}

export interface MaterialSimple {
  id: string;
  name: string;
  trashCans: IdNameModel[];
}
