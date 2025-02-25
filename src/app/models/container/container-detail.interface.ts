import { Type } from "./canType.model";

export interface ContainerDetail {
  id: string;
  name: string;
  description: string;
  type: Type;
  picturePath: string | null;
}
