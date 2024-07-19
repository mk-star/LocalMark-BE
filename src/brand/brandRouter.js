import express from 'express';
import asyncHandler from 'express-async-handler';
import { createBrand, updateBrand } from './brandController';
export const brandRouter = express.Router();


// 브랜드 등록
brandRouter.post('/createBrand', asyncHandler(createBrand)); // login_required 추가

// 브랜드 정보 변경
brandRouter.patch('/:id', asyncHandler(updateBrand)); // login_required 추가
