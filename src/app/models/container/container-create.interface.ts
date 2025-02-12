export type TrashCanType =
  | 'Plastic'
  | 'Glass'
  | 'Metal'
  | 'Paper'
  | 'Cartons'
  | 'Electronics'
  | 'Bio'
  | 'CommunalTrash'
  | 'Textile';
  export interface ContainerCreate {
    id: string;
    name: string;
    description: string;
    Type: TrashCanType;
    picturePath: string | null;
  }
