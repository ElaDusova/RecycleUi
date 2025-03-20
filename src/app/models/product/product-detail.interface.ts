import { PartSimple } from "../part/part-simple.interface";

export interface ProductDetail {
    id: string;
    name: string;
    ean: string;
    description: string;
    picturePath: string | null;
    isVerified: boolean;
    parts: any[];
}
