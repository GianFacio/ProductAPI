import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Shoe } from './shoes.model';
import { shoeQueries } from './shoes.queries';

export const readShoes = async () => {
    return execute<Shoe[]>(shoeQueries.readShoes, []);
};

export const readShoesByShoeId = async (shoeId: number) => {
    return execute<Shoe[]>(shoeQueries.readShoesByShoeId, [shoeId]);
};

export const createShoe = async (shoe: Shoe) => {
    return execute<OkPacket>(shoeQueries.createShoe,
        [shoe.name, shoe.color, shoe.size, shoe.price]);
};

export const updateShoe = async (shoe: Shoe) => {
    return execute<OkPacket>(shoeQueries.updateShoe,
        [shoe.name, shoe.color, shoe.size, shoe.price, shoe.shoeId])
};

export const deleteShoe = async (shoeId: number) => {
    return execute<OkPacket>(shoeQueries.deleteShoe, [shoeId]);
};