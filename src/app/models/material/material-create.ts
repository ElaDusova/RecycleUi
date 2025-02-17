export interface MaterialCreate {
  name: string;
  description: string;
  trashCanIds: Array<{ containerId: string }>;
}

