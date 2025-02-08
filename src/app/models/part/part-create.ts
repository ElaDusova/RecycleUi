export interface PartCreate {
  name: string;
  description: string;
  picturePath: string | null;
  partType: string;
  isVerified: boolean;
  partMaterials: { materialId: string }[];
}
export enum PartType {
wrapping = 'wrapping',
part = 'part'
}
