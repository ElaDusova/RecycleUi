export interface PartCreate {
  name: string;
  description: string;
  picturePath: string | null;
  type: PartType;
  isVerified: boolean;
  partMaterials: { materialId: string }[];
}
export type PartType =
  | 'Wrapping'
  | 'Part';
