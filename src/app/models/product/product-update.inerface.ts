/**
 * Defines the structure for update of Product.
 */
export interface ProductUpdate {
    id: string;
    name: string;
    ean: string;
    description: string;
    picturePath: string;
    isVerified: boolean;
    parts: any[];
}
