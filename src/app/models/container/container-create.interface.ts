import { Type } from "./canType.model";

  export interface ContainerCreate {
    name: string;
    description: string;
    type: Type;
    picturePath: string | null;
  }
