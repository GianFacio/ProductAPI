import { Router } from "express";
import * as ShoesController from './shoes.controller';

const router = Router();
router.
    route('/shoes').
    get(ShoesController.readShoes);
router.
    route('/shoes').
    post(ShoesController.createShoe);

router.
    route('/shoes').
    put(ShoesController.updateShoe);

router.
    route('/shoes/:shoeId').
    delete(ShoesController.deleteShoe);

export default router;