import { Router } from "express";
import {getBrands} from './brands.controller';

const router = Router();
router
    .route('/brands')
    .get(getBrands);

export default router;