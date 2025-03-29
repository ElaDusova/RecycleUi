/**
 * Defines the structure for creating a new Part.
 */
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
