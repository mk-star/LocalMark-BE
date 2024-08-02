import { pool } from "../../config/db.config.js";
import { getGalleryCnt, getGalleryByKeywordCnt, getGalleryList, getGalleryByKeyword, getProductInfo, getProductColor, getProductSize } from "./gallery.sql.js";

// 제품 갤러리 목록 조회/검색
export const getGellery = async (regionId, categoryId, page, keyword) => {

    try {
        const conn = await pool.getConnection();
        // 키워드 없을 경우
        if(keyword == "undefined" || typeof keyword == "undefined" || keyword == null){
            const [ totalProductCnt ] = await pool.query(getGalleryCnt, [parseInt(regionId), parseInt(categoryId)]);
            let totalPage;
            if (totalProductCnt[0].products_cnt % 12 > 0){
                totalPage = parseInt(totalProductCnt[0].products_cnt / 12) + 1;
            } else {
                totalPage = parseInt(totalProductCnt[0].products_cnt / 12);
            }
            const offset = (parseInt(page) - 1) * 12;
            const [products] = await pool.query(getGalleryList, [parseInt(regionId), parseInt(categoryId), 12, offset]);
            conn.release();
            
            return {products, "currentPage": parseInt(page), totalPage};
    
        }else{  // 키워드 있을 경우
            const keywordPattern = `%${keyword}%`;
            const [ totalProductCnt ] = await pool.query(getGalleryByKeywordCnt, [parseInt(regionId), parseInt(categoryId), keywordPattern]);
            let totalPage;
            if (totalProductCnt[0].products_cnt % 12 > 0){
                totalPage = parseInt(totalProductCnt[0].products_cnt / 12) + 1;
            } else {
                totalPage = parseInt(totalProductCnt[0].products_cnt / 12);
            }
            const offset = (parseInt(page) - 1) * 12;
            const [products] = await pool.query(getGalleryByKeyword, [parseInt(regionId), parseInt(categoryId), keywordPattern, 12, offset]);
            conn.release();
            return {products, "currentPage": parseInt(page), totalPage};    
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

// 제품 상세 페이지 조회
export const getProduct = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const [product] = await pool.query(getProductInfo, productId);

        conn.release();
        return product;
        
    } catch (err) {
        throw new Error(err.message)
    }
}

// 제품 상세 페이지 색상 목록 조회
export const getColor = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const [color] = await pool.query(getProductColor, productId);

        conn.release();
        return color;
        
    } catch (err) {
        throw new Error(err.message)
    }
}

// 제품 상세 페이지 색상 목록 조회
export const getSize = async (productId) => {
    try {
        const conn = await pool.getConnection();
        const [size] = await pool.query(getProductSize, productId);

        conn.release();
        return size;
        
    } catch (err) {
        throw new Error(err.message)
    }
}