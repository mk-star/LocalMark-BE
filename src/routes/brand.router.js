import express from 'express';
import {createBrand, updateBrand} from '../controllers/brand.controller.js';

const brandRouter = express.Router();

brandRouter.post('/', createBrand);
brandRouter.patch('/:id', updateBrand); // login_required 추가

export default brandRouter;
