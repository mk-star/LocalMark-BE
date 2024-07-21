import { pool } from "../../config/db.config.js";
import { getGalleryCnt, getGalleryByKeywordCnt, getGalleryList, getGalleryByKeyword } from "./gallery.sql.js";

export const getGellery = async (regionId, categoryId, page, keyword) => {

    try {
        const conn = await pool.getConnection();

        if(keyword == "undefined" || typeof keyword == "undefined" || keyword == null){
            const [ totalProductCnt ] = await pool.query(getGalleryCnt, [parseInt(regionId), parseInt(categoryId)]);
            const totalPage = parseInt(totalProductCnt[0].products_cnt / 15) + 1
            const offset = (parseInt(page) - 1) * 15;
            const [products] = await pool.query(getGalleryList, [parseInt(regionId), parseInt(categoryId), 15, offset]);
            conn.release();
            
            return {products, "currentPage": parseInt(page), totalPage};
    
        }else{
            const keywordPattern = `%${keyword}%`;
            console.log("dao keyword", keywordPattern);
            const [ totalProductCnt ] = await pool.query(getGalleryByKeywordCnt, [parseInt(regionId), parseInt(categoryId), keywordPattern]);
            const totalPage = parseInt(totalProductCnt[0].products_cnt / 15) + 1
            const offset = (parseInt(page) - 1) * 15;
            const [products] = await pool.query(getGalleryByKeyword, [parseInt(regionId), parseInt(categoryId), keywordPattern, 15, offset]);
            conn.release();
            return {products, "currentPage": parseInt(page), totalPage};    
        }
    } catch (err) {
        throw new Error(err.message);
    }
}