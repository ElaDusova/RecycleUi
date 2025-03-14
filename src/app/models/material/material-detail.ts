import { IdNameModel } from "../part/part-detail";

export interface MaterialDetail {
  id: string;
  name: string;
  description: string;
  trashCans: IdNameModel[];
}
