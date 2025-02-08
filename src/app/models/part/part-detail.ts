export interface PartDetail {
    id: string;
    name: string;
    description: string;
    picturePath: string | null;
    partType: PartType;
    isVerified: boolean;
    partMaterials: string[];
}
export enum PartType {
  wrapping = 'wrapping',
  part = 'part'
  }
