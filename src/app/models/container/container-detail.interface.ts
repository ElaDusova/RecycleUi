import { Type } from "./canType.model";
/**
 * Defines the structure for detail of container.
 */
export interface ContainerDetail {
  id: string;
  name: string;
  description: string;
  type: Type;
  picturePath: string | null;
}
