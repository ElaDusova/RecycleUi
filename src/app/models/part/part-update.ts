/**
 * Defines the structure for part to update.
 */
export interface PartUpdate {
    id: string;
    name: string;
    description: string;
    picturePath: string | null;
    type: PartType;
    isVerified: boolean;
    trashCans: IdNameModel[];
    materialId: string;
  }

  export interface IdNameModel {
    id: string;
    name: string;
  }
  export type PartType =
  | 'Wrapping'
  | 'Part';
