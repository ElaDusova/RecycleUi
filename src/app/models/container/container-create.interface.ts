import { Type } from "./canType.model";

  export interface ContainerCreate {
    id: string;
    name: string;
    description: string;
    type: Type;
    picturePath: string | null;
  }
