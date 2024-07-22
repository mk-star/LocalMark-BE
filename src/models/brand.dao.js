import { pool } from '../../config/database.js';
import { insertBrandSql,  getBrandID, upBrandSql } from './brandSQL';

export const addBrand = async (data) => {
    try{
        const conn = await pool.getConnection();

        // user_id 겹치는지 확인 추가
        const result = await pool.query(insertBrandSql, [data.id, data.user_id, data.region_id, data.name, data.brand_url, data.description, data.brand_image, data.business_name, data.business_registration_number, data.contact]);

        conn.release();
        return result[0].insertId;
    }catch (err) {
        throw new Error(err.message);
    }
}


// 브랜드 정보 얻기
export const getBrand = async (id) => {
    try {
        const conn = await pool.getConnection();
        const [brand] = await pool.query(getBrandID, id);

        console.log(brand);

        if(user.length == 0){
            return -1;
        }

        conn.release();
        return brand;

    } catch (err) {
        throw new Error(err.message);
    }
}

// 브랜드 정보 업데이트
export const upBrand = async (brandId, brandData)=>{
    const {
        region_id,
        name,
        brand_url,
        description,
        brand_image,
        business_name,
        business_registration_number,
        contact
    } = brandData;

    const conn = await pool.getConnection();

    try {
        const result = await pool.query(upBrandSql, [
            region_id,
            name,
            brand_url,
            description,
            brand_image,
            business_name,
            business_registration_number,
            contact,
            brandId
        ]);
        return result.rows[0];
    } catch (err) {
        throw new Error(err.message);
    }
}
