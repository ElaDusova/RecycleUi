import { IdNameModel } from "./part-detail";
/**
 * Defines the structure for simple model of part.
 */
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
