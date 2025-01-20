export interface ContainerDetail
{
  id: string;
  name: string;
  description: string;
  canType: CanType;
  picturePath: string | null;
}
export enum CanType {
  Plastic = 'Plastic',
  Glass = 'Glass',
  Metal = 'Metal',
  Paper = 'Paper',
  Cartons = 'Cartons',
  Electronics = 'Electronics',
  Bio = 'Bio',
  CommunalTrash = 'CommunalTrash',
  Textile = 'Textile',
}
