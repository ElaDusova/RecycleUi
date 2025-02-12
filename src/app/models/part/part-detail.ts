export interface PartDetail {
    id: string;
    name: string;
    description: string;
    picturePath: string | null;
    type: PartType;
    isVerified: boolean;
    partMaterials: string[];
}
export type PartType =
  | 'Wrapping'
  | 'Part';
