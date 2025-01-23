export interface PartCreate {
    name: string;
    description: string;
    picturePath: string | null;
    partType: PartType;
    isVerified: boolean;
    // partMaterials: PartMaterialCreate[];
}
export enum PartType {
wrapping = 'wrapping',
part = 'part'
}
