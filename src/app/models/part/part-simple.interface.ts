import { IdNameModel } from "./part-detail";

export interface PartSimple {
  id: string;
  name: string;
  material: MaterialSimple;
}

export interface MaterialSimple {
  id: string;
  name: string;
  trashCans: IdNameModel[];
}
