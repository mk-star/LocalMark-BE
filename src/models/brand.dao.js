import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { getBrandInfo, confirmBrand, getBrandGallery, getProductCnt } from "./brand.sql.js";

// 브랜드 정보 조회
export const getBrandInfos = async (brandId) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmBrand, brandId);
        if (!confirm[0].isExistBrand) {
          conn.release();
          return -1;
        }

        const brand = await pool.query(getBrandInfo, brandId);
        
        conn.release();
        return brand[0];
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 브랜드 프로필 - 제품 갤러리
export const getBrandGalleryList = async (brandId, page, sort) => {
    try {
        const conn = await pool.getConnection();

        // 유효하지 않은 브랜드 id
        const [confirm] = await pool.query(confirmBrand, brandId);
        if (!confirm[0].isExistBrand) {
          conn.release();
          return -1;
        }

        // 페이지 미입력
        if (page == "undefined" || typeof page == "undefined" || page == null) {
            conn.release();
            return -2;
        }

        // 페이징 처리
        const [ totalProductCnt ] = await pool.query(getProductCnt, brandId);
        let totalPage = 0;
        if (parseInt(totalProductCnt[0].product_cnt) <= 16){
            totalPage = 1;
        }
        else if (totalProductCnt[0].product_cnt % 16 > 0){
            totalPage = parseInt(totalProductCnt[0].product_cnt / 16) + 1;
        } else {
            totalPage = parseInt(totalProductCnt[0].product_cnt / 16);
        }
        const offset = (parseInt(page) - 1) * 16;

        // 정렬 순서
        let sortKeyword = 'views DESC'; // 기본은 조회순
        if(sort != "undefined" && typeof sort != "undefined" && sort != null){ 
            if (sort == 1){ // 가격 낮은 순
                sortKeyword = 'price'; 
            } else if (sort == 2){  // 가격 높은 순
                sortKeyword = 'price DESC'; 
            } else if (sort == 3){  // 인기순(판매량 많은 순)
                sortKeyword = 'sales_count DESC';
            }
        }

        const brandQuery = `${getBrandGallery} ORDER BY ${sortKeyword} LIMIT 16 OFFSET ${offset};`;
        const [products] = await pool.query(brandQuery, brandId);
        
        conn.release();
        return {"products": products, "currentPage": parseInt(page), totalPage};
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

export const getBrandInfoByUserId = async(userId) =>{
    const sql = `
        SELECT * FROM Brand WHERE user_id = ?
    `;
    const conn = await pool.getConnection();
    try{
        const [results] = await pool.query(sql, [userId]);
        conn.release();
        return results[0];
    }catch(error){
        throw error;
    }
}

export const createBrandDAO = async(userId, brandData) =>{
    const sql = `
            INSERT INTO Brand (
                user_id, region_id, name, brand_url, description, brand_image, business_name, business_registration_number, contact
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            userId, brandData.region_id, brandData.name, brandData.brand_url, brandData.description,
            brandData.brand_image, brandData.business_name, brandData.business_registration_number, brandData.contact
        ];
        const conn = await pool.getConnection();
        try{
            await pool.query(sql, values);
            conn.release();
            console.log(brandData);
            return brandData;
        }catch(error){
            throw error;
        }
}
export const updateBrandDAO = async(brandId, brandData) => {
    const sql = `
        UPDATE Brand SET
            region_id = ?, name = ?, brand_url = ?, description = ?, brand_image = ?, business_name = ?, business_registration_number = ?, contact = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND user_id = ?
    `;
    const values = [
        brandData.region_id, brandData.name, brandData.brand_url, brandData.description,
        brandData.brand_image, brandData.business_name, brandData.business_registration_number,
        brandData.contact, brandId, brandData.user_id
    ];
    const conn = await pool.getConnection();
    try{
        const results = await pool.query(sql, values);
        conn.release();
        console.log(results);
        return results;
    }catch(error){
        throw error;
    }
}
