const express = require('express');
const BrandController = require('../controllers/brand.controller');
const brandRouter = express.Router();

brandRouter.post('', BrandController.createBrand);
brandRouter.patch('/:id', BrandController.updateBrand); // login_required 추가

module.exports = brandRouter;
