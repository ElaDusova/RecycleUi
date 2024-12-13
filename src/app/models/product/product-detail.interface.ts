export interface ProductDetail {
    id: string;
    name: string;
    ean: string;
    description: string;
    picturePath: string;
    isVerified: boolean;
}
export interface ProductView extends ProductDetail {
description: string;
picturePath: string;
isVerified: boolean;}
