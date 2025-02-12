export interface MaterialCreate {
  name: string;
  description: string;
  trashCanMaterials: { trashCanId: string }[];
}
