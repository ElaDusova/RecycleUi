export type TrashCanType =
  | 'Plastic'
  | 'Paper'
  | 'Glass'
  | 'Cartons'
  | 'Electronics'
  | 'Bio'
  | 'CommunalTrash'
  | 'Metal'
  | 'Textile';

export interface ContainerDetail {
  id: string;
  name: string;
  description: string;
  canType: TrashCanType;
  picturePath: string | null;
}
