import { IdNameModel } from "../part/part-detail";
/**
 * Defines the structure for detail of material.
 */
export interface MaterialDetail {
  id: string;
  name: string;
  description: string;
  trashCans: IdNameModel[];
}
