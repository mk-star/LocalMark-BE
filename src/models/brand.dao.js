import { pool } from '../../config/database.js';

export const createBrandDAO = async(brandData) =>{
    const sql = `
            INSERT INTO Brand (
                user_id, region_id, name, brand_url, description, brand_image, business_name, business_registration_number, contact
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            brandData.user_id, brandData.region_id, brandData.name, brandData.brand_url, brandData.description,
            brandData.brand_image, brandData.business_name, brandData.business_registration_number, brandData.contact
        ];
        return new Promise((resolve, reject) => {
            pool.query(sql, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
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
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
