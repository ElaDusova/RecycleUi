/**
 * Defines the structure for creating a new Product.
 */
export interface ProductCreate {
    name: string;
    ean: string;
    description: string;
    isVerified: boolean;
    picturePath: string | null;
    partIds: string[];
}
