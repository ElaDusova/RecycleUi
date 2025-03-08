export interface ProductUpdate {
    id: string;
    name: string;
    ean: string;
    description: string;
    picturePath: string;
    isVerified: boolean;
    partIds: string[];
}
