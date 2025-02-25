export interface ProductCreate {
    name: string;
    ean: string;
    description: string;
    isVerified: boolean;
    picturePath: string | null;
    partIds: string[];
}
