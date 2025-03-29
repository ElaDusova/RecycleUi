import { MaterialSimple } from "./part-simple.interface";
/**
 * Defines the structure for detail of new Part.
 */
export interface PartDetail {
    id: string;
    name: string;
    description: string;
    picturePath: string | null;
    type: PartType;
    isVerified: boolean;
    trashCans: IdNameModel[];
    material: MaterialSimple;
  }

  export interface IdNameModel {
    id: string;
    name: string;
  }
  export type PartType =
  | 'Wrapping'
  | 'Part';
