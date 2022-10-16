import { Request, Response } from "express";

const BRANDS = [
    { id: 1, name: 'Nike'},
];

export const getBrands = (req: Request, res: Response) => {
    res.send(BRANDS);
}