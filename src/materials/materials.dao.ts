import { execute } from '../services/mysql.connector';
import { Material } from './materials.model';
import { materialQueries } from './materials.queries';

export const readMaterials = async (shoeId: number) => {
    return execute<Material[]>(materialQueries.readMaterials, [shoeId]);
};

export const createMaterial = async (material: Material, index: number, shoeId: number) => {
    return execute<Material[]>(materialQueries.createMaterial,
        [shoeId, material.name]);
};

export const updateTrack = async (material: Material) => {
    return execute<Material[]>(materialQueries.updateMaterial,
        [material.materialId, material.name,]);
};