import { createBrandC, updateBrandC  } from './brandService';
import { response } from '../../config/response';
import { successStatus } from '../../config/successStatus';

export const createBrand = async (req, res, next) =>{
    console.log(req.body);
    //const userId = req.currentUserId;
    const userId = 'unhi';
    res.send(response(successStatus.SUCCESS, await createBrandC(req.body, userId)))
}

export const updateBrand = async (req, res, next) =>{
    const brandId = req.params.id;
    const brandData = req.body;
    //const userId = req.currentUserId;
    const userId = 'unhi';
    const updatedBrand = await updateBrandC(userId, brandId, brandData);
    res.send(response(successStatus.SUCCESS, updatedBrand))
}
