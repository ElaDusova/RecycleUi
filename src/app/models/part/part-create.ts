export interface PartCreate {
  name: string;
  description: string;
  picturePath: string | null;
  type: PartType;
  materialId: string;
}
export type PartType =
  | 'Wrapping'
  | 'Part';
