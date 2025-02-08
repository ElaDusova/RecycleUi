import { PartSimple } from "../part/part-simple.interface";

export interface ProductDetail {
    id: string;
    name: string;
    ean: string;
    description: string;
    picturePath: string;
    isVerified: boolean;
    parts: PartSimple[];
}
