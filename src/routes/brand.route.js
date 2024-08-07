import express from 'express';
import {createBrand, updateBrand} from '../controllers/brand.controller.js';

export const brandRouter = express.Router();

brandRouter.post('/', createBrand);
brandRouter.patch('/:id', updateBrand); // login_required 추가
