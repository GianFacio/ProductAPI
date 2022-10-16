import { Request, RequestHandler, Response } from "express";
import { Shoe } from './shoes.model';
import { Material } from './../materials/materials.model';
import * as ShoeDao from './shoes.dao';
import { OkPacket } from "mysql";
import * as MaterialsDao from '../materials/materials.dao';

export const readShoes: RequestHandler =async (req: Request, res: Response) => {
    try {
        let shoes;
        let shoeId = parseInt(req.query.shoeId as string);
        
        console.log('shoeId', shoeId);
        if (Number.isNaN(shoeId)) {
            shoes = await ShoeDao.readShoes();
        } else {
            shoes = await ShoeDao.readShoesByShoeId(shoeId);
        }
        await readMaterials (shoes, res);

        res.status(200).json(
            shoes
        );
    } catch (error) {
        console.error('[shoes.controller][readShoes][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching shoes'
        });
    }
};

export const createShoe: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await ShoeDao.createShoe(req.body);

        console.log('req.body', req.body);

        console.log('shoe', okPacket);

        req.body.materials.forEach(async(materials: Material, index: number) => {
            try {
              await MaterialsDao.createMaterial(materials, index, okPacket.insertId);
            } catch (error) {
                console.error('[shoes.controller][createShoeMaterials][Error]', error);
                res.status(500).json({
                    message: 'There was an error when writing shoe materials'
                });
            }
        });;

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[shoes.controller][createShoe][Error]', error);
        res.status(500).json({
            message: 'There was an error when creating shoes'
        });
    }
};

export const updateShoe: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await ShoeDao.updateShoe(req.body);

        console.log('req.body', req.body);

        console.log('shoe', okPacket);

        req.body.material.forEach(async(material: Material, index: number) => {
            try {
                await MaterialsDao.createMaterial(material, index, okPacket.insertId);
            } catch (error) {
                console.error('[shoes.controller][updateShoe][Error]', error);
                res.status(500).json({
                    message: 'There was an error when writing shoes material'
                });
            }
        });;

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[shoes.controller][updateShoe][Error]', error);
        res.status(500).json({
            message: 'Updated'
        });
    }
};

async function readMaterials(shoes: Shoe[], res: Response<any, Record<string, any>>) {
    for (let i = 0; i < shoes.length; i++) {
        try {
            const materials = await MaterialsDao.readMaterials(shoes[i].shoeId);
            shoes[i].materials = materials;

        } catch (error) {
            console.error('[shoes.controller][readMaterials][Error] ', error);
            res.status(500).json({
                message: 'There was an error when fetching materials tracks'
            });
        }
    }
}

export const deleteShoe: RequestHandler = async (req: Request, res: Response) => {
    try {
        let shoeId = parseInt(req.params.shoeId as string);

        console.log('shoeId', shoeId);
        if (!Number.isNaN(shoeId)) {
            const response = await ShoeDao.deleteShoe(shoeId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for shoeId");
        }

    } catch (error) {
        console.error('[shoes.controller][deleteShoe][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting shoes'
        });
    }
}