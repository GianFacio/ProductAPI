import { Material } from "../materials/materials.model";
export interface Shoe {
    shoeId: number,
    name: string,
    color: string,
    size: number,
    price: number,
    materials: Material[]
}