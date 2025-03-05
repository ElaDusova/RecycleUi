export interface PartDetail {
    id: string;
    name: string;
    description: string;
    picturePath: string | null;
    type: PartType;
    isVerified: boolean;
    trashCans: IdNameModel[];
    partMaterials: string[];
  }

  export interface IdNameModel {
    id: string;
    name: string;
  }
  export type PartType =
  | 'Wrapping'
  | 'Part';
